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

    count(ls, acom){
        let x = 0;
        for (let i = 0; i < ls.length; i++) {
            if(ls[i] === acom){x++;}
        }
        return x
    }

    belongs(str, ls){
        return ls.filter(elem => elem.nombre === str).length > 0;
    }

    belongs2(e, ls){
        if((e.acompanamiento === null && e.salsa === null)){
            return ls.filter(elem => elem.nombre === e.nombre).length > 0;
        }
        else{
            if(e.salsa !== null){
                return ls.filter(elem => elem.nombre === e.nombre &&
                    elem.salsa.nombre === e.salsa.nombre
                    ).length > 0
            }else{
                return ls.filter(elem => 
                        elem.nombre === e.nombre && 
                        elem.acompanamiento.nombre === e.acompanamiento.nombre
                    ).length > 0
            }
        }
    }
    
    sinRepetidosPlatos(ps){
        let rs = []
        ps.forEach(element => {
            if(!this.belongs2(element, rs)){
                rs.push(element);
            }
        });
        return rs;
    }

    sinRepetidosBebidas(bs){
        let rs = []
        bs.forEach(element => {
            if(!this.belongs(element.nombre, rs)){
                rs.push(element);
            }
        });
        return rs;
    }

    cantidadPlt(plts, plato){
        if(!(plato.salsa === null && plato.acompanamiento === null)){
            if(plato.acompanamiento === null){
                return plts.filter(e => e.nombre === plato.nombre)
                .filter(i => i.salsa.id === plato.salsa.id)
                .length
            }
            else{
                return plts.filter(e => e.nombre === plato.nombre)
                .filter(i => i.acompanamiento.id === plato.acompanamiento.id)
                .length
            }
        }
        else{
            return plts.filter(elem => elem.nombre === plato.nombre).length; 
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
                                    onClick={() => this.props.history.push('/table', this.state.content)}
                                    style={{backgroundColor: '#faf60e', marginLeft:'20%', borderRadius: '10px', fontSize: '1.5em'}}
                                />
                        </div>
                    </div>
                    <div id="name" className="card" style={{margin: "2%", backdropFilter: 'blur(10px)', backgroundColor:'rgba(179, 241, 178, 0.5)'}}>
                        <div style={{margin: "2%"}}>
                            <h3><b>{"Orden: " + this.state.orden.id}</b></h3>
                        </div>
                    </div>

                    <div id="name" className="card" style={{margin: "2%",  backdropFilter: 'blur(10px)', backgroundColor:'rgba(179, 241, 178, 0.5)'}}>
                        <div style={{margin: "2%"}}>
                            <h4><b>{"Pedido: "}</b></h4>
                            <div>
                                    <table style={{ width: '100%' }} className="table">
                                        <thead >
                                            <tr>
                                                <th style={{backgroundColor: '#009933'}}scope="col">Consumible</th>
                                                <th style={{backgroundColor: '#009933'}} scope="col">Adicional</th>
                                                <th style={{backgroundColor: '#009933'}} scope="col"></th>
                                                <th style={{backgroundColor: '#009933'}} scope="col">Precio</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.sinRepetidosPlatos(this.props.content.orden.platos).map(
                                                (e, i) => {
                                                    return (<tr key={i}>
                                                        <td style={{fontSize: '15px',backgroundColor: 'rgb(211,211,211)'}}>{e.nombre}</td>
                                                        <td style={{fontSize: '14px',backgroundColor: 'rgb(211,211,211)'}}>{this.adicional(e)}</td>
                                                        <td style={{fontSize: '15px',backgroundColor: 'rgb(211,211,211)'}}>
                                                            {(this.cantidadPlt(this.props.content.orden.platos, e)? (this.cantidadPlt(this.props.content.orden.platos, e)) : 1)}
                                                        </td>
                                                        <td style={{fontSize: '18px',backgroundColor: 'rgb(211,211,211)'}}>
                                                            {'$'+ e.precio * 
                                                            (this.cantidadPlt(this.props.content.orden.platos, e)? 
                                                                (this.cantidadPlt(this.props.content.orden.platos, e)) : 
                                                                1
                                                            )
                                                            }
                                                        </td>
                                                    </tr>)
                                                }
                                            )}
                                            {this.sinRepetidosBebidas(this.props.content.orden.bebidas).map(
                                                (e, i) => {
                                                    return (<tr key={i}>
                                                        <td style={{fontSize: '15px',backgroundColor: 'rgb(211,211,211)'}}>{e.nombre}</td>
                                                        <td style={{backgroundColor: 'rgb(211,211,211)'}}></td>
                                                        <td style={{fontSize: '18px',backgroundColor: 'rgb(211,211,211)'}}>x
                                                            {this.props.content.orden.bebidas.filter(b => b.nombre === e.nombre).length}
                                                        </td>
                                                        <td style={{fontSize: '18px',backgroundColor: 'rgb(211,211,211)'}}>
                                                            {'$'+
                                                                e.precio * 
                                                                this.props.content.orden.bebidas.filter(b => b.nombre === e.nombre).length
                                                            }
                                                        </td>
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