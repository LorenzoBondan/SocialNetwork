import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { requestBackend } from 'util/requests';
import { useState, useEffect } from 'react';
import './styles.css';
import { Post, User } from 'types';

type Props = {
    user: User;
}

const NewPostForm = ({user}:Props) => {

    const { register, handleSubmit, formState: {errors} } = useForm<Post>();

    const history = useHistory();

    // time //
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
    
        return () => clearInterval(interval);
    }, []);

    function convertToTimestamp(date: Date) {
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
      
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    }


    const onSubmit = (formData : Post) => {

        console.log("Hora: ", currentTime.toLocaleString());
        formData.date = convertToTimestamp(currentTime);
        formData.user = user;

        const params : AxiosRequestConfig = {
            method: "POST",
            url : "/posts",
            data: formData,
            withCredentials: true
        };

        requestBackend(params)
            .then(response => {
                console.log('success', response.data);
                history.push("/profile");
        })
    };

    const handleCancel = () => {
        history.push("/profile");
    }



    return(
        <div className='new-post-form-container'>
            <div className="base-card post-card-form-card">
                <h1>Add new Post</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row post-crud-inputs-container'>
                        <div className='col-lg-6 post-crud-inputs-left-container'>

                            <div className='margin-bottom-30'>
                                <label htmlFor="">Title</label>
                                <input 
                                    {...register("title", {
                                    required: 'Campo obrigatório',
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.title ? 'is-invalid' : ''}`}
                                    placeholder="Title"
                                    name="title"
                                />
                                <div className='invalid-feedback d-block'>{errors.title?.message}</div>
                            </div>

                            <div className='margin-bottom-30'>
                                <label htmlFor="">Description</label>
                                <input 
                                    {...register("description", {
                                    required: 'Campo obrigatório',
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.description ? 'is-invalid' : ''}`}
                                    placeholder="Description"
                                    name="description"
                                />
                                <div className='invalid-feedback d-block'>{errors.description?.message}</div>
                            </div>
                        </div>

                        <div className='post-crud-buttons-container'>
                            <button 
                                className='btn btn-outline-danger post-crud-buttons'
                                onClick={handleCancel}
                                >
                                CANCEL
                            </button>

                            <button className='btn btn-primary text-white post-crud-buttons'>POST</button>
                        </div>
                    </div>
                </form>
            
            </div>
        </div>
    );
}

export default NewPostForm;