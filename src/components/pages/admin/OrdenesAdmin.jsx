// OrdenesAdmin.jsx
import React from 'react';
import { withRouter } from 'react-router-dom';  // Asegúrate de importar withRouter si lo estás utilizando
import SideBarAdmin from '../../component/SideBarAdmin'  // Asegúrate de ajustar la ruta de importación según la ubicación de tu archivo
import OrdenesTable from './OrdenesTable';  // Asegúrate de ajustar la ruta de importación según la ubicación de tu archivo
import './OrdenesTable.css';  // Asegúrate de ajustar la ruta de importación según la ubicación de tu archivo CSS
import OrdenesChart from './OrdenesChart';
import API from '../../../service/api';


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
            open: false
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

  showTabla(){
    return (
      <div style={{matginBottom: '2%'}}>
        <OrdenesTable ordenes={this.state.ordenes} />
      </div>
    );
  }

  showGraf(){
    return (
        <div>
          <OrdenesChart
              ordenes={this.state.ordenes}
              selectedDate={this.state.selectedDate}
              onDateChange={this.handleDateChange}
          />
        </div>
    )
  }

  update(){
    const body = {
        email: this.state.email
    }
    API.postAdmin('restaurante/getInfo', body)
    .then(res => {
        this.setState(state => ({ordenes: res.data.ordenes}))
    }).catch(err => console.log(err))
}

  render() {
    return (
      <React.Fragment>
        <div style={{maxHeight:'23%'}}>
        <SideBarAdmin seccion={'Ordenes'} content={this.content()} />
          <div style={{
            position: 'fixed',
            left: 200,
            overflow: 'scroll',
            height: 'calc(100% - 85px)',
            width: 'calc(100% - 200px)',
            backgroundColor: 'lightgrey',
          }}> 
            <h1 style={{marginLeft: '2%'}}>Ordenes registradas</h1>
            
            <div className='card' align='center' style={{
              margin: '2%',
              backgroundColor: 'white'
            }}>
              {this.state.open ? this.showTabla() : this.showGraf()}
            </div>
            
            <div className='row' style={{marginBottom: '2%', marginLeft: '2%', width:'calc(100% - 80px)'}}>
              <div className='col-sm' style={{width: '30%'}}>
                <button className='btn btn-secondary' onClick={() => this.update()}>
                  Actualizar
                </button>
              </div>
              <div className='col-sm' style={{width: '30%'}}>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"
                    onClick={() => {
                      const temp = ! this.state.open;
                      this.setState(state => ({open: temp}))
                    }}
                  />
                  <label className="form-check-label" for="flexSwitchCheckChecked">
                    {this.state.open? 'Mostrar como grafico' : 'Mostrar como tabla'}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(OrdenesAdmin);