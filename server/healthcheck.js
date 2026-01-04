/**
 * Health check mais robusto
 * Verifica banco de dados e status do servidor
 */

const db = require('./database-adapter');
const mysqlDb = require('./database-mysql');

async function healthCheck() {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: 'unknown',
    uptime: process.uptime()
  };

  try {
    // Verificar conexão MySQL
    if (process.env.NODE_ENV === 'production' || process.env.DB_HOST) {
      const result = await mysqlDb.query('SELECT 1 as test');
      if (result && result.length > 0) {
        health.database = 'mysql_connected';
      } else {
        health.database = 'mysql_error';
        health.status = 'error';
      }
    } else {
      // SQLite - usar callback com Promise
      return new Promise((resolve) => {
        db.get('SELECT 1 as test', [], (err) => {
          if (err) {
            health.database = 'sqlite_error';
            health.status = 'error';
            health.error = err.message;
          } else {
            health.database = 'sqlite_connected';
          }
          resolve(health);
        });
      });
    }
  } catch (error) {
    health.database = 'error';
    health.status = 'error';
    health.error = error.message;
  }

  return health;
}

module.exports = healthCheck;

