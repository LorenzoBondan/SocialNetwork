import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import './styles.css';
import { User } from 'types';
import PostCard from 'Components/PostCard';
import { FaUserEdit } from 'react-icons/fa';
import verified from 'assets/images/verified.png';
import { Link } from 'react-router-dom';

type Props ={
    user: User;
}

const ProfileCard = ({user} : Props) => {

    const [page, setPage] = useState<User>();

    const getUser = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/email/${user.email}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setPage(response.data);
          })
      }, [user.email])

      useEffect(() => {
        getUser();
      }, [getUser]);

    return(
        <>
        <div className='profile-card-container base-card'>
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
                        <Link to={`/user/${user?.id}/followers`}>
                            <div className='profile-card-content-container-follow'>
                                <p><strong>{user?.followersId.length}</strong></p>
                                <p>Followers</p>
                            </div>
                        </Link>
                        <Link to={`/user/${user?.id}/following`}>
                            <div className='profile-card-content-container-follow'>
                                <p><strong>{user?.followingId.length}</strong></p>
                                <p>Following</p>
                            </div>
                        </Link>
                    </div>
                    <div className='profile-card-content-container-button'>
                        <Link to="/editProfile">
                            <button className='btn btn-primary' style={{display:"flex", alignItems:"center", justifyContent:"center"}}><FaUserEdit style={{marginRight:"5px"}}/>Edit Profile</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        {page?.postsId && (
            <div className='profile-card-posts-container'>
                <div className='row'>
                    {page.postsId.map(p => (
                        <div className='col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3 posts-column' key={p}>
                            <PostCard postId={p} userLogged={user} onDelete={() => getUser()}/>
                        </div>
                    ))}
                </div>
            </div>
        )}
        </>
    );
}

export default ProfileCard;