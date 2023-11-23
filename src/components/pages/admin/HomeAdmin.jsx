import React from 'react';
import {withRouter} from 'react-router';
import secciones from './secciones';
import SideBarAdmin from '../../component/SideBarAdmin';

class HomeAdmin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            admin: "",
            email: "",
            direccion: "",
            tel: "",
            menu:{},
            empleados: [],
            mesas: [],
            ordenes: [],
            solicitudes: [],
        }
    }

    componentDidMount(){
        console.log(this.props)
        if(this.props.content !== undefined && this.props.content.email !== undefined){
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

    render(){
        return <React.Fragment>
            <SideBarAdmin seccion={'Home'} content={this.content()}/>
                
            <div style={{
                position:'fixed', 
                left:200, 
                overflow:'scroll', height:'100%', backgroundColor:'lightgray'
            }}>
                <div className='flex-wrap' style={{ display: 'flex',flexDirection: 'row'}}>
                    {secciones.map((elem, k) => {
                        if(elem.descripcion  !== undefined){
                            return (
                                <div className="card" key={k} style={{width: "18rem", margin: "2%", borderRadius: '20px'}}>
                                    <button 
                                        type='button' 
                                        style={{borderRadius: '20px', height: '150px'}}
                                        onClick={() => this.props.history.push('/admin'+elem.link, this.content())}
                                    >
                                        <div className="card-body">
                                            <h5 className="card-title">{elem.seccion}</h5>
                                            <p className="card-text">{elem.descripcion}</p>
                                        </div>
                                    </button>
                                </div>
                            )
                        } else {
                            return (<div key={k}/>)
                        }
                    })}
                </div>
            </div>            

        </React.Fragment>
    }
}

export default withRouter(HomeAdmin);