
import React from 'react';
import { withRouter } from 'react-router';


class Card extends React.Component{
    
    handleOnClick(){
        console.log(this.props.content);
    }

    render(){
        return (
            <React.Fragment>
                <div>
                    <div style={{margin: '2px'}}>
                        <button type='button' className='btn btn-primary'
                            onClick = {() => {this.handleOnClick()}}
                        >
                            {"Mesa nro: "+this.props.content}
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Card);