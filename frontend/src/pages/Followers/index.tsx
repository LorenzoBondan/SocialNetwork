import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';
import { User } from 'types';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import FollowerCard from 'Components/FollowerCard';

type UrlParams = {
    userId: string;
}

const Followers = () => {

    const { userId } = useParams<UrlParams>();

    const [user, setUser] = useState<User>();

    const getThisUser = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/${userId}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setUser(response.data);
            window.scrollTo(0,0);
          })
    }, [userId])

    useEffect(() => {
        getThisUser();
    }, [getThisUser]);

    return(
        <div className='followers-container'>
            <h3>{user?.name}'s Followers</h3>
            <div className='row'>
                {user?.followersId.map(follower => (
                    <div key={follower}>
                        <FollowerCard followerId={follower}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Followers;