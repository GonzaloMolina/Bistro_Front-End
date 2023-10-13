import React from 'react';
import { withRouter } from 'react-router';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import logo from "../img/bistrot.jpg";
import API from '../../service/api';

class ViewRequest extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            info: {},
            id: 0,
            asunto: "",
            estado: "",
            body: ""
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
            })
            .catch(err => console.log(err))
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
        //animacion spin
        API.deleteAuth('peticion/'+this.state.info.id+'/'+this.state.id, headers)
        .then(res => 
            //animacion check
            this.props.history.push('/solicitudes', this.props.content.info
        ))
        .catch(err => console.log(err))
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
                                    onClick={() => this.props.history.push('/solicitudes', this.props.content.info)}
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
                            <h1 align='left' 
                                style={{
                                    fontSize:'32px', 
                                    marginTop: '20px', 
                                    marginLeft: '20px'
                                }}
                            >
                                {this.state.asunto}
                            </h1>
                            {this.renderEstado()}
                            <div align='left' style={{marginLeft: '40px', marginTop:'20px'}}>
                                <p align='left'>{this.state.body}</p>
                            </div>
                        </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default withRouter(ViewRequest);