import React from 'react';
import { withRouter } from 'react-router';

class Consumible extends React.Component{
    
    render(){
        return (
            <React.Fragment>
                <tr>
                <td>{this.props.content.nombre}</td>
                <td>{this.props.content.precio}</td>
                <td>cantidad</td>
                </tr>
            </React.Fragment>
        )
    }
}

export default withRouter(Consumible);