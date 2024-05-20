# Gerador de Corridas

## Descrição

Esta aplicação permite criar e cancelar corridas para usuários. As corridas são armazenadas em um banco de dados SQLite em memória, o que facilita o desenvolvimento e os testes.

## Justificativa para o uso de frameworks

Utilizei Node.js com Express pela sua simplicidade e eficiência na criação de APIs. SQLite foi escolhido por ser leve e por não necessitar de uma instalação separada de um servidor de banco de dados, ideal para o escopo deste desafio.

## Decisões Técnicas e Arquiteturais

- **Node.js com Express**: Framework minimalista e eficiente para construção de APIs.
- **SQLite**: Banco de dados leve que funciona em memória, sem necessidade de servidor.
- **Arquitetura MVC**: Separação clara das responsabilidades para manutenção e escalabilidade.
- **Testes**: Utilização de Jest e Supertest para garantir a integridade do código.

## Instruções para Compilar e Executar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Pedros-Morais/v-detaxi-backend.git
   cd gerador-de-corridas
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Execute a aplicação:**
   ```bash
   npm start
   ```
1. **Executar os testes:**
   ```bash
   npm test
   ```
 ## EndPoints

 ### Criar Corrida

 - **URL: /api/corrida**
 - **METHOD: POST**
 - **Body** 
 ```json
 {
  "usuario_id": 1,
  "origem": "A",
  "destino": "B"
}
```
sucess
```json
{
  "id": 1
}
```
### Cancelar Corrida

 - **URL: /api/corrida/:id/cancelar**
 - **METHOD: PATCH**
 - **Parâmetros da URL:** id: O ID da corrida a ser cancelada.
 - **Sucess** 
 ```json
 {
  "message": "Ride canceled"
}
```



 