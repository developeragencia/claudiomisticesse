# 📍 ONDE COLOCAR A LOGO PNG OU SVG

## ✅ PASTA CORRETA

**Coloque a logo em:**
```
client/public/logo.png
```
**OU**
```
client/public/logo.svg
```

## 📋 Explicação

### 1. **Pasta de Origem (onde você COLOCA):**
- `client/public/logo.png` ✅
- `client/public/logo.svg` ✅

### 2. **Pasta de Destino (após build, onde o servidor busca):**
- `client/dist/logo.png` (criada automaticamente após build)
- `client/dist/logo.svg` (criada automaticamente após build)

## 🔄 Como Funciona

1. Você coloca a logo em `client/public/`
2. Quando executa `npm run build`, o Vite copia os arquivos de `public/` para `dist/`
3. O servidor Express serve arquivos de `client/dist/`
4. O navegador acessa via `/logo.png` ou `/logo.svg`

## 🚀 Em Produção (Hostinger)

**No file manager da Hostinger, coloque a logo em:**
```
public_html/client/public/logo.png
```
**OU**
```
public_html/client/public/logo.svg
```

**Depois, execute o build (ou copie manualmente para dist):**
- A logo será copiada para `public_html/client/dist/logo.png`
- O servidor servirá de lá

## ✅ Resumo

**PASTA PARA COLOCAR A LOGO: `client/public/`**

