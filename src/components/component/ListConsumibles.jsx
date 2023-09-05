import React from 'react';
import { withRouter } from 'react-router';
import Consumible from './Consumible';


class ListConsumibles extends React.Component{
    render(){
        return(
            <React.Fragment>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Consumible</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.contents.map((elem, i) => <Consumible className="column" content={elem} key={i}/>)}
                    </tbody>
                </table>
                
            </React.Fragment>
        );
    }
}

export default withRouter(ListConsumibles);