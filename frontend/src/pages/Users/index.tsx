
import { SpringPage, User } from 'types';
import './styles.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import UserCard from 'Components/UserCard';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';
import UserFilter, { UserFilterData } from 'Components/UserFilter';
import Pagination from 'Components/Pagination';

type ControlComponentsData = {
  activePage: number;
  filterData: UserFilterData;
}

const Users = () => {

    // pagination and filter
    const [controlComponentsData, setControlComponentsData] = useState<ControlComponentsData>({activePage:0, filterData: { name: '' },});

    const handlePageChange = (pageNumber : number) => {
      setControlComponentsData({activePage: pageNumber, filterData: controlComponentsData.filterData});
    }



    const [page, setPage] = useState<SpringPage<User>>();

    const getUsers = useCallback(() => {
      const params : AxiosRequestConfig = {
        method:"GET",
        url: "/users",
        params: {
          page: controlComponentsData.activePage,
          size: 4,
  
          name: controlComponentsData.filterData.name
        },
      }
    
      requestBackend(params) 
        .then(response => {
          setPage(response.data);
          window.scrollTo(0, 0);
        })
    }, [controlComponentsData])
  
    useEffect(() => {
      getUsers();
    }, [getUsers]);

    // getting the email
    const { authContextData, setAuthContextData } = useContext(AuthContext);

    useEffect(() => {
        if(isAuthenticated()){
          setAuthContextData({
            authenticated: true,
            tokenData: getTokenData()
          })
        }
        else{
          setAuthContextData({
            authenticated: false,
          })
        }
    }, [setAuthContextData]);

    let email: string;

    authContextData.authenticated && (
        authContextData.tokenData?.user_name && (
        email = authContextData.tokenData?.user_name)) 
    
    // then, getting the user Id by email
    
    const [user, setUser] = useState<User>();

    const getUser = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/email/${email}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setUser(response.data);
          })
    }, [])

    useEffect(() => {
        getUser();
    }, [getUser]);

    const handleSubmitFilter = (data : UserFilterData) => {
      setControlComponentsData({activePage: 0, filterData: data});
    }

    return(
        <div className='users-container'>
            <div className='users-search-bar-container'>
              <UserFilter onSubmitFilter={handleSubmitFilter} />
            </div>

            <div className="row" style={{width:"100%"}}>
                {page?.content
                .sort((a,b) => a.name > b.name ? 1 : -1)
                .map(u => (
                    <div className="col-sm-6 col-lg-6 col-xl-2 users-column" key={u.id}>
                        {user && 
                            <UserCard user={u} followerId={user?.id}/>
                        }
                    </div>
                ))}
            </div>

            <Pagination 
              pageCount={(page) ? page.totalPages : 0} 
              range={2}
              onChange={handlePageChange}
              forcePage={page?.number}
            />

        </div>
    );
}


export default Users;