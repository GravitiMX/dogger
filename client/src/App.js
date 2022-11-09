import React from 'react';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom'
import { Navbar } from './components'
import {
  Home,
  LogIn,
  LogUp,
  DashboardUser,
  RegisterDog,
  ScheduledWalker,
  DashboardWalker,
  RegisterSize,
} from './containers';

import Cookies from 'universal-cookie';
import RegisterSchedule from './containers/registerSchedule';
import SelectAnidados from './components/select';

const cookies = new Cookies();



const AuthRoute = ({ isLogged }) => (
  
  <Route path="/dashboard">
    {
      isLogged
      ? (<>
          <h6>Dashboard</h6>
          <DashboardUser />
        </>
        )
      : (
          <Redirect
            to={{
              pathname:'/'
            }}
          />
        )
    }
  </Route>
)

function App(props) {
  console.log(props.isLogged)
  const { isLogged } = props
  return (
    <Router>
      <div className='principal-container'>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/log-in">
            <LogIn />
          </Route>
          <Route path="/log-up">
            <LogUp />
          </Route>

          <Route path= "/dashboarduser">
            <DashboardUser />
          </Route>

          <Route path = "/registrarPerro">
            <RegisterDog>
              
            </RegisterDog>
          </Route>
          <Route path="/registerSize">
            <RegisterSize>

            </RegisterSize>
          </Route>
          
          
          <Route path= "/registrarSchedule">
            <RegisterSchedule>
              
            </RegisterSchedule>
          </Route>
          
          <Route path = "/agendarPaseador">
            <ScheduledWalker/>
          </Route>

          <Route path = "/dashboardwalker">
            <DashboardWalker>
              
            </DashboardWalker>
          </Route>
            

          <AuthRoute 
            isLogged={isLogged}
           
          />
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = ({ account }) => ({
  isLogged: account.isLogged
})

export default connect(mapStateToProps)(App);
