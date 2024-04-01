import { useDispatch } from 'react-redux';
import { clearUser, setUser } from '../State/slice/authSlice';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const handleErrorResponse = (error) => {

        let errorMsg = '';
       
        if (typeof error.response.data.error === 'object') {
            error.response.data.error.forEach((e) => {
                errorMsg += e.msg + '\n';
            });
            toast.error(errorMsg);
        } else {
            toast.error(error.response.data.error);
        }
        setError(true);
    };

    const resetError = () => {
        setError(false);
    };

    const signUp = async ({ name, email, password, cpassword }) => {
        try {
            setLoading(true);
            if (password !== cpassword) {
                throw new Error("Confirm password should be same as password");
            }

            const response = await axios.post('/signup', {
                name,
                email,
                password
            });
            dispatch(setUser(response.data.user));
            localStorage.setItem('user', JSON.stringify(response.data.user));
            toast.success("Account created successfully");
            resetError(); // Reset error state on success
        } catch (error) {
            handleErrorResponse(error);
        } finally {
            setLoading(false);
        }
    };

    const signIn = async ({ email, password }) => {
        try {
            setLoading(true);

            const response = await axios.post('/login', {
                email,
                password
            });
            dispatch(setUser(response.data.user));
            localStorage.setItem('user', JSON.stringify(response.data.user));
            toast.success("Login successfully");
            resetError(); // Reset error state on success

        } catch (error) {
            handleErrorResponse(error);
        } finally {
            setLoading(false);
        }
    };

    const logOut = async () => {
        try {

            await axios.get('/logout');
            dispatch(clearUser());
            localStorage.removeItem("user");
            toast.success("Logged out successfully");
            resetError(); // Reset error state on success

        } catch (error) {
            handleErrorResponse(error);
        }

    }



    return [loading, signUp, error, signIn,logOut];
};

export default useAuth;
