
import { Post } from 'types';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

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

    return(
        <div className='postcard-container base-card'>
            <div className='postcard-content-container'>
                <h4>{post?.title}</h4>
                <p>{post?.description}</p>
            </div>
            <div className='postcard-likes'>
                <p>{post?.likes.length} likes</p>
            </div>
            <div className='postcard-comments'>
                {post?.commentaries.map(comment => (
                    <div className='postcard-comment-zone'>
                        <p>{comment.description}</p>
                        <p>Author: {comment.user.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostCard;