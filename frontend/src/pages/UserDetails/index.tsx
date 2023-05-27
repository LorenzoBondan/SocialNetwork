
import { Link, useParams } from 'react-router-dom';
import './styles.css';
import { useEffect, useState, useContext, useCallback } from 'react';
import { User } from 'types';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import verified from 'assets/images/verified.png';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';
import PostCard from 'Components/PostCard';

type UrlParams = {
    userId: string;
}

const UserDetails = () => {

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

    /**/

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
    
    const [userLogged, setUserLogged] = useState<User>();

    const getUser = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/email/${email}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setUserLogged(response.data);
          })
    }, [])

    useEffect(() => {
        getUser();
    }, [getUser]);

    /**/

    const [isFollowing, setIsFollowing] = useState(false);

    const testIfIsFollowing = useCallback((number : number) => {

        if(user && user.followersId.includes(number)){
            setIsFollowing(true);
        }
        else{
            setIsFollowing(false);
        }
    }, [user])

    useEffect(() => {
        userLogged && 
        testIfIsFollowing(userLogged?.id);
    }, [testIfIsFollowing, userLogged]);

    /**/

    const startFollowing = () => {
        const params : AxiosRequestConfig = {
            method:"PUT",
            url: `/users/startFollowing/${userId}/${userLogged?.id}`,
            withCredentials:true
          }
          requestBackend(params) 
            .then(() => {
              setIsFollowing(true);
              getThisUser();
            })
    }

    const stopFollowing = () => {
        if(!window.confirm("Are you sure that you want to stop following this user?")){ // messagebox
            return;
        }

        const params : AxiosRequestConfig = {
            method:"PUT",
            url: `/users/stopFollowing/${userId}/${userLogged?.id}`,
            withCredentials:true
          }
          requestBackend(params) 
            .then(() => {
              setIsFollowing(false);
              getThisUser();
            })
    }

    return(
        <div className='user-details-container'>
            <div className='user-details-profile-card base-card'>
                <div className='profile-card-image-container'>
                    <img src={user?.imgUrl} alt="" />
                </div>
                <div className='profile-card-content-container'>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <h1 style={{marginBottom:"0", marginRight:"5px"}}>{user?.name}</h1>
                        {user?.verified && <img src={verified} alt="" style={{height:"18px"}} />}
                    </div>
                    <p className='profile-card-bio'>{user?.bio}</p>
                    <div className='space-between-follow-and-button'>
                        <div className='profile-card-follow-container'>
                            <div className='profile-card-content-container-follow'>
                                <p><strong>{user?.postsId.length}</strong></p>
                                <p>Posts</p>
                            </div>
                            <Link to={`/user/${userId}/followers`}>
                                <div className='profile-card-content-container-follow'>
                                    <p><strong>{user?.followersId.length}</strong></p>
                                    <p>Followers</p>
                                </div>
                            </Link>

                            <Link to={`/user/${userId}/following`}>
                                <div className='profile-card-content-container-follow'>
                                    <p><strong>{user?.followingId.length}</strong></p>
                                    <p>Following</p>
                                </div>
                            </Link>
                        </div>
                        <div className='profile-card-content-container-button'>
                            {isFollowing ? (
                                <button className='btn btn-primary btn-follow-unfollow' style={{display:"flex", alignItems:"center", justifyContent:"center"}} onClick={() => stopFollowing()}>Unfollow</button>
                            ) : (
                                <button className='btn btn-primary btn-follow-unfollow' style={{display:"flex", alignItems:"center", justifyContent:"center"}} onClick={() => startFollowing()}>Follow</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {user?.postsId && (
            <div className='profile-card-posts-container'>
                <div className='row'>
                    {userLogged && user.postsId.map(p => (
                        <div className='col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3 posts-column' key={p}>
                            <PostCard postId={p} userLogged={userLogged} onDelete={() => getUser()}/>
                        </div>
                    ))}
                </div>
            </div>
        )}
        </div>
    );
}

export default UserDetails;