# 🚀 Instruções Finais - Configuração Automática

## ✅ Scripts Criados

Foram criados 2 scripts para configuração automática:

### 1. **setup-hostinger.js** (Node.js - Recomendado)
Execute no Hostinger:
```bash
node setup-hostinger.js
```

Este script:
- ✅ Cria o arquivo `.env` automaticamente com todas as credenciais
- ✅ Gera JWT Secret aleatório e seguro
- ✅ Cria diretório de uploads se não existir
- ✅ Instala dependências se necessário
- ✅ Builda o frontend automaticamente

### 2. **setup-hostinger.sh** (Bash)
Execute no Hostinger:
```bash
chmod +x setup-hostinger.sh
./setup-hostinger.sh
```

## 📋 Passo a Passo no Hostinger

### Opção 1: Via SSH (Recomendado)

1. **Conecte via SSH ao Hostinger**
   ```bash
   ssh usuario@hostinger.com
   ```

2. **Navegue até a pasta do projeto**
   ```bash
   cd ~/domains/conselhosesotericos.com.br/public_html
   # ou
   cd ~/public_html
   ```

3. **Execute o script de configuração**
   ```bash
   node setup-hostinger.js
   ```

4. **Ou execute manualmente via npm**
   ```bash
   npm run setup
   ```

5. **Verifique se tudo funcionou**
   ```bash
   cat .env
   ls -la client/dist
   ```

6. **Reinicie o servidor Node.js**

### Opção 2: Via Git (Se configurado)

1. **Faça pull do repositório**
   ```bash
   git pull origin main
   ```

2. **Execute o script**
   ```bash
   node setup-hostinger.js
   ```

3. **Reinicie o servidor**

## 🔍 Verificação

### 1. Verificar Health Check
Acesse: `https://conselhosesotericos.com.br/api/health`

Deve retornar:
```json
{
  "status": "ok",
  "database": "mysql_connected",
  "timestamp": "...",
  "uptime": ...
}
```

### 2. Verificar API
Acesse: `https://conselhosesotericos.com.br/api/test`

Deve retornar:
```json
{
  "status": "ok",
  "message": "API funcionando",
  "timestamp": "...",
  "node_env": "production",
  "port": 5000
}
```

### 3. Verificar Site
Acesse: `https://conselhosesotericos.com.br`

Deve carregar o site normalmente.

## 🐛 Troubleshooting

### Erro 503 ainda aparece?
1. Verifique se o Node.js está rodando
2. Verifique os logs do servidor
3. Verifique se o arquivo `.env` existe
4. Verifique conexão com banco de dados

### Frontend não carrega?
1. Verifique se `client/dist` existe
2. Execute: `npm run build`
3. Verifique permissões dos arquivos

### Banco de dados não conecta?
1. Verifique credenciais no `.env`
2. Verifique se o banco existe no Hostinger
3. Verifique logs do servidor

## ✅ Checklist Final

- [x] Script de configuração criado
- [x] Arquivo .env será criado automaticamente
- [x] Frontend será buildado automaticamente
- [x] Health check melhorado
- [x] Logs melhorados
- [x] Tratamento de erros melhorado
- [ ] Script executado no Hostinger
- [ ] Servidor reiniciado
- [ ] Site funcionando

## 📝 Notas Importantes

1. **Arquivo .env**: O script cria automaticamente, mas está no `.gitignore` (não será commitado)

2. **JWT Secret**: É gerado automaticamente de forma segura

3. **Build**: O script builda o frontend automaticamente

4. **Dependências**: São instaladas automaticamente se necessário

5. **Porta**: Certifique-se de que a porta 5000 está configurada no Hostinger

## 🎯 Próximos Passos

1. Execute `node setup-hostinger.js` no Hostinger
2. Reinicie o servidor Node.js
3. Teste o site: `https://conselhosesotericos.com.br`
4. Teste a API: `https://conselhosesotericos.com.br/api/health`

---

**Tudo está pronto! Execute o script e o site funcionará!** 🚀
