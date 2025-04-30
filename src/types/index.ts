export interface User {
    id: string;
    email: string;
    username: string;
}

export interface Todo {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    starred: boolean;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    dueDate?: string;
    reminder?: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    listId: string;
}

export interface TodoList {
    id: string;
    name: string;
    userId: string;
}

export interface AuthState {
    user: User | null;
    jwt: string | null;
    isAuthenticated: boolean;
    generalTodoListId: string | null;
    isLoading: boolean;
    error: string | null;
}

export interface TodoState {
    todos: Todo[];
    isLoading: boolean;
    error: string | null;
    filters: {
        status: 'all' | 'completed' | 'active';
        priority: 'all' | 'LOW' | 'MEDIUM' | 'HIGH';
        starred: boolean | null;
    };
    search: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    username: string;
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

export interface AuthResponse {
    jwt: string;
    message: string;
    user: User;
    generalTodoListId: string;
}

export interface Notification {
    id: string;
    message: string;
    notifyAt: string;
    sent: boolean;
    read: boolean;
    todo: {
        title: string;
        id: string;
    };
}