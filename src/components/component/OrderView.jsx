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
                            <div className="">
                                <AiOutlineArrowLeft 
                                    className="btnc"
                                    onClick={() => this.props.history.push('/table', this.props.content.info)}
                                    style={{backgroundColor: '#faf60e'}}
                                />
                            </div>
                        </div>
                    </div>
                    <div id="name" className="card" style={{margin: "2%", backdropFilter: 'blur(10px)', backgroundColor: 'rgba(179, 241, 178, 0.5)'}}>
                        <div style={{margin: "2%"}}>
                            <h3><b>{"Orden: " + this.state.orden.id}</b></h3>
                        </div>
                    </div>

                    <div id="name" className="card" style={{margin: "2%",  backdropFilter: 'blur(10px)', backgroundColor: 'rgba(179, 241, 178, 0.5)'}}>
                        <div style={{margin: "2%"}}>
                            <h4><b>{"Consumidos: "}</b></h4>
                            <div id="name" className="card" style={{margin: "2%"}}>
                                <div style={{margin: "2%"}}>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Consumible</th>
                                                <th scope="col">adicional</th>
                                                <th scope="col">Precio</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.content.orden.platos.map(
                                                (e, i) => {
                                                    return (<tr key={i}>
                                                        <td style={{fontSize: '15px'}}>{e.nombre}</td>
                                                        <td style={{fontSize: '15px'}}>{this.adicional(e)}</td>
                                                        <td style={{fontSize: '20px'}}>{'$'+e.precio}</td>
                                                    </tr>)
                                                }
                                            )}
                                            {this.props.content.orden.bebidas.map(
                                                (e, i) => {
                                                    return (<tr key={i}>
                                                        <td style={{fontSize: '15px'}}>{e.nombre}</td>
                                                        <td></td>
                                                        <td style={{fontSize: '20px'}}>{'$'+e.precio}</td>
                                                    </tr>)
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(OrderView);