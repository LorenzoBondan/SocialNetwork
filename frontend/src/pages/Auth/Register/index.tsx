
import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { requestBackend } from 'util/requests';
import './styles.css';
import { User } from 'types';


const RegisterForm = () => {

    const { register, handleSubmit, formState: {errors} } = useForm<User>();

    const history = useHistory();

    const onSubmit = (formData : User) => {
        
        formData.roles = [ {id:3, authority:"ROLE_MEMBER"} ]; // todo usuário recém registrado começa como operator

        const params : AxiosRequestConfig = {
            method: "POST",
            url : "/users",
            data: formData,
            withCredentials: false
        };

        requestBackend(params)
            .then(response => {
                console.log('Sucesso', response.data);
                history.push("/admin/auth/login");
                toast.success("User registered!");
            })
            .catch(() => {
                toast.error('Erro ao cadastrar o User.');
            })
    };

    // botão de cancelar -> reenvia o usuário para a lista de produtos, saindo do form
    const handleCancel = () => {
        history.push("/")
    }

    return(
        <div className="students-crud-container">

            <div className="base-card students-card-form-card">
                <h1>REGISTER</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row students-crud-inputs-container'>
                        <div className='students-crud-inputs-left-container'>

                            <div className='margin-bottom-30'>
                                <label htmlFor="" style={{color:"black"}}>Name</label>
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
                                <label htmlFor="" style={{color:"black"}}>Email</label>
                                <input 
                                    {...register("email", {
                                    pattern: { 
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Insira um Email válido'
                                        }
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder="Email"
                                    name="email"
                                />
                                <div className='invalid-feedback d-block'>{errors.email?.message}</div>

                            </div>


                            <div className='margin-bottom-30'>
                                <label htmlFor="" style={{color:"black"}}>Password</label>
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

                        </div>

                        <div className='students-crud-buttons-container'>
                            <button 
                                className='btn btn-outline-danger students-crud-buttons'
                                onClick={handleCancel}
                                >
                                CANCELAR
                            </button>

                            <button className='btn btn-primary text-white students-crud-buttons'>SALVAR</button>

                        </div>

                
                    </div>
                </form>
            
            </div>
        </div>
    );
}

export default RegisterForm;