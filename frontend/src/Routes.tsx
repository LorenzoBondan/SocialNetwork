
import Navbar from "Components/Navbar";
import Auth from "pages/Auth";
import Home from "pages/Home";
import { Redirect, Route, Router, Switch } from "react-router-dom";

import history from "util/history";

const Routes = () => {

    return(
        <Router history={history}> 
            <div className="flex-direction-row">
                <Navbar/>

                <Switch>

                    <Route path="/home" exact>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"center", flex:"1", padding:"10px"}}>
                            <Home/>
                        </div>
                    </Route>

                    <Route path="/courses" exact>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>

                        </div>
                    </Route>

                    <Route path="/courses/:courseId">

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

                    <Route path="/profile">

                    </Route>

                </Switch>
            </div>
            
        </Router>
    );
}

export default Routes;