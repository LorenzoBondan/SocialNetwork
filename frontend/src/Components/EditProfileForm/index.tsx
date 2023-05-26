
import { useEffect } from 'react';
import './styles.css';
import { requestBackend } from 'util/requests';
import { User } from 'types';
import { useForm } from 'react-hook-form';
import { AxiosRequestConfig } from 'axios';
import history from 'util/history';


type Props = {
    userId : number;
}

const EditProfileForm = ({userId} : Props) => {

    const { register, handleSubmit, formState: {errors}, setValue } = useForm<User>();

    useEffect(() => {
        requestBackend({url:`/users/${userId}`, withCredentials:true})
            .then((response) => {
                const user = response.data as User;

                setValue('name', user.name);
                setValue('password', user.password);
                setValue('imgUrl', user.imgUrl);
                setValue('bio', user.bio);

                // not editable values
                setValue('email', user.email);
                setValue('commentsId', user.commentsId);
                setValue('followersId', user.followersId);
                setValue('followingId', user.followingId);
                setValue('postsId', user.postsId);
                setValue('postsLikedId', user.postsLikedId);
                setValue('roles', user.roles);
                setValue('verified', user.verified);
            })
        
    }, [userId, setValue]);

    const onSubmit = (formData : User) => {

        const params : AxiosRequestConfig = {
            method: "PUT",
            url : `/users/${userId}`,
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
        <div className="edit-profile-form-container">
            <div className="base-card post-card-form-card">
                <h1>Edit Profile</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row post-crud-inputs-container'>
                        <div className='post-crud-inputs-left-container'>

                            <div className='margin-bottom-30'>
                                <label htmlFor="">Name</label>
                                <input 
                                    {...register("name", {
                                    required: 'Campo obrigatório',
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.name ? 'is-invalid' : ''}`}
                                    placeholder="Name"
                                    name="name"
                                />
                                <div className='invalid-feedback d-block'>{errors.name?.message}</div>
                            </div>

                            <div className='margin-bottom-30'>
                                <label htmlFor="">Bio</label>
                                <textarea 
                                    rows={10}
                                    {...register("bio", {
                                    required: 'Campo obrigatório',
                                    })}
                                    className={`form-control base-input description-input ${errors.bio ? 'is-invalid' : ''}`}
                                    placeholder="Bio"
                                    name="bio"
                                />
                                <div className='invalid-feedback d-block'>{errors.bio?.message}</div>
                            </div>
                        </div>

                        <div className='margin-bottom-30'>
                            <label htmlFor="">Password</label>
                                <input 
                                    {...register("password", {
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder="Password"
                                    name="password"
                                />
                                <div className='invalid-feedback d-block'>{errors.password?.message}</div>
                        </div>

                        <div className='margin-bottom-30'>
                            <label htmlFor="" style={{color:"white"}}>Img Url</label>  
                                <input 
                                    {...register("imgUrl", {
                                    required: 'Campo obrigatório',
                                    pattern: { 
                                        value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                                        message: 'Insira uma URL válida'
                                    }
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.imgUrl ? 'is-invalid' : ''}`}
                                    placeholder="URL of course's image"
                                    name="imgUrl"
                                />
                                <div className='invalid-feedback d-block'>{errors.imgUrl?.message}</div>
                        </div>

                        <div className='post-crud-buttons-container'>
                            <button 
                                className='btn btn-outline-danger post-crud-buttons'
                                onClick={handleCancel}
                                >
                                CANCEL
                            </button>

                            <button className='btn btn-primary text-white post-crud-buttons'>SAVE</button>
                        </div>
                    </div>
                </form>
            
            </div>
        </div>
    );
}

export default EditProfileForm;