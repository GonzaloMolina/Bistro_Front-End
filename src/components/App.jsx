import Home from './pages/Home';
import Table from './pages/Table';
import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';


export default class App extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/table" render=
                        {props=> <Table mozo={ props.location.state }/>}
                    />

                    <Route path="/" render=
                        {props => <Home user={ props.location.state }/>} 
                    />
                </Switch>
            </BrowserRouter>
        )
    }
}