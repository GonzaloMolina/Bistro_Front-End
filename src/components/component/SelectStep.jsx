import React from 'react';
import { withRouter } from 'react-router';

class SelectStep extends React.Component {
    render(){
        console.log(this.props);
        return(
            <React.Fragment>
                <div className='select-container'>
                    SelectStep
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(SelectStep)