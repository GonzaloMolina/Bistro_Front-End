import React from 'react';
import {withRouter} from 'react-router';
import SideBarAdmin from '../../component/SideBarAdmin';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import API from '../../../service/api';

class Employee extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            name:  "",
            admin: "",
            email:  "",
            direccion:  "",
            tel: "",
            empleados: [],
            mesas: [],
            ordenes: [],
            solicitudes: [],
            search: "",
            chosenOne: undefined,
            open: false,
            form: false,

            nombreEmpl: "",
            apellidoEmpl: "",
            mailEmpl: "",
            passwordEmpl: "",
        }
    }

    componentDidMount(){
        if(this.props.content.email !== undefined){
            this.setState(state => ({name: this.props.content.name}));
            this.setState(state => ({admin: this.props.content.admin}));
            this.setState(state => ({email: this.props.content.email}));
            this.setState(state => ({direccion: this.props.content.direccion}));
            this.setState(state => ({tel: this.props.content.tel}));
            this.setState(state => ({empleados: this.props.content.empleados}));
            this.setState(state => ({mesas: this.props.content.mesas}));
            this.setState(state => ({ordenes: this.props.content.ordenes}));
            this.setState(state => ({solicitudes: this.props.content.solicitudes}));
        }
        else{
            //this.props.history.push('/admin/');
        }
    }

    content() {
        return {
            name: this.state.name,
            admin: this.state.admin,
            email: this.state.email,
            direccion: this.state.direccion,
            tel: this.state.tel,
            empleados: this.state.empleados,
            mesas: this.state.mesas,
            ordenes: this.state.ordenes,
            solicitudes: this.state.solicitudes,
        }
    }

    handleChange(value, prop) {
        this.setState(prevState => ({ ...prevState, [prop]: value }));
    }

    handleClick(elem){
        this.setState(state => ({chosenOne: elem}));
        this.setState(state => ({open: true}));
        console.log(this.state);
    }

    delete(){
        const body = {
            admin: this.state.email,
            target: this.state.chosenOne.id,
        }
        API.postAdmin('restaurante/deleteEmployee', body)
        .then(res => {console.log(res.data);
            this.setState(state => ({empleados: res.data.empleados}));
            this.setState(state => ({open: false}));
        }).catch(err => console.log(err))
    }

    listEmployees(){
        return (
        <div className='flex-wrap' style={{ display: 'flex',flexDirection: 'row', width: '100%'}}>
            {this.state.empleados.filter(emp => emp.email.includes(this.state.search)).map((elem, k) => {
                return (
                    <div className="card" key={k} style={{width: "18rem", margin:'1%',marginRight:'3%', borderRadius: '20px'}}>
                        <button 
                            type='button' 
                            style={{borderRadius: '20px', height: '100px'}}
                            onClick={() => this.handleClick(elem)}
                        >
                            <div className="card-body" align='left'>
                                <h5 className="card-title">{elem.apellido+ ", "+elem.nombre}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{elem.email}</h6>
                                <p className="card-text"></p>
                            </div>
                        </button>
                    </div>
                )
            })}
        </div>
        )
    }

    showEmployee(){
        console.log(this.state.chosenOne)
        return (
            <div align='left' style={{marginLeft: '5px', marginTop: '5px'}}>
                <button type='button' style={{borderRadius: "25px"}}
                    className='btn btn-primary' 
                    onClick={() => this.setState(state => ({open: false}))}
                >
                    < AiOutlineArrowLeft />
                </button>
                <div align='center'>
                    <div className='card' align='center' style={{ width: '50%', marginLeft: '7%', marginTop: '2%'}}>
                        <div className="card-body" align='left'>
                            <h5 className="card-title">Identificador:  {this.state.chosenOne.id}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">E-mail:  {this.state.chosenOne.email}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Nombre:  {this.state.chosenOne.nombre}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Apellido:  {this.state.chosenOne.apellido}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Solicitudes:  
                                [{this.state.chosenOne.peticiones.map(sol => sol.id+', ')}]
                            </h6>
                            <h6 className="card-subtitle mb-2 text-muted">Mesas asignadas:  
                                [{this.state.chosenOne.mesas.map(mesa => mesa+', ')}]
                            </h6>
                        </div>
                    </div>
                    <button type='button' style={{borderRadius: "25px", marginTop: '1%', marginBottom: '1%'}}
                    className='btn btn-danger' 
                    onClick={() => this.delete()}
                    >
                        Borrar empleado
                    </button>
                </div>
            </div>
        )
    }

    registerEmp(){
        const body = {
            nombre: this.state.nombreEmpl,
            apellido: this.state.apellidoEmpl,
            mail: this.state.mailEmpl,
            password: this.state.passwordEmpl,
            restoEmail: this.state.email,
        }
        console.log(body);
        API.postAdmin('restaurante/employee', body)
        .then(res => {console.log(res.data);
            this.setState(state => ({empleados: res.data.empleados}));
            this.setState(state => ({form: false}));
        }).catch(err => console.log(err))
    }

    showForm(){
        return (
            <div className='card' style={{margin: '15%', marginTop: '3%', marginBottom:'0px'}}>
                <h4 style={{marginTop:'15px', marginBottom:'15px'}}>Formulario de Registro de empleado</h4>
                <div className='card' style={{marginLeft: '15%', marginRight: '15%'}}>
                    <form>
                        <div className="form-group" style={{margin: '2%'}}>
                            {this.state.nombreEmpl === ''? 
                                <div>
                                    <input type='text'
                                        className="form-control" 
                                        id="nombreInput" 
                                        placeholder="Ingrese el nombre del emplado"
                                        value={this.state.nombreEmpl}
                                        style={{borderColor: 'red', outline: '1px solid red'}}
                                        onChange={ event => this.handleChange(event.target.value, 'nombreEmpl') }
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
                                    onChange={ event => this.handleChange(event.target.value, 'nombreEmpl') }
                                />
                            }
                        </div>
                        <div className="form-group" style={{margin: '2%'}}>
                            {this.state.apellidoEmpl === ''? 
                                <div>
                                    <input type='text'
                                        className="form-control" 
                                        id="apellidoInput" 
                                        placeholder="Ingrese el apellido del emplado"
                                        value={this.state.apellidoEmpl}
                                        style={{borderColor: 'red', outline: '1px solid red'}}
                                        onChange={ event => this.handleChange(event.target.value, 'apellidoEmpl') }
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
                                    onChange={ event => this.handleChange(event.target.value, 'apellidoEmpl') }
                                />
                            }
                        </div>
                        <div className="form-group" style={{margin: '2%'}}>
                            {this.state.mailEmpl === ''? 
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
                        <div className="form-group" style={{margin: '2%'}}>
                            {this.state.passwordEmpl === ''? 
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
                    disabled={
                        this.state.nombreEmpl === "" ||
                        this.state.apellidoEmpl === "" ||
                        this.state.mailEmpl ==="" ||
                        this.state.passwordEmpl === ""
                    }
                    onClick={() => this.registerEmp()}
                >
                    Registrar empleado
                </button>
            </div>
        );
    }

    render() {
    console.log(this.props.content)
    return (
      <React.Fragment>
        <SideBarAdmin seccion={'Empleados'}  content={this.content()}/>
        <div style={{position:'fixed', left:200, height:'100vh', 
                width: '100%', backgroundColor:'lightgray'}}>
            <div className='card' style={{zIndex:'2',marginLeft:'1%', width: '100%', backgroundColor:'lightgray', border:'none'}}> 
                    <div className='row'>
                        <div className='col'>
                        <input 
                            className="form-control" 
                            type="search" 
                            align='left'
                            placeholder="Buscar empleado por email"
                            value={this.state.search}
                            onChange={ event => this.handleChange(event.target.value, 'search') }
                            aria-label="Search"
                            style={{marginTop:'1%', width: '100%'}}  
                        />
                        </div>
                        <div className='col' align='left'>
                            <button type="button" className="btn btn-success"
                                onClick={() => 
                                    this.state.form? this.setState(state => ({form: false}))
                                    : this.setState(state => ({form: true}))
                                }
                                style={{margin:'1%'}}  
                            >
                                {this.state.form? 'Volver al listado': 'Registrar empleado'}
                            </button>
                        </div>
                    </div>
                </div>

            <div className='card' style={{
                position:'fixed',
                margin: '1%',
                overflow:'scroll', 
                height:'calc(100% - 165px)', 
                width: 'calc(100% - 220px)',
                zIndex:'1', backgroundColor: 'gray'
            }}>
                {
                    this.state.form? this.showForm()
                    : (this.state.open)? this.showEmployee() : this.listEmployees()
                }
            </div>
        </div>
      </React.Fragment>
    );
  } 
}

export default withRouter(Employee);