import React from 'react';
import { withRouter } from 'react-router';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import logo from "../img/bistrot.jpg";
import API from '../../service/api';
import Lottie from 'lottie-react';
import spin from '../img/Animation -SpinLoading.json';
import check from '../img/Animation - Check.json'
import { wait } from '@testing-library/user-event/dist/utils';

class ViewRequest extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            info: {},
            id: 0,
            asunto: "",
            estado: "",
            body: "",
            loading: true,
            deleteFlag: false,
            checkFlag: false,
        }
    }

    componentDidMount(){
        if(this.props.content === undefined){ this.props.history.push('/'); }
        else{
            this.setState(state => ({info: !this.props.content.info}));
            this.setState(state => ({info: this.props.content.info}));
            const headers= {
                auth: {username: this.state.info.email, password: this.state.info.pass}
            }
            API.getAuth('peticion/'+this.props.content.solicitudId, headers)
            .then(res => {
                this.setState(state => ({id: res.data.id}));
                this.setState(state => ({asunto: res.data.asunto}));
                this.setState(state => ({estado: res.data.estado}));
                this.setState(state => ({body: res.data.body}));
            }).catch(err => console.log(err))
            wait(2000).then(res => {
                const newFlag = !this.state.loading;
                this.setState(state => ({loading: newFlag}));
            })
        }
    }

    renderEstado = () => {
        if(this.state.estado !== ""){
            if(this.state.estado === 'RECHAZADA'){ 
                return (
                    <div align='left' style={{marginLeft: '20px', marginTop:'20px'}}>
                        <h4 style={{display:'inline'}}> Esta solicitud ha sido: </h4>
                        <h3 style={{display:'inline', color:'red'}}> {this.state.estado} </h3>
                    </div>
                )
            }
            else {
                if(this.state.estado === 'ACEPTADA'){ 
                    return (
                        <div align='left' style={{marginLeft: '20px', marginTop:'20px'}}>
                            <h4 style={{display:'inline'}}> Esta solicitud ha sido: </h4>
                            <h3 style={{display:'inline', color:'green'}}> {this.state.estado} </h3>
                        </div>
                    )
                }
                else { 
                    return (
                        <div align='left' style={{marginLeft: '20px', marginTop:'20px'}}>
                            <h4 style={{display:'inline'}}> Esta solicitud esta siendo: </h4>
                            <h3 style={{display:'inline'}}> Procesada </h3>
                        </div>
                    )
                }
            }
        }
    }

    doDelete = () => {
        console.log('props', this.props);
        console.log('state', this.state);
        const headers= {
            auth: {username: this.state.info.email, password: this.state.info.pass}
        }
        const newFlag = !this.state.deleteFlag;
        this.setState(state => ({deleteFlag: newFlag}));
        API.deleteAuth('peticion/'+this.state.info.id+'/'+this.state.id, headers)
        .then(res => {
            const newFlag = !this.state.checkFlag;
            this.setState(state => ({checkFlag: newFlag}));
            wait(2000).then(res => this.props.history.push('/solicitudes', this.props.content.info))
            .catch()
        })
        .catch(err => console.log(err))
    }

    renderRequest() {
        if(this.state.loading){
            return (
                <div className='card' 
                    style={{
                        marginTop: '2%',
                        marginLeft:'3%', 
                        marginRight:'3%',
                        zIndex: '0', 
                        backgroundColor: 'rgba(250, 250, 250, 0.4)', 
                        borderRadius:'20px',
                        height:'120'
                    }}
                >
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
                </div>
            )
        }
        else{
            return (
                <div className='card' 
                    style={{
                        marginTop: '2%',
                        marginLeft:'3%', 
                        marginRight:'3%',
                        zIndex: '0', 
                        backgroundColor: 'rgba(250, 250, 250, 0.4)', 
                        borderRadius:'20px',
                    }}
                >
                        <div className='card' 
                            style={{
                                marginTop: '2%',
                                marginLeft:'3%', 
                                marginRight:'3%',
                                marginBottom: '3%',
                                zIndex: '0', 
                                backgroundColor: 'rgba(250, 250, 250, 0.7)', 
                                borderRadius:'20px',
                            }}
                        >
                            <h1 align='center' 
                                style={{
                                    fontSize:'32px', 
                                    marginTop: '20px', 
                                    marginLeft: '20px'
                                }}
                            >
                                {'Solicitud'}
                            </h1>
                        </div>
                        <div className='card' 
                            style={{
                                marginTop: '2%',
                                marginLeft:'3%', 
                                marginRight:'3%',
                                marginBottom: '3%',
                                zIndex: '0', 
                                backgroundColor: 'rgba(250, 250, 250, 0.7)', 
                                borderRadius:'20px',
                            }}
                        >
                            <h1 align='left' 
                                style={{
                                    fontSize:'24px', 
                                    marginTop: '20px', 
                                    marginLeft: '20px'
                                }}
                            >
                                {this.state.asunto}
                            </h1>
                            <hr style={{height: '2px'}}/>
                            {this.renderEstado()}
                            <hr/>
                            <div align='left' style={{marginLeft: '40px', marginTop:'20px'}}>
                                <p align='left'>{this.state.body}</p>
                            </div>
                        </div>
                </div>
            )
        }
    }

    renderLoad(){
        if(this.state.deleteFlag && !this.state.checkFlag){
            return (
                <div className='card' 
                    style={{
                        marginTop: '2%',
                        marginLeft:'3%', 
                        marginRight:'3%',
                        zIndex: '0', 
                        backgroundColor: 'rgba(250, 250, 250, 0.4)', 
                        borderRadius:'20px',
                        height:'120'
                    }}
                >
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
                </div>
            )
        }else{
            return(<div className='card' 
                    style={{
                        marginTop: '2%',
                        marginLeft:'3%', 
                        marginRight:'3%',
                        zIndex: '0', 
                        backgroundColor: 'rgba(250, 250, 250, 0.4)', 
                        borderRadius:'20px',
                        height:'120'
                    }}
                >
                    <Lottie
                        animationData={check}
                        style={{
                            right: "50%",
                            zIndex: 1,
                            overflow: "hidden",
                            width: '30%',
                            height: '30%',
                            margin: '0 auto'
                        }}
                    />
                </div>
            )
        }
    }

    render(){
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
            }}>

                <div className='navbar' style={{
                    backgroundColor: 'green',
                        height: '80px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        zIndex: 10
                    }}>
                        <div className='btn-holder'>
                                <AiOutlineArrowLeft 
                                    className="btnc"
                                    onClick={() => this.props.history.push('/solicitudes', this.state.info)}
                                    style={{backgroundColor: '#faf60e', marginLeft:'20px', borderRadius: '10px', fontSize: '1.5em'}}
                                />
                        </div>
                        <div className='btn-holder' style={{marginLeft:'5px'}}>
                                <BsTrash 
                                    className="btnc"
                                    onClick={() => this.doDelete()}
                                    style={{backgroundColor: 'red', marginLeft:'5px', borderRadius: '10px', fontSize: '1.5em'}}
                                />
                        </div>
                </div>
                
                {this.state.deleteFlag? this.renderLoad(): this.renderRequest()}
            </div>
            </React.Fragment>
        )
    }
}

export default withRouter(ViewRequest);