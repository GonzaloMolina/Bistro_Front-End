import React from 'react';
import { withRouter } from 'react-router';
import API from '../../service/api';
import StepForm from '../component/StepForm';

class CreateOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: this.formComponent(),
            content: {},
        }
    }

    componentDidMount(){
        if(this.props.content === undefined){this.props.history.push('/');}
        else{
            this.setState(state => ({content: this.props.content}));
        }
    }

    getMenu = () => {
        const headers= {
            auth: {username: 'admin@mail.com',password: 'public123'}
        }
        return API.getAuth('menu/'+7, headers)
    }

    formComponent = () => <StepForm menu={this.getMenu} create={this.doCreate} {...this.props}/>

    doCreate = (platos, bebidas) =>{
        const headers= {
            auth: {username: 'admin@mail.com',password: 'public123'}
        }
        API.post('orden/new', {
            mesaId: this.props.content.mesaId,
            mozoId: 53,
            bebidas: [],
            platos: []
        }, headers)
        .then(res => {console.log(res);this.props.history.push('/table', this.state.content)})
        .catch(err => console.log(err.message));
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