import React from 'react';
import {withRouter} from 'react-router';
import SideBarAdmin from '../../component/SideBarAdmin';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import API from '../../../service/api';
import EmployeeForm from './EmployeeForm';

class Employee extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            name:  "",
            admin: "",
            email:  "",
            direccion:  "",
            tel: "",
            menu: {},
            empleados: [],
            mesas: [],
            ordenes: [],
            solicitudes: [],

            search: "",
            mesaAsignar: 0,
            chosenOne: undefined,
            open: false,
            form: false,
            result: true,
        }
    }

    componentDidMount(){
        if(this.props.content.email !== undefined){
            this.setState(state => ({name: this.props.content.name}));
            this.setState(state => ({admin: this.props.content.admin}));
            this.setState(state => ({email: this.props.content.email}));
            this.setState(state => ({direccion: this.props.content.direccion}));
            this.setState(state => ({tel: this.props.content.tel}));
            this.setState(state => ({menu: this.props.content.menu}));
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
            menu: this.state.menu,
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

    emptyList(){
        return (
            <div className='card' style={{
                margin: '3%',
                borderColor: 'red',
                width: '100%',
                backgroundColor: '#F48FB1'
            }}>
                    <h3> No hay empleados registrados</h3>
            </div>
        )
    }

    listEmployees(){
        return (
        <div className='flex-wrap' style={{ display: 'flex',flexDirection: 'row', width: '100%'}}>
            {
                this.state.empleados.length === 0?
                this.emptyList()
                :
                this.state.empleados.filter(emp => emp.email.includes(this.state.search)).map((elem, k) => {
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
                })
            }
        </div>
        )
    }

    doAssign(){
        const body = {
            admin: this.state.email,
            empleadoId: this.state.chosenOne.id,
            mesaId: parseInt(this.state.mesaAsignar)
        }
        if(this.state.mesas.map(mesa => mesa.id).includes(body.mesaId)){
            API.postAdmin('restaurante/asignar', body)
            .then(res => {
                this.setState(state => ({mesas: res.data.mesas}))
                this.setState(state => ({empleados: res.data.empleados}))
                this.setState(state => ({mesaAsignar: 0}))
                this.setState(state => ({open: false}))
                this.setState(state => ({result: true}))
            })
            .catch(err => console.log(err))
        }
        else{
            this.setState(state => ({result: false}))
        }
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
                    <div className='card' align='center' style={{ width: '50%', marginLeft: '7%', marginTop: '2%', backgroundColor: 'lightgray'}}>
                        <div className="card-body" align='left'>
                            <h5 className="card-title">Identificador:  {this.state.chosenOne.id}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">E-mail:  {this.state.chosenOne.email}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Nombre:  {this.state.chosenOne.nombre}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Apellido:  {this.state.chosenOne.apellido}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Solicitudes:  
                                {this.state.chosenOne.peticiones.map(sol => sol.id).toString()}
                            </h6>
                            <h6 className="card-subtitle mb-2 text-muted">Mesas asignadas:  
                                {this.state.chosenOne.mesas.map(mesa => mesa).toString()}
                            </h6>
                        </div>
                        <div align='left'>
                            <label style={{marginLeft: '5px', }}> Asignar mesa al empleado </label>
                            <div className='row' style={{margin:'1%', }}>
                                <div className='col'>
                                    {this.state.result?
                                        <input type="number" className="form-control" 
                                        style={{}}
                                        value={this.state.mesaAsignar}
                                        onChange={ event => this.handleChange(event.target.value, 'mesaAsignar') }
                                        placeholder="Numero de mesa a asignar"/>
                                    :
                                        <input type="number" className="form-control" 
                                        style={{borderColor: 'red'}}
                                        value={this.state.mesaAsignar}
                                        onChange={ event => 
                                            {
                                                this.handleChange(event.target.value, 'mesaAsignar')
                                                this.setState(state => ({result: true}))
                                            } 
                                        }
                                        placeholder="Numero de mesa a asignar"/>
                                    }
                                </div>
                                <div className='col'>
                                    <button className='btn btn-success' onClick={() => this.doAssign()}>
                                        Asignar
                                    </button>
                                </div>
                            </div>
                            <div style={{margin:'1%'}}>
                                {
                                this.state.result?
                                    <small className="form-text text-muted">{this.aux()}</small>
                                :
                                    <small className="form-text text-danger" style={{color: 'red'}}>
                                        {this.errorMsg()}
                                    </small>
                                }
                            </div>
                        </div>
                    </div>
                    <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                        <button type='button' style={{borderRadius: "25px", marginTop: '1%', marginBottom: '1%'}}
                        className='btn btn-danger' 
                        disabled={this.state.chosenOne.mesas.length > 0}
                        onClick={() => this.delete()}
                        >
                            Borrar empleado
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    errorMsg(){
        return " La mesa ingresada no existe"
    }

    aux(){
        const x = this.state.mesas.filter(mesa => !mesa.estaAsignada).map(mesa => mesa.id);
        if(x.length === 0){ return " No tiene mesas para asignar"}
        else{return " Posibles mesas a asignar: " + x.slice(0, 2).toString()}
    }

    closeForm = () => this.setState(state => ({form: false}));

    setE = (ls) => this.setState(state => ({empleados: ls}))

    showForm(){
        return (
            <div className='card' style={{margin: '15%', marginTop: '3%', marginBottom:'0px'}}>
                <EmployeeForm list={this.setE} resto={this.state.email} close={this.closeForm}/>
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
                    <div className='row' style={{marginLeft: '1px'}}>
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