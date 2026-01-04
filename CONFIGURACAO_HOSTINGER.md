# 🚀 Configuração Completa para Hostinger

## ✅ Configurações Aplicadas

### 1. **Banco de Dados MySQL**
- ✅ Database: `u812652203_misticoesoteri`
- ✅ Username: `u812652203_misticescoter1`
- ✅ Password: `Conselhos9500933`
- ✅ Host: `localhost`
- ✅ Configurado em `.env`

### 2. **Domínio**
- ✅ Domínio principal: `https://conselhosesotericos.com.br`
- ✅ Configurado no `.env` como `SITE_URL` e `API_URL`
- ✅ CORS configurado para o domínio

### 3. **Servidor**
- ✅ Porta: `5000`
- ✅ Trust proxy habilitado (para Hostinger)
- ✅ Listen em `0.0.0.0` (aceita conexões externas)
- ✅ Logs melhorados

### 4. **Frontend**
- ✅ API base URL configurada para produção
- ✅ Usa domínio correto quando em produção

## 📝 Arquivo `.env` Necessário

Crie o arquivo `.env` na raiz do projeto no Hostinger com o seguinte conteúdo:

```
DB_HOST=localhost
DB_USER=u812652203_misticescoter1
DB_PASSWORD=Conselhos9500933
DB_NAME=u812652203_misticoesoteri
NODE_ENV=production
PORT=5000
JWT_SECRET=seu_jwt_secret_muito_seguro_aqui_altere_em_producao
SITE_URL=https://conselhosesotericos.com.br
API_URL=https://conselhosesotericos.com.br
UPLOAD_DIR=./server/uploads
```

**NÃO** faça commit do arquivo `.env` (já está no .gitignore). Use o `.env.example` como referência.

## 🔧 Para Aplicar no Hostinger

### Opção 1: Via SSH
1. Conecte via SSH ao Hostinger
2. Navegue até a pasta do projeto
3. Crie o arquivo `.env` com as credenciais
4. Execute `npm install` se necessário
5. Execute `npm run build`
6. Reinicie o servidor

### Opção 2: Via hPanel
1. Acesse o File Manager no hPanel
2. Navegue até a pasta do projeto
3. Crie o arquivo `.env` com o conteúdo fornecido
4. Execute o build via terminal SSH

## 🐛 Correção do Erro 503

O erro 503 geralmente indica:
- ✅ Servidor não iniciou corretamente
- ✅ Banco de dados não conecta
- ✅ Frontend não foi buildado

### Soluções Aplicadas:
1. ✅ Health check melhorado
2. ✅ Tratamento de erros na inicialização do banco
3. ✅ Logs mais detalhados
4. ✅ Verificação de conexão MySQL

## ✅ Próximos Passos

1. **No Hostinger:**
   - Certifique-se de que o arquivo `.env` existe com as credenciais
   - Execute `npm run build` para buildar o frontend
   - Reinicie o servidor Node.js

2. **Verificar:**
   - Acesse `https://conselhosesotericos.com.br/api/health`
   - Deve retornar: `{"status":"ok","database":"mysql_connected",...}`
   - Se retornar erro, verifique os logs do servidor

3. **Se ainda der erro 503:**
   - Verifique logs do servidor no Hostinger
   - Verifique se o Node.js está rodando
   - Verifique se a porta 5000 está configurada corretamente
   - Verifique conexão com o banco de dados

## 📋 Checklist

- [x] Credenciais do banco configuradas
- [x] Domínio configurado
- [x] CORS configurado
- [x] Health check melhorado
- [x] Logs melhorados
- [x] Frontend API URL configurada
- [ ] Arquivo `.env` criado no Hostinger (fazer manualmente)
- [ ] Build executado no Hostinger
- [ ] Servidor reiniciado no Hostinger

