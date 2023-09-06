import React from 'react';
import { withRouter } from 'react-router';

class Consumibles extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menu:[
                {
                    type: "Chico",
                    contents: [
                        {
                            "id": 11,
                            "nombre": "Pepsi 500ml",
                            "precio": 800,
                            "tamanio": "CHICO"
                        },
                        {
                            "id": 11,
                            "nombre": "Fanta 500ml",
                            "precio": 800,
                            "tamanio": "CHICO"
                        },
                        {
                            "id": 11,
                            "nombre": "Coca-cola 500ml",
                            "precio": 800,
                            "tamanio": "CHICO"
                        },
                        {
                            "id": 11,
                            "nombre": "Manaos 500ml",
                            "precio": 800,
                            "tamanio": "CHICO"
                        }

                    ]
                },
                {
                    type: "MEDIANO",
                    contents: [
                        {
                            "id": 11,
                            "nombre": "Pepsi 1,5l",
                            "precio": 800,
                            "tamanio": "MEDIANO"
                        },
                        {
                            "id": 11,
                            "nombre": "Fanta 1,5l",
                            "precio": 800,
                            "tamanio": "MEDIANO"
                        },
                        {
                            "id": 11,
                            "nombre": "Coca-cola 1,5l",
                            "precio": 800,
                            "tamanio": "MEDIANO"
                        },
                        {
                            "id": 11,
                            "nombre": "Manaos 1,5l",
                            "precio": 800,
                            "tamanio": "MEDIANO"
                        }
                    ]
                },
                {
                    type: "GRANDE",
                    contents: [
                        {
                            "id": 11,
                            "nombre": "Pepsi 2,25l",
                            "precio": 800,
                            "tamanio": "GRANDE"
                        },
                        {
                            "id": 11,
                            "nombre": "Pepsi 3l",
                            "precio": 800,
                            "tamanio": "GRANDE"
                        },
                        {
                            "id": 11,
                            "nombre": "Fanta 3l",
                            "precio": 800,
                            "tamanio": "GRANDE"
                        },
                        {
                            "id": 11,
                            "nombre": "Coca-cola 3l",
                            "precio": 800,
                            "tamanio": "GRANDE"
                        },
                        {
                            "id": 11,
                            "nombre": "Manaos 3l",
                            "precio": 800,
                            "tamanio": "GRANDE"
                        }

                    ]
                },
                {
                    type: "PASTA",
                    contents: [
                        {
                            "id": 11,
                            "nombre": "Canelones",
                            "precio": 800,
                            "tipo": "PASTA"
                        },
                        {
                            "id": 11,
                            "nombre": "Spagetti",
                            "precio": 800,
                            "tipo": "PASTA"
                        },
                        {
                            "id": 11,
                            "nombre": "Ñoquis",
                            "precio": 800,
                            "tipo": "PASTA"
                        }
                    ]
                },
                {
                    type: "CARNE",
                    contents: [
                        {
                            "id": 11,
                            "nombre": "Pechuga de pollo",
                            "precio": 800,
                            "tipo": "CARNE"
                        },
                        {
                            "id": 11,
                            "nombre": "milanesa",
                            "precio": 800,
                            "tipo": "CARNE"
                        },
                        {
                            "id": 11,
                            "nombre": "Churrasco",
                            "precio": 800,
                            "tipo": "CARNE"
                        },
                        {
                            "id": 11,
                            "nombre": "Cesos",
                            "precio": 800,
                            "tipo": "CARNE"
                        }
                    ]
                },
                {
                    type: "POSTRE",
                    contents: [
                        {
                            "id": 11,
                            "nombre": "Postre 1",
                            "precio": 800,
                            "tipo": "POSTRE"
                        },
                        {
                            "id": 11,
                            "nombre": "Postre 2",
                            "precio": 800,
                            "tipo": "POSTRE"
                        }
                    ]
                }
            ],
            bebidas:[],
            platos:[]
        }
    }

    handleClick = (sec) => {
        document.getElementById(sec).scrollIntoView();
    };

    handleChange = (e, cant) =>{
        if(e.tamanio === undefined){
            this.setState(state => ({orden: !this.state.platos}))
            this.setState(state => ({orden: this.state.platos.push(e)}))
        }
        else{
            this.setState(state => ({orden: !this.state.bebidas}))
            this.setState(state => ({orden: this.state.bebidas.push(e)}))
        }
    }

    doCreate(){
        this.props.create(this.state.platos, this.state.bebidas);
    }

    render(){
        return(
            <React.Fragment>
                <div id="name" className="card sticky-top" style={{margin:'4px'}}>
                        <div className='d-flex justify-content-center flex-row '>
                            <div id="name" className="btn-group flex-wrap">
                                {this.state.menu.map((e,i) => 
                                    <button 
                                        key={i}
                                        type='button' 
                                        className='btn btn-secondary' 
                                        onClick = {() => this.handleClick('seccion'+i)}
                                        style={{margin:'2px'}}
                                    >
                                        {e.type}
                                    </button>
                                )}
                                <button 
                                        type='button' 
                                        className='btn btn-success' 
                                        onClick = {() => {console.log(this.state);this.doCreate()}}
                                        style={{margin:'2px'}}
                                    >
                                        crear
                                    </button>
                            </div>
                        </div>
                    </div>

                    <div id="name" className="card" style={{margin: "4px"}}>
                            <ul className="list-group">
                                {
                                    this.state.menu.map((elem,i) => 
                                        <div ref={"seccion"+i} id={"seccion"+i} key={i} style={{margin: '5px'}}>
                                            <li key={i}className="list-group-item">{"seccion de "+ elem.type}</li>
                                            {elem.contents.map((e,i) => 
                                                <li key={i} className="list-group-item">
                                                    
                                                    <div className="container flex-row">
                                                        <div className="row flex-row">
                                                            <div className="col">
                                                                {e.nombre}
                                                            </div>
                                                            <div className="col">
                                                                {"$ "+e.precio}
                                                            </div>
                                                            <div className="col">
                                                                <div id="cantidad" className="form-group">
                                                                    <input
                                                                        className="form-control input-sm"
                                                                        type="Int"
                                                                        id="cantidad"
                                                                        placeholder="cantidad"
                                                                        value={this.state.password}
                                                                        style={{paddingLeft: '0px'}}
                                                                        onChange={event => this.handleChange(e, event.target.value)}
                                                                    />
                                                                </div>
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
            </React.Fragment>
        );
    }
}

export default withRouter(Consumibles);