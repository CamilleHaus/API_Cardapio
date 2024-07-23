## Passo a passo em ordem de como estruturar o projeto

1. Criação do projeto e baixar dependencias necessárias
2. Instalar o prisma e criar os modelos inicias do projeto
3. Instanciar o express e configurar a PORT

- ERROS

4. Criar a instância geral de erros - **AppError**
5. Criar o middleware geral de erros da aplicação - **HandleErrors**

- SCHEMAS

7. Criar os schemas referentes aos models da aplicação

- CONFIG

8. Rodar o npx tsx --init para gerar o tsconfig e abilitar os decorators do tsyringe
9. Import o dotenv no app.ts
9. Instanciar o prisma

- SERVICES
10. Criar as respectivas variações de schemas e tipos necessários
11. Criar o serviço de **Restaurant**

12. Criar as respectivas variações de schemas e tipos necessários
13. Criar o serviço de **Recipes**

14. Criar as respectivas variações de schemas e tipos necessários
15. Criar o serviço de **Category**


-  CONTROLLERS 

16. Criar os controllers referentes a cada serviço

- ROUTES 

17. Criar as rotas referentes a cada serviço
18. Instanciar o app.ts

- MIDDLEWARES 

19. Criar o middleware de verificação de TOKEN
20. Criar o middlware de validação de corpo
21. Instanciá-los nas rotas necessárias

22. Criar os middlewares de verificação de ID's conforme necessário nas rotas 
23. Instanciá-los nas rotas necessárias, levando em consideração a ordem de instanciamento dos middlewares, pois pode importar!

- TESTES CONFIG

24. Instalar as dependências necessárias
25. Dependências de Desenvolvimento: npm install -D jest jest-mock-extended supertest ts-jest
26. Instalar seus pacotes de tipos: npm install -D @types/jest @types/supertest 

27. Criar um Banco de Dados para os testes
 - Criar seus respectivos .envs

28. Criar os arquivos de configurações do **JEST**
 - jest.config.unit.ts -> Testes Unitários
 - jest.config.integration.ts -> Testes de Integração

29. Atualizar os scripts
30. Rodar a migração de testes

- TESTES

31. Criar a pasta teste e utils, com o arquivo de clearDatabase.ts para limpar os testes de integração
32. Como iremos utilizar injeção de dependências nos testes, criar um arquivo para importar o reflect-metadata
33. Instanciar o supertest
34. Colocar as configurações de **setUpFilesAfterEnv** nos seus respectivos arquivos

35. __mocks__ -> Criar o arquivo que mocará o prisma nos testes de integração
 - Colocar as configurações de **setUpFilesAfterEnv**

- TESTES UNITÁRIOS

36. Criar a pastinha units







