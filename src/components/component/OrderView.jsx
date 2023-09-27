import React from 'react';
import { withRouter } from 'react-router';
import { AiOutlineArrowLeft } from 'react-icons/ai';

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

    render(){
        return(
            <React.Fragment>
                <div id="name" className="card" style={{margin: "2%"}}>
                    <div style={{margin: "2%"}}>
                        <h3>{"Orden: " + this.state.orden.id}</h3>
                    </div>
                </div>

                <div id="name" className="card" style={{margin: "2%"}}>
                    <div style={{margin: "2%"}}>
                        <h4>{"Consumidos: "}</h4>
                        <div id="name" className="card" style={{margin: "2%"}}>
                            <div style={{margin: "2%"}}>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Consumible</th>
                                            <th scope="col">Precio</th>
                                            <th scope="col">Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.content.orden.platos.concat(this.props.content.orden.bebidas).map(
                                            (e, i) => {
                                                return (<tr key={i}>
                                                    <th scope="col">{e.nombre}</th>
                                                    <th scope="col">{e.precio}</th>
                                                    <th scope="col">Cantidad</th>
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
                    <div className='btn-holder'>
                        <div className="">
                            <AiOutlineArrowLeft 
                                className="btnc"
                                onClick={() => this.props.history.push('/table', this.props.content.info)}
                            >
                                Volver
                            </AiOutlineArrowLeft>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(OrderView);