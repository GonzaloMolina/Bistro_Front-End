import React from 'react';
import { withRouter } from 'react-router';

class CheckStep extends React.Component {
    constructor(props){
        super(props)
        this.state={
            platos: [],
            bebidas: []
        }
    }

    componentDidMount(){
        console.log(this.props);
        const selected = this.props.elem().elem;console.log("elem:", selected);
        const cantidad = this.props.elem().amount;
        const values = this.props.elem().values;console.log("values: ",values);
        if(this.props.elem().elem.tamanio === undefined){
            let temp = {
                "key": selected.id,
                "values": values.map(a => a.id)
            }
            this.setState(state => ({platos: this.props.getLs[0]().concat([temp])}));
            this.props.setLs[0](this.props.getLs[0]().concat([temp]))
        }else{
            let temp = {
                "key": selected.id,
                "amount": cantidad
            }
            this.setState(state => ({bebidas:  this.props.getLs[1]().concat([temp])}));
            this.props.setLs[1](this.props.getLs[1]().concat([temp]))
        }

    }

    render(){
        return(
            <React.Fragment>
                <div className='check-container'>
                    {this.state.platos.map((e, i) => {
                        return (
                            <div key={i}>
                                <h2>{e.key.nombre}</h2>
                                {e.values.map((a, j) => {
                                    return (
                                        <h4 key={j}>{a.nombre}</h4>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(CheckStep)