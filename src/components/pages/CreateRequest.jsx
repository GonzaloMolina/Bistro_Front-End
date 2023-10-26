import React from 'react';
import {withRouter} from 'react-router';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import logo from "../img/bistrot.jpg";
import API from '../../service/api';
import Lottie from 'lottie-react';
import spin from '../img/Animation -SpinLoading.json';
import check from '../img/Animation - Check.json'
import { wait } from '@testing-library/user-event/dist/utils';

class CreateRquest extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            email: '',
            password: '',
            jefe: '',
            mesas: [],
            peticiones: [],
            asunto: '',
            text: '',
            flag: true,
            checkflag: true,
        }
    }

    componentDidMount(){
        if(this.props.content === undefined){this.props.history.push('/')}
        else{
            this.setState(state => ({id: this.props.content.id}));
            this.setState(state => ({jefe: this.props.content.jefe}));
            this.setState(state => ({email: this.props.content.email}));
            this.setState(state => ({password: this.props.content.pass}));
            this.setState(state => ({mesas: this.props.content.mesas}));
        }
    }

    handleChange(value, prop){
        this.setState(prevState => ({ ...prevState, [prop]: value }))
    }

    doSend(title, txt){
        const head = {
            auth: {username: this.state.email, password: this.state.pass}
        }
        const body = {
            asunto: title,
            body: txt,
            empleadoId: this.state.id,
            origin: this.state.email,
            destino: this.state.jefe
        }
        this.setState(state => ({flag: false}));
        API.post('peticion/new',body, head)
        .then(res => {
            console.log(res);
            wait(2000).then(res => {
                this.setState(state => ({checkflag: false}))
                wait(2000).then(res => this.props.history.push('/solicitudes', this.props.content))
            })
        })
        .catch(err => console.log(err))
    }

    content(){
        return {
            id: this.state.id,
            jefe: this.state.jefe,
            mesas: this.state.mesas,
            peticiones: this.state.peticiones,
            email: this.state.email,
            pass: this.state.password,
        }
    }

    renderForm(){
        if(this.state.flag){
            console.log(this.state)
            return (
                <div>
                    <div className='card' 
                            style={{
                                marginTop: '2%',
                                marginLeft:'3%', 
                                marginRight:'3%',
                                marginBottom: '4%',
                                zIndex: '0', 
                                backgroundColor: 'rgba(250, 250, 250, 0.4)', 
                                borderRadius:'20px',
                            }}
                        >

                            <h2>Redactar Solicitud</h2>
                            <div className='card' 
                                style={{
                                    marginTop: '2%',
                                    marginLeft:'3%', 
                                    marginRight:'3%',
                                    marginBottom:'3%',
                                    zIndex: '0', 
                                    backgroundColor: 'rgba(250, 250, 250, 0.7)', 
                                    borderRadius:'20px',
                                }}
                            >
                                <form style={{margin: '2%'}}>
                                    <div className="form-group">
                                        <input type="text" 
                                            className="form-control" 
                                            placeholder="Asunto" 
                                            onChange={event => this.handleChange(event.target.value, 'asunto')}
                                            style={{borderRadius:'20px', marginBottom:'2%'}}/>
                                        <div className="form-group">
                                            <textarea 
                                                className="form-control"
                                                rows="6" 
                                                placeholder="Cuerpo de la solicitud" 
                                                onChange={event => this.handleChange(event.target.value, 'text')}
                                                style={{borderRadius:'20px'}}></textarea>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div
                            style={{
                                marginTop: '2%',
                                marginLeft:'6%', 
                                marginRight:'3%',
                                zIndex: '0', 
                            }}
                        >
                            <button 
                                type='button'
                                className="btn btn-secondary"
                                onClick={() => {this.doSend(this.state.asunto, this.state.text)}}
                            >
                                Enviar
                            </button>
                        </div>
                </div>
            )
        }
        else{
            if(this.state.checkflag){
                return (
                    <div>
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
                return (
                    <div>
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
                                    onClick={() => this.props.history.push('/solicitudes', this.content())}
                                    style={{backgroundColor: '#faf60e', marginLeft:'20px', borderRadius: '10px', fontSize: '1.5em'}}
                                />
                        </div>
                    </div>
                    
                    {this.renderForm()}

                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(CreateRquest);