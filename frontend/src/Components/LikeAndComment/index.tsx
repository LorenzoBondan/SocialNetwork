import like from 'assets/images/like.png';
import likeFilled from 'assets/images/like_filled.png';
import comment from 'assets/images/comment.png';
import { Post, User } from 'types';
import { useCallback, useEffect, useState, useContext } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';

type Props = {
    post : Post;
}

const LikeAndComment = ({post} : Props) => {

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

    const getUser = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/email/${email}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setUser(response.data);
          })
    }, [])

    useEffect(() => {
        getUser();
    }, [getUser]);

    /**/


    const [isLiked, setIsLiked] = useState(false);

    const testIfIsLiked = useCallback(() => {
        if(user && post.likes.includes(user)){
            setIsLiked(true);
        }
        else{
            setIsLiked(false);
        }
        
    }, [user, post])

    useEffect(() => {
        user && 
        testIfThisPostIsMine();
    }, [testIfThisPostIsMine, user]);

    const likePost = (formData : Like) => {

        formData.postId = postId;
        formData.userId = user?.id;

        const params : AxiosRequestConfig = {
          method:"POST",
          url: `/likes`,
          data: formData,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setIsLiked(true);
            console.log("liked with success: ", response.data);
          })
    }

    const dislikePost = (likeId : number) => {

        const params : AxiosRequestConfig = {
          method:"DELETE",
          url: `/likes/${likeId}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setIsLiked(false);
            console.log("disliked with success: ", response.data);
          })
    }

    useEffect(() => {
        user && 
        testIfThisPostIsMine();
    }, [testIfThisPostIsMine, user]);

    return(
        <div className='postcard-like-zone'>
            {isLiked ? (
                <img src={likeFilled} alt="" onClick={() => dislikePost(1)}/>
            ) : (
                <img src={like} alt="" onClick={() => likePost}/>
            )}
            
            <img src={comment} alt="" />
        </div>
    );
}

export default LikeAndComment;