import React from 'react';
import {withRouter} from 'react-router';
import SideBarAdmin from '../../component/SideBarAdmin';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import PlateForm from './plateForm';
import API from '../../../service/api';

class Menu extends React.Component{
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
            menu: this.state.menu,
            empleados: this.state.empleados,
            mesas: this.state.mesas,
            ordenes: this.state.ordenes,
            solicitudes: this.state.solicitudes,
        }
    }

    setMenu = (newMenu) => this.setState(state => ({menu: newMenu}))

    showForm(){
        return (
            <div style={{zIndex:'2',margin:'1%', marginLeft: '2%', width: '100%', backgroundColor:'lightgray', border:'none'}}>
                <button type='button' className='btn btn-primary'
                    style={{borderRadius: '50%', marginBottom: '20px'}}
                    onClick={() => this.setState(state => ({open: false}))}
                >
                    <AiOutlineArrowLeft/>
                </button>

                <div>
                    <PlateForm setM={this.setMenu} admin={this.state.email}/>
                </div>
            </div>
        )
    }

    deleteConsumible(consumible){
        const body = {
            target: consumible.id,
            admin: this.state.email
        }
        API.postAdmin('restaurante/deleteConsumible', body)
        .then(res => {
            console.log(res.data);
            this.setState(state => ({menu: res.data.menu}))
        })
        .catch(err => console.log(err));
    }

    showAll(){
        return (
            <div>
                <div className='card' style={{zIndex:'2', marginLeft: '1%',width: 'calc(100% - 220px)', backgroundColor:'lightgray', border:'none'}}> 
                        <div className='row' style={{marginLeft: '1px'}}>
                            <div className='col'>
                                <input 
                                    className="form-control" 
                                    type="search" 
                                    placeholder="Buscar consumible por nombre"
                                    value={this.state.search}
                                    onChange={ event => this.handleChange(event.target.value, 'search') }
                                    aria-label="Search"
                                    style={{width: '100%', marginTop: '1%'}}  
                                />
                            </div>
                            <div className='col' align='left'>
                                <button type="button" className="btn btn-success"
                                    style={{marginLeft: '5px', margin: '1%'}}
                                    onClick={() => this.setState(state => ({open: true}))}
                                >
                                    Crear nuevo consumible
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
                        zIndex:'1', backgroundColor: 'gray'}}
                    >
                        {this.state.menu.platosR?
                            this.state.menu.platosR.length === 0 && this.state.menu.bebidasR.length === 0?
                            <div className='card' style={{
                                margin: '3%',
                                borderColor: 'red',
                                backgroundColor: '#F48FB1'
                            }}>
                                    <h3> No hay consumibles registrados</h3>
                            </div>
                            :
                            <div>
                                <ul style={{listStyleType: 'none'}}>
                                    {
                                        this.state.menu.platosR.map((elem, k) => 
                                            <div key={k}>
                                                {elem.content
                                                .filter(p => p.nombre.toLowerCase().includes(this.state.search.toLowerCase()))
                                                .map((i, j) => 
                                                    <li key={j}>
                                                        <div className='card' style={{margin: '15px', marginLeft: '0px', 
                                                            backgroundColor: 'rgb(233, 220, 201)', borderRadius: '20px'}}>
                                                            <div style={{display: 'flex', margin: '1%'}}>
                                                                <div style={{width: '20%', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                                                                    {i.nombre}
                                                                </div>
                                                                <div style={{width: '20%', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                                                                    {i.tipo}
                                                                </div>
                                                                <div style={{width: '20%', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                                                                    <span style={{color: 'green'}}>${i.precio}</span>
                                                                </div>
                                                                <div style={{width: '20%', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                                                                    <span style={{color:'red'}}>${i.cost}</span>
                                                                </div>
                                                                <div style={{width: '30%'}}>
                                                                    <button type='button' className='btn btn-danger'
                                                                        onClick={() => this.deleteConsumible(i)}
                                                                    > eliminar </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )}
                                            </div>
                                        )
                                    }
                                    {
                                        this.state.menu.bebidasR.map((elem, k) => 
                                            <div key={k}>
                                                {elem.content
                                                .filter(p => p.nombre.toLowerCase().includes(this.state.search.toLowerCase()))
                                                .map((i, j) => 
                                                    <li key={j}>
                                                        <div className='card' style={{margin: '15px', marginLeft: '0px', 
                                                            backgroundColor: 'rgb(233, 220, 201)', borderRadius: '20px'}}>
                                                        <div style={{display: 'flex', margin: '1%'}}>
                                                            <div style={{width: '20%', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                                                                {i.nombre}
                                                            </div>
                                                            <div style={{width: '20%', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                                                                {i.tamanio}
                                                            </div>
                                                            <div style={{width: '20%', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                                                                <span style={{color: 'green'}}>${i.precio}</span>
                                                            </div>
                                                            <div style={{width: '20%', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                                                                <span style={{color:'red'}}>${i.cost}</span>
                                                            </div>
                                                            <div style={{width: '30%'}}>
                                                                <button type='button' className='btn btn-danger'
                                                                    onClick={() => this.deleteConsumible(i)}
                                                                > eliminar </button>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </li>
                                                )}
                                            </div>
                                        )
                                    }
                                </ul>
                            </div>
                        :
                        <div></div>}
                    </div>
            </div>
        )
    }

    render(){
        return (
            <React.Fragment>
                <SideBarAdmin seccion={'Menu'}  content={this.content()}/>
                <div style={{
                    position:'fixed', left:200,
                    backgroundColor: 'lightgray',height:'100vh', width: '100%',}}
                >
                    {this.state.open? this.showForm(): this.showAll()}
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Menu);