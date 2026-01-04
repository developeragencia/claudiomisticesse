const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Inicializar banco de dados
// O adaptador permite usar SQLite (dev) ou MySQL (produção) com a mesma interface
if (process.env.NODE_ENV === 'production' || process.env.DB_HOST) {
  console.log('🔵 Inicializando MySQL (produção)...');
  require('./database-mysql');
} else {
  console.log('🟢 Inicializando SQLite (desenvolvimento)...');
  require('./database');
}

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/banners', require('./routes/banners'));
app.use('/api/consultores', require('./routes/consultores'));
app.use('/api/consultas', require('./routes/consultas'));
app.use('/api/pagamentos', require('./routes/pagamentos'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/contatos', require('./routes/contatos'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/config', require('./routes/config'));
app.use('/api/upload', require('./routes/upload'));

// Health check melhorado
const healthCheck = require('./healthcheck');
app.get('/api/health', async (req, res) => {
  try {
    const health = await healthCheck();
    const statusCode = health.status === 'ok' ? 200 : 503;
    res.status(statusCode).json(health);
  } catch (error) {
    res.status(503).json({ 
      status: 'error', 
      message: 'Serviço indisponível',
      error: error.message 
    });
  }
});

// Servir arquivos estáticos do frontend (após build)
const clientBuildPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientBuildPath)) {
  console.log(`📁 Servindo frontend de: ${clientBuildPath}`);
  app.use(express.static(clientBuildPath));
  
  // Rota catch-all: serve o index.html para todas as rotas não-API
  app.get('*', (req, res, next) => {
    // Não servir index.html para rotas da API
    if (req.path.startsWith('/api')) {
      return next();
    }
    
    // Servir index.html para rotas do frontend
    const indexPath = path.join(clientBuildPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send('Frontend não encontrado. Execute npm run build');
    }
  });
} else {
  console.warn(`⚠️  Frontend não encontrado em: ${clientBuildPath}`);
  console.warn('   Execute: npm run build');
}

const PORT = process.env.PORT || 5000;

// Trust proxy para funcionar corretamente com Hostinger
app.set('trust proxy', 1);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`🌐 Site: ${process.env.SITE_URL || 'https://conselhosesotericos.com.br'}`);
  if (fs.existsSync(clientBuildPath)) {
    console.log(`✅ Frontend sendo servido a partir de ${clientBuildPath}`);
  } else {
    console.log(`⚠️ Frontend não encontrado em ${clientBuildPath}. Execute 'npm run build' primeiro.`);
  }
  console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  Banco de dados: ${process.env.DB_HOST ? 'MySQL' : 'SQLite'}`);
});

module.exports = app;
