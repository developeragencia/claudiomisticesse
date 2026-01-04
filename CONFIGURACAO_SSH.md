# 🔐 Configuração SSH - Hostinger

## 📋 Credenciais SSH da Hostinger

Com base no painel da Hostinger:

- **Host/IP:** 195.200.3.55
- **Porta:** 65002
- **Usuário:** u812652203
- **Senha:** Mistic2600@#

## 🔧 Configuração no Windows

### 1. Verificar se SSH está instalado

```powershell
ssh -V
```

Se não estiver instalado, o SSH geralmente vem com Windows 10/11. Se necessário, habilite em:
- Configurações → Apps → Recursos Opcionais → Cliente OpenSSH

### 2. Testar Conexão SSH

```powershell
ssh -p 65002 u812652203@195.200.3.55
```

Você será solicitado a digitar a senha: `Mistic2600@#`

### 3. Criar Arquivo de Configuração SSH (Opcional)

Crie arquivo: `C:\Users\SeuUsuario\.ssh\config`

```
Host hostinger
    HostName 195.200.3.55
    Port 65002
    User u812652203
```

Depois você pode conectar apenas com:
```powershell
ssh hostinger
```

### 4. Configurar Chave SSH (Recomendado)

Para evitar digitar senha toda vez:

```powershell
# Gerar chave SSH (se ainda não tiver)
ssh-keygen -t ed25519 -C "seu-email@exemplo.com"

# Copiar chave pública para o servidor
ssh-copy-id -p 65002 u812652203@195.200.3.55
```

Ou manualmente:
```powershell
# Exibir chave pública
cat $env:USERPROFILE\.ssh\id_ed25519.pub

# Conectar ao servidor e adicionar a chave
ssh -p 65002 u812652203@195.200.3.55
# Dentro do servidor, adicionar a chave em ~/.ssh/authorized_keys
```

## 🌐 Para GitHub (já configurado para claudiomisticesse)

O repositório já está configurado para usar HTTPS:
```
https://github.com/developeragencia/claudiomisticesse.git
```

Se quiser usar SSH para GitHub também:

```powershell
# Gerar chave SSH para GitHub (se ainda não tiver)
ssh-keygen -t ed25519 -C "github-email@exemplo.com" -f $env:USERPROFILE\.ssh\id_ed25519_github

# Adicionar ao ssh-agent
Start-Service ssh-agent
ssh-add $env:USERPROFILE\.ssh\id_ed25519_github

# Copiar chave pública
cat $env:USERPROFILE\.ssh\id_ed25519_github.pub
# Adicionar em: https://github.com/settings/ssh/new

# Alterar remote para SSH
git remote set-url origin git@github.com:developeragencia/claudiomisticesse.git
```

## ⚠️ Importante

1. **Primeiro, habilite o SSH no painel da Hostinger** (botão "Habilitar")
2. A senha SSH é diferente da senha do painel
3. Mantenha as credenciais seguras
4. Prefira usar chaves SSH em vez de senha

## 📝 Comandos Úteis

```powershell
# Conectar ao servidor
ssh -p 65002 u812652203@195.200.3.55

# Copiar arquivo para servidor
scp -P 65002 arquivo.txt u812652203@195.200.3.55:~/

# Copiar pasta para servidor
scp -P 65002 -r pasta/ u812652203@195.200.3.55:~/

# Copiar do servidor para local
scp -P 65002 u812652203@195.200.3.55:~/arquivo.txt ./
```

## 🔒 Segurança

- Não compartilhe suas credenciais SSH
- Use chaves SSH quando possível
- Mantenha o servidor atualizado
- Use senhas fortes
