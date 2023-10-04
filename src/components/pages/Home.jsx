import React from 'react';
import {withRouter} from 'react-router';
import Sidebar from '../component/Sidebar';

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
        <div>
            <Sidebar 
                mesas={this.state.mesas} 
                peticiones={this.state.peticiones}
                email={this.state.email}
                pass={this.state.password}
            />
        </div>

      </React.Fragment>
    );
  } 
}

export default withRouter(Home);