import { AxiosRequestConfig } from "axios";
import { useForm } from "react-hook-form";
import { Comment } from "types";
import { requestBackend } from "util/requests";
import './styles.css';

type FormData = {
    description: string;
    userId: number;
    postId : number;
}

type Props = {
    postId : number;
    userId : number;
    onInsertComment: (comment: Comment) => void;
}

const CommentForm = ( {userId, postId, onInsertComment}: Props ) => {
    
    const { register, handleSubmit, setValue} = useForm<FormData>();

    // evento de enviar formulário
    const onSubmit = (formData : FormData) => {

        formData.userId = userId;
        formData.postId = postId;

        const config: AxiosRequestConfig = {
            method: "POST",
            url: "/comments",
            data: formData,
            withCredentials: true,
        };

        requestBackend(config)
            .then((response) => {
                setValue("description", "");
                onInsertComment(response.data);
            })
            .catch((error) => {
                console.log("Error", error);
            })
    };

    return(
        <div className="comment-submit-card">

            <form onSubmit={handleSubmit(onSubmit)} className="comment-form">

                <input
                    {...register("description", {
                    required: "Required field,",
                    })}
                    id="input-comment"
                    type="description"
                    placeholder="Insert your comment here"
                    name="description"
                    className="base-input"
                />
                <div style={{display: "flex", justifyContent: "center"}}>

                <button className="btn btn-primary"><p>{'>'}</p></button>
        
                </div>
            </form>
        </div>
    );
}

export default CommentForm;