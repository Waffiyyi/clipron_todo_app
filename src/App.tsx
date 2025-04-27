import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {useAuth} from './hooks/useAuth';
import {persistor} from './store';
import {PersistGate} from 'redux-persist/integration/react';


// Lazy load components
const Login = React.lazy(() => import('./features/auth/Login'));
const Register = React.lazy(() => import('./features/auth/Register'));
const TodoList = React.lazy(() => import('./features/todos/TodoList'));
const NotFound = React.lazy(() => import('./components/NotFound'));

const ProtectedRoute = ({children}: { children: React.ReactNode }) => {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? children : <Navigate to="/login"/>;
};

const App = () => {
    return (
        <PersistGate loading={<div >Loading...</div >} persistor={persistor}>
            <Router >
                <React.Suspense fallback={<div >Loading...</div >}>
                    <Routes >
                        <Route path="/login" element={<Login />}/>
                        <Route path="/register" element={<Register />}/>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute >
                                    <TodoList />
                                </ProtectedRoute >
                            }
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
