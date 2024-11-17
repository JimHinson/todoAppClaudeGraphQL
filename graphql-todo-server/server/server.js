// server/server.js
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

// In-memory database
let todos = [
  { id: '1', title: 'Learn GraphQL', completed: false },
  { id: '2', title: 'Build a GraphQL API', completed: true }
];

// GraphQL schema
const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo]!
    todo(id: ID!): Todo
  }

  type Mutation {
    createTodo(title: String!): Todo!
    updateTodo(id: ID!, completed: Boolean!): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    todos: () => todos,
    todo: (_, { id }) => todos.find(todo => todo.id === id)
  },
  Mutation: {
    createTodo: (_, { title }) => {
      const todo = {
        id: String(todos.length + 1),
        title,
        completed: false
      };
      todos.push(todo);
      return todo;
    },
    updateTodo: (_, { id, completed }) => {
      const todo = todos.find(t => t.id === id);
      if (!todo) throw new Error('Todo not found');
      todo.completed = completed;
      return todo;
    },
    deleteTodo: (_, { id }) => {
      const initialLength = todos.length;
      todos = todos.filter(t => t.id !== id);
      return todos.length !== initialLength;
    }
  }
};

async function startServer() {
  const app = express();
  
  // Enable CORS
  app.use(cors());

  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    playground: true,
    introspection: true
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();