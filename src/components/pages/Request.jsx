import React from 'react';
import {withRouter} from 'react-router';
import Sidebar from '../component/Sidebar';
import logo from "../img/bistrot.jpg";
import { BsCheck2Square } from 'react-icons/bs';
import { GrCheckbox } from 'react-icons/gr';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import API from '../../service/api';

class Request extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            id: 0,
            email: "",
            password: "",
            mesas: [],
            solicitudes: []
        }
    }

    componentDidMount(){
        console.log(this.props)
        if(this.props.user === undefined){this.props.history.push('/')}
        else{
            this.setState(state => ({id: this.props.user.id}));
            this.setState(state => ({email: !this.props.user.email}));
            this.setState(state => ({email: this.props.user.email}));
            this.setState(state => ({password: !this.props.user.pass}));
            this.setState(state => ({password: this.props.user.pass}));
            this.setState(state => ({mesas: !this.props.user.mesas}));
            this.setState(state => ({mesas: this.props.user.mesas}));
            const headers= {
                auth: {username: this.state.email, password: this.state.pass}
            }
            API.getAuth('mozo/'+this.props.user.id+'/solicitudes', headers)
            .then(res => {
                this.setState(state => ({solicitudes: res.data}))
            })
            .catch(err => console.log(err));
        }
    }

    renderEstado = (state) => state==='ACEPTADA'?  this.greenB() : state==='RECHAZADA'?  this.redB() : this.blackB()

    greenB = () => {
        return (
            <BsCheck2Square style={{color: "green", fontSize: "1.5em" }}/>
        )
    }

    redB = () => {
        return (
            <AiOutlineCloseSquare style={{color: "red", fontSize: "1.5em" }}/>
        )
    }

    blackB = () => {
        return (
            <GrCheckbox style={{color: "black", fontSize: "1.5em" }}/>
        )
    }

    viewRequest = (id) => {
        const info = {
            id: this.state.id,
            email: this.state.email, 
            pass: this.state.password,
            mesas: this.state.mesas,
            peticiones: this.state.solicitudes
        }
        this.props.history.push('/solicitud',
            {
                "info":info, 
                "solicitudId": id
            });
    }

    doDelete(id){
        console.log(this.props);
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
                {
                    //sidebar
                }
                <div>
                    <Sidebar
                        mesas={this.state.mesas} 
                        peticiones={this.state.solicitudes}
                        email={this.state.email}
                        pass={this.state.password}
                    />
                </div>

                {
                    // encabezado + tabla
                }
                <div className='card' 
                    style={{
                        marginTop: '2%',
                        marginLeft:'3%', 
                        marginRight:'3%', 
                        zIndex: '0', 
                        backgroundColor: 'rgba(179, 241, 178, 0.4)', 
                        borderRadius:'20px',
                    }}
                    >
                        <h1 style={{fontSize:'32px'}}>Solicitudes</h1>
                </div>

                <ul className='list-group list-group-flush' style={{backgroundColor: 'transparent', marginBottom: '0px'}}>
                    {this.state.solicitudes.map((sol, k) => {
                        return(<li key={k} className='list-group-item' style={{backgroundColor: 'transparent', border: '0px', marginBottom: '0px'}}>
                            <button type='button' className='btn btn-secondary' 
                                style={{
                                    width: '100%',
                                    borderRadius: '30px', marginBottom: '0px'
                                }}
                                onClick={() => this.viewRequest(sol.id)}
                            >
                                <div className="container">
                                    <div className="row">
                                        <div className="col-10" align='left'>
                                            <span> {sol.asunto} </span>
                                        </div>
                                        <div className="col-2" align='right'>
                                            {this.renderEstado(sol.estado)}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </li>)            
                    })}
                </ul>
                {
                    //boton de redactar
                }
                <div className="container">
                    <div className='btn-holder' 
                    style={{
                        bottom: '15%',
                        right: '8%'
                    }}>
                        <div className="">
                            <button 
                                className="btn btn-secondary"
                                onClick={() => console.log('estado', this.state)}
                            >
                                Redactar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Request);