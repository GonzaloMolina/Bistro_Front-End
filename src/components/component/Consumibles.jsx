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
                            "id": 13,
                            "nombre": "Coca-Cola 500ml",
                            "precio": 600,
                            "tamanio": "CHICO"
                        },
                        {
                            "id": 14,
                            "nombre": "Fanta 500ml",
                            "precio": 600,
                            "tamanio": "CHICO"
                        },
                        {
                            "id": 17,
                            "nombre": "Sprite 500ml",
                            "precio": 600,
                            "tamanio": "CHICO"
                        },
                        {
                            "id": 20,
                            "nombre": "Pepsi 500ml",
                            "precio": 600,
                            "tamanio": "CHICO"
                        },
                        {
                            "id": 23,
                            "nombre": "7up 500ml",
                            "precio": 600,
                            "tamanio": "CHICO"
                        }
                    ]
                },
                {
                    type: "MEDIANO",
                    contents: [
                        {
                            "id": 12,
                            "nombre": "Coca-Cola 1,5l",
                            "precio": 700,
                            "tamanio": "MEDIANO"
                        },
                        {
                            "id": 15,
                            "nombre": "Fanta 1,5l",
                            "precio": 700,
                            "tamanio": "MEDIANO"
                        },
                        {
                            "id": 18,
                            "nombre": "Sprite 1,5l",
                            "precio": 700,
                            "tamanio": "MEDIANO"
                        },
                        {
                            "id": 21,
                            "nombre": "Pepsi 1,5l",
                            "precio": 700,
                            "tamanio": "MEDIANO"
                        },
                        {
                            "id": 24,
                            "nombre": "7up 1,5l",
                            "precio": 700,
                            "tamanio": "MEDIANO"
                        }
                    ]
                },
                {
                    type: "GRANDE",
                    contents: [
                        {
                            "id": 11,
                            "nombre": "Coca-Cola 3l",
                            "precio": 800,
                            "tamanio": "GRANDE"
                        },   
                        {
                            "id": 16,
                            "nombre": "Fanta 3l",
                            "precio": 800,
                            "tamanio": "GRANDE"
                        },
                        {
                            "id": 19,
                            "nombre": "Sprite 3l",
                            "precio": 800,
                            "tamanio": "GRANDE"
                        },
                        {
                            "id": 22,
                            "nombre": "Pepsi 3l",
                            "precio": 800,
                            "tamanio": "GRANDE"
                        },
                        {
                            "id": 25,
                            "nombre": "7up 3l",
                            "precio": 800,
                            "tamanio": "GRANDE"
                        }
                    ]
                },
                {
                    type: "PASTA",
                    contents: [
                        {
                            "id": 30,
                            "nombre": "Canelones",
                            "precio": 10200,
                            "tipo": "PASTA",
                            "acompanamiento": null,
                            "salsa": null
                          },
                          {
                            "id": 31,
                            "nombre": "Espagueti",
                            "precio": 5230,
                            "tipo": "PASTA",
                            "acompanamiento": null,
                            "salsa": null
                          },
                          {
                            "id": 32,
                            "nombre": "Fettuccini",
                            "precio": 684,
                            "tipo": "PASTA",
                            "acompanamiento": null,
                            "salsa": null
                          },
                          {
                            "id": 33,
                            "nombre": "Ñoquis",
                            "precio": 5372,
                            "tipo": "PASTA",
                            "acompanamiento": null,
                            "salsa": null
                          }
                    ]
                },
                {
                    type: "PESCADO",
                    contents: [
                        {
                            "id": 34,
                            "nombre": "Salmon",
                            "precio": 7544,
                            "tipo": "PESCADO",
                            "acompanamiento": null,
                            "salsa": null
                        },
                        {
                            "id": 35,
                            "nombre": "Atun",
                            "precio": 5682,
                            "tipo": "PESCADO",
                            "acompanamiento": null,
                            "salsa": null
                          },
                          {
                            "id": 36,
                            "nombre": "Trucha",
                            "precio": 7950,
                            "tipo": "PESCADO",
                            "acompanamiento": null,
                            "salsa": null
                          },
                          {
                            "id": 37,
                            "nombre": "Pejerey",
                            "precio": 8954,
                            "tipo": "PESCADO",
                            "acompanamiento": null,
                            "salsa": null
                          }
                    ]
                },
                {
                    type: "CARNE",
                    contents: [
                        {
                            "id": 26,
                            "nombre": "Milanesa",
                            "precio": 1234,
                            "tipo": "CARNE",
                            "acompanamiento": null,
                            "salsa": null
                          },
                          {
                            "id": 27,
                            "nombre": "pechuga de pollo",
                            "precio": 1032,
                            "tipo": "CARNE",
                            "acompanamiento": null,
                            "salsa": null
                          },
                          {
                            "id": 28,
                            "nombre": "costilla de cerdo",
                            "precio": 4531,
                            "tipo": "CARNE",
                            "acompanamiento": null,
                            "salsa": null
                          },
                          {
                            "id": 29,
                            "nombre": "cesos de vaca",
                            "precio": 0,
                            "tipo": "CARNE",
                            "acompanamiento": null,
                            "salsa": null
                          }
                    ]
                },
                {
                    type: "POSTRE",
                    contents: [
                        {
                            "id": 38,
                            "nombre": "Tiramisu",
                            "precio": 345430,
                            "tipo": "POSTRE",
                            "acompanamiento": null,
                            "salsa": null
                          },
                          {
                            "id": 39,
                            "nombre": "Budin de chocolate",
                            "precio": 3242,
                            "tipo": "POSTRE",
                            "acompanamiento": null,
                            "salsa": null
                          },
                          {
                            "id": 40,
                            "nombre": "Sufle",
                            "precio": 2312,
                            "tipo": "POSTRE",
                            "acompanamiento": null,
                            "salsa": null
                          },
                          {
                            "id": 41,
                            "nombre": "3bochas de helado",
                            "precio": 3543,
                            "tipo": "POSTRE",
                            "acompanamiento": null,
                            "salsa": null
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

    handleChange = (e, n) =>{
        if(e.tamanio === undefined){
            for (var i = 0; i < n; i++){
                this.setState(state => ({orden: !this.state.platos}))
                this.setState(state => ({orden: this.state.platos.push(e.id)}))
            }
        }
        else{
            for (var j = 0; j < n; j++){
                this.setState(state => ({orden: !this.state.bebidas}))
                this.setState(state => ({orden: this.state.bebidas.push(e.id)}))
            }
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