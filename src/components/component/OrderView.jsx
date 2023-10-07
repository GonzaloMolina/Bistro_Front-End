import React from 'react';
import { withRouter } from 'react-router';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import '../../styles/table.css';

class OrderView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orden: {},
            content: {}
        }
    }

    componentDidMount(){
        if(this.props.content === undefined){this.props.history.push('/');}
        else{
            this.setState(state => ({content: this.props.content.info}))
            this.setState(state => ({orden: this.props.content.orden}))
        }
    }

    adicional(plate){
        if(plate.salsa === null && plate.acompanamiento === null){return "";}
        else{
            if(plate.acompanamiento === null){return (plate.salsa.nombre);}
            else{return (plate.acompanamiento.nombre);}
        }
    }

    render(){
        return(
            <React.Fragment>
                <IconContext.Provider value={{color: '#faf60e' }}></IconContext.Provider>
                <div className='base'>
                    <div className='navbar' style={{
                        backgroundColor: 'green',
                        height: '80px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        zIndex: 10
                    }}>
                        <div className='btn-holder'>
                                <AiOutlineArrowLeft 
                                    className="btnc"
                                    onClick={() => this.props.history.push('/table', this.props.content.info)}
                                    style={{backgroundColor: '#faf60e', marginLeft:'20%'}}
                                />
                        </div>
                    </div>
                    <div id="name" className="card" style={{margin: "2%", backdropFilter: 'blur(10px)', backgroundColor: 'white'}}>
                        <div style={{margin: "2%"}}>
                            <h3><b>{"Orden: " + this.state.orden.id}</b></h3>
                        </div>
                    </div>

                    <div id="name" className="card" style={{margin: "2%",  backdropFilter: 'blur(10px)', backgroundColor: 'white'}}>
                        <div style={{margin: "2%"}}>
                            <h4><b>{"Pedido: "}</b></h4>
                            <div id="name" className="card" style={{overflowX: 'auto',margin: "2%"}}>
                                    <table style={{ width: '100%' }} className="table">
                                        <thead >
                                            <tr>
                                                <th style={{backgroundColor: '#009933'}}scope="col">Consumible</th>
                                                <th style={{backgroundColor: '#009933'}} scope="col">Adicional</th>
                                                <th style={{backgroundColor: '#009933'}} scope="col">Precio</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.content.orden.platos.map(
                                                (e, i) => {
                                                    return (<tr key={i}>
                                                        <td style={{fontSize: '15px',backgroundColor: 'rgb(211,211,211)'}}>{e.nombre}</td>
                                                        <td style={{fontSize: '15px',backgroundColor: 'rgb(211,211,211)'}}>{this.adicional(e)}</td>
                                                        <td style={{fontSize: '18px',backgroundColor: 'rgb(211,211,211)'}}>{'$'+e.precio}</td>
                                                    </tr>)
                                                }
                                            )}
                                            {this.props.content.orden.bebidas.map(
                                                (e, i) => {
                                                    return (<tr key={i}>
                                                        <td style={{fontSize: '15px',backgroundColor: 'rgb(211,211,211)'}}>{e.nombre}</td>
                                                        <td style={{backgroundColor: 'rgb(211,211,211)'}}></td>
                                                        <td style={{fontSize: '18px',backgroundColor: 'rgb(211,211,211)'}}>{'$'+e.precio}</td>
                                                    </tr>)
                                                }
                                            )}
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(OrderView);