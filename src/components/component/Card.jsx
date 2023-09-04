import React from 'react';
import { withRouter } from 'react-router';


class Card extends React.Component{
    
    render(){
        return (
            <React.Fragment>
                <div>
                    <div>
                        <button type="button" className="btn btn-primary" style={{margin: '3px', marginLeft: '5px'}}>
                            {"Mesa nro: "+this.props.content}
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Card);