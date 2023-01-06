<img src="web-app/src/assets/images/logo.svg" alt="Delivery App Logo" width="400">

<h2>
    O que é o Delivery App
    <img src="web-app/src/assets/icons/icon.svg" width="30"></img>?
</h2>

<i>
É uma aplicação criada para ser o projeto da disciplina Engenharia de Software e Sistemas (ESS-EC-2021.1) do CIn-UFPE. Essa aplicação consistem em uma simulação de um sistema de delivery de produtos e suas features principais são Manutenção de Cupons de Desconto, Manutenção de Métodos de Pagamento e Envio de Emails. 
</i>

## Demonstração

<div style="display:flex;">

<div style="margin-right:1rem;">

### Interação do cliente
![example](web-app/src/assets/examples/example1.gif)
</div>

<div>

### Interação do administrador/restaurante
![example](web-app/src/assets/examples/example2.gif)
</div>

</div>

### Dependências

- [Angular 7](https://angular.io/)
- [Node 14.20](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

### Instalando dependências 
```
sudo apt install npm
sudo npm install -g @angular/cli
```

### Modificando a versão do Node
```
sudo npm install -g n
sudo n 14.20
```

### Instalando os módulos de cada parte do projeto
Abra um terminal na pasta do projeto e depois:

Instale o Frontend
```
cd web-app
sudo npm install
```
Instale o Backend
```
cd ..
cd server
sudo npm install
```
### Rodando o projeto
Abra um terminal na pasta do projeto e, para iniciar o Backend, execute:
```
cd server
npm start
```
Para iniciar o Frontend, abra outro terminal e execute:
```
cd web-app/src
ng serve
```
Após isso, a aplicação estará em http://localhost:4200/home.


