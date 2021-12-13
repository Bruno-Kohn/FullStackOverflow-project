# FullStackOverflow-API

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

## Descrição

Já ficou com alguma dúvida ou curioso sobre algum tipo de assunto específico? Foi para isso que construímos esta API.

FullStackOverflow é uma API as pessoas podem publicar e responder perguntas livremente.

A API possui as seguintes rotas:

<details>
    <summary><strong>POST</strong>  /questions</summary>
    
* Adiciona uma nova rpergunta
    
    ```json
      {
	      "question": "Uki ta contecendo?",
	      "student": "Zoru",
	      "class": "T3",
	      "tags": "typescript, vida, javascript, java?"
      }
    ```
    
   O retorno deve ser um id da pergunta cadastrada

```json
      {
         "id": 123456
      }
```
      
</details> 

<details>
    <summary><strong>GET</strong>  /questions/:id</summary>
    
Existem duas respostas possíveis, pergunta não respondida.
```json
{
	"question": "Uki ta contecendo?",
	"student": "Zoru",
	"class": "T3",
	"tags": "typescript, vida, javascript, java?"
	"answered": false,
	"submitAt": "2021-01-01 10:12"
}
```

E pergunta respondida.

```json
{
	"question": "Uki ta contecendo?",
	"student": "Zoru",
	"class": "T3",
	"tags": "typescript, vida, javascript, java?"
	"answered": true,
	"submitAt": "2021-01-01 10:12"
	"answeredAt": "2021-01-01 10:30"
	"answeredBy": "Vegeta",
	"answer": "É mais de 8 miiiil!" 
}
```
</details> 

<details>
    <summary><strong>POST</strong> /questions/:id</summary>
    
Essa rota é usada para responder perguntas com base no id da pergunta e ela deve capturar um **Bearer token** que será usado para identificar quem respondeu a pergunta.

```json
{
	"answer": "É mais de 8 miiiil!" 
}
```
</details>

<details>
    <summary><strong>GET</strong> /questions</summary>

Essa rota deve retornar apenas as perguntas não respondidas

```json
[
	{
		"id": 123243,
		"question": "Uki ta contecendo?", 
		"student": "Zoru", 
		"class": "T3",
		"submitAt": "2021-01-01 10:12"
	}
]
```
</details>


<details>
    <summary><strong>POST</strong> /users</summary>
    
Essa rota é usada para cadastrar uma pessoa e deve retornar um token que será usado para responder perguntas

```json
{
	"name": "Vegata",
	"class": "T3" 
}
```

```json
{
	"token": "1234-5678"
}
```
</details>

## Como rodar o projeto?

Rode localmente seguindo os passos abaixo:

1. Clone este repositorio
2. Instale as dependencias
```bash
npm i
```
3. Abra um arquivo "database_backup.sql", copie e cole o script para criar seu banco de dados no postgres;

4. Crie um arquivo '.env.dev' seguindo o arquivo '.env.example';

5.Rode o backend 
```bash
npm run start:dev
```

