import { User } from 'types';
import './styles.css';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import verified from 'assets/images/verified.png';

type Props = {
    user: User;
    followerId : number;
}

const UserCard = ({user, followerId} : Props) => {

    const [page, setPage] = useState<User>(); /* Me */

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
        if(!window.confirm("Are you sure that you want to stop following this user?")){ // messagebox
            return;
        }
        
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
            {isMe ? (
                <Link to={`/profile`} className='usercard-image'>
                    <div>
                        <img src={user.imgUrl} alt="" />
                    </div>
                </Link>
            ) : (
                <Link to={`/user/${user.id}`} className='usercard-image'>
                    <div>
                        <img src={user.imgUrl} alt="" />
                    </div>
                </Link>
            )}
            <div className='usercard-rigth'>
                <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <p>{user.name}</p>
                    {user.verified && <img src={verified} alt="" style={{height:"10px", width:"10px", marginLeft:"3px"}}/>}
                </div>
                <div className='usercard-content-container'>
                    <span className='profile-card-bio'>{user.bio}</span>
                </div>
                {isFollowing ? (
                    <button className='btn btn-primary' onClick={() => stopFollowing()}>Unfollow</button>
                ) : (
                    !isMe ? (<button className='btn btn-primary' onClick={() => startFollowing()}>Follow</button>) : (<div className='margin-bottom-56'></div>)
                )}
            </div>
        </div>
    );
}

export default UserCard;