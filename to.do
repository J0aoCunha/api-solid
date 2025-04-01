// To-Do List

## RFs

- [X] Deve ser possível se cadastrar;
- [X] Deve ser possível se autenticar;
- [X] Deve ser possível obter o perfil de um usuário logado;
- [X] Deve ser possível obter o numero de check-ins realizado pelo usuário logado;
- [X] Deve ser possível o usuário obter seu histórico de check-ins;
- [X] Deve ser passível o usuário buscar academias próximas;
- [X] Deve ser possível o usuário buscar academias pelo nome;
- [X] Deve ser possível validar o check-in de um usuário;
- [X] Deve ser possível o usuário realizar check-ins em uma academia;
- [X] Deve ser possível cadastrar uma academia;

## RN

- [X] Usuário nao deve poder se cadastrar com email duplicado;
- [X] Usuário nao pode fazer dois check-ins no mesmo dia;
- [X] Usuário nao pode fazer check-in se nao estiver a 100m da academia;
- [X] check-in so pode ser validado ate 20min apos criado;
- [ ] Check-in so pode ser validade por administradores;
- [ ] Academia so pode ser cadastrada por administradores

## RNFs

- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisão estar persistidos em um banco de dados postgreSQL;
- [ ] Todas as listas de dados precisam estar paginas com 20 itens por pagina;
- [ ] O usuário deve ser identificado por um JWT (Json Web Token);
