
import { SpringPage, User } from 'types';
import './styles.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { Link } from 'react-router-dom';
import UserCard from 'Components/UserCard';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';

const Users = () => {

    const [page, setPage] = useState<SpringPage<User>>();

    const getUsers = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: "/users",
        }
    
        requestBackend(params) 
          .then(response => {
            setPage(response.data);
            window.scrollTo(0, 0);
          })
      }, [])
  
      useEffect(() => {
        getUsers();
      }, [getUsers]);

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
        <div className='users-container'>
            <div className="row" style={{width:"100%"}}>
                {page?.content
                .sort((a,b) => a.name > b.name ? 1 : -1)
                .map(u => (
                    <div className="col-sm-6 col-lg-6 col-xl-2 users-column" key={u.id}>
                        {user && 
                            <UserCard user={u} followerId={user?.id}/>
                        }
                    </div>
                    )
                )
                }
            </div>

        </div>
    );
}


export default Users;