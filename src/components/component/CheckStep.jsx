import React from 'react';
import { withRouter } from 'react-router';

class CheckStep extends React.Component {
    render(){console.log(this.props);
        return(
            <React.Fragment>
                <div className='check-container'>
                    CheckStep
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(CheckStep)