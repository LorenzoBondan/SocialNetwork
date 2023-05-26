import { useState, useEffect, useContext, useCallback } from 'react';
import './styles.css';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';
import { User } from 'types';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import NewPostForm from 'Components/NewPostForm';

const NewPost = () => {
    
    // getting the email
    const { authContextData, setAuthContextData } = useContext(AuthContext);

    useEffect(() => {
        if(isAuthenticated()){
          setAuthContextData({
            authenticated: true,
            tokenData: getTokenData()
          })
        }
        else{
          setAuthContextData({
            authenticated: false,
          })
        }
    }, [setAuthContextData]);

    let email: string;

    authContextData.authenticated && (
        authContextData.tokenData?.user_name && (
        email = authContextData.tokenData?.user_name)) 
    
    // then, getting the user Id by email
    
    const [user, setUser] = useState<User>();

    const getUser = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/email/${email}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setUser(response.data);
          })
    }, [])

    useEffect(() => {
        getUser();
    }, [getUser]);

    return(
        <div className="new-post-container">
            {user && 
                <NewPostForm user={user}/>
            }
        </div>
    );
}

export default NewPost;