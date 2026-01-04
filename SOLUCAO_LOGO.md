# ✅ Solução: Logo não aparece no site

## 🔍 Problema Identificado

A logo foi adicionada em `client/public/logo.png` no servidor Hostinger, mas não aparece no site.

## 💡 Causa

No Vite, os arquivos da pasta `client/public/` são copiados para `client/dist/` durante o **build**. 

O servidor Express serve arquivos estáticos de `client/dist/`, então a logo precisa estar em:
- ✅ `client/dist/logo.png` (onde o servidor busca)
- ❌ `client/public/logo.png` (onde foi adicionada)

## 🛠️ Solução

### Opção 1: Copiar logo para dist/ (Rápida)
No file manager da Hostinger:
1. Vá para `client/public/logo.png`
2. Copie o arquivo
3. Cole em `client/dist/logo.png`

### Opção 2: Fazer build (Recomendada)
No servidor, execute:
```bash
cd client
npm install
npm run build
```

Isso copiará automaticamente `logo.png` de `public/` para `dist/`.

## ✅ Após a correção

A logo estará acessível via: `https://seudominio.com/logo.png`

## 📝 Nota

O código está correto. Apenas precisa garantir que `logo.png` esteja em `client/dist/` no servidor.

