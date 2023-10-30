import React from 'react';
import {withRouter} from 'react-router';
import Sidebar from '../../component/Sidebar';
import API from '../../../service/api';
import { wait } from '@testing-library/user-event/dist/utils';
import logo from "../../img/bistrot.jpg";


class Info extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            info: {},
            resto: {}
        }
    }

    componentDidMount(){
        if(this.props.content.email === undefined){
            this.props.history.push('/');
        } else {
            this.setState(state => ({ info: this.props.content }))
            wait(100).then(res => this.getInfo())
        }
    }

    getInfo(){
        const headers= {
            auth: {username: this.state.info.email, password: this.state.info.pass}
        }
        console.log(headers.auth);
        const body = {email: this.state.info.jefe}
        console.log(body);
        API.post('restaurante/getInfo', body, headers)
        .then(res => this.setState(state => ({resto: res.data})))
        .catch(err => console.log(err))
    }

    render(){
        return(
            <React.Fragment>
                <div
                    style={{
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
                            id={this.state.info.id}
                            mesas={this.state.info.mesas}
                            peticiones={this.state.info.peticiones}
                            jefe={this.state.info.jefe}
                            email={this.state.info.email}
                            pass={this.state.info.pass}
                            mesaId={this.state.info.mesaId}
                        /> 
                    </div>
                    <div className='card' style={{margin: '3%', 
                            backgroundColor: 'rgba(250, 250, 250, 0.4)', 
                            borderRadius:'20px',}}>
                        <h1> Info del restaurante </h1>
                    </div>
                    <div className='card' style={{margin: '3%', backgroundColor: 'rgba(250, 250, 250, 0.4)', borderRadius:'20px'}}>
                    <div className='container'>
                            <div className='row' style={{marginTop: '2%'}}>
                                <div className='col'> 
                                    <p align='left' style={{fontSize: '18px'}}>
                                        Restaurante:
                                    </p> 
                                </div>
                                <div className='col'> 
                                    <p align='left' style={{fontSize: '17px'}}>
                                        {this.state.resto.nombreMarca}
                                    </p> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card' style={{backgroundColor: 'rgba(250, 250, 250, 0.4)', borderRadius:'20px', margin: '3%'}}>
                        <div className='container'>
                            <div className='row' style={{marginTop: '2%'}}>
                                <div className='col'> 
                                    <p align='left' style={{fontSize: '18px'}}>
                                        Administrador:
                                    </p> 
                                </div>
                                <div className='col'> 
                                    <p align='left' style={{fontSize: '17px'}}>
                                        {this.state.resto.administrador}
                                    </p> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card' style={{backgroundColor: 'rgba(250, 250, 250, 0.4)', borderRadius:'20px', margin: '3%'}}>
                    <div className='container'>
                            <div className='row' style={{marginTop: '2%'}}>
                                <div className='col'> 
                                    <p align='left' style={{fontSize: '18px'}}>
                                        Formas de contacto:
                                    </p> 
                                </div>
                                <div className='col'> 
                                    <p> {this.state.resto.email} </p>
                                    <p> {this.state.resto.telefono} </p>
                                    <p> {this.state.resto.direccion} </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type='button' 
                            className='btn btn-primary'
                            onClick={() => console.log(this.state.resto)}
                    >
                        debug
                    </button>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Info);