
import Navbar from "Components/Navbar";
import Auth from "pages/Auth";
import Home from "pages/Home";
import Profile from "pages/Profile";
import UserDetails from "pages/UserDetails";
import Users from "pages/Users";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import history from "util/history";

const Routes = () => {

    return(
        <Router history={history}> 
            <div className="flex-direction-row">
                <Navbar/>

                <Switch>
                    <Redirect from='/' to='/home' exact />
                    <Route path="/home" exact>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"center", flex:"1", padding:"10px"}}>
                            <Home/>
                        </div>
                    </Route>

                    <Route path="/profile" exact>
                        <Profile/>
                    </Route>

                    <Route path="/users" exact>
                        <Users/>
                    </Route>

                    <Route path="/user/:userId">
                        <UserDetails/>
                    </Route>

                    <Redirect from='/auth' to='/auth/login' exact />
                    <Route path="/auth">
                        <div style={{display:"flex", alignItems:"center", justifyContent:"center", flex:"1", padding:"10px"}}>
                            <Auth/>
                        </div>
                    </Route>

                    <Redirect from="/admin" to="/admin/courses" exact />
                    <Route path="/admin">

                    </Route>


                </Switch>
            </div>
            
        </Router>
    );
}

export default Routes;