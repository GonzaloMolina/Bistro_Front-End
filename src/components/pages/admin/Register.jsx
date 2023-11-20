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

    checkMail() {
        return this.state.email !==""&&
        (
            this.state.email.includes("@gmail.com") ||
            this.state.email.includes("@outlook.es") ||
            this.state.email.includes("@mail.com")
        )
    }

    checkPass(){return this.state.password.length > 7;}
    checkName(){return this.state.name !=="";}
    checkLast(){return this.state.lastname !=="";}
    checkResto(){return this.state.restoName !=="";}
    checkDir(){return this.state.direction !=="";}
    checkPhone(){return this.state.phone !=="";}

    doRegister(){
        //this.doReq()
    }

    doReq(){
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
            <div style={{
                backgroundColor:'darkblue', 
                overflow:'scroll',
                height: 'calc(100% - 155px)'
            }}>
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
                                        <div align='left'><label> E-mail </label></div>
                                        <input type="email" className="form-control" 
                                            style={{
                                                borderColor: this.checkMail()? 'gray': 'red',
                                                outline: this.checkMail()? '1px solid gray': '1px solid red'
                                            }}
                                            value={this.state.email}
                                            onChange={ event => this.handleChange(event.target.value, 'email') }
                                            placeholder="Ingrese el email del administrador de la cuenta"/>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="form-group">
                                        <div align='left'><label> Contraseña </label></div>
                                        <input type="password" className="form-control"
                                            style={{
                                                borderColor: this.checkPass()? 'gray': 'red',
                                                outline: this.checkPass()? '1px solid gray': '1px solid red'
                                            }}
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
                                        <div align='left'><label> Nombre/s </label></div>
                                        <input type="text" className="form-control" 
                                            style={{
                                                borderColor: this.checkName()? 'gray': 'red',
                                                outline: this.checkName()? '1px solid gray': '1px solid red'
                                            }}
                                            value={this.state.name}
                                            onChange={ event => this.handleChange(event.target.value, 'name') }
                                            placeholder="Nombre/s del administrador de la cuenta"/>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="form-group">
                                        <div align='left'><label> Apellido/s </label></div>
                                        <input type="text" className="form-control"
                                            style={{
                                                borderColor: this.checkLast()? 'gray': 'red',
                                                outline: this.checkLast()? '1px solid gray': '1px solid red'
                                            }}
                                            value={this.state.lastname}
                                            onChange={ event => this.handleChange(event.target.value, 'lastname') }
                                            placeholder="Apellido/s del administrador de la cuenta"/>
                                    </div>
                                </div>

                                <div className="form-group" style={{marginTop: '1%',}}>
                                    <div align='left'><label> Nombre del establecimiento </label></div>
                                    <input type="text" className="form-control"
                                            style={{
                                                borderColor: this.checkResto()? 'gray': 'red',
                                                outline: this.checkResto()? '1px solid gray': '1px solid red'
                                            }}
                                        value={this.state.restoName}
                                        onChange={ event => this.handleChange(event.target.value, 'restoName') }
                                        placeholder="Nombre del local"/>
                                </div>

                                <div className="form-group" style={{marginTop: '1%',}}>
                                    <div align='left'><label> Telefono del establecimiento</label></div>
                                    <input type="tel" className="form-control" 
                                        style={{
                                            borderColor: this.checkPhone()? 'gray': 'red',
                                            outline: this.checkPhone()? '1px solid gray': '1px solid red'
                                        }}
                                        value={this.state.phone}
                                        onChange={ event => this.handleChange(event.target.value, 'phone') }
                                        placeholder="Telefono del local"/>
                                </div>

                                <div className="form-group" style={{marginTop: '1%',}}>
                                    <div align='left'><label> Direccion del establecimiento </label></div>
                                    <input type="text" className="form-control"
                                        style={{
                                            borderColor: this.checkDir()? 'gray': 'red',
                                            outline: this.checkDir()? '1px solid gray': '1px solid red'
                                        }} 
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