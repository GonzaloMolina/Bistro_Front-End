import React from 'react';
import { withRouter } from 'react-router';
import API from '../../service/api';
import OrderView from '../component/OrderView';

class Table extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tableId: this.props.content.tableId,
            capacidad: 4,
            cuenta: 0,
            orden: undefined
        }
    }

    handleChange(value, prop){
        this.setState(prevState => ({ ...prevState, [prop]: value }))
    }

    calculateAmount(platos, bebidas){
        var amount = 0;
        bebidas.map(bebida => amount= amount + bebida.precio);
        platos.map(plato => amount= amount + plato.precio);
        return amount;
    }

    componentDidMount(){
        if(this.props.content === undefined){this.props.history.push('/home', {})}
        else{
            if(this.props.content.tableId === undefined){
                console.log('SUS');
            }else{
                this.setState(prevState => ({tableId: !this.props.content.tableId}));
                this.setState(prevState => ({tableId: this.props.content.tableId}));
                this.setState(prevState => ({capacidad: !4}));
                this.setState(prevState => ({capacidad: 4}));
                console.log(this.state)
            }
            if(this.props.content.ordenId !== undefined){
                API.get('orden/'+ this.props.content.ordenId)
                .then(res => {
                    this.handleChange(res.data, 'orden')
                    this.setState(prevState => ({orden: !res.data}));
                    this.setState(prevState => ({orden: res.data}));

                    this.setState(prevState => ({cuenta: this.calculateAmount(res.data.platos, res.data.bebidas)}));
                })
                .catch(err => console.log(err.message));
            }else{
                this.setState(prevState => ({orden: undefined}));
            }
        }
    }

    componentDidUpdate(){}

    handleOnClick(){
        this.props.history.push('/createOrder', {mozo: this.props.content.mozo, mesa: this.state});
    }

    handleOnClickUpdate(){
        console.log("state: ", this.state);
    }

    handleOnClickDelete(){
        if(this.state.orden.id !== undefined){
            API.delete('orden/'+ this.state.orden.id).then(res => {
                console.log(res);
                this.setState(state => ({orden: !this.state.orden}))
                this.setState(state => ({orden: undefined}))
                this.setState(prevState => ({cuenta: 0}));
            }).catch(err => console.log(err.message));
        }else{
            console.log("empty ID in state")
        }
    }

    renderSUS(){
        if (this.state.orden !== undefined){
            return <OrderView orden={this.state.orden}/>
        }
        else{
            return (
                <div id="name" className="card" style={{margin: "2%", textAlign:"center"}}>
                    <div style={{margin: "2%"}}>
                        <h4>No hay informacion para mostrar</h4>
                    </div>
                </div>
            );
        }
    }

    render(){
        return (
            <React.Fragment>
                <div>
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

                                <div style={{margin: "2%", marginTop: '0px'}}>
                                    <h4>{"Cuenta a pagar: " + this.state.cuenta}</h4>
                            </div>
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