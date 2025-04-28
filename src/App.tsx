import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {useAuth} from './hooks/useAuth';
import {persistor} from './store';
import {PersistGate} from 'redux-persist/integration/react';
import {MainLayout} from './layouts/MainLayout';

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
        <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))]">
            <div className="w-full max-w-md p-6 bg-[hsl(var(--card))] rounded-lg shadow-md">
                {children}
            </div>
        </div>
    );
};

const App = () => {
    return (
        <PersistGate loading={<div className="flex items-center justify-center min-h-screen">Loading...</div>} persistor={persistor}>
            <Router>
                <React.Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                    <Routes>
                        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>}/>
                        <Route path="/register" element={<AuthLayout><Register /></AuthLayout>}/>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <MainLayout>
                                        <TodoList />
                                    </MainLayout>
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<NotFound />}/>
                    </Routes>
                </React.Suspense>
                <Toaster position="top-right"/>
            </Router>
        </PersistGate>
    );
};

export default App;
