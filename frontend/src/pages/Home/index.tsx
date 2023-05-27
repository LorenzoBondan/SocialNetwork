import logo from 'assets/images/sn-logo.png'
import './styles.css';
import { Link } from 'react-router-dom';


const Home = () => {
    return(
        <div className='home-page'>
            <div className="home-container base-card">
                <div className='home-first-container'>
                    <h1>Hello, welcome to SocialNetwork</h1>
                    <p>A social media where you can find all of your friends and share everything about your life with them!</p>
                </div>
                <div className='home-second-container'>
                    <div className='home-second-container-logo'>
                        <img src={logo} alt="logo" />
                    </div>
                    <div className='home-second-container-content'>
                        <span className="not-registered">Do you have already an account?</span>
                        <Link to="/auth/login" className="login-link-register">
                            SIGN IN
                        </Link>
                        <span className="not-registered">Don't have an account?</span>
                        <Link to="/auth/signup" className="login-link-register">
                            REGISTER NOW
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;