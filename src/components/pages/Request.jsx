import React from 'react';
import {withRouter} from 'react-router';
import Sidebar from '../component/Sidebar';
import logo from "../img/bistrot.jpg";

class Request extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            mesas: [],
            solicitudes: []
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
            this.setState(state => ({solicitudes: !this.props.user.peticiones}));
            this.setState(state => ({solicitudes: this.props.user.peticiones}));
        }
    }

    render(){
        return (
            <div style={{
                backgroundImage: `url(${logo})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh',
                zIndex: '-10'
            }}>
                <div>
                    <Sidebar
                        mesas={this.state.mesas} 
                        peticiones={this.state.solicitudes}
                        email={this.state.email}
                        pass={this.state.password}
                    />
                </div>


            </div>
        )
    }
}

export default withRouter(Request);