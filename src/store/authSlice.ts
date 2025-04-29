import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState, User} from '../types';

const initialState: AuthState = {
    user: null,
    jwt: null,
    generalTodoListId:null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{  jwt: string, user: User, generalTodoListId:string }>
        ) => {
            const { jwt, user, generalTodoListId} = action.payload;
            state.jwt = jwt;
            state.user = user;
            state.generalTodoListId = generalTodoListId;
            state.isAuthenticated = true;
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.jwt = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const {setCredentials, logout, setError, setLoading} = authSlice.actions;
export default authSlice.reducer;
