import { Post, User } from 'types';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { getTokenData } from 'util/auth';
import './styles.css';
import PostCard from 'Components/PostCard';
import CardLoader from 'Components/CardLoader';

const Feed = () => {

  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  const getUser = useCallback(async () => {
      try {
          const email = getTokenData()?.user_name;

          if (email) {
              const params: AxiosRequestConfig = {
              method: "GET",
              url: `/users/email/${email}`,
              withCredentials: true,
          };

          const response = await requestBackend(params);
          setUser(response.data);
      }
      } catch (error) {
          console.log("Error: " + error);
      }
  }, []);

  useEffect(() => {
      getUser();
  }, [getUser]);

    /////

    const [page, setPage] = useState<Post[]>([]);

    const getPosts = useCallback(async () => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/${user?.id}/postsOfFollowing`,
        }

        setIsLoading(true);
        requestBackend(params) 
          .then(response => {
            setPage(response.data);
            window.scrollTo(0, 0);
          })
          .finally(() => {
            setIsLoading(false);
          })
      }, [user?.id])
  
      useEffect(() => {
        if (user) {
          getPosts();
        }
      }, [user, getPosts]);

    return(
        <div className='feed-container'>
            <h3>The most recent posts from the people you're following</h3>
            <div className='row'>
              {isLoading ? <CardLoader/> : (
                user && page?.sort((a,b) => a.date > b.date ? -1 : 1).map(post => (
                    <div key={post.id}>
                        <PostCard postId={post.id} userLogged={user} onDelete={() => getPosts}/>
                    </div>
                ))
              )}
            </div>
        </div>
    );
}

export default Feed;