import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '../store';
import {LoginCredentials, RegisterCredentials, AuthResponse, Todo, TodoList} from '../types';

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8065/api/v1',
        credentials: 'include',
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.jwt;
            console.log("token", token);
            if (token) {
                console.log("token got passed")
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Todo', 'Auth'],
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginCredentials>({
            query: (credentials) => ({
                url: '/auth/signin',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation<AuthResponse, RegisterCredentials>({
            query: (credentials) => ({
                url: '/auth/signup',
                method: 'POST',
                body: credentials,
            }),
        }),
        addTodoList: builder.mutation<TodoList, Partial<TodoList>>({
            query: (data) => ({
                url: `todos/create-list/${data.userId}`,
                method: 'POST',
                body: data,
                params: {
                    name: data.name
                }
            }),
            invalidatesTags: ['Todo'],
        }),
        getTodoList: builder.query<TodoList[], string>({
            query: (userId) => `todos/get-list/${userId}`,
            providesTags: ['Todo'],
        }),
        addTodo: builder.mutation<Todo, Partial<Todo>>({
            query: (data) => ({
                url: `todos/create/${data.userId}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Todo'],
        }),
        getTodos: builder.query<Todo[], string>({
            query: (userId) => `todos/user/${userId}`,
            providesTags: ['Todo'],
        }),
        updateTodo: builder.mutation<Todo, {
            id: string;
            todo: Partial<Todo>
        }>({
            query: ({id, todo}) => ({
                url: `todos/update/${id}`,
                method: 'PUT',
                body: todo,
            }),
            invalidatesTags: ['Todo'],
        }),
        deleteTodo: builder.mutation<void, string>({
            query: (id) => ({
                url: `/todos/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todo'],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
    useAddTodoListMutation,
    useGetTodoListQuery
} = api;
