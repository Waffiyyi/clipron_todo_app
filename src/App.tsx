import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {useAuth} from './hooks/useAuth';
import {persistor} from './store';
import {PersistGate} from 'redux-persist/integration/react';
import {MainLayout} from './components/layouts';
import {Loading} from "./Loading.tsx";

const Login = React.lazy(() => import('./features/auth/Login'));
const Register = React.lazy(() => import('./features/auth/Register'));
const TodoList = React.lazy(() => import('./features/todos/TodoList'));
const NotFound = React.lazy(() => import('./components/NotFound'));

const ProtectedRoute = ({children}: { children: React.ReactNode }) => {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? children : <Navigate to="/login"/>;
};

const AuthLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div >
            {children}
        </div >
    );
};

const App = () => {
    return (
        <PersistGate
            loading={
                <Loading/>}
            persistor={persistor}
        >
            <Router >
                <React.Suspense
                    fallback={
                        <Loading/>}
                >
                    <Routes >
                        <Route
                            path="/login"
                            element={<AuthLayout ><Login /></AuthLayout >}
                        />
                        <Route
                            path="/register"
                            element={<AuthLayout ><Register /></AuthLayout >}
                        />
                        <Route
                            path="/todos/:name/:id"
                            element={
                                <ProtectedRoute >
                                    <MainLayout >
                                        <TodoList />
                                    </MainLayout >
                                </ProtectedRoute >
                            }
                        />
                        <Route
                            path="/"
                            element={<Navigate to="/login" replace/>}
                        />
                        <Route path="*" element={<NotFound />}/>
                    </Routes >
                </React.Suspense >
                <Toaster position="top-right"/>
            </Router >
        </PersistGate >
    );
};

export default App;
