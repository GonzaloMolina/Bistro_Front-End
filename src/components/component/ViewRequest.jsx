import React from 'react';
import { withRouter } from 'react-router';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import logo from "../img/bistrot.jpg";

class ViewRequest extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            info: {},
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
            this.setState(state => ({asunto: this.props.content.solicitud.asunto}));
            this.setState(state => ({estado: this.props.content.solicitud.estado}));
            this.setState(state => ({body: this.props.content.solicitud.body}));
        }
    }

    renderEstado = () => {
        if(this.state.estado === 'RECHAZADA'){ 
            return (
                <div>
                    <h4> Esta solicitud a sido: </h4>
                    <h2 style={{color:'red'}}> {this.state.estado} </h2>
                </div>
            )
        }
        else {
            if(this.state.estado === 'ACEPTADA'){ 
                return (
                    <div>
                        <h4> Esta solicitud a sido: </h4>
                        <h2 style={{color:'green'}}> {this.state.estado} </h2>
                    </div>
                )
            }
            else { 
                return (
                    <div>
                        <h4> Esta solicitud esta siendo: </h4>
                        <h2> Procesada </h2>
                    </div>
                )
            }
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
                                    onClick={() => this.props.history.push('/solicitudes', this.props.content.info)}
                                    style={{backgroundColor: '#faf60e', marginLeft:'20px'}}
                                />
                        </div>
                </div>
                
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
                        <h1 style={{fontSize:'32px'}}>{this.state.asunto}</h1>
                </div>

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
                        {this.renderEstado()}
                </div>

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
                        <p>{this.state.body}</p>
                </div>

            </div>
            </React.Fragment>
        )
    }
}

export default withRouter(ViewRequest);