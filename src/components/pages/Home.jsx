import React from 'react';
import {withRouter} from 'react-router';
import Sidebar from '../component/Sidebar';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            nombre: "Fidel",
            apellido: "Martinez",
            email: "admin@mail.com",
            password: "public123",
            mesas: [
                5,
                6
            ],
            peticiones: [
                {
                    "id": 7,
                    "asunto": "Licencia por enfermedad",
                    "estado": false
                }
            ]
        }
    }

    componentDidMount(){
        /*
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
        this.setState(state => ({peticiones: this.props.user.peticiones}));*/
    }
    
   render() {
    return (
      <React.Fragment>
        <div>
            
        </div>

        <div>
            <Sidebar 
                mesas={this.state.mesas} 
                peticiones={this.state.peticiones}
                credenciales={{email:this.state.email, pass:this.state.password}}
            />
        </div>
      </React.Fragment>
    );
  } 
}

export default withRouter(Home);