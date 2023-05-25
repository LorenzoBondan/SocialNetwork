import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

import './styles.css';
import { User } from 'types';
import PostCard from 'Components/PostCard';
import { FaUserEdit } from 'react-icons/fa';


type Props ={
    userEmail: string | undefined;
}

const ProfileCard = ({userEmail} : Props) => {

    const [page, setPage] = useState<User>();

    const getUser = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/email/${userEmail}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setPage(response.data);
          })
      }, [userEmail])

      useEffect(() => {
        getUser();
      }, [getUser]);

    return(
        <>
        <div className='profile-card-container base-card'>
            <div className='profile-card-image-container'>
                <img src={page?.imgUrl} alt="" />
            </div>

            <div className='profile-card-content-container'>
                <h1>{page?.name}</h1>
                <div className='profile-card-follow-container'>
                    <div className='profile-card-content-container-follow'>
                        <p><strong>{page?.followersId.length}</strong></p>
                        <p>Followers</p>
                    </div>
                    <div className='profile-card-content-container-follow'>
                        <p><strong>{page?.followingId.length}</strong></p>
                        <p>Following</p>
                    </div>
                </div>
                <div className='profile-card-content-container-button'>
                    <button className='btn btn-primary' style={{display:"flex", alignItems:"center", justifyContent:"center"}}><FaUserEdit style={{marginRight:"5px"}}/>Edit Profile</button>
                </div>

            </div>

        </div>

        {page?.postsId && (
            <div className='profile-card-posts-container'>
                <h2>Posts</h2>
                {page.postsId.map(p => (
                    <div key={p}>
                        <PostCard postId={p}/>
                    </div>
                ))}
            </div>
        )}
        </>
    );
}

export default ProfileCard;