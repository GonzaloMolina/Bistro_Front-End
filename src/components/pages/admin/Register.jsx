import React from 'react';
import {withRouter} from 'react-router';
import API from '../../../service/api';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            lastname: "",
            direction: "",
            email: "",
            password: "",
            phone: "",
            restoName: "",
        }
    }

    handleChange(value, prop) {
        this.setState(prevState => ({ ...prevState, [prop]: value }));
    }

    doRegister(){
        const body = {
            adminName: this.state.name+ ", "+ this.state.lastname,
            direction: this.state.direction,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            restoName: this.state.restoName
        }
        console.log(body);
        API.postAdmin('restaurante/register', body)
        .then(res => {
            console.log(res.data);
            this.props.history.push('/admin/');
        }).catch(err => console.log(err));
    }

    render(){
        return(
            <div style={{backgroundColor:'darkblue', height: '100vh'}}>
                <div className='card' align="center" 
                    style={{top: '5%', marginLeft: '5%', marginRight: '5%', backgroundColor: 'lightgray', borderRadius: '25px'}}>
                    <h1>
                        Formulario de registro
                    </h1>

                    <form>
                        <div className='card' style={{margin: '3%', borderRadius: '25px'}}>
                            <div className='row' style={{margin: '1%', marginLeft: '10%', marginRight: '10%',}}>
                                <div className='col'>
                                    <div className="form-group">
                                        <input type="email" className="form-control" 
                                            value={this.state.email}
                                            onChange={ event => this.handleChange(event.target.value, 'email') }
                                            placeholder="Ingrese el email del administrador de la cuenta"/>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="form-group">
                                        <input type="password" className="form-control"
                                            value={this.state.password}
                                            onChange={ event => this.handleChange(event.target.value, 'password') }
                                            placeholder="Ingrese la contraseña del administrador de la cuenta"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='card' style={{margin: '3%', borderRadius: '25px'}}>
                            <div className='row' style={{margin: '1%', marginLeft: '10%', marginRight: '10%',}}>
                                <div className='col'>
                                    <div className="form-group">
                                        <input type="text" className="form-control" 
                                            value={this.state.name}
                                            onChange={ event => this.handleChange(event.target.value, 'name') }
                                            placeholder="Nombre/s del administrador de la cuenta"/>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="form-group">
                                        <input type="text" className="form-control"
                                            value={this.state.lastname}
                                            onChange={ event => this.handleChange(event.target.value, 'lastname') }
                                            placeholder="Apellido/s del administrador de la cuenta"/>
                                    </div>
                                </div>

                                <div className="form-group" style={{marginTop: '1%',}}>
                                    <input type="text" className="form-control" 
                                        value={this.state.restoName}
                                        onChange={ event => this.handleChange(event.target.value, 'restoName') }
                                        placeholder="Nombre del local"/>
                                </div>

                                <div className="form-group" style={{marginTop: '1%',}}>
                                    <input type="text" className="form-control" 
                                        value={this.state.phone}
                                        onChange={ event => this.handleChange(event.target.value, 'phone') }
                                        placeholder="Telefono del local"/>
                                </div>

                                <div className="form-group" style={{marginTop: '1%',}}>
                                    <input type="text" className="form-control" 
                                        value={this.state.direction}
                                        onChange={ event => this.handleChange(event.target.value, 'direction') }
                                        placeholder="Direccion del local"/>
                                </div>
                            </div>
                        </div>
                        
                        
                        <button type="button" className="btn btn-primary" 
                            onClick={() => this.doRegister()} style={{marginBottom: '3%'}}>
                            Registrarse
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);