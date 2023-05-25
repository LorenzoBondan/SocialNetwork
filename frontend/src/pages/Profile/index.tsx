import './styles.css';
import { useContext, useEffect } from 'react';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';
import ProfileCard from 'Components/ProfileCard';

const Profile = () => {

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

          let email;

          authContextData.authenticated && (
             authContextData.tokenData?.user_name && (
             email = authContextData.tokenData?.user_name)) 

    return(
        <div className='profile-container'>
            <ProfileCard userEmail={email}/>
        </div>
    );
}

export default Profile;