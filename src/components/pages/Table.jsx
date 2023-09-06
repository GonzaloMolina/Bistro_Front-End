import React from 'react';
import { withRouter } from 'react-router';
import API from '../../service/api';
import OrderView from '../component/OrderView';

class Table extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tableId: '',
            capacidad: 0,
            cuenta: 0,
            orden: undefined
        }
    }

    handleChange(value, prop){
        this.setState(prevState => ({ ...prevState, [prop]: value }))
    }

    componentDidMount(){
        console.log(this.props)

        API.get('orden/'+10)
        .then(res => {
            this.setState(prevState => ({tableId: this.props.mozo.mesaId}));
            this.setState(prevState => ({capacidad: 4}));
            this.handleChange(res.data, 'orden')
        })
        .catch(err => console.log(err.message));
    }

    componentDidUpdate(){}

    handleOnClick(){
        this.props.history.push('/createOrder', {mozo: this.props.mozo, mesa: this.state});
    }

    handleOnClickUpdate(){
        console.log("update the order", this.state.orden);
    }

    handleOnClickDelete(){
        API.delete('orden/10').then(res => {
            console.log(res);
            this.setState(state => ({orden: !this.state.orden}))
            this.setState(state => ({orden: undefined}))
        }).catch(err => console.log(err.message));
    }

    renderSUS(){
        if (this.state.orden !== undefined){
            return <OrderView orden={this.state.orden}/>
        }
        else{
            return <h2>there is no order to show</h2>
        }
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
                                <h4>{"Capacidad de la mesa: "+ this.state.capacidad + " personas"}</h4>
                            </div>

                            <div style={{margin: "2%"}}>
                                <h4>{"Cuenta a pagar: " + this.state.cuenta}</h4>
                        </div>
                    </div>
                    
                    <div id="name" className="card" style={{margin: "2%"}}>
                        <div className='d-flex justify-content-center flex-wrap'>
                            <div id="name" className="btn-group flex-row" style={{margin: "2%"}}>
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

                        {this.renderSUS()}
                    </div>
                    
                    
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Table)