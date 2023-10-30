import React from 'react';
import {withRouter} from 'react-router';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const secciones = [
    {seccion: 'Empleados',link: 'empleados', descripcion: 'administra a tus empleados', sub: []},
    {seccion: 'Mesas',link: 'mesas', descripcion: 'Agrega, observa o elimina las mesas', sub: []},
    {seccion: 'Ordenes',link: 'ordenes', descripcion: 'Las ordenes que se han realizado hasta el momento', sub: []},
    {seccion: 'Solicitudes',link: 'solicitudes', descripcion: 'Aprueba o rechaza las peticiones de tus empleados', sub: []},
    {seccion: 'Info personal',link: 'info', descripcion: 'Revisa tu informacion ya que tus empleados pueden nesecitarla', sub: []},
    {seccion: 'Ayuda',link: 'help'},
]

class HomeAdmin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            admin: "",
            email: "",
            direccion: "",
            tel: "",
            empleados: [],
            mesas: [],
            ordenes: [],
            solicitudes: [],
        }
    }

    componentDidMount(){
        if(this.props.content !== undefined){
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
            this.props.history.push('/admin/');
        }
    }

    render(){
        return <React.Fragment>
            <div style={{     
                backgroundColor: 'darkblue',
                height: '80px',
                justifyContent: 'flex-start',
                alignItems: 'center',
                zIndex: 2
                }}
            />
            <div style={{
                backgroundColor: 'blue',
                width: '200px',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                position: 'fixed',
                top: 80,
                left: 0,
                transition: '850ms',
                zIndex: 1
            }}>
                <ul>
                {secciones.map(seccion => {
                        return (
                            <li>
                                <Link to=''>{seccion.seccion}</Link>
                                <ul>
                                    {seccion.sub? seccion.sub.map(ss => <li>ss</li>) : <div/>}
                                </ul>
                            </li>
                        )
                    })
                }
                </ul>
            </div>
                
            <div style={{
                position:'fixed', 
                left:200, 
                marginTop:'3px', 
                marginLeft: '3px',
            }}>
                <div className='flex-wrap' style={{ display: 'flex',flexDirection: 'row'}}>
                    {secciones.map(elem => {
                        if(elem.descripcion  !== undefined){
                            return (
                                <div className="card" style={{width: "18rem", margin: "3%", marginTop: "2%", borderRadius: '20px'}}>
                                    <button 
                                        type='button' 
                                        style={{borderRadius: '20px', height: '150px'}}
                                        onClick={() => console.log('/admin/'+elem.link)}
                                    >
                                        <div className="card-body">
                                            <h5 className="card-title">{elem.seccion}</h5>
                                            <p className="card-text">{elem.descripcion}</p>
                                        </div>
                                    </button>
                                </div>
                            )
                        } else {
                            return (<div/>)
                        }
                    })}
                </div>

                <button 
                    type='button' className='btn btn-primary'
                    onClick={() => console.log(this.state)}
                > 
                    debug
                </button>
            </div>            

        </React.Fragment>
    }
}

export default withRouter(HomeAdmin);