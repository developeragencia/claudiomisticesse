/**
 * Script de configuração automática para Hostinger
 * Execute: node setup-hostinger.js
 */

const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Configurando ambiente Hostinger...\n');

// Gerar JWT Secret aleatório
const jwtSecret = crypto.randomBytes(32).toString('base64');

// Conteúdo do arquivo .env
const envContent = `# Configuração do Banco de Dados MySQL (Hostinger)
DB_HOST=localhost
DB_USER=u812652203_misticescoter1
DB_PASSWORD=Conselhos9500933
DB_NAME=u812652203_misticoesoteri

# Configuração do Servidor
NODE_ENV=production
PORT=5000

# JWT Secret (gerado automaticamente)
JWT_SECRET=${jwtSecret}

# URL do Site
SITE_URL=https://conselhosesotericos.com.br
API_URL=https://conselhosesotericos.com.br

# Uploads
UPLOAD_DIR=./server/uploads
`;

// Criar diretório de uploads se não existir
const uploadsDir = path.join(__dirname, 'server', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Diretório uploads criado');
}

// Criar arquivo .env
const envPath = path.join(__dirname, '.env');
fs.writeFileSync(envPath, envContent, 'utf8');
console.log('✅ Arquivo .env criado com sucesso!');

// Verificar se node_modules existe
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('\n📦 Instalando dependências...');
  try {
    execSync('npm install', { stdio: 'inherit', cwd: __dirname });
    console.log('✅ Dependências instaladas!');
  } catch (error) {
    console.error('❌ Erro ao instalar dependências:', error.message);
  }
} else {
  console.log('✅ Dependências já instaladas');
}

// Build do frontend
console.log('\n🔨 Buildando frontend...');
try {
  execSync('npm run build', { stdio: 'inherit', cwd: __dirname });
  console.log('✅ Frontend buildado com sucesso!');
} catch (error) {
  console.error('❌ Erro ao buildar frontend:', error.message);
  console.log('⚠️  Execute manualmente: npm run build');
}

console.log('\n✅ Configuração concluída!');
console.log('📝 Próximos passos:');
console.log('   1. Verifique o arquivo .env criado');
console.log('   2. Reinicie o servidor Node.js');
console.log('   3. Acesse: https://conselhosesotericos.com.br/api/health');

