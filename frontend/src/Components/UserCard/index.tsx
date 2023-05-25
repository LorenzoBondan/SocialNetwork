
import { User } from 'types';
import './styles.css';
import { Link } from 'react-router-dom';

type Props = {
    user: User;
    followerId : number | undefined;
}

const UserCard = ({user, followerId} : Props) => {

    const handleClick = () => {
        console.log("clicou");
    }

    return(
        <div className='usercard-container base-card'>
            <Link to={`/user/${user.id}`}>
                <div className='usercard-image'>
                    <img src={user.imgUrl} alt="" />
                </div>
            </Link>
            <div className='usercard-rigth'>
                <p>{user.name}</p>
                <button className='btn btn-primary' onClick={() => handleClick()}>Follow</button>
            </div>
        </div>
    );
}

export default UserCard;