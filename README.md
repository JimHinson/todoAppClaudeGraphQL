# Running the app
1. cd server
2. node server.js
3. cd client
4. node server.js
# Accessing the server:
http://localhost:4000/
# Accessing the client:
http://localhost:3000/



To Do app written by Claude using graphQL
https://claude.ai/chat/a5064e02-9f4f-4661-b15f-db851a36c299

This is a React-based to-do list application that uses GraphQL for data management. Here's a breakdown of the key features:
GraphQL Schema: The application defines two GraphQL queries/mutations - GetTodos, AddTodo, and ToggleTodo. These allow fetching the list of todos, creating a new todo, and toggling the completed status of a todo.
React Components: The main TodoApp component uses the GraphQL queries and mutations to fetch, add, and update todos. It manages the state for the new todo input and renders the todo list items.
Apollo Client: The application sets up an ApolloClient instance to connect to the GraphQL API endpoint and provide the GraphQL functionality to the React components.
UI Components: The application uses the shadcn/ui library to provide a consistent and visually appealing user interface, including an Alert component for displaying status messages.
Styling: The application uses Tailwind CSS utility classes for styling the components.

To use this application, you would need to:

Set up a GraphQL API endpoint that implements the schema defined in the code.
Update the uri in the ApolloClient configuration to point to your GraphQL API.
Ensure you have the shadcn/ui library installed and configured in your project.

Let me know if you have any other questions or need further assistance!

