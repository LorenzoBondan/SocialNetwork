import { NavLink } from 'react-router-dom';
import { hasAnyRoles } from 'util/auth';
import logo from 'assets/images/sn-logo.png'
import { AiOutlineHome } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { HiOutlineUsers } from 'react-icons/hi';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';

import './styles.css';

const Navbar = () => {
    return(
        <nav className='admin-nav-container'>
            <div className='navbar-title'>
                <img src={logo} alt="logo" />
                <h1 className='title'><div style={{color:"#E74A7D"}}>Social</div><div style={{color:"#7D5889"}}>Network</div></h1>
            </div>

            <ul className='ul-container'>
                {!hasAnyRoles(['ROLE_OPERATOR']) ? (
                <>
                <li>
                    <NavLink to="/" exact className='admin-nav-item'>
                        <AiOutlineHome style={{color:"#7D5889", marginRight:"8px"}}/>
                        <p>Home</p>
                    </NavLink>
                </li>
                
                <li>
                    <NavLink to="/profile" className='admin-nav-item'>
                        <CgProfile style={{color:"#7D5889", marginRight:"8px"}}/>
                        <p>Profile</p>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/users" className='admin-nav-item'>
                        <HiOutlineUsers style={{color:"#7D5889", marginRight:"8px"}}/>
                        <p>Users</p>
                    </NavLink>
                </li>

                { hasAnyRoles(['ROLE_ADMIN']) && ( 
                    <li>
                        <NavLink to="/admin" className='admin-nav-item'>
                            <MdOutlineAdminPanelSettings style={{color:"#7D5889", marginRight:"8px"}}/>
                            <p>Admin</p>
                        </NavLink>
                    </li>   
                )}
                </>
                ) : (
                    <div>login</div>
                )}

            </ul>
        </nav>
        

    );
}

export default Navbar;