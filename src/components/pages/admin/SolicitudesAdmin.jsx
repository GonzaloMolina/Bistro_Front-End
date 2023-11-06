import React from 'react';
import {withRouter} from 'react-router';
import SideBarAdmin from '../../component/SideBarAdmin';
import '../../../styles/sidebarAdmin.css'
import API from '../../../service/api';
import { Link } from 'react-router-dom/cjs/react-router-dom';

class SolicitudesAdmin extends React.Component {
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
            search: ''
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

    handleChange(value, prop) {
        this.setState(prevState => ({ ...prevState, [prop]: value }));
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

    orderSolicitudes(ls){
        let res = [];
        ls.forEach(element => {
            if(element.estado === 'ENPROCESO'){ res.unshift(element); } else { res.push(element); }
        });
        return res;
    }

    handleClick(solicitud, str){
        solicitud.estado = str;
        console.log(solicitud, str);
        const body = {
            estado: str,
            targetRequest: solicitud.id
        }
        API.put('restaurante/updateState', body)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    render() {
    return (
      <React.Fragment>
        <SideBarAdmin seccion={'Solicitudes'}  content={this.content()}/>
        <div style={{
            position:'fixed', 
            left:200, 
            backgroundColor: 'lightgray',
            height:'100vh', 
            width: '100%',
        }}>
            <div className='card' style={{zIndex:'2',marginTop:'1%', width: '100%', backgroundColor:'lightgray', border:'none'}}> 
                    <input 
                        className="form-control" 
                        type="search" 
                        placeholder="Buscar empleado por email"
                        value={this.state.search}
                        onChange={ event => this.handleChange(event.target.value, 'search') }
                        aria-label="Search"
                        style={{width: '40%', marginLeft: '1%'}}  
                    />
            </div>


            <div style={{overflow:'scroll',margin:'1%',
                height:'calc(100% - 155px)', 
                width: 'calc(100% - 220px)',
                borderRadius: '20px'
            }}>

                {
                    this.state.empleados.filter(emp => emp.email.includes(this.state.search)).map(empleado => {
                        return (
                        <div>
                            <div id="accordion" style={{marginBottom: '4px'}}>
                                <div className="card">
                                    <div className="card-header" id="headingOne">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                <Link to='' style={{ textDecoration: 'none' }}>
                                                    <span>{empleado.email}</span>
                                                </Link>
                                            </button>
                                        </h5>
                                    </div>

                                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                        <div class="card-body">
                                            {(empleado.peticiones.length === 0)?
                                                (<div className='card bg-secondary'>
                                                    <div className='card-header border border-secondary' align='left'>
                                                        <span> No ha realizado solicitudes </span>
                                                    </div>
                                                </div>)
                                            : 
                                                this.orderSolicitudes(empleado.peticiones).map(sol => {
                                                    switch(sol.estado){
                                                        case 'RECHAZADA':
                                                            return (
                                                            <div className='card border border-danger' 
                                                                style={{marginBottom: '4px', backgroundColor:'rgba(220, 53, 70, 0.5)'}}>
                                                                <div className='card-header' align='left'>
                                                                    <span> {sol.asunto} </span>
                                                                </div>
                                                            </div>)
                                                        case 'ACEPTADA':
                                                            return (
                                                                <div className='card border border-success' 
                                                                    style={{marginBottom: '4px', backgroundColor:'rgb(39, 168, 68, 0.5)' }}>
                                                                    <div className='card-header' align='left'>
                                                                        <span> {sol.asunto} </span>
                                                                    </div>
                                                                </div>)
                                                        default:
                                                            return (
                                                                <div className='card border border-warning' 
                                                                    style={{marginBottom: '4px', backgroundColor: 'rgb(254, 193, 7, 0.5)'}}>
                                                                    <div className='card-header'>
                                                                        <div className='row'>
                                                                            <div className='col' align='left'>
                                                                                <span> {sol.asunto} </span>
                                                                            </div>
                                                                            <div className='col' align='right'>
                                                                                <div class="btn-group" 
                                                                                    role="group" 
                                                                                    aria-label="Basic example" align='rigth'>
                                                                                    <button type="button" class="btn btn-success"
                                                                                        onClick={() => this.handleClick(sol, 'ACEPTADA')}>
                                                                                        ACEPTAR
                                                                                    </button>
                                                                                    <button type="button" class="btn btn-danger"
                                                                                        onClick={() => this.handleClick(sol, 'RECHAZADA')}>
                                                                                        RECHAZAR
                                                                                    </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                        }
                                                    }
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })
                }
                <button 
                type='button' className='btn btn-primary'
                onClick={() => console.log(this.state)}
            > 
                debug
            </button>
            </div>
        </div>
      </React.Fragment>
    );
  } 
}

export default withRouter(SolicitudesAdmin);