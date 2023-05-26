import { AxiosRequestConfig } from "axios";
import { Comment, User } from "types";
import { requestBackend } from "util/requests";
import { GoTrashcan } from 'react-icons/go';
import { AuthContext } from "AuthContext";
import { useContext, useEffect, useState, useCallback } from 'react';
import { getTokenData, isAuthenticated } from "util/auth";

type Props = {
    comment: Comment;
    onDelete : Function;
}

const CommentCard = ({comment, onDelete} : Props) => {

    const handleDelete = (commentId : number) => {
    
        if(!window.confirm("Are you sure that you want to delete the user?")){ // messagebox
          return;
        }
    
        const params : AxiosRequestConfig = {
          method:"DELETE",
          url: `/comments/${commentId}`,
          withCredentials: true
        }
    
        requestBackend(params).then(() => {
          onDelete();
        })
      }

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

    const [isMine, setIsMine] = useState(false);

    const testIfThisCommentIsMine = useCallback(() => {

        if(user && user.commentsId.includes(comment.id)){
            setIsMine(true);
        }
        else{
            setIsMine(false);
        }
    }, [user, comment.id])

    useEffect(() => {
        user && 
        testIfThisCommentIsMine();
    }, [testIfThisCommentIsMine, user]);

    /**/

    return(
        <div className='postcard-comment-zone'>
            <div className="postcard-first-container">
                <div className='postcard-comment-user-image'>
                    <img src={comment.user.imgUrl} alt="" />
                </div>
                <div className='postcard-comment-description'>
                    <span>{comment.user.name}</span>
                    <p>{comment.description}</p>
                </div>
            </div>
            {isMine && 
                <div className="postcard-second-container">
                    <GoTrashcan onClick={() => handleDelete(comment.id)} />
                </div>
            }
                    
        </div>
    );
}

export default CommentCard;