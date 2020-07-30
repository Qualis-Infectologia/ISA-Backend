# Docker
Antes de iniciar a instalação do projeto, é necessário que você tenha instalado em sua maquina o docker.
https://www.docker.com/

# Network
Caso a rede isa-net não exista ela deve ser criada.
```
docker network create isa-net
```
# Dependências
para instalação do projeto, é necessário que tenha em sua maquina o NodeJs, caso não tenha, execute o comando em um terminal(ubuntu):
```
sudo apt install nodejs
```
em seguida, instale o pacote npm com o comando:
```
sudo apt install npm
```
após a instalaçao das dependencias nodeJS, na pasta raiz do projeto ISA-Backend, execute o comando em um terminal:
```
npm install
```
em seguida execute o comando:
```
npm run production
```
*obs: caso não tenha instalado em sua maquina o pacote **'yarn'**, execute em seu terminal o comando:
```
npm install -g yarn
```
em seguida em um terminal na pasta raiz do projeto:
```
yarn
```

# construindo e rodando containers
A inicialização do projeto pode ser feita de dois modos, utilizando containers prontos e disponibilizados pelo projeto
ou realizando a sua construção localmente, portanto os dois modos serão apresentados para todos os recursos.

## mongodb
O banco de dados mongodb é utilizado para armazenamento de logs e gestão da fila de processos.

### Construção local da imagem
```
docker build --target mongodb -t mongodb .
```
### Uso de imagem disponibilizada
UNDER CONSTRUCTION

### Inicialização do container
```
docker run --network isa-net -d -p 27017:27017 --name mongodb mongodb
```

## postgres
O armazenamento principal dos dados é feito nesta base, também é utilizada pelo serviço keycloak para gerenciamento de
usuários.

### construção local da imagem
```
docker build --target postgres -t postgres .
```
### uso de imagem disponibilizada
UNDER CONSTRUCTION

### Inicialização do container
```
docker run \
       --network isa-net \
       -d -p 5432:5432 \
        --name postgres \
          postgres
```


## KEYCLOAK
Keycloak é o serviço utilizado para autenticação e gestão de usuários. Ele pode ser integrado de forma dedicada, como
é apresentado neste tutorial, ou compartilhado com outros projetos.

### Inicialização do container
Por padrão o container não utiliza configuração previamente estabelecida, porém em anexo são fornecidas
configurações previamente desenvolvidas.

Está disponivel o modelo no diretório infra/keycloak:
- isa-qualis-realm

A escolha entre eles é feita importando o respectivo arquivo após a inicialização do container.

Para inicializar o container primeiramente realize o build da imagem:

```
docker build --target keycloak -t keycloak .
```

A inicialização deve ser feita utilizando o comando abaixo:

```
docker run \
    --network isa-net \
    -d -p 8080:8080 \
    --name keycloak \
    keycloak
```
Caso o desejado seja uma versão sem alterações prévias utilize o comando abaixo:

```
docker run \
    --network isa-net \
    -d -p 8080:8080 \
    -e JAVA_OPTS="-Dkeycloak.profile.feature.upload_scripts=enabled" \
    -e DB_VENDOR=postgres \
    -e DB_ADDR="postgres" \
    -e DB_PASSWORD="postgres" \
    -e DB_USER="postgres" \
    -e KEYCLOAK_USER=admin \
    -e KEYCLOAK_PASSWORD=admin \
    --name keycloak jboss/keycloak
```


> Ao realizar a primeira construção do container, conforme indicado acima, o usuário padrão será criado e o schema da
> base de dados, portanto portanto indicamos que após a primeira inicialização do container seja destruido e
> inicializado sem as variáveis KEYCLOAK_USER e KEYCLOAK_PASSWORD pois assim ele não irá tentar novamente a criação da
> estrutura o que causaria erro ao subir o container.

## Importação REALM
- Acesse o painel do keycloak (http://localhost:8080/) e utilize o login padrão, caso não tenha sido alterado (admin, admin).
- Após clique em realm e utilize em seguida criar. Selecione o arquivo isa-qualis-realm e clique em criar.
- Após va em clients, e clique em isa-frontend,
- nos campos Root Url, Base URL, Admin URL e Web Origins, coloque a url base do frontend, ex.: http://localhost
- Valid Redirect URIs, coloque a url base do frontend seguido de um asterísco, ex.: http://localhost/*

## CRIAÇÃO DE USUÁRIO ADMINISTRADOR NO REALM
após a importação do realm, é necessário a criação de um usuário com as permissões de admin, o usuário deve ter os mesmos valores
das variáveis **'KEYCLOAK_ADMIN_USER'** e **'KEYCLOAK_ADMIN_PASSWORD'** passadas ao subir o container da api isa.

- após a importação do realm, acesse a aba **'users'**.
- clique em **'add user'**
- digite um nome de usuário no campo **'username'**. obs.: caso o container do keycloak for iniciado depois do container da api isa,
o nome de usuário deve ser o mesmo nome do campo 'KEYCLOAK_ADMIN_USER' da api isa.
- clique em **save**.
- dentro do usuário criado, va até a aba **'Credentials'**.
- digite uma senha. obs.: caso o container do keycloak for iniciado depois do container da api isa, a senha de usuário deve ser a mesma senha
do campo **'KEYCLOAK_ADMIN_PASSWORD'** da api isa
- clique em **Set Password** para salvar a senha
- va até a aba **'Role Mapping'**
- em **'Available roles'**, escolha **admin** e clique em **'Add selected'**
- va até a aba **details**, e no campo **'Required User Actions'**, remova **'Update Password'** e clique em **'save'**

### Teste de acesso
Gerar token para cliente frontend:
```
 http://localhost:8080/auth/realms/isa-qualis/protocol/openid-connect/token
 username : XXXXX
 password : XXXXX
 cliente_id : isa-frontend
 grant_type:password
```

Gerar token para cliente backend:
```
http://localhost:8080/auth/realms/isa-qualis/protocol/openid-connect/token
client_secret : XXXX
client_id : isa-backend
grant_type:client_credentials
```

Consultar API keycloak utilizando cliente backend:
```
URL http://localhost:8080/auth/admin/realms/isa-qualis/users
Headers: Authorization Bearer <TOKEN>
```

## API
O serviço de api é responsavel pela implementação da regras de negócios e entrega de dados ao frontend.
execute o comando:
```
docker build --target isa-api -t isa-api .
```
### Uso de imagem disponibilizada
UNDER CONSTRUCTION

### Inicialização do container

```
docker run \
    --network isa-net -d \
    -p 3333:3333 \
    -e PORT=3333 \
    -e KEYCLOAK_SERVER_URL="http://$(hostname -I | awk '{print $1}'):8080/auth" \
    -e KEYCLOAK_REALM="isa-qualis" \
    -e KEYCLOAK_CLIENT="isa-backend" \
    -e KEYCLOAK_ADMIN_USER="admin" \
    -e KEYCLOAK_ADMIN_PASSWORD="admin" \
    --name isa-api \
    isa-api
```

as variáveis KEYCLOAK_ADMIN_USER e KEYCLOAK_ADMIN_PASSWORD são referentes ao usuário descrito nas instruções de
CRIAÇÃO DE USUÁRIO ADMINISTRADOR na sessão KEYCLOAK acima:
