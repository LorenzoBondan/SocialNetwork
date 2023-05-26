import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import { User } from "types";
import { requestBackend } from "util/requests";

type Props ={
    userId: number | undefined;  
}

const LikeCard = ({userId} : Props) => {

    const [user, setUser] = useState<User>();

    const getUserById = useCallback( () => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/${userId}`
        }
        requestBackend(params) 
          .then(response => {
            setUser(response.data);
          })
      }, [userId])

    useEffect(() => {
        getUserById();
    }, [getUserById]);

    return(
        <div className='postcard-like'>
            <img src={user?.imgUrl} alt="" />
            <p>{user?.name}</p>
        </div>
    );
}

export default LikeCard;