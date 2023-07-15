import { useState, useEffect, useCallback } from 'react';
import './styles.css';
import { getTokenData } from 'util/auth';
import { User } from 'types';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import NewPostForm from 'Components/NewPostForm';

const NewPost = () => {
    
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

    return(
        <div className="new-post-container">
            {user && 
                <NewPostForm user={user}/>
            }
        </div>
    );
}

export default NewPost;