import React from 'react';
import { withRouter } from 'react-router';
import OrderView from '../../component/OrderView';

class View extends React.Component{
    render(){
        return (
            <React.Fragment>
                <OrderView {...this.props}/>
            </React.Fragment>
        );
    }
}

export default withRouter(View)