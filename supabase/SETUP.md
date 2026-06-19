# Configuração do Supabase para Box2Home

## 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique "New Project"
3. Escolha:
   - Nome: `rota-certa`
   - Senha do DB: **GUARDE ESSA SENHA!**
   - Região: `South America (São Paulo)` ou mais próxima
4. Aguarde a criação (2-3 minutos)

## 2. Executar o Schema

1. No painel, vá em **SQL Editor**
2. Clique **New Query**
3. Cole TODO o conteúdo do arquivo `schema.sql`
4. Clique **Run** (Ctrl/Cmd + Enter)
5. Verifique se não há erros (tudo deve dar "Success")

## 3. Configurar Autenticação

1. Vá em **Authentication → Settings**
2. Em **Email Auth**:
   - ✅ Enable email provider
   - ❌ Confirm email (desabilita confirmação por email)
   - ❌ Secure email change
3. Em **User Sign Ups**:
   - ✅ Allow new users to sign up
4. Salve as configurações

## 4. Criar Usuários de Teste

### Opção A: Pelo Painel (Recomendado para teste)
1. Vá em **Authentication → Users**
2. Clique **Add User**
3. Crie os usuários:

**Gestor:**
Email: gestor@box2home.com
Password: 123456

**Motorista:**
Email: motorista@box2home.com
Password: 123456


4. Após criar, vá em **SQL Editor** e execute:
```sql
UPDATE profiles 
SET name = 'Carlos Gestor', role = 'gestor', phone = '(11) 99999-0001'
WHERE id = '[ID_DO_GESTOR]';

UPDATE profiles 
SET name = 'João Motorista', role = 'motorista', phone = '(11) 99999-0002'
WHERE id = '[ID_DO_MOTORISTA]';

(Substitua os IDs pelos que aparecem na tabela auth.users)