import { AxiosRequestConfig } from "axios";
import { Comment, User } from "types";
import { requestBackend } from "util/requests";
import { GoTrashcan } from 'react-icons/go';
import { useEffect, useState, useCallback } from 'react';
import { getTokenData } from "util/auth";

type Props = {
    comment: Comment;
    onDelete : Function;
}

const CommentCard = ({comment, onDelete} : Props) => {

    const handleDelete = (commentId : number) => {
    
        if(!window.confirm("Are you sure that you want to delete this comment?")){ // messagebox
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

    const [isInMyPost, setIsInMyPost] = useState(false);

    const thisCommentIsInMyPost = useCallback(() => {
        if(user?.postsId.includes(comment.postId)){
            setIsInMyPost(true);
        }
        else{
            setIsInMyPost(false);
        }
    }, [comment.postId, user])

    useEffect(() => {
        user && 
        thisCommentIsInMyPost();
    }, [thisCommentIsInMyPost, user]);


    const [userOfComment, setUserOfComment] = useState<User>();

    const getUserOfComment = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/${comment.userId}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setUserOfComment(response.data);
          })
    }, [comment.userId])

    useEffect(() => {
      getUserOfComment();
    }, [getUserOfComment]);

    return(
        <div className='postcard-comment-zone'>
            <div className="postcard-first-container">
                <div className='postcard-comment-user-image'>
                    {userOfComment && <img src={userOfComment.imgUrl} alt="" />}
                </div>
                <div className='postcard-comment-description'>
                    {userOfComment && <span>{userOfComment.name}</span>}
                    <p>{comment.description}</p>
                </div>
            </div>
            {(isMine || isInMyPost) && 
                <div className="postcard-second-container">
                    <GoTrashcan onClick={() => handleDelete(comment.id)} />
                </div>
            }     
        </div>
    );
}

export default CommentCard;