import React from 'react';
import {withRouter} from 'react-router';
import Sidebar from '../component/Sidebar';
import logo from "../img/bistrot.jpg";
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import API from '../../service/api';

class Request extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            id: 0,
            email: "",
            password: "",
            mesas: [],
            solicitudes: [],
            deleteFlag: false
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


    toDeleteState = (sol) => this.state.deleteFlag? 
        <AiOutlineCloseSquare fontSize='2em' className='btnc'
            style={{zIndex:'10'}}
            onClick={() => {
                this.doDelete(sol);
            }}
        /> : ''

    renderEstado = (state, sol) => state==='ACEPTADA'?  this.greenB(sol) : state==='RECHAZADA'?  this.redB(sol) : this.blackB(sol)

    greenB = (sol) => {
        return (
            <div className="container">
                    <div className="row">
                        <div className="col-10" align='left'>
                            <button type='button' className='btn btn-success'
                                style={{
                                    width: '100%',
                                    borderRadius: '30px', 
                                    marginBottom: '0px', height: '50px'
                                }}
                                onClick={() => this.viewRequest(sol.id)}
                            >
                                <span> {sol.asunto} </span>
                            </button>
                        </div>
                        <div className="col-2" align='right'>
                            {this.toDeleteState(sol)}
                        </div>
                    </div>
                </div>
        )
    }

    redB = (sol) => {
        return (
            <div className="container">
                    <div className="row">
                        <div className="col-10" align='left'>
                            <button type='button' className='btn btn-danger'
                                style={{
                                    width: '100%',
                                    borderRadius: '30px', marginBottom: '0px', height: '50px'
                                }}
                                onClick={() => this.viewRequest(sol.id)}
                            >
                                <span> {sol.asunto} </span>
                            </button>
                        </div>
                        <div className="col-2" align='right'>
                            {this.toDeleteState(sol)}
                        </div>
                    </div>
                </div>
        )
    }

    blackB = (sol) => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-10" align='left'>
                        <button type='button' className='btn btn-secondary'
                            style={{
                                width: '100%',
                                borderRadius: '30px', marginBottom: '0px', height: '50px'
                            }}
                            onClick={() => this.viewRequest(sol.id)}
                        >
                            <span> {sol.asunto} </span>
                        </button>
                    </div>
                    <div className="col-2" align='right'>
                        {this.toDeleteState(sol)}
                    </div>
                </div>
            </div>
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

    doDelete(sol){
        const newReq = this.state.solicitudes.filter(req => req.id !== sol.id);
        this.setState(state => ({solicitudes: newReq}))
        const headers= {
            auth: {username: this.state.email, password: this.state.password}
        }
        //animacion spin
        API.deleteAuth('peticion/'+this.state.id+'/'+sol.id, headers)
        .then(res => 
            //animacion check
            console.log(res.data)
        )
        .catch(err => console.log(err))
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
                        id={this.state.id}
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
                        return(<li key={k} className='list-group-item' 
                            style={{
                                backgroundColor: 'transparent',
                                border: '0px', 
                                marginBottom: '0px',
                                height:'55px'
                            }}>
                            {this.renderEstado(sol.estado, sol)}
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
                        <div className="" style={{margin: '3%'}}>
                            <button 
                                className="btn btn-secondary"
                                onClick={() => console.log('estado', this.state)}
                            >
                                Redactar
                            </button>
                        </div>
                        <div className=''>
                            <button 
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        const newFlag= !this.state.deleteFlag; 
                                        this.setState(state => ({deleteFlag: newFlag}))}}
                                >
                                    <BsTrash color='red' fontSize='2em'/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Request);