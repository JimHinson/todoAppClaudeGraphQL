import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useMutation, useQuery } from '@apollo/client';
import { Alert, AlertDescription, AlertTitle, AlertDialog, AlertDialogAction } from '@/components/ui/alert';

// GraphQL schema
const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    createTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      id
      title
      completed
    }
  }
`;

// React component
const TodoApp = () => {
  const [newTodo, setNewTodo] = useState('');
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO, {
    onCompleted: () => refetch()
  });
  const [toggleTodo] = useMutation(TOGGLE_TODO, {
    onCompleted: () => refetch()
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddTodo = () => {
    addTodo({ variables: { title: newTodo } });
    setNewTodo('');
  };

  const handleToggleTodo = (id, completed) => {
    toggleTodo({ variables: { id, completed: !completed } });
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">GraphQL To-Do List</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-1 p-2 border border-gray-300 rounded-l-md"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md"
        >
          Add
        </button>
      </div>

      <div>
        {data.todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between bg-white shadow-md p-4 mb-2 rounded-md"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id, todo.completed)}
                className="mr-2"
              />
              <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Apollo client setup
const client = new ApolloClient({
  uri: 'https://your-graphql-api-endpoint.com/graphql',
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <TodoApp />
  </ApolloProvider>
);

export default App;