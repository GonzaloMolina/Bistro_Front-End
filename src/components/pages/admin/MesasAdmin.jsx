import React from 'react';
import {withRouter} from 'react-router';
import SideBarAdmin from '../../component/SideBarAdmin';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import API from '../../../service/api';

class MesasAdmin extends React.Component {
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

    doRequest(mesa){
        API.get('mesa/'+mesa.id)
        .then(res => {
            console.log(res.data);
            return res.data
        }).then(res => {
            this.setState(state => ({chosenOne: res}));
            this.setState(state => ({open: true}));
        }).catch(err => console.log(err));
    }

    listTables(){
        return (
            <div className='flex-wrap' style={{ display: 'flex',flexDirection: 'row', width: '100%'}}>
                {this.state.mesas.filter(mesa => (mesa.id+'').includes(this.state.search)).map((elem, k) => {
                    return (
                        <div className="card" key={k} style={{width: "18rem", margin:'1%',marginRight:'3%', borderRadius: '20px'}}>
                            <button 
                                type='button' 
                                style={{borderRadius: '20px', height: '100px'}}
                                onClick={() => this.doRequest(elem)}
                            >
                                <div className="card-body" align='left'>
                                    <h5 className="card-title">Identificador de mesa: {elem.id}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">capacidad: {elem.capacidad}</h6>
                                </div>
                            </button>
                        </div>
                    )})
                }
            </div>
        );
    }

    delete(){
        const body = {
            admin: this.state.email,
            target: this.state.chosenOne.id,
        }
        API.postAdmin('restaurante/deleteTable', body)
        .then(res => {console.log(res.data);
            this.setState(state => ({mesas: res.data.mesas}));
            this.setState(state => ({open: false}));
        }).catch(err => console.log(err))
    }

    showTable(){
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
                            <h5 className="card-title">Nro de mesa:  {this.state.chosenOne.id}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Capacidad:  {this.state.chosenOne.capacidad}</h6>
                            {
                                this.state.chosenOne.orden === null? 
                                    <h6 className="card-subtitle mb-2 text-muted">La mesa no cuenta con una orden</h6>
                                :
                                    <div>
                                        <h6 className="card-subtitle mb-2 text-muted">Orden Id: {this.state.chosenOne.orden.id}</h6>
                                        <h6 className="card-subtitle mb-2 text-muted">Cuenta: ${this.state.chosenOne.cuenta}</h6>
                                    </div>
                                    
                            }
                        </div>
                    </div>
                    <button type='button' style={{borderRadius: "25px", marginTop: '1%', marginBottom: '1%'}}
                    className='btn btn-danger' 
                    onClick={() => this.delete()}
                    >
                        Borrar mesa
                    </button>
                </div>
            </div>
        );
    }

    createTable(){
        const body = {
            capacidad: 96,
            adminEmail: this.state.email
        }
        API.postAdmin('restaurante/table', body)
        .then(res => {console.log(res.data)
            this.setState(state => ({mesas: res.data.mesas}));
        }).catch(err => console.log(err))
    }

   render() {
    return (
      <React.Fragment>
        <SideBarAdmin seccion={'Mesas'}  content={this.content()}/>

        <div style={{
                position:'fixed', 
                left:200, 
                marginTop:'0px',
                marginLeft: '3px',
                overflow:'scroll', height:'100%'
            }}>
            <div style={{position:'fixed', left:200, height:'100vh', 
                width: '100%', backgroundColor:'lightgray'}}>
                <div className='card' style={{zIndex:'2',marginLeft:'1%', width: '100%', backgroundColor:'lightgray', border:'none'}}> 
                    <div className='row'>
                        <div className='col'>
                        <input 
                            className="form-control" 
                            type="search" 
                            align='left'
                            placeholder="Buscar por identificador de mesa"
                            value={this.state.search}
                            onChange={ event => this.handleChange(event.target.value, 'search') }
                            aria-label="Search"
                            style={{marginTop:'1%', width: '100%'}}  
                        />
                        </div>
                        <div className='col' align='left'>
                            <button type="button" className="btn btn-success"
                                onClick={() => this.createTable()}
                                style={{margin:'1%'}}  
                            >
                                Crear mesa
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
                    {this.state.open? this.showTable(): this.listTables()}
                </div>
            </div>
        </div>
      </React.Fragment>
    );
  } 
}

export default withRouter(MesasAdmin);