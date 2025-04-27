# React TypeScript Todo App

A modern, feature-rich Todo application built with React, TypeScript, Redux Toolkit, and TailwindCSS.

## Features

- 🔐 Secure JWT authentication with HTTP-only cookies
- 📝 CRUD operations for todos
- ⭐ Task prioritization (starred, priority levels)
- 📅 Due dates and task reminders
- 🔍 Search and filter functionality
- 🎨 Dark/Light theme support
- 🖱️ Drag-and-drop for task reordering
- 📱 Responsive design
- 🎯 Type-safe components and state management

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit & RTK Query
- TailwindCSS
- React Router v6
- React Beautiful DnD
- React Hot Toast
- HeadlessUI
- Hero Icons
- Date-fns

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
├── components/          # Reusable UI components
│   └── ui/             # Basic UI elements
├── features/           # Feature-specific components
│   ├── auth/          # Authentication components
│   └── todos/         # Todo management components
├── hooks/             # Custom React hooks
├── services/          # API services
├── store/             # Redux store configuration
├── types/             # TypeScript types and interfaces
└── utils/             # Utility functions
```

## API Integration

The app expects a REST API with the following endpoints:

- Authentication:
  - POST /api/auth/login
  - POST /api/auth/register
  - POST /api/auth/logout

- Todos:
  - GET /api/todos
  - POST /api/todos
  - PATCH /api/todos/:id
  - DELETE /api/todos/:id

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
