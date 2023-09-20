import React from 'react';
import { withRouter } from 'react-router';

class AcompStep extends React.Component {
    render(){console.log(this.props);
        return(
            <React.Fragment>
                <div className='acomp-container'>
                    AcompStep
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(AcompStep)