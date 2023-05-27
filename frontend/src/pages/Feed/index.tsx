import { Post, SpringPage, User } from 'types';
import './styles.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';
import './styles.css';
import PostCard from 'Components/PostCard';

const Feed = () => {

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

    const getUser = useCallback(async () => {
        try {
          const params: AxiosRequestConfig = {
            method: "GET",
            url: `/users/email/${email}`,
            withCredentials: true
          };
          const response = await requestBackend(params);
          setUser(response.data);
        } catch (error) {
          console.error(error);
        }
      }, []);

      useEffect(() => {
        if (email) {
          getUser();
        }
      }, [getUser]);

    /////

    const [page, setPage] = useState<Post[]>([]);

    const getPosts = useCallback(async () => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/${user?.id}/postsOfFollowing`,

        }
    
        requestBackend(params) 
          .then(response => {
            setPage(response.data);
            window.scrollTo(0, 0);
          })
      }, [user?.id])
  
      useEffect(() => {
        if (user) {
          getPosts();
        }
      }, [user, getPosts]);

    return(
        <div className='feed-container'>
            <h3>The most recent posts from your friends</h3>
            <div className='row'>
                {user && page?.sort((a,b) => a.date > b.date ? -1 : 1).map(post => (
                    <div key={post.id}>
                        <PostCard postId={post.id} userLogged={user} onDelete={() => getPosts}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Feed;