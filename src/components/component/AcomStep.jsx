import React from 'react';
import { withRouter } from 'react-router';
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai';

class AcompStep extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            cantidad: this.props.cant()
        }
    }

    componentDidMount(){
        console.log(this.props)
    }

    update = (cant) => {
        this.setState(state => ({cantidad: cant}))
        this.props.setCant(cant)
    }

    selectAcomp(){
        if(this.props.plate().tipo === undefined){
            return (
                <div className='emptySelected'>

                </div>
            );
        }
        else{
            return (
                <div className='acompaniamiento'>
                    <h1> ls de acompaniamiento</h1>
                </div>
            );
        }
    }

    render(){;
        return(
            <React.Fragment>
                <div className='acomp-container'>
                    <div className='cantidad'>
                        <h1>seleccione una cantidad</h1>
                        <div className='' style={{flexDirection: 'column'}}>
                            <button 
                                type='button'
                                className='btn btn-primary'
                                onClick={() => this.update(this.state.cantidad +1)}
                            >
                                <AiOutlinePlus/>
                            </button>
                            <h2>{this.props.cant()}</h2>
                            <button 
                                type='button'
                                className='btn btn-danger'
                                disabled={this.state.cantidad === 0}
                                onClick={() => this.update(this.state.cantidad -1)}
                            >
                                <AiOutlineMinus/>
                            </button>
                        </div>
                    </div>
                    <div className='acompaniamiento'
                    style={{marginTop: '15px', marginBottom: '15px'}}
                    >
                        {this.selectAcomp()}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(AcompStep)