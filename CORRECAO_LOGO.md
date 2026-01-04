# 🔧 Correção: Logo não aparece no site

## Problema
A logo.png foi adicionada em `client/public/logo.png`, mas não aparece no site.

## Solução

A logo deve estar acessível via `/logo.png` no site. Em produção (Hostinger), os arquivos da pasta `client/public/` são copiados para `client/dist/` durante o build.

### Verificações necessárias:

1. **Fazer build do frontend:**
   ```bash
   cd client
   npm install
   npm run build
   ```
   
   Isso copiará `logo.png` de `client/public/` para `client/dist/logo.png`

2. **Verificar se logo.png está em client/dist/** após o build

3. **No servidor (Hostinger), verificar:**
   - Se `client/dist/logo.png` existe
   - Se o servidor está servindo arquivos estáticos corretamente

## Caminho da Logo

No código React, a logo é referenciada como:
```jsx
<img src="/logo.png" alt="Conselhos Esotéricos" className="logo-img" />
```

Isso significa que o navegador buscará `https://seudominio.com/logo.png`

## Em Produção (Hostinger)

O servidor Express serve arquivos estáticos de `client/dist/`:
- Arquivo deve estar em: `client/dist/logo.png`
- Acessível via: `https://seudominio.com/logo.png`

