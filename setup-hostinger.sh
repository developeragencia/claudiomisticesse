#!/bin/bash
# Script de configuração automática para Hostinger

echo "🚀 Configurando ambiente Hostinger..."

# Criar arquivo .env
cat > .env << EOF
# Configuração do Banco de Dados MySQL (Hostinger)
DB_HOST=localhost
DB_USER=u812652203_misticescoter1
DB_PASSWORD=Conselhos9500933
DB_NAME=u812652203_misticoesoteri

# Configuração do Servidor
NODE_ENV=production
PORT=5000

# JWT Secret
JWT_SECRET=$(openssl rand -base64 32)

# URL do Site
SITE_URL=https://conselhosesotericos.com.br
API_URL=https://conselhosesotericos.com.br

# Uploads
UPLOAD_DIR=./server/uploads
EOF

echo "✅ Arquivo .env criado!"

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Build do frontend
echo "🔨 Buildando frontend..."
npm run build

echo "✅ Configuração concluída!"
echo "📝 Reinicie o servidor Node.js para aplicar as mudanças"

