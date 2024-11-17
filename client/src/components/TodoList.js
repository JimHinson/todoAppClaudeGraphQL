import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

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

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

function TodoList() {
  const [newTodo, setNewTodo] = useState('');
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  
  const [addTodo] = useMutation(ADD_TODO, {
    onCompleted: () => refetch()
  });
  
  const [updateTodo] = useMutation(UPDATE_TODO, {
    onCompleted: () => refetch()
  });
  
  const [deleteTodo] = useMutation(DELETE_TODO, {
    onCompleted: () => refetch()
  });

  if (loading) return (
    <div className="text-center py-4">
      Loading todos...
    </div>
  );
  
  if (error) return (
    <div className="text-red-500 text-center py-4">
      Error: {error.message}
    </div>
  );

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    addTodo({ variables: { title: newTodo.trim() } });
    setNewTodo('');
  };

  const handleToggleTodo = (id, completed) => {
    updateTodo({ variables: { id, completed: !completed } });
  };

  const handleDeleteTodo = (id) => {
    deleteTodo({ variables: { id } });
  };

  return (
    <div>
      <form onSubmit={handleAddTodo} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {data.todos.map(todo => (
          <div
            key={todo.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id, todo.completed)}
                className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {data.todos.length === 0 && (
        <div className="text-center text-gray-500 py-4">
          No todos yet! Add one above.
        </div>
      )}
    </div>
  );
}

export default TodoList;