import React from 'react';
import {withRouter} from 'react-router';
import Sidebar from '../../component/Sidebar';
import logo from "../../img/bistrot.jpg";
import logo2 from '../../img/bistrot2.jpeg';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import ErrorMessage from '../../component/ErrorMessage';
import spin from '../../img/Animation -SpinLoading.json';
import Lottie from 'lottie-react';
import API from '../../../service/api';
import { wait } from '@testing-library/user-event/dist/utils';

class Request extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            id: 0,
            email: "",
            password: "",
            mesas: [],
            solicitudes: [],
            jefe: "",
            flag:false,
            index: Math.floor(Math.random() * 2)
        }
    }

    componentDidMount(){
        console.log(this.props)
        if(this.props.user.jefe === undefined){this.props.history.push('/')}
        else{
            this.setState(state => ({id: this.props.user.id}));
            this.setState(state => ({jefe: this.props.user.jefe}));
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
                this.setState(state => ({solicitudes: res.data.reverse()}))
                wait(2000).then(res => this.setState(state => ({flag: true})))
            })
            .catch(err => console.log(err));
        }
    }

    componentDidUpdate(){}

    renderEstado = (state, sol) => state==='ACEPTADA'?  this.greenB(sol) : state==='RECHAZADA'?  this.redB(sol) : this.blackB(sol)
    
    renderDBotton(sol){
        return (
            <button type='button' className='btn-secondary'
                onClick={() => {this.doDelete(sol);}}
                style={{zIndex:'0', borderRadius: '10px', 
                    backgroundColor:'rgb(107, 116, 125)', border:'0px',
                    marginRight:'5px', marginLeft:'2px',
                    borderTopRightRadius:'30px',
                    borderBottomRightRadius:'30px',
                }}
            >
                <AiOutlineCloseSquare 
                color='red'
                fontSize='2em'
                style={{zIndex:'0', 
                    borderRadius: '10px', 
                    margin:'0px'
                }}
            />
            </button>
        )
    }

    greenB = (sol) => {
        return (
        <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" 
                style={{flexDirection: 'column', marginTop: '2%'}}>
                <div className="btn-group mr-2 flex-wrap" role="group" aria-label="First group"
                    style={{marginBottom:'0px',marginTop:'2px'}}>
                    <button type='button' className='btn btn-success'
                            style={{
                                borderRadius: '10px',
                                borderTopLeftRadius:'30px',
                                borderBottomLeftRadius:'30px',
                                marginBottom: '0px', height: '50px',
                            }}
                            onClick={() => this.viewRequest(sol.id)}
                        >
                            <span style={{display: 'block'}}> {sol.asunto} </span>
                        </button>
                    
                        {this.renderDBotton(sol)}
                </div>
        </div>
        )
    }

    redB = (sol) => {
        return (
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" 
                style={{flexDirection: 'column', marginTop: '2%'}}>
                <div className="btn-group mr-2 flex-wrap" role="group" aria-label="First group"
                    style={{marginBottom:'0px',marginTop:'2px'}}>
                    <button type='button' className='btn btn-danger'
                            style={{
                                borderRadius: '10px',
                                marginBottom: '0px', height: '50px',
                                borderTopLeftRadius:'30px',
                                borderBottomLeftRadius:'30px',
                            }}
                            onClick={() => this.viewRequest(sol.id)}
                        >
                            <span> {sol.asunto} </span>
                        </button>
                    
                        {this.renderDBotton(sol)}
                </div>
        </div>
        )
    }

    blackB = (sol) => {
        return (
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" 
                style={{flexDirection: 'column', marginTop: '2%'}}>
                <div className="btn-group mr-2 flex-wrap" role="group" aria-label="First group"
                    style={{marginBottom:'0px',marginTop:'2px'}}>
                    <button type='button' className='btn btn-secondary'
                            style={{
                                borderRadius: '10px', 
                                marginBottom: '0px', height: '50px',
                                borderTopLeftRadius:'30px',
                                borderBottomLeftRadius:'30px',
                            }}
                            onClick={() => this.viewRequest(sol.id)}
                        >
                            <span> {sol.asunto} </span>
                        </button>
                    
                        {this.renderDBotton(sol)}
                </div>
            </div>
        )
    }

    viewRequest = (id) => {
        const info = {
            id: this.state.id,
            email: this.state.email, 
            pass: this.state.password,
            jefe: this.state.jefe,
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
        this.state.solicitudes.length === 0? this.setState(state => ({flag: true})): console.log(this.state.solicitudes)
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

    renderList(){
        if(!this.state.flag){
            return (
                <Lottie
                        animationData={spin}
                        style={{
                            right: "50%",
                            zIndex: 1,
                            overflow: "hidden",
                            width: '30%',
                            height: '30%',
                            margin: '0 auto'
                        }}
                    />
            )
        }
        else{
            if(this.state.solicitudes.length === 0){
                return (
                    <div>
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
    
                        <div
                            style={{
                                margin: '5%',
                                zIndex: '0', 
                            }}
                        >
                            <ErrorMessage error={"No hay una solicitudes que mostrar"} />
                        </div>
                    </div>
                )
            }else{
                return (
                <div>
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
                    </div>
                )
            }
        }
    }

    render(){
        return (
            <div style={{
                backgroundImage: `url(${[logo,logo2][1]})`,
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
                        jefe={this.state.jefe}
                        pass={this.state.password}
                    />
                </div>

                {
                    // encabezado + tabla
                    this.renderList()
                }
                
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
                                type='button'
                                className="btn btn-secondary"
                                onClick={() => this.props.history.push('/redactar', this.props.user)}
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