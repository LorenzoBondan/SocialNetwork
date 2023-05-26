import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { requestBackend } from "util/requests";
import UserCrudCard from "../UserCrudCard";
import { SpringPage, User } from "types";

const List = () => {

    const [page, setPage] = useState<SpringPage<User>>();

    const getUsers = () => {
        const params : AxiosRequestConfig = {
            url: '/users',
            withCredentials: true,
          };
      
      
          requestBackend(params).then((response) => {
            setPage(response.data);
          });
    }

    useEffect(() => {
        getUsers();
    }, []);

    return(
        <div className='courses-crud-container'>
            <div className="courses-crud-bar-container">
                <Link to="/admin/users/create">
                    <button className="btn btn-primary btn-crud-add" style={{color:"white", marginBottom:"20px"}}>
                        ADD NEW USER
                    </button>
                </Link>
            </div>

            <div className='row'>
                {page?.content
                    .sort( (a,b) => a.name > b.name ? 1 : -1)
                    .map((item) => (
                        <div className="col-sm-4 col-md-4 col-lg-3 col-xl-2 user-crud-column" key={item.id}>
                            <UserCrudCard user={item} onDelete={() => getUsers()} />
                        </div>
                    ))
                }
            </div>
    </div>
    );
}

export default List;