import React from 'react';
import {withRouter} from 'react-router';
import Sidebar from '../component/Sidebar';
import Feed from '../component/Feed';
import ErrorMessage from '../component/ErrorMessage';
import logo from "../img/bistrot.jpg";


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            id: 0,
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            jefe: "",
            mesas: [],
            solicitudes: []
        }
    }

    componentDidMount(){
        if(this.props.user === undefined){this.props.history.push('/')}
        else{
            this.setState(state => ({id: this.props.user.id}));
            this.setState(state => ({jefe: this.props.user.jafe}));
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
            this.setState(state => ({solicitudes: this.props.user.peticiones.reverse()}));
        }
    }

    renderFeedReq(){
        if(this.state.solicitudes.length === 0){
            return (
                <div
                    style={{
                        margin: '5%',
                        zIndex: '0', 
                    }}
                >
                    <ErrorMessage error={"No hay una solicitudes que mostrar"} />
                </div>
            )
        }
        else{
            return (
                <div>
                    <Feed solicitudes={this.state.solicitudes}/>
                </div>
            )
        }
    }
    
    render() {
    return (
      <React.Fragment>
        <div style={{
                        backgroundImage: `url(${logo})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        width: '100vw',
                        height: '100vh',
                        zIndex: '-10'
        }}
        >
            <div>
                <Sidebar
                    id={this.state.id}
                    mesas={this.state.mesas} 
                    peticiones={this.state.solicitudes}
                    email={this.state.email}
                    jefe={this.state.jefe}
                    pass={this.state.password}
                />

                <div className='card' style={{margin: '5%', marginBottom: '10%', marginLeft:'20%', marginRight:'20%', zIndex: '0', backgroundColor: 'rgba(179, 241, 178, 0.5)', borderRadius:'10px'}}>
                    <h1>Bienvenido</h1>
                    <h2>{this.state.apellido+ ', '+ this.state.nombre}</h2>
                </div>
            </div>

            {this.renderFeedReq()}
        </div>
        
      </React.Fragment>
    );
  } 
}

export default withRouter(Home);