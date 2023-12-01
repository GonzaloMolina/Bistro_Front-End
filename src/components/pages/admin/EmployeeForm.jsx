import React from 'react';
import {withRouter} from 'react-router';
import API from '../../../service/api';

class EmployeeForm extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            nombreEmpl: "",
            apellidoEmpl: "",
            mailEmpl: "",
            passwordEmpl: "",
            nombreF: false,
            apellidoF: false,
            mailF: false,
            passwordF: false,
        }
    }

    allFields(){
        this.setState(state => ({nombreF:(this.state.nombreEmpl === "")}));
        this.setState(state => ({apellidoF:(this.state.apellidoEmpl === "")}));
        this.setState(state => ({mailF:(this.state.mailEmpl === "")}));
        this.setState(state => ({passwordF:(this.state.passwordEmpl === "")}));
    }


    handleChange(value, prop) {
        this.setState(prevState => ({ ...prevState, [prop]: value }));
    }

    flags = () => 
        this.state.apellidoEmpl==="" || 
        this.state.nombreEmpl==="" || 
        this.state.mailEmpl==="" || 
        this.state.passwordEmpl===""

    checkFields(){
        this.allFields();
        if(!this.flags()){
            const body = {
                nombre: this.state.nombreEmpl,
                apellido: this.state.apellidoEmpl,
                mail: this.state.mailEmpl,
                password: this.state.passwordEmpl,
                restoEmail: this.props.resto,
            }
            API.postAdmin('restaurante/employee', body)
            .then(res => {console.log(res.data);
                this.props.list(res.data.empleados)
                this.props.close()
            }).catch(err => console.log(err))
        }
        else{console.log('no')}
    }

    render(){
        return (
            <div style={{backgroundColor:'lightgray'}}>
                <h4 style={{marginTop:'10px', marginBottom:'10px'}}>Formulario de Registro de empleado</h4>
                <div className='card' style={{marginLeft: '15%', marginRight: '15%', backgroundColor: 'lightgray'}}>
                    <form>
                        <div className="form-group" style={{margin: '2%', marginBottom: '3%'}}>
                            <div align='left'><label> Nombre del empleado </label></div>
                            {this.state.nombreF? 
                                <div>
                                    <input type='text'
                                        className="form-control" 
                                        id="nombreInput" 
                                        placeholder="Ingrese el nombre del emplado"
                                        value={this.state.nombreEmpl}
                                        style={{borderColor: 'red', outline: '1px solid red'}}
                                        onChange={ event => {
                                            this.handleChange(event.target.value, 'nombreEmpl')
                                        }}
                                    />
                                    <small align='left' id="fieldHelp" style={{color: 'red'}}>
                                        el campo no puede estar vacio
                                    </small>
                                </div>
                            :
                                <input type="text" 
                                    className="form-control" 
                                    id="capInput" 
                                    placeholder="Ingrese el nombre del emplado"
                                    value={this.state.nombreEmpl}
                                    onChange={ event => {
                                        this.handleChange(event.target.value, 'nombreEmpl')
                                    }}
                                />
                            }
                        </div>
                        <div className="form-group" style={{margin: '2%', marginBottom: '3%'}}>
                            <div align='left'><label> Apellido del empleado </label></div>
                            {this.state.apellidoF? 
                                <div>
                                    <input type='text'
                                        className="form-control" 
                                        id="apellidoInput" 
                                        placeholder="Ingrese el apellido del emplado"
                                        value={this.state.apellidoEmpl}
                                        style={{borderColor: 'red', outline: '1px solid red'}}
                                        onChange={ event => {
                                            this.handleChange(event.target.value, 'apellidoEmpl') 
                                        }}
                                    />
                                    <small align='left' id="fieldHelp" style={{color: 'red'}}>
                                        el campo no puede estar vacio
                                    </small>
                                </div>
                            :
                                <input type="text" 
                                    className="form-control" 
                                    id="capInput" 
                                    placeholder="Ingrese el apellido del emplado"
                                    value={this.state.apellidoEmpl}
                                    onChange={ event => {
                                        this.handleChange(event.target.value, 'apellidoEmpl') 
                                    }}
                                />
                            }
                        </div>
                        <div className="form-group" style={{margin: '2%', marginBottom: '3%'}}>
                            <div align='left'><label> E-mail del empleado </label></div>
                            {this.state.mailF? 
                                <div>
                                    <input type='text'
                                        className="form-control" 
                                        id="mailInput" 
                                        placeholder="Ingrese el email del emplado"
                                        value={this.state.mailEmpl}
                                        style={{borderColor: 'red', outline: '1px solid red'}}
                                        onChange={ event => this.handleChange(event.target.value, 'mailEmpl') }
                                    />
                                    <small align='left' id="fieldHelp" style={{color: 'red'}}>
                                        el campo no puede estar vacio
                                    </small>
                                </div>
                            :
                                <input type="text" 
                                    className="form-control" 
                                    id="capInput" 
                                    placeholder="Ingrese el email del emplado"
                                    value={this.state.mailEmpl}
                                    onChange={ event => this.handleChange(event.target.value, 'mailEmpl') }
                                />
                            }
                        </div>
                        <div className="form-group" style={{margin: '2%', marginBottom: '3%'}}>
                            <div align='left'><label> Contraseña de la cuenta del empleado </label></div>
                            {this.state.passwordF? 
                                <div>
                                    <input type='password'
                                        className="form-control" 
                                        id="passwordInput" 
                                        placeholder="Ingrese el password del emplado"
                                        value={this.state.passwordEmpl}
                                        style={{borderColor: 'red', outline: '1px solid red'}}
                                        onChange={ event => this.handleChange(event.target.value, 'passwordEmpl') }
                                    />
                                    <small align='left' id="fieldHelp" style={{color: 'red'}}>
                                        el campo no puede estar vacio
                                    </small>
                                </div>
                            :
                                <input type="password" 
                                    className="form-control" 
                                    id="passwordInput" 
                                    placeholder="Ingrese el password del emplado"
                                    value={this.state.passwordEmpl}
                                    onChange={ event => this.handleChange(event.target.value, 'passwordEmpl') }
                                />
                            }
                        </div>
                    </form>
                </div>
                <button
                    className='btn btn-primary'
                    style={{margin:'5%', marginLeft: '15%', marginRight: '15%'}}
                    onClick={() => this.checkFields()}
                >
                    Registrar empleado
                </button>
            </div>
        )
    }
}
export default withRouter(EmployeeForm);