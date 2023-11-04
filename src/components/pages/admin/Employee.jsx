import React from 'react';
import {withRouter} from 'react-router';
import SideBarAdmin from '../../component/SideBarAdmin';
import { AiOutlineArrowLeft } from 'react-icons/ai';

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
            </div>
        )
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
                            <button type="button" class="btn btn-success"
                                onClick={() => console.log('crear mesa')}
                                style={{margin:'1%'}}  
                            >
                                Registrar empleado
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
                {(this.state.open)? this.showEmployee() : this.listEmployees()}
            </div>
        </div>
      </React.Fragment>
    );
  } 
}

export default withRouter(Employee);