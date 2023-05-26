import { AxiosRequestConfig } from "axios";
import { useForm } from "react-hook-form";
import { Comment, User } from "types";
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
                console.log("comment added")
            })
            .catch((error) => {
                console.log("Error", error);
            })
    };

    return(
        <div className="review-submit-card">

            <form onSubmit={handleSubmit(onSubmit)}>

                <input
                    {...register("description", {
                    required: "Required field,",
                    })}
                    id="input-review"
                    type="description"
                    placeholder="Insert your review here"
                    name="description"
                />
                <div style={{display: "flex", justifyContent: "center"}}>

                <button>Save Comment</button>
        
                </div>
            </form>
        </div>
    );
}

export default CommentForm;