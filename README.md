# 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar, executar e gerar uma versão de instalação do projeto em sua máquina.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (inclui o NPM).
- **Android Studio** (com um emulador Android configurado).
- **Conta Expo** (necessária para utilizar os serviços EAS).

---

## 🛠️ Parte 1 — Executar o Projeto Localmente

### 1. Instalar as dependências

Abra o terminal na raiz do projeto e execute:

```bash
npm install
```

### 2. Preparar o ambiente Android

1. Abra o **Android Studio**.
2. Acesse o **Device Manager**.
3. Inicialize um emulador Android.

### 3. Iniciar o servidor de desenvolvimento

Com o emulador aberto, execute:

```bash
npx expo start
```

Após iniciar o Expo:

- Pressione `a` para abrir o aplicativo no emulador Android.
- Pressione `r` para recarregar o aplicativo.
- Pressione `Ctrl + C` para encerrar o servidor.

---

## 📦 Parte 2 — Configurar o EAS Build

O EAS Build é utilizado para gerar versões instaláveis do aplicativo para Android e iOS.

### 1. Instalar o EAS CLI

Instale a ferramenta globalmente:

```bash
npm install -g eas-cli
```

### 2. Verificar a configuração do projeto

Abra o arquivo `app.json` e verifique se existe a propriedade `projectId` dentro de `extra.eas`.

Exemplo:

```json
{
  "expo": {
    "name": "Qual é a Boa",
    "slug": "qual-e-a-boa-app"
  }
}
```

**Importante:** Se existir um `projectId` vinculado a outra conta Expo, não o apague automaticamente. Primeiro confirme se o projeto pertence a outra conta ou organização.

### 3. Fazer login no Expo

Execute:

```bash
npx eas-cli login
```

Para verificar qual conta está conectada:

```bash
npx eas-cli whoami
```

### 4. Inicializar o projeto EAS

Execute:

```bash
npx eas-cli init
```

Siga as instruções apresentadas no terminal para associar o aplicativo à sua conta Expo.

### 5. Configurar o Build

Execute:

```bash
npx eas-cli build:configure
```

Esse comando prepara os arquivos necessários para realizar as compilações.

---

## 🏗️ Parte 3 — Gerar o Aplicativo

Depois de concluir as configurações, escolha a plataforma desejada.

### Android

```bash
npx eas-cli build --platform android --profile preview
```

### iOS

```bash
npx eas-cli build --platform ios --profile preview
```

**Observação:** Para gerar o aplicativo para iOS, é necessário considerar os requisitos de desenvolvimento e assinatura da Apple.

### Acompanhar a compilação

Após executar o comando, o EAS apresentará um endereço para acompanhar o andamento da compilação.

Quando o processo terminar, será possível acessar o arquivo gerado e realizar o download.

---

## ⚠️ Observações Importantes

- Mantenha o arquivo `package-lock.json` atualizado e versionado no Git.
- Não exclua o `projectId` sem verificar a propriedade do projeto.
- Certifique-se de estar conectado à conta Expo correta.
- O perfil `preview` normalmente é utilizado para gerar versões de teste e distribuição interna.
- Caso ocorram erros durante a configuração ou compilação, verifique as mensagens apresentadas pelo EAS CLI.

---

<<<<<<< HEAD
**Projeto: Qual é a Boa?** 🚀
=======
**Projeto: Qual é a Boa?** 🚀
>>>>>>> a70c512638c990f54f7b678e148af1d46bd09757
