
import { Comment, Post, User } from 'types';
import './styles.css';
import { useCallback, useEffect, useState, useContext } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import CommentCard from 'Components/CommentCard';
import { GoTrashcan } from 'react-icons/go';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';
import LikeCard from 'Components/LikeCard';
import like from 'assets/images/like.png';
import likeFilled from 'assets/images/like_filled.png';
import commentIcon from 'assets/images/comment.png';
import CommentForm from 'Components/CommentForm';

type Props = {
    postId: number;
    onDelete : Function;
    userLogged : User;
}

const PostCard = ({postId, onDelete, userLogged} : Props) => {

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

    const [post, setPost] = useState<Post>();

    const getPostById = useCallback( () => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/posts/${postId}`
        }
        requestBackend(params) 
          .then(response => {
            setPost(response.data);
          })
      }, [postId])

    useEffect(() => {
        getPostById();
    }, [getPostById]);

    const formatDate = (date : string) => {
        const fullDate = date.substring(0,10).replaceAll("-", "/");
        const dayAndMonth = fullDate.substring(5,10);
        const year = fullDate.substring(0,4);
        const time = date.substring(11,16);
        return `${dayAndMonth}/${year} at ${time}`;
    }

    const [showComments, setShowComments] = useState(false);

    const openAndCloseComments = () => {
        if(showComments){
            setShowComments(false);
        }
        else{
            setShowComments(true);
            setShowLikes(false); // just to don't stay with both opened
        }
    }

    const [showLikes, setShowLikes] = useState(false);

    const openAndCloseLikes = () => {
        if(showLikes){
            setShowLikes(false);
        }
        else{
            setShowLikes(true);
            setShowComments(false); // just to don't stay with both opened
        }
    }

    const [quantityLikes, setQuantityLikes] = useState(false);

    const checkQuantityLikes = (number : number) => {
            if(number > 1){
                setQuantityLikes(true);
            }
            else{
                setQuantityLikes(false);
            }
    }

    const [quantityComments, setQuantityComments] = useState(false);

    const checkQuantityComments = (number : number) => {
            if(number > 1){
                setQuantityComments(true);
            }
            else{
                setQuantityComments(false);
            }
    }

    useEffect(() => {
        post?.likes && checkQuantityLikes(post?.likes.length);
        post?.comments && checkQuantityComments(post?.comments.length);
    })

    const handleDelete = (postId : number) => {
    
        if(!window.confirm("Are you sure that you want to delete the post?")){ // messagebox
          return;
        }
    
        const params : AxiosRequestConfig = {
          method:"DELETE",
          url: `/posts/${postId}`,
          withCredentials: true
        }
    
        requestBackend(params).then(() => {
          onDelete();
        })
      }

    /**/

    const [isMine, setIsMine] = useState(false);

    const testIfThisPostIsMine = useCallback(() => {

        if(user && user.postsId.includes(postId)){
            setIsMine(true);
        }
        else{
            setIsMine(false);
        }
    }, [user, postId])

    useEffect(() => {
        user && 
        testIfThisPostIsMine();
    }, [testIfThisPostIsMine, user]);

     /**/

     const [isLiked, setIsLiked] = useState(false);

     const testIfIsLiked = useCallback(() => {
        const likesId = post?.likes.map(like => like.id);
          if(likesId && likesId.includes(userLogged.id)){
              setIsLiked(true);
          }
          else{
              setIsLiked(false);
          }
          
      }, [post, userLogged])
 
     const likePost = (user : User, postId : number) => {
 
         user.postsLikedId.includes(postId);
 
         const params : AxiosRequestConfig = {
           method:"PUT",
           url: `/users/like/${user.id}/${postId}`,
           withCredentials:true
         }
         requestBackend(params) 
           .then(response => {
             setIsLiked(true);
             getPostById();
           })
     }
 
     const dislikePost = (user : User, postId : number) => {
 
         const params : AxiosRequestConfig = {
             method:"PUT",
             url: `/users/dislike/${user.id}/${postId}`,
           withCredentials:true
         }
         requestBackend(params) 
           .then(response => {
             setIsLiked(false);
             getPostById();
           })
     }

     useEffect(() => {
        testIfIsLiked();
    }, [testIfIsLiked]);


    /**/

    const [comments, setComments] = useState<Comment[]>([]); //recebe a lista de reviews obtida na requisição.

    const getComments = useCallback(() => {
        const params: AxiosRequestConfig = {
            url: `/comments/${postId}`,
            withCredentials: false,
          }
  
          requestBackend(params).then((response) => {
            setComments(response.data);
            });
    }, [postId])

    useEffect(() => {
        getComments();
    }, [getComments]);


    const handleInsertComment = (comment: Comment) => {
        const clone = [...comments]; // copia o conteúdo que já tem
        clone.push(comment); // insere o novo conteúdo naquele copiado
        setComments(clone); // define o conteúdo copiado
        getPostById();
    };

    /////

    const [showCommentForm, setShowCommentForm] = useState(false);

    const openAndCloseCommentForm = () => {
        if(showCommentForm){
            setShowCommentForm(false);
        }
        else{
            setShowCommentForm(true);
        }
    }

    return(
        <div className='postcard-container base-card'>
            <div className='postcard-content-container'>
                <div className='postcard-content-container-user'>
                    <img src={post?.user.imgUrl} alt="" />
                    <h4>{post?.user.name}</h4>
                </div>
                <h5>{post?.title}</h5>
                <p>{post?.description}</p>
                <p className='postcard-date'>{post?.date && formatDate(post.date)}</p>
            </div>

            <div>
                {post && 
                    <div className='postcard-like-zone'>
                        {isLiked ? (
                            <img src={likeFilled} alt="" onClick={() => user && dislikePost(user, post.id)}/>
                            ) : (
                            <img src={like} alt="" onClick={() => user && likePost(user, post.id)}/>
                        )}

                        <img src={commentIcon} alt="" onClick={() => openAndCloseCommentForm()}/>

                        {userLogged && showCommentForm && 
                            <CommentForm userId={userLogged.id} postId={postId} onInsertComment={handleInsertComment}/>
                        }
                    </div>
                }
            </div>

            <div className='postcard-bottom-container'>
                <div className='postcard-likes-comments-info'>
                    {quantityLikes ? (
                        <p onClick={openAndCloseLikes}>{post?.likes.length} likes</p>
                    ) : (
                        <p onClick={openAndCloseLikes}>{post?.likes.length} like</p>
                    )}
                    {quantityComments ? (
                        <p onClick={openAndCloseComments}>{post?.comments.length} comments</p>
                    ) : (
                        <p onClick={openAndCloseComments}>{post?.comments.length} comment</p>
                    )}
                </div>
                {isMine && 
                    <div className='postcard-delete'>
                        <GoTrashcan onClick={() => post?.id && handleDelete(post.id)} />
                    </div>
                }
            </div>

            {showLikes && 
                <div className='postcard-likes-zone'>
                    {post?.likes && post.likes.map(like => (
                        <LikeCard userId={like.id}/>
                    ))}
                </div>
            }

            {showComments && 
                <div className='postcard-comments'>
                    {post?.comments && post.comments.map(comment => (
                        <CommentCard comment={comment} onDelete={() => getPostById()} key={comment.id}/>
                    ))}
                </div>
            }
        </div>
    );
}

export default PostCard;