import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {PersistGate} from 'redux-persist/integration/react';

import {persistor} from './store';
import {useAuth} from './hooks/useAuth';
import {MainLayout} from './components/layout';
import {Loading} from './Loading.tsx';
import {SessionExpired} from './components/SessionExpired.tsx';

const Login = React.lazy(() => import('./features/auth/Login'));
const Register = React.lazy(() => import('./features/auth/Register'));
const TodoList = React.lazy(() => import('./features/todos/TodoList'));
const NotFound = React.lazy(() => import('./components/NotFound'));

const ProtectedRoute = ({children}: { children: React.ReactNode }) => {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace/>;
};

const PublicRoute = ({children}: { children: React.ReactNode }) => {
    const {isAuthenticated, generalTodoListId} = useAuth();

    if (isAuthenticated) {
        return <Navigate to={`/todos/General/${generalTodoListId}`} replace/>;
    }
    return <>{children}</>;
};

const AuthLayout = ({children}: { children: React.ReactNode }) => {
    return <div >{children}</div >;
};


const AppContent = () => {
    const {
        isAuthenticated,
        generalTodoListId,
        sessionExpired,
        confirmSessionExpired,
    } = useAuth();

    const hideModalOnPaths = ['/login', '/register'];
    const shouldShowModal =
        sessionExpired && !hideModalOnPaths.includes(location.pathname);

    return (
        <>
            <React.Suspense fallback={<Loading />}>
                <Routes >
                    <Route
                        path="/login"
                        element={
                            <PublicRoute >
                                <AuthLayout >
                                    <Login />
                                </AuthLayout >
                            </PublicRoute >
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <PublicRoute >
                                <AuthLayout >
                                    <Register />
                                </AuthLayout >
                            </PublicRoute >
                        }
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
                        element={
                            isAuthenticated ? (
                                <Navigate to={`/todos/General/${generalTodoListId}`} replace />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    <Route path="*" element={<NotFound />}/>
                </Routes >
            </React.Suspense >

            <Toaster position="top-right"/>

            {shouldShowModal && (
                <SessionExpired onConfirm={confirmSessionExpired}/>
            )}
        </>
    );
};

const App = () => {
    return (
        <PersistGate loading={<Loading />} persistor={persistor}>
            <Router >
                <AppContent />
            </Router >
        </PersistGate >
    );
};

export default App;