import React from 'react';
import {withRouter} from 'react-router';
import API from '../../../service/api';

class PlateForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            nombre: "",
            precio: 0.0,
            costo: 0.0,
            tipo: "",
            success: 2,
        }
    }

    handleChange(value, prop) {
        this.setState(prevState => ({ ...prevState, [prop]: value }));
        this.setState(prevState => ({ success: 2}));
    }

    crear(){
        const body = {
            acompaniamiento: "",
            admin: this.props.admin,
            cost: this.state.costo,
            nombre: this.state.nombre,
            precio: this.state.precio,
            tipo: this.state.tipo
        }
        
        API.postAdmin('restaurante/newPlato', body)
        .then(res => {
            this.props.setM(res.data.menu);
            this.setState(state => ({
                success: 1
            }));
        })
        .catch(err => {
            console.log(err);
            this.setState(state => ({
                success: 0
            }));
        })
    }

    render(){
        return (
            <React.Fragment>
                {this.state.success === 2? 
                    <div></div> 
                    : 
                    <div className='card' style={{ width: 'calc(100% - 240px)',}}>
                        <h6>{this.state.success? 'success' : 'fail'}</h6>
                    </div>
                }
                <div className='card' style={{ width: 'calc(100% - 240px)',}}>
                    <form>
                        <div style={{display: 'flex', margin: '1%'}}>
                            <div style={{width: '10%', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                                <label style={{fontSize: '18px'}}> Nombre: </label>
                            </div>
                            <div style={{width: '30%'}}>
                                <input type="text" className="form-control" 
                                    style={{
                                        
                                    }}
                                    value={this.state.nombre}
                                    onChange={ event => this.handleChange(event.target.value, 'nombre') }
                                    placeholder="Nombre del plato"/>
                            </div>
                        </div>

                        <div style={{display: 'flex' , margin: '1%'}}>
                            <div style={{width: '10%', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                                <label style={{fontSize: '18px'}}> Precio: </label>
                            </div>
                            <div style={{width: '30%'}}>
                                <input type="number" step="0.01" className="form-control" 
                                    style={{
                                        
                                    }}
                                    value={this.state.precio}
                                    onChange={ event => this.handleChange(event.target.value, 'precio') }
                                    placeholder="Nombre del plato"/>
                            </div>
                            <div style={{width: '10%', marginLeft: '5px', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                                <label style={{fontSize: '18px'}}> Costo: </label>
                            </div>
                            <div style={{width: '30%'}}>
                                <input type="number" step="0.01" className="form-control" 
                                    style={{
                                        
                                    }}
                                    value={this.state.costo}
                                    onChange={ event => this.handleChange(event.target.value, 'costo') }
                                    placeholder="Nombre del plato"/>
                            </div>
                        </div>

                        <div style={{display: 'flex', margin: '1%'}}>
                            <div style={{width: '10%', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                                <label style={{fontSize: '18px'}}> Tipo: </label>
                            </div>
                            <div style={{width: '30%'}}>
                                <input type="text" className="form-control" 
                                    style={{
                                        
                                    }}
                                    value={this.state.tipo}
                                    onChange={ event => this.handleChange(event.target.value, 'tipo') }
                                    placeholder="Nombre del plato"/>
                            </div>
                        </div>
                    </form>

                    <div style={{display: 'flex', justifyContent: 'center',alignItems: 'center', marginBottom: '2%'}}>
                        <button type='button' className='btn btn-success'
                         onClick={() => this.crear()}
                        > Crear el plato </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(PlateForm);