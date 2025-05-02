# React TypeScript Todo App

A modern, feature-rich Todo application built with React, TypeScript, Redux Toolkit, and TailwindCSS.

## Features

- 🔐 Secure JWT authentication
- 📝 CRUD operations for todos
- ⭐ Task prioritization (starred, priority levels)
- 📅 Due dates and task reminders
- 🔍 Search and filter functionality
- 🎨 Dark/Light theme support
- 🖱️ Drag-and-drop for task reordering
- 📱 Responsive design
- 🎯 Type-safe components and state management

## Tech Stack

- React 19
- TypeScript
- Redux Toolkit & RTK Query
- TailwindCSS 4.1
- React Router v7
- @hello-pangea/dnd (fork of React Beautiful DnD)
- React Hot Toast
- @headlessui/react v2
- Hero Icons
- Date-fns
- react-datepicker
- class-variance-authority
- clsx
- Pangea UI

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── assets/            # Static assets and images
├── components/        # Reusable UI components
│   ├── layouts/      # Layout components (Header, Sidebar, Notification)
│   └── ui/           # Basic UI elements using Pangea UI
├── features/         # Feature-specific components
│   ├── auth/        # Authentication components
│   └── todos/       # Todo management components
├── hooks/           # Custom React hooks
├── services/        # API services
├── store/          # Redux store configuration
├── types/          # TypeScript types and interfaces
└── utils/          # Utility functions
```

## UI/Styling

The application uses a modern styling approach with:
- Tailwind CSS for utility-first styling
- Pangea UI components for consistent design
- Class Variance Authority for type-safe component variants
- Tailwind Merge for class name merging
- Dark/Light theme support built-in

## API Integration

The app uses RTK Query for API integration with the following endpoints:

### Authentication
- POST /api/auth/signin - Login
- POST /api/auth/signup - Register

### Todo Lists
- POST /api/todos/create-list/:userId - Create a new todo list
- GET /api/todos/get-list/:userId - Get all todo lists
- DELETE /api/todos/delete-list/:id - Delete a todo list

### Todos
- POST /api/todos/create/:userId - Create a new todo
- GET /api/todos/user/:userId - Get todos (with listId parameter)
- PUT /api/todos/update/:id - Update a todo
- DELETE /api/todos/delete/:id - Delete a todo

### Notifications
- GET /api/notifications/due-todos/:userId - Get due todo notifications
- POST /api/notifications/read-all/:id - Mark notifications as read
- DELETE /api/notifications/delete/:id - Delete a notification

The API integration uses:
- RTK Query for data fetching and caching
- Automatic token handling with Bearer authentication
- Includes credentials in requests
- Proper cache invalidation with tags

You can find the backend with all the API's at this repository: https://github.com/Waffiyyi/clipron_todo-app_backend
## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
