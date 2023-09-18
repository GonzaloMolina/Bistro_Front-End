import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';


export default class App extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/home" render=
                        {props => <Home  user={props.location.state}/>} 
                    />
                </Switch>

                <Switch>
                    <Route exact path="/" render=
                        {props => <LogIn {...props}/>} 
                    />
                </Switch>
            </BrowserRouter>
        )
    }
}