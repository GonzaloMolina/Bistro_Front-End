import React from 'react';
import { withRouter } from 'react-router';
import API from '../../service/api';
import Consumibles from '../component/Consumibles';

class CreateOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: this.formComponent()
        }
    }

    componentDidMount(){
        console.log(this.props.content);
        if(this.props.content === undefined){
            this.props.history.push('/home', {});
        }
    }

    formComponent = (error, success) => <Consumibles error={error} success={success} create={this.doCreate} {...this.props}/>

    doCreate = (platos, bebidas) =>{
        API.post('orden/new', {
            mesaId: this.props.content.mesa.tableId,
            mozoId: this.props.content.mozo.id,
            bebidas: bebidas,
            platos: platos
        }).then(res => {
            this.props.history.push('/table', 
                {mozo: this.props.content.mozo, ordenId: res.data, tableId: this.props.content.mesa.tableId});
        }).catch(err => console.log(err.message));
    }

    render(){
        return(
            <React.Fragment>
                {this.state.form}
            </React.Fragment>
        );
    }
}

export default withRouter(CreateOrder)