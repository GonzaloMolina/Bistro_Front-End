import Home from './pages/Home';
import Table from './pages/Table';
import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import CreateOrder from './pages/CreateOrder';


export default class App extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/createOrder" render=
                        {props=> <CreateOrder content={ props.location.state }/>}
                    />

                    <Route path="/table" render=
                        {props=> <Table content={ props.location.state }/>}
                    />

                    <Route path="/" render=
                        {props => <Home user={ props.location.state }/>} 
                    />
                </Switch>
            </BrowserRouter>
        )
    }
}