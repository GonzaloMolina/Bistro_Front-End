import React from 'react';
import {withRouter} from 'react-router';
import Sidebar from '../component/Sidebar';

import logo from "../img/bistrot.jpg";


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            mesas: [],
            peticiones: []
        }
    }

    componentDidMount(){
        if(this.props.user === undefined){this.props.history.push('/')}
        else{
            this.setState(state => ({nombre: !this.props.user.nombre}));
            this.setState(state => ({nombre: this.props.user.nombre}));
            this.setState(state => ({apellido: !this.props.user.apellido}));
            this.setState(state => ({apellido: this.props.user.apellido}));
            this.setState(state => ({email: !this.props.user.email}));
            this.setState(state => ({email: this.props.user.email}));
            this.setState(state => ({password: !this.props.user.password}));
            this.setState(state => ({password: this.props.user.password}));
            this.setState(state => ({mesas: !this.props.user.mesas}));
            this.setState(state => ({mesas: this.props.user.mesas}));
            this.setState(state => ({peticiones: !this.props.user.peticiones}));
            this.setState(state => ({peticiones: this.props.user.peticiones}));
        }
    }
    
   render() {
    return (
      <React.Fragment>
        <div style={{
                        backgroundImage: `url(${logo})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'auto cover',
                        backgroundRepeat: 'no-repeat',
                        width: '100vw',
                        height: '100vh',
                        zIndex: '-10'
        }}
        >
            <div>
                <Sidebar 
                    mesas={this.state.mesas} 
                    peticiones={this.state.peticiones}
                    email={this.state.email}
                    pass={this.state.password}
                />

                <div className='card' style={{margin: '5%', marginLeft:'20%', marginRight:'20%', zIndex: '0', backgroundColor: 'white'}}>
                    <h2>Bienvenido</h2>
                    <h4>{this.state.apellido+ ', '+ this.state.nombre}</h4>
                </div>
            </div>
        </div>
        
      </React.Fragment>
    );
  } 
}

export default withRouter(Home);