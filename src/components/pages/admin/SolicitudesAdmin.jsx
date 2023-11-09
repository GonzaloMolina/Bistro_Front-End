import React from 'react';
import {withRouter} from 'react-router';
import SideBarAdmin from '../../component/SideBarAdmin';
import { AiOutlineArrowLeft } from 'react-icons/ai';
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
            
            search: '',
            chosenOne: undefined,
            open: false
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

    doRequest(sol){
        console.log(sol.id);
        API.get('peticion/'+sol.id)
        .then(res => {
            console.log(res.data);
            this.setState(state => ({chosenOne: res.data}));
        }).then(res => this.setState(state => ({open: true})))
        .catch(err => console.log(err))
    }


    showAllRequests(){
        return (
            <div>
                {this.state.empleados.filter(emp => emp.email.includes(this.state.search)).map(empleado => {
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
                                        <div className="card-body">
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
                                                                    <div className='row'>
                                                                        <div className='col'>
                                                                            <span> {sol.asunto} </span>
                                                                        </div>
                                                                        <div className='col' align='right'>
                                                                            <div className="btn-group" role="group" 
                                                                                aria-label="Basic example" align='rigth'>
                                                                                <button type="button" className="btn btn-secondary"
                                                                                    onClick={() => {this.doRequest(sol)}}
                                                                                >
                                                                                    Ver
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>)
                                                        case 'ACEPTADA':
                                                            return (
                                                                <div className='card border border-success' 
                                                                    style={{marginBottom: '4px', backgroundColor:'rgb(39, 168, 68, 0.5)' }}>
                                                                    <div className='card-header' align='left'>
                                                                        <div className='row'>
                                                                            <div className='col'>
                                                                                <span> {sol.asunto} </span>
                                                                            </div>
                                                                            <div className='col' align='right'>
                                                                                <div className="btn-group" role="group" 
                                                                                    aria-label="Basic example" align='rigth'>
                                                                                    <button type="button" className="btn btn-secondary"
                                                                                        onClick={() => {this.doRequest(sol)}}
                                                                                    >
                                                                                        Ver
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
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
                                                                                <div className="btn-group" 
                                                                                    role="group" 
                                                                                    aria-label="Basic example" align='rigth'>
                                                                                    <button type="button" className="btn btn-secondary"
                                                                                        onClick={() => {
                                                                                            this.doRequest(sol)
                                                                                        }}>
                                                                                        ver
                                                                                    </button>
                                                                                    <button type="button" className="btn btn-success"
                                                                                        onClick={() => this.handleClick(sol, 'ACEPTADA')}>
                                                                                        ACEPTAR
                                                                                    </button>
                                                                                    <button type="button" className="btn btn-danger"
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
            </div>
        );
    }

    showRequest(){
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
                            <h5 className="card-title">Nro de Solicitud:  {this.state.chosenOne.id}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Emisor:  {this.state.chosenOne.emisor}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Estado:  {this.state.chosenOne.estado}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Asunto:  {this.state.chosenOne.asunto}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Cuerpo de la solicitud:</h6>
                            <p> {this.state.chosenOne.body} </p>
                        </div>
                    </div>
                    {
                        this.state.chosenOne.estado === "ENPROCESO"?
                            (<div className="btn-group" 
                                role="group" 
                                style={{marginTop: '2%'}}
                                aria-label="Basic example" align='rigth'>
                                <button type="button" className="btn btn-success"
                                    onClick={() => this.handleClick(this.state.chosenOne, 'ACEPTADA')}>
                                        ACEPTAR
                                </button>
                                <button type="button" className="btn btn-danger"
                                    onClick={() => this.handleClick(this.state.chosenOne, 'RECHAZADA')}>
                                        RECHAZAR
                                </button>
                            </div>)  
                        :   <div></div>
                        }
                </div>
            </div>
        );
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
                    this.state.open? this.showRequest()
                    : this.showAllRequests()
                }
            </div>
        </div>
      </React.Fragment>
    );
  } 
}

export default withRouter(SolicitudesAdmin);