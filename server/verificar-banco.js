/**
 * Script para verificar e corrigir o banco de dados MySQL
 * Execute: node server/verificar-banco.js
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'conselhos_esotericos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

async function verificarBanco() {
  let connection;
  
  try {
    console.log('🔍 Conectando ao banco de dados...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conectado ao MySQL!');
    
    // Verificar se o banco existe
    const [databases] = await connection.execute('SHOW DATABASES LIKE ?', [dbConfig.database]);
    if (databases.length === 0) {
      console.log(`📦 Criando banco de dados ${dbConfig.database}...`);
      await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
      await connection.execute(`USE ${dbConfig.database}`);
      console.log('✅ Banco de dados criado!');
    } else {
      await connection.execute(`USE ${dbConfig.database}`);
      console.log('✅ Banco de dados existe!');
    }
    
    // Verificar tabelas
    console.log('\n🔍 Verificando tabelas...');
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`✅ Tabelas encontradas: ${tables.length}`);
    
    tables.forEach(table => {
      const tableName = Object.values(table)[0];
      console.log(`  - ${tableName}`);
    });
    
    // Verificar tabela users
    if (tables.some(t => Object.values(t)[0] === 'users')) {
      console.log('\n✅ Tabela users existe!');
      const [users] = await connection.execute('SELECT COUNT(*) as total FROM users');
      console.log(`   Total de usuários: ${users[0].total}`);
    } else {
      console.log('\n❌ Tabela users NÃO existe!');
      console.log('   Execute o initDatabase() para criar.');
    }
    
    // Testar inserção
    console.log('\n🧪 Testando inserção...');
    const testEmail = 'teste_' + Date.now() + '@teste.com';
    const testCPF = '99999999999';
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('teste123', 10);
    
    try {
      const [result] = await connection.execute(
        'INSERT INTO users (nome_completo, cpf, email, senha, tipo) VALUES (?, ?, ?, ?, ?)',
        ['Teste', testCPF, testEmail, hashedPassword, 'cliente']
      );
      console.log('✅ Inserção de teste funcionou! ID:', result.insertId);
      
      // Limpar teste
      await connection.execute('DELETE FROM users WHERE email = ?', [testEmail]);
      console.log('✅ Teste removido');
    } catch (error) {
      console.error('❌ Erro na inserção de teste:', error.message);
      console.error('   Código:', error.code);
    }
    
    console.log('\n✅ Verificação concluída!');
    
  } catch (error) {
    console.error('\n❌ ERRO:', error.message);
    console.error('   Código:', error.code);
    console.error('\n📝 Verifique:');
    console.error('   1. Variáveis de ambiente (.env)');
    console.error('   2. Credenciais do MySQL');
    console.error('   3. Conexão com o servidor MySQL');
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Conexão fechada');
    }
  }
}

verificarBanco();

