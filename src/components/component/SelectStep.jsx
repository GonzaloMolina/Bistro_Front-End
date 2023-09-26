import React from 'react';
import { withRouter } from 'react-router';

class SelectStep extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            menu: {
                "bebidasR": [
                    {
                      "tamanio": "GRANDE",
                      "content": [
                        {
                          "id": 12,
                          "nombre": "Coca-Cola 3l",
                          "precio": 800,
                          "tamanio": "GRANDE"
                        },
                        {
                          "id": 17,
                          "nombre": "Fanta 3l",
                          "precio": 800,
                          "tamanio": "GRANDE"
                        },
                        {
                          "id": 20,
                          "nombre": "Sprite 3l",
                          "precio": 800,
                          "tamanio": "GRANDE"
                        },
                        {
                          "id": 23,
                          "nombre": "Pepsi 3l",
                          "precio": 800,
                          "tamanio": "GRANDE"
                        },
                        {
                          "id": 26,
                          "nombre": "7up 3l",
                          "precio": 800,
                          "tamanio": "GRANDE"
                        }
                      ]
                    },
                    {
                      "tamanio": "MEDIANO",
                      "content": [
                        {
                          "id": 13,
                          "nombre": "Coca-Cola 1,5l",
                          "precio": 700,
                          "tamanio": "MEDIANO"
                        },
                        {
                          "id": 16,
                          "nombre": "Fanta 1,5l",
                          "precio": 700,
                          "tamanio": "MEDIANO"
                        },
                        {
                          "id": 19,
                          "nombre": "Sprite 1,5l",
                          "precio": 700,
                          "tamanio": "MEDIANO"
                        },
                        {
                          "id": 22,
                          "nombre": "Pepsi 1,5l",
                          "precio": 700,
                          "tamanio": "MEDIANO"
                        },
                        {
                          "id": 25,
                          "nombre": "7up 1,5l",
                          "precio": 700,
                          "tamanio": "MEDIANO"
                        }
                      ]
                    },
                    {
                      "tamanio": "CHICO",
                      "content": [
                        {
                          "id": 14,
                          "nombre": "Coca-Cola 500ml",
                          "precio": 600,
                          "tamanio": "CHICO"
                        },
                        {
                          "id": 15,
                          "nombre": "Fanta 500ml",
                          "precio": 600,
                          "tamanio": "CHICO"
                        },
                        {
                          "id": 18,
                          "nombre": "Sprite 500ml",
                          "precio": 600,
                          "tamanio": "CHICO"
                        },
                        {
                          "id": 21,
                          "nombre": "Pepsi 500ml",
                          "precio": 600,
                          "tamanio": "CHICO"
                        },
                        {
                          "id": 24,
                          "nombre": "7up 500ml",
                          "precio": 600,
                          "tamanio": "CHICO"
                        }
                      ]
                    }
                ],
                "platosR": [
                    {
                      "tipo": "CARNE",
                      "content": [
                        {
                          "id": 27,
                          "nombre": "Milanesa",
                          "precio": 1234,
                          "tipo": "CARNE",
                          "acompanamiento": null,
                          "salsa": null
                        },
                        {
                          "id": 28,
                          "nombre": "pechuga de pollo",
                          "precio": 1032,
                          "tipo": "CARNE",
                          "acompanamiento": null,
                          "salsa": null
                        },
                        {
                          "id": 29,
                          "nombre": "costilla de cerdo",
                          "precio": 4531,
                          "tipo": "CARNE",
                          "acompanamiento": null,
                          "salsa": null
                        },
                        {
                          "id": 30,
                          "nombre": "cesos de vaca",
                          "precio": 0,
                          "tipo": "CARNE",
                          "acompanamiento": null,
                          "salsa": null
                        }
                      ]
                    },
                    {
                      "tipo": "PASTA",
                      "content": [
                        {
                          "id": 31,
                          "nombre": "Canelones",
                          "precio": 10200,
                          "tipo": "PASTA",
                          "acompanamiento": null,
                          "salsa": null
                        }
                      ,
                        {
                          "id": 32,
                          "nombre": "Espagueti",
                          "precio": 5230,
                          "tipo": "PASTA",
                          "acompanamiento": null,
                          "salsa": null
                        }
                      ,
                        {
                          "id": 33,
                          "nombre": "Fettuccini",
                          "precio": 684,
                          "tipo": "PASTA",
                          "acompanamiento": null,
                          "salsa": null
                        }
                      ,
                        {
                          "id": 34,
                          "nombre": "Ñoquis",
                          "precio": 5372,
                          "tipo": "PASTA",
                          "acompanamiento": null,
                          "salsa": null
                        }
                      ]
                    },
                    {
                      "tipo": "PESCADO",
                      "content": [
                        {
                          "id": 35,
                          "nombre": "Salmon",
                          "precio": 7544,
                          "tipo": "PESCADO",
                          "acompanamiento": null,
                          "salsa": null
                        },
                        {
                          "id": 36,
                          "nombre": "Atun",
                          "precio": 5682,
                          "tipo": "PESCADO",
                          "acompanamiento": null,
                          "salsa": null
                        },
                        {
                          "id": 37,
                          "nombre": "Trucha",
                          "precio": 7950,
                          "tipo": "PESCADO",
                          "acompanamiento": null,
                          "salsa": null
                        },
                        {
                          "id": 38,
                          "nombre": "Pejerey",
                          "precio": 8954,
                          "tipo": "PESCADO",
                          "acompanamiento": null,
                          "salsa": null
                        }
                      ]
                    },
                    {
                      "tipo": "POSTRE",
                      "content": [
                        {
                          "id": 39,
                          "nombre": "Tiramisu",
                          "precio": 345430,
                          "tipo": "POSTRE",
                          "acompanamiento": null,
                          "salsa": null
                        },
                        {
                          "id": 40,
                          "nombre": "Budin de chocolate",
                          "precio": 3242,
                          "tipo": "POSTRE",
                          "acompanamiento": null,
                          "salsa": null
                        },
                        {
                          "id": 41,
                          "nombre": "Sufle",
                          "precio": 2312,
                          "tipo": "POSTRE",
                          "acompanamiento": null,
                          "salsa": null
                        },
                        {
                          "id": 42,
                          "nombre": "3bochas de helado",
                          "precio": 3543,
                          "tipo": "POSTRE",
                          "acompanamiento": null,
                          "salsa": null
                        }
                      ]
                    }
                ]
            },
            selected: undefined
        }
    }

    componentDidMount(){
        console.log('select_mount', this.props)
    }

    esBebida(){return this.state.selected === 'GRANDE' || this.state.selected === 'CHICO' || this.state.selected === 'MEDIANO'}

    getContent(){
        if(this.esBebida()){
            return this.state.menu.bebidasR
            .filter(elem => elem.tamanio === this.state.selected)[0].content;
        }
        else{
            return this.state.menu.platosR
            .filter(elem => elem.tipo === this.state.selected)[0].content;
        }
    }

    renderSelectedContent(){
        if(this.state.selected === undefined){
            return (<div className='emptySelected'></div>);
        }
        else{
            return (
            <div
                className={this.state.selected}
            >
                {this.getContent().map((elem, key) => 
                    (
                    <div
                        key={key}
                    >
                        <button className='' 
                        onClick={() => this.props.select(elem)}
                        style={{padding: '0',whiteSpace: 'normal', border:'none'}}>
                            {elem.nombre}
                        </button>
                    </div>
                    )
                )}
            </div>);
        }
    }

    render(){
        return(
            <React.Fragment>
                <div className='select-container'>
                    <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" 
                    style={{flexDirection: 'column'}}>
                        <div className="btn-group mr-2 flex-wrap" role="group" aria-label="First group"
                        style={{marginBottom: '5px'}}>
                            {this.state.menu.bebidasR.map((bebida, key) => 
                                <button 
                                    key={key}
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={() => {this.setState(state => ({selected: bebida.tamanio}))}}
                                >
                                    {bebida.tamanio}
                                </button>
                            )}
                        </div>
                        <div className="btn-group mr-2 flex-wrap" role="group" aria-label="First group">
                            {this.state.menu.platosR.map((plt, key) => 
                                <button 
                                    key={key}
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={() => {this.setState(state => ({selected: plt.tipo}))}}
                                >
                                    {plt.tipo}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className='selected-list' style={{marginBottom: '10px'}}>
                        {this.renderSelectedContent()}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(SelectStep)