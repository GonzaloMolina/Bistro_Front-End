import React from 'react';
import { withRouter } from 'react-router';
import API from '../../service/api';
import StepForm from '../component/StepForm';

class CreateOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: this.formComponent(),
            menu: undefined
        }
    }

    componentDidMount(){//if menu !== undefined no deberia de hacer la request
        console.log('TODOO:: menu Request')       
    }

    formComponent = () => <StepForm {...this.props}/>//<StepForm menu={this.state.menu} create={doCreate} {...this.props}/>

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