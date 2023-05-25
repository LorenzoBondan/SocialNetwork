import { AxiosRequestConfig } from "axios";
import { Comment } from "types";
import { requestBackend } from "util/requests";
import { GoTrashcan } from 'react-icons/go';

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
            <div className="postcard-second-container">
                <GoTrashcan onClick={() => handleDelete(comment.id)} />
            </div>
                    
        </div>
    );
}

export default CommentCard;