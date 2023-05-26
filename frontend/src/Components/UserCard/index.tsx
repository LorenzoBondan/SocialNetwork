
import { User } from 'types';
import './styles.css';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

type Props = {
    user: User;
    followerId : number;
}

const UserCard = ({user, followerId} : Props) => {

    const [page, setPage] = useState<User>(); /* quem eu sou */

    const getUser = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/${followerId}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setPage(response.data);
          })
    }, [followerId])

    useEffect(() => {
        getUser();
    }, [getUser]);

    /**/

    const [isFollowing, setIsFollowing] = useState(false);

    const testIfIsFollowing = useCallback((number : number) => {

        if(user.followersId.includes(number)){
            setIsFollowing(true);
        }
        else{
            setIsFollowing(false);
        }
    }, [user.followersId])

    useEffect(() => {
        page && 
        testIfIsFollowing(page?.id);
    }, [testIfIsFollowing, page]);

    /**/

    const [isMe, setIsMe] = useState(false);

    const testIfItsMe = useCallback((number : number) => {

        if(user.id === (number)){
            setIsMe(true);
        }
        else{
            setIsMe(false);
        }
    }, [user.id])
    useEffect(() => {
        page && 
        testIfItsMe(page?.id);
    }, [testIfItsMe, page]);
    /**/
    const startFollowing = () => {
        const params : AxiosRequestConfig = {
            method:"PUT",
            url: `/users/startFollowing/${user.id}/${followerId}`,
            withCredentials:true
          }
          requestBackend(params) 
            .then(() => {
              setIsFollowing(true);
              setIsMe(false);
            })
    }
    const stopFollowing = () => {
        const params : AxiosRequestConfig = {
            method:"PUT",
            url: `/users/stopFollowing/${user.id}/${followerId}`,
            withCredentials:true
          }
          requestBackend(params) 
            .then(() => {
              setIsFollowing(false);
              setIsMe(false);
            })
    }
    return(
        <div className='usercard-container base-card'>
            <Link to={`/user/${user.id}`}>
                <div className='usercard-image'>
                    <img src={user.imgUrl} alt="" />
                </div>
            </Link>
            <div className='usercard-rigth'>
                <p>{user.name}</p>
                {isFollowing ? (
                    <button className='btn btn-primary' onClick={() => stopFollowing()}>Unfollow</button>
                ) : (
                    !isMe && <button className='btn btn-primary' onClick={() => startFollowing()}>Follow</button>
                )}
            </div>
        </div>
    );
}

export default UserCard;