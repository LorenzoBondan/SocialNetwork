
import { Like, Post, User } from 'types';
import './styles.css';
import { useCallback, useEffect, useState, useContext } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import CommentCard from 'Components/CommentCard';
import { GoTrashcan } from 'react-icons/go';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';
import like from 'assets/images/like.png';
import likeFilled from 'assets/images/like_filled.png';
import comment from 'assets/images/comment.png';
import LikeCard from 'Components/LikeCard';

type Props = {
    postId: number;
    onDelete : Function;
}

const PostCard = ({postId, onDelete} : Props) => {

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

    const likePost = (formData : Like) => {

        formData.postId = 1;
        formData.userId = 1;

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
            <div className='postcard-like-zone'>
                {isLiked ? (
                    <img src={likeFilled} alt="" />
                ) : (
                    <img src={like} alt="" onClick={() => likePost}/>
                )}
                
                <img src={comment} alt="" />
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
                        <LikeCard userId={like.userId}/>
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