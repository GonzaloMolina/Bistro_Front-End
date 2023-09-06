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

    formComponent = (error, success) => <Consumibles error={error} success={success} create={this.doCreate} {...this.props}/>

    doCreate = (platos, bebidas) =>{
        console.log(platos);
        console.log(bebidas);
        /*API.post('orden/new', {
            mesaId: this.props.content.mesa.tableId,
            mozoId: this.props.content.mozo.id,
            bebidas: bebidas,
            platos: platos
        }).then(res => {
            console.log(res.data);
        }).catch(err => console.log(err.message));
        */
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