/**
 * Adaptador de banco de dados
 * Permite que as rotas usem a mesma interface (callbacks) 
 * mas funcionam com SQLite (dev) ou MySQL (produção)
 */

let db;
const useMySQL = process.env.NODE_ENV === 'production' || process.env.DB_HOST;

if (useMySQL) {
  // Usar MySQL com interface de callbacks
  const mysqlDb = require('./database-mysql');
  
  db = {
    get: (sql, params, callback) => {
      mysqlDb.query(sql, params || [])
        .then(results => {
          const result = Array.isArray(results) && results.length > 0 ? results[0] : null;
          if (callback) callback(null, result);
        })
        .catch(error => {
          if (callback) callback(error, null);
        });
    },
    
    all: (sql, params, callback) => {
      mysqlDb.query(sql, params || [])
        .then(results => {
          if (callback) callback(null, results);
        })
        .catch(error => {
          if (callback) callback(error, null);
        });
    },
    
    run: (sql, params, callback) => {
      mysqlDb.query(sql, params || [])
        .then(results => {
          const result = {
            lastID: results.insertId || null,
            changes: results.affectedRows || 0
          };
          if (callback && typeof callback === 'function') {
            // Chamar callback com contexto correto (this.lastID)
            callback.call(result, null);
          }
        })
        .catch(error => {
          console.error('Erro no database-adapter.run:', error);
          if (callback && typeof callback === 'function') {
            const errorResult = { lastID: null, changes: 0 };
            callback.call(errorResult, error);
          }
        });
      // Retornar objeto com lastID e changes para compatibilidade
      return {
        lastID: null,
        changes: 0
      };
    },
    
    serialize: (callback) => {
      // MySQL não precisa de serialize, mas mantemos para compatibilidade
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
    
    prepare: (sql) => {
      // Para MySQL, retornamos um objeto que simula prepare
      return {
        run: (params, callback) => {
          mysqlDb.query(sql, params || [])
            .then(results => {
              if (callback && typeof callback === 'function') {
                callback.call({ lastID: results.insertId || null, changes: results.affectedRows || 0 }, null);
              }
            })
            .catch(error => {
              if (callback && typeof callback === 'function') {
                callback.call({ lastID: null, changes: 0 }, error);
              }
            });
        },
        finalize: () => {
          // Não precisa fazer nada no MySQL
        }
      };
    }
  };
  
  console.log('🔵 Database adapter: MySQL (produção)');
} else {
  // Usar SQLite (desenvolvimento)
  db = require('./database');
  console.log('🟢 Database adapter: SQLite (desenvolvimento)');
}

module.exports = db;

