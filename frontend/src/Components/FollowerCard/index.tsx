import { User } from "types";
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";
import { Link } from "react-router-dom";

type Props = {
    followerId : number;
}

const FollowerCard = ({followerId} : Props) => {

    const [page, setPage] = useState<User>(); 

    const getUser = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/${followerId}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setPage(response.data);
          })
    }, [followerId])

    useEffect(() => {
        getUser();
    }, [getUser]);

    return(
        <div className="follower-card base-card">
            <Link to={`/user/${page?.id}`}>
                <img src={page?.imgUrl} alt="" />
                <p>{page?.name}</p>
            </Link>
        </div>
    );
}

export default FollowerCard;