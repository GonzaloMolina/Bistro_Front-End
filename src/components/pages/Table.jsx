import React from 'react';
import { withRouter } from 'react-router';
import API from '../../service/api';

class Table extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tableId: '1L',
            capacidad: 6,
            cuenta: 45800.50,
            orden: 10
        }
    }

    handleOnClick(){//componentDidMount()
        API.get('/orden/'+this.state.orden)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    handleOnClickUpdate(){
        console.log("update the order"+ this.state.orden);
    }

    handleOnClickDelete(){
        API.delete('/orden/'+this.state.orden).then(res => console.log(res.status))
    }

    render(){
        return (
            <React.Fragment>
                <div>
                    <div id="name" className="card" style={{margin: "2%", zIndex:"-1"}}>
                        <div style={{margin: "2%"}}>
                            <h1>{"Mesa Nro: " + this.state.tableId}</h1>
                        </div>
                    </div>

                    <div id="name" className="card" style={{margin: "2%", zIndex:"-1"}}>
                        <div style={{margin: "2%"}}>
                                <h1>{"Capacidad de la mesa: "+ this.state.capacidad + " personas"}</h1>
                            </div>

                            <div style={{margin: "2%"}}>
                                <h1>{"Cuenta a pagar: " + this.state.cuenta}</h1>
                        </div>
                    </div>
                    
                    <div id="name" className="card" style={{margin: "2%"}}>
                        <div className='d-flex justify-content-center'>
                            <div id="name" className="btn-group" style={{margin: "2%"}}>
                                    <button type='button' className='btn btn-primary' 
                                        onClick = {() => {this.handleOnClick()}} style={{marginRight:'3px'}}
                                    >
                                        {"crear Orden"}
                                    </button>

                                    <button type='button' className='btn btn-warning' 
                                        onClick = {() => {this.handleOnClickUpdate()}} style={{marginRight:'3px'}}
                                    >
                                        {"Modificar Orden"}
                                    </button>

                                    <button type='button' className='btn btn-danger'
                                        onClick = {() => {this.handleOnClickDelete()}}
                                    >
                                        {"Eliminar Orden"}
                                    </button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Table)