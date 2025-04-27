import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store';
import {setCredentials, logout} from '../store/authSlice';
import {useLoginMutation, useRegisterMutation} from '../services/api';
import {LoginCredentials, RegisterCredentials} from '../types';

export const useAuth = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const [login] = useLoginMutation();
    const [register] = useRegisterMutation();

    const handleLogin = async (credentials: LoginCredentials) => {
        try {
            const result = await login(credentials).unwrap();
            if (result.message) {
                dispatch(setCredentials({
                    jwt: result.jwt,
                    user: result.user,
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
        dispatch(logout());
    };

    return {
        user: auth.user,
        isAuthenticated: auth.isAuthenticated,
        isLoading: auth.isLoading,
        error: auth.error,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
    };
};
