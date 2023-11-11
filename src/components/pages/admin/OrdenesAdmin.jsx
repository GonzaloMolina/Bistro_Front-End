// OrdenesAdmin.jsx
import React from 'react';
import { withRouter } from 'react-router-dom';  // Asegúrate de importar withRouter si lo estás utilizando
import SideBarAdmin from '../../component/SideBarAdmin'  // Asegúrate de ajustar la ruta de importación según la ubicación de tu archivo
import OrdenesTable from './OrdenesTable';  // Asegúrate de ajustar la ruta de importación según la ubicación de tu archivo
import './OrdenesTable.css';  // Asegúrate de ajustar la ruta de importación según la ubicación de tu archivo CSS
import OrdenesChart from './OrdenesChart';


class OrdenesAdmin extends React.Component {
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
            selectedDate: null, // Estado para almacenar la fecha seleccionada
        }
    }

    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    };

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

  render() {
    return (
      <React.Fragment>
        <div style={{maxHeight:'23%'}}>
        <SideBarAdmin seccion={'Ordenes'} content={this.content()} />
        <div style={{
          position: 'fixed',
          left: 200,
          marginTop: '3px',
          marginLeft: '3px',
          overflow: 'scroll',
          height: '100%',
          width:"100%"
        }}>
        <h1>Ordenes</h1>
        <OrdenesTable ordenes={this.state.ordenes} />
        
        <div>
        <OrdenesChart
            ordenes={this.state.ordenes}
            selectedDate={this.state.selectedDate}
            onDateChange={this.handleDateChange}
        />
        </div>
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

export default withRouter(OrdenesAdmin);