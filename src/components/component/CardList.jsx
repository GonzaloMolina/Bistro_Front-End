import React from 'react';
import { withRouter } from 'react-router';

import Card from './Card'

class CardList extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="btn-group flex-wrap" data-toggle="buttons" style={{marginBottom: '4px'}}>
                    {this.props.contents.map(
                        (elem, i) => 
                        <Card className="column" mozo={this.props.mozo} content={elem} key={i}/>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(CardList);
