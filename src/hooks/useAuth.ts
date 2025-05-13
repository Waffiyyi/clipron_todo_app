import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store';
import {setCredentials, logout} from '../store/authSlice';
import {useLoginMutation, useRegisterMutation} from '../services/api';
import {LoginCredentials, RegisterCredentials} from '../types';
import {useEffect, useState} from "react";
import {jwtDecode} from 'jwt-decode';
import {useNavigate} from "react-router-dom";

export const useAuth = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login] = useLoginMutation();
    const [register] = useRegisterMutation();

    const [sessionExpired, setSessionExpired] = useState(false);

    useEffect(() => {
        if (auth.jwt) {
            try {
                const {exp} = jwtDecode<{ exp: number }>(auth.jwt);
                const currentTime = Date.now() / 1000;
                if (exp < currentTime) {
                    setSessionExpired(true);
                }
            } catch (e) {
                setSessionExpired(true);
            }
        }
    }, [auth.jwt]);


    const handleLogin = async (credentials: LoginCredentials) => {
        try {
            const result = await login(credentials).unwrap();
            if (result.message) {
                dispatch(setCredentials({
                    jwt: result.jwt,
                    user: result.user,
                    generalTodoListId: result.generalTodoListId,
                }));
            }
            return result;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const handleRegister = async (credentials: RegisterCredentials) => {
        try {
            const result = await register(credentials).unwrap();
            if (result.message) {
                dispatch(setCredentials({
                    jwt: result.jwt,
                    user: result.user,
                    generalTodoListId: result.generalTodoListId,
                }));
            }
            return result;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        setSessionExpired(false);
        dispatch(logout());
    };
    const confirmSessionExpired = () => {
        handleLogout();
        navigate('/login');
    };
    return {
        user: auth.user,
        isAuthenticated: auth.isAuthenticated,
        generalTodoListId: auth.generalTodoListId,
        isLoading: auth.isLoading,
        error: auth.error,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        sessionExpired,
        confirmSessionExpired,
    };
};
