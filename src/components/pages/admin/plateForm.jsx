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
            tamanio: "",
            success: 2,

            flag: true
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
        if(body.admin === "" || body.nombre === "" || body.tipo === "" || body.precio < 0 || body.cost < 0 || this.verificarTipo()){
            this.setState(state => ({success: 0}));
        }
        else{
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
    }

    crearB(){
        const body = {
            admin: this.props.admin,
            cost: this.state.costo,
            nombre: this.state.nombre,
            precio: this.state.precio,
            tamanio: this.state.tamanio.toLowerCase()
        }
        if(body.admin === "" || body.nombre === "" || body.tamanio === "" || body.precio < 0 || body.cost < 0 || this.verificarTamanio()){
            this.setState(state => ({success: 0}));
        }
        else{
            API.postAdmin('restaurante/newBebida', body)
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
    }

    verificarTamanio(){
        return this.state.tamanio.toLowerCase() !== "chico" &&
        this.state.tamanio.toLowerCase() !== "mediano" &&
        this.state.tamanio.toLowerCase() !== "grande"
    }

    formP(){
        return (
            <div style={{backgroundColor: 'lightgray'}}>
                <div align='center'>
                    <h2> Formulario de creacion de Plato </h2>
                </div>

                <form>
                    <div style={{display: 'flex', margin: '1%'}}>
                        <div style={{width: '10%', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                            <label style={{fontSize: '18px'}}> Nombre: </label>
                        </div>
                        <div style={{width: '30%'}}>
                            {this.state.success === 0 && this.state.nombre === ""?
                                <input type="text" className="form-control" 
                                    style={{ borderColor:'red' }}
                                    value={this.state.nombre}
                                    onChange={ event => this.handleChange(event.target.value, 'nombre') }
                                    placeholder="ejemplo: Tallarines"/>
                            :
                                <input type="text" className="form-control" 
                                    style={{}}
                                    value={this.state.nombre}
                                    onChange={ event => this.handleChange(event.target.value, 'nombre') }
                                    placeholder="ejemplo: Tallarines"/>
                            }
                        </div>
                    </div>

                    <div style={{display: 'flex' , margin: '1%'}}>
                        <div style={{width: '10%', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                            <label style={{fontSize: '18px'}}> Precio: </label>
                        </div>
                        <div style={{width: '30%'}}>
                            {this.state.success === 0 && this.state.precio < 0?
                                <input type="number" step="0.01" className="form-control" 
                                style={{borderColor: 'red'}}
                                value={this.state.precio}
                                onChange={ event => this.handleChange(event.target.value, 'precio') }
                                placeholder="ejemplo: 1800.5"/>
                            :
                                <input type="number" step="0.01" className="form-control" 
                                style={{}}
                                value={this.state.precio}
                                onChange={ event => this.handleChange(event.target.value, 'precio') }
                                placeholder="ejemplo: 1800.5"/>
                            }
                        </div>
                        <div style={{width: '10%', marginLeft: '5px', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                            <label style={{fontSize: '18px'}}> Costo: </label>
                        </div>
                            <div style={{width: '30%'}}>
                                {this.state.success === 0 && this.state.costo < 0?
                                    <input type="number" step="0.01" className="form-control" 
                                    style={{borderColor: 'red'}}
                                    value={this.state.costo}
                                    onChange={ event => this.handleChange(event.target.value, 'costo') }
                                    placeholder="ejemplo: 800.05"/>
                                :
                                    <input type="number" step="0.01" className="form-control" 
                                    style={{}}
                                    value={this.state.costo}
                                    onChange={ event => this.handleChange(event.target.value, 'costo') }
                                    placeholder="ejemplo: 800.05"/>
                                }
                            </div>
                        </div>

                        <div style={{display: 'flex', margin: '1%'}}>
                            <div style={{width: '10%', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                                <label style={{fontSize: '18px'}}> Tipo: </label>
                            </div>
                            <div style={{width: '30%'}}>
                                {this.state.success === 0 && this.verificarTipo()?
                                    <input type="text" className="form-control" 
                                    style={{borderColor: 'red'}}
                                    value={this.state.tipo}
                                    onChange={ event => this.handleChange(event.target.value, 'tipo') }
                                    placeholder="Pasta"/>
                                :
                                    <input type="text" className="form-control" 
                                    style={{}}
                                    value={this.state.tipo}
                                    onChange={ event => this.handleChange(event.target.value, 'tipo') }
                                    placeholder="Pasta"/>

                                }
                                <small id="typeHelp" className="form-text text-muted">Tipos de platos: Carne, Pasta, Pescado, Postre.</small>
                            </div>
                        </div>
                    </form>

                    <div style={{display: 'flex', justifyContent: 'center',alignItems: 'center', marginBottom: '2%'}}>
                        <button type='button' className='btn btn-success'
                         onClick={() => this.crear()}
                        > Crear el plato </button>
                    </div>
            </div>
        )
    }

    verificarTipo(){
        return this.state.tipo.toLowerCase() !== "carne" &&
        this.state.tipo.toLowerCase() !== "postre" &&
        this.state.tipo.toLowerCase() !== "pasta"&&
        this.state.tipo.toLowerCase() !== "pescado"
    }

    formB(){
        return (
            <div style={{backgroundColor: 'lightgray'}}>
                <div align='center'>
                    <h2> Formulario de creacion de Bebida </h2>
                </div>

                <form style={{backgroundColor: 'lightgray'}}>
                    <div style={{display: 'flex', margin: '1%'}}>
                        <div style={{width: '10%', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                            <label style={{fontSize: '18px'}}> Nombre: </label>
                        </div>
                        <div style={{width: '30%'}}>
                            {this.state.success === 0 && this.state.nombre === ""?
                                <input type="text" className="form-control" 
                                    style={{ borderColor:'red' }}
                                    value={this.state.nombre}
                                    onChange={ event => this.handleChange(event.target.value, 'nombre') }
                                    placeholder="ejemplo: Tang de naranja"/>
                            :
                                <input type="text" className="form-control" 
                                    style={{}}
                                    value={this.state.nombre}
                                    onChange={ event => this.handleChange(event.target.value, 'nombre') }
                                    placeholder="ejemplo: Tang de naranja"/>
                            }
                        </div>
                    </div>

                    <div style={{display: 'flex' , margin: '1%'}}>
                        <div style={{width: '10%', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                            <label style={{fontSize: '18px'}}> Precio: </label>
                        </div>
                        <div style={{width: '30%'}}>
                            {this.state.success === 0 && this.state.precio < 0?
                                <input type="number" step="0.01" className="form-control" 
                                style={{borderColor: 'red'}}
                                value={this.state.precio}
                                onChange={ event => this.handleChange(event.target.value, 'precio') }
                                placeholder="ejemplo: 800.5"/>
                            :
                                <input type="number" step="0.01" className="form-control" 
                                style={{}}
                                value={this.state.precio}
                                onChange={ event => this.handleChange(event.target.value, 'precio') }
                                placeholder="ejemplo: 500.5"/>
                            }
                        </div>
                        <div style={{width: '10%', marginLeft: '5px', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                            <label style={{fontSize: '18px'}}> Costo: </label>
                        </div>
                            <div style={{width: '30%'}}>
                                {this.state.success === 0 && this.state.costo < 0?
                                    <input type="number" step="0.01" className="form-control" 
                                    style={{borderColor: 'red'}}
                                    value={this.state.costo}
                                    onChange={ event => this.handleChange(event.target.value, 'costo') }
                                    placeholder="ejemplo: 400.05"/>
                                :
                                    <input type="number" step="0.01" className="form-control" 
                                    style={{}}
                                    value={this.state.costo}
                                    onChange={ event => this.handleChange(event.target.value, 'costo') }
                                    placeholder="ejemplo: 400.05"/>
                                }
                            </div>
                        </div>

                        <div style={{display: 'flex', margin: '1%'}}>
                            <div style={{width: '10%', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                                <label style={{fontSize: '18px'}}> Tamaño: </label>
                            </div>
                            <div style={{width: '30%'}}>
                                {this.state.success === 0 && this.verificarTamanio()?
                                    <input type="text" className="form-control" 
                                        style={{borderColor: 'red'}}
                                        value={this.state.tamanio}
                                        onChange={ event => this.handleChange(event.target.value, 'tamanio') }
                                        placeholder="Chico"/>
                                :
                                    <input type="text" className="form-control" 
                                        style={{}}
                                        value={this.state.tamanio}
                                        onChange={ event => this.handleChange(event.target.value, 'tamanio') }
                                        placeholder="Chico"/>
                                }
                                <small id="sizeHelp" className="form-text text-muted">Tipos de tamanios: Grande, Mediano, Chico.</small>
                            </div>
                        </div>
                    </form>

                    <div style={{display: 'flex', justifyContent: 'center',alignItems: 'center', marginBottom: '2%'}}>
                        <button type='button' className='btn btn-success'
                         onClick={() => this.crearB()}
                        > Crear bebida </button>
                    </div>
            </div>
        )
    }

    render(){
        return (
            <React.Fragment>
                {this.state.success === 2? 
                    <div></div> 
                    : 
                    <div className='card' style={{ 
                        width: 'calc(100% - 240px)', 
                        borderBlockColor: this.state.success? 'green': 'red',
                        backgroundColor: this.state.success? '#AED581': '#F48FB1',
                    }}>
                        <h6>{this.state.success? 'Success' : 'Fail'}</h6>
                    </div>
                }
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group mr-2" role="group" aria-label="First group">
                        <button type="button" 
                            className={this.state.flag? 'btn btn-secondary' : 'btn btn-outline-secondary'}
                            onClick={() => this.setState(state => ({flag: true}))}
                        >
                            Crear un plato
                        </button>
                        <button type="button" 
                            className={!this.state.flag? 'btn btn-secondary' : 'btn btn-outline-secondary'}
                            onClick={() => this.setState(state => ({flag: false}))}
                        >
                            Crear una bebida
                        </button>
                    </div>
                </div>

                <div className='card' style={{ width: 'calc(100% - 240px)', borderColor: 'gray', borderWidth:'1,9px'}}>
                    {this.state.flag? this.formP() : this.formB()}
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(PlateForm);