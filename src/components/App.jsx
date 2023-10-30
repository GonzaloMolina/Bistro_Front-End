import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/empleado/Home';
import LogIn from './pages/empleado/LogIn';
import Table from './pages/empleado/Table';
import CreateOrder from './pages/empleado/CreateOrder';
import View from './pages/empleado/View';
import Request from './pages/empleado/Request';
import ViewRequest from './pages/empleado/ViewRequest';
import CreateRequest from './pages/empleado/CreateRequest';
import Info from './pages/empleado/Info';

import LogInAdmin from './pages/admin/LogInAdmin';
import HomeAdmin from './pages/admin/HomeAdmin';

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
                    <Route path="/view" render=
                        {props => <View  content={props.location.state}/>} 
                    />
                </Switch>

                <Switch>
                    <Route exact path="/create" render=
                        {props => <CreateOrder  content={props.location.state}/>} 
                    />
                </Switch>

                <Switch>
                    <Route exact path="/table" render=
                        {props => <Table  content={props.location.state}/>} 
                    />
                </Switch>

                <Switch>
                    <Route exact path="/solicitudes" render=
                        {props => <Request  user={props.location.state}/>} 
                    />
                </Switch>

                <Switch>
                    <Route exact path="/solicitud" render=
                        {props => <ViewRequest content={props.location.state}/> } 
                    />
                </Switch>

                <Switch>
                    <Route exact path="/redactar" render=
                        {props => <CreateRequest content={props.location.state}/> } 
                    />
                </Switch>

                <Switch>
                    <Route exact path="/info" render=
                        {props => <Info content={props.location.state}/> } 
                    />
                </Switch>

                <Switch>
                    <Route exact path="/" render=
                        {props => <LogIn {...props}/>} 
                    />
                </Switch>

                <Switch>
                    <Route exact path="/admin/home" render=
                        {props => <HomeAdmin content={props.location.state}/>} 
                    />
                </Switch>

                <Switch>
                    <Route exact path="/admin/" render=
                        {props => <LogInAdmin {...props}/>} 
                    />
                </Switch>
            </BrowserRouter>
        )
    }
}