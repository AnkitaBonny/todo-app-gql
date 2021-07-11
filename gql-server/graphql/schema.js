const { buildSchema } = require("graphql");

module.exports =  buildSchema(`
  type Todo {
    id: ID!
    summary: String!
    created_at: String!
    last_updated: String!
  }

  type RootQuery {
    todos: [Todo!]!
  }

  input TodoInputData {
    summary: String!
  }

  input UpdateTodoInputData {
    id: ID!
    summary: String!
  }

  type RootMutation {
    addTodo(summary: String!): Todo!
    updateTodo(id: ID!, summary: String!): Todo!
    deleteTodo(id: ID!): Todo!
  }

  schema {
    mutation: RootMutation
    query: RootQuery
  }
`);
