
import Navbar from "Components/Navbar";
import { Redirect, Route, Router, Switch } from "react-router-dom";

import history from "util/history";

const Routes = () => {

    return(
        <Router history={history}> 
            <Navbar/>

            <Switch>

                <Route path="/" exact>

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


        </Router>
    );
}

export default Routes;