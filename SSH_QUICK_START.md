# 🚀 SSH Quick Start - Hostinger

## ✅ Configuração Completa

SSH foi configurado com sucesso!

## 🔧 Como Usar

### Conectar ao Servidor Hostinger

```powershell
ssh hostinger
```

Ou usando o comando completo:

```powershell
ssh -p 65002 u812652203@195.200.3.55
```

**Senha:** `Mistic2600@#`

### Credenciais

- **Host:** hostinger (alias configurado)
- **IP:** 195.200.3.55
- **Porta:** 65002
- **Usuário:** u812652203
- **Senha:** Mistic2600@# (definida no painel)

## 📝 Comandos Úteis

### Copiar Arquivos para o Servidor

```powershell
# Arquivo único
scp -P 65002 arquivo.txt u812652203@195.200.3.55:~/

# Pasta completa
scp -P 65002 -r pasta/ u812652203@195.200.3.55:~/
```

### Copiar do Servidor para Local

```powershell
scp -P 65002 u812652203@195.200.3.55:~/arquivo.txt ./
```

## ⚠️ Importante

1. **Primeiro habilite o SSH no painel da Hostinger** (botão "Habilitar")
2. O status no painel mostra "INACTIVE" - precisa ser habilitado primeiro
3. Após habilitar, a conexão funcionará

## 🔒 Configuração Adicional (Opcional)

Para usar chaves SSH em vez de senha:

```powershell
# Gerar chave SSH
ssh-keygen -t ed25519 -C "seu-email@exemplo.com"

# Copiar chave pública para servidor
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh -p 65002 u812652203@195.200.3.55 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

## 📚 Documentação Completa

Veja `CONFIGURACAO_SSH.md` para instruções detalhadas.

