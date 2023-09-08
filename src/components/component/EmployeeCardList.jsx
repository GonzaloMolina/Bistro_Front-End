import React from 'react';
import { withRouter } from 'react-router';
import EmployeeCard from './EmployeeCard';

class CardList extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="btn-group flex-wrap" data-toggle="buttons" style={{marginBottom: '4px'}}>
                    {
                        this.props.contents.map((elem, i) => 
                            <EmployeeCard className="column" content={this.props.content} employee={elem} key={i}/>
                        ) 
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(CardList);
