
import { Post } from 'types';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import CommentCard from 'Components/CommentCard';

type Props = {
    postId: number;
}

const PostCard = ({postId} : Props) => {

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

            {showLikes && 
                <div className='postcard-likes-zone'>
                    {post?.likes && post.likes.map(like => (
                        <div className='postcard-like' key={like.id}>
                            <img src={like.user.imgUrl} alt="" />
                            <p>{like.user.name}</p>
                        </div>
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