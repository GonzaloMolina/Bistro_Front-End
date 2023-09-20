import React from 'react';
import { withRouter } from 'react-router';

class CheckStep extends React.Component {
    constructor(props){
        super(props)
        this.state={
            orden: this.props.orden()
        }
    }

    checkList(){
        var temp =this.props.orden()
        temp.push(
            {
                'plate':this.props.plate(),
                'cantidad': this.props.cant()
            }
        );
        console.log(temp);
        return temp;
    }

    render(){
        return(
            <React.Fragment>
                <div className='check-container'>
                    {this.checkList().map((e,i) => {
                        return <p key={i}>{e.plate.nombre +"  "+ e.cantidad} </p>
                    })}    
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(CheckStep)