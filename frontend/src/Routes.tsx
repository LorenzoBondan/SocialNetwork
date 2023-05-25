
import Navbar from "Components/Navbar";
import Home from "pages/Home";
import { Redirect, Route, Router, Switch } from "react-router-dom";

import history from "util/history";

const Routes = () => {

    return(
        <Router history={history}> 
            <div className="flex-direction-row">
                <Navbar/>

                <Switch>

                    <Route path="/" exact>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"center", flex:"1", padding:"10px"}}><Home/></div>
                    </Route>

                    <Route path="/courses" exact>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>

                        </div>
                        
                    </Route>

                    <Route path="/courses/:courseId">

                    </Route>

                    <Redirect from='/admin/auth' to='/admin/auth/login' exact />
                    <Route path="/admin/auth">

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