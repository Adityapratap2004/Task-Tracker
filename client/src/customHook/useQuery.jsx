import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useQuery = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
   
    const handleErrorResponse = (error) => {
        
        let errorMsg = '';
        
        if (error.response && error.response.data && error.response.data.error) {
            const errorMessage = error.response.data.error;
            if (Array.isArray(errorMessage)) {
                errorMessage.forEach((e) => {
                    errorMsg += e.msg + '\n';
                });
            } else {
                errorMsg = errorMessage;
            }
            toast.error(errorMsg);
        } else {
            toast.error("An unexpected error occurred.");
        }
        setError(true);
    };

    const resetError = () => {
        setError(false);
    };

    const makeQuery = async (method,url, options) => {
        try {
            setLoading(true);
            const response = await axios[method](url, options);
            response.data.msg && toast.success(response.data.msg);
            resetError();
            return response.data
        } catch (error) {
            handleErrorResponse(error);
        } finally {
            setLoading(false);
        }
    };

    const getQuery = (url) => makeQuery("get",url);
    const postQuery = (url,options) => makeQuery("post",url, options);
    const patchQuery = (url,options) => makeQuery("patch",url, options);
    const deleteQuery = (url,options) => makeQuery("delete",url, options);

    return [loading,error, getQuery, postQuery, deleteQuery, patchQuery];
};

export default useQuery;
