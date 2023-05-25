import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

import './styles.css';
import { User } from 'types';


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
                    <button className='btn btn-primary'>Edit Profile</button>
                </div>

            </div>

        </div>

        {page?.postsId && (
            <div className='profile-card-posts-container'>
                <h2>Posts</h2>
                {page.postsId.map(p => (
                    <p key={p}>{p}</p>
                ))}
            </div>
        )}
        </>
    );
}

export default ProfileCard;