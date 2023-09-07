import React from 'react';
import { withRouter } from 'react-router';
import ListConsumibles from './ListConsumibles';

class OrderView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ordenId: '',
            bebidas: [
            ],
            platos: [
            ]
        }
    }

    componentDidMount(){
        this.setState(this.props.orden)
        this.setState(state => ({ordenId: !this.props.orden.id}))
        this.setState(state => ({ordenId: this.props.orden.id}))
    }

    render(){
        return(
            <React.Fragment>
                <div id="name" className="card" style={{margin: "2%"}}>
                    <div style={{margin: "2%"}}>
                        <h3>{"Orden: " + this.state.ordenId}</h3>
                    </div>
                </div>

                <div id="name" className="card" style={{margin: "2%"}}>
                    <div style={{margin: "2%"}}>
                        <h4>{"Platos: "}</h4>
                        <div id="name" className="card" style={{margin: "2%"}}>
                            <div style={{margin: "2%"}}>
                                <ListConsumibles contents={this.state.platos} />
                            </div>
                        </div>
                    </div>
                    <div style={{margin: "2%"}}>
                        <h4>{"Bebidas: "}</h4>
                        <div id="name" className="card" style={{margin: "2%"}}>
                            <div style={{margin: "2%"}}>
                                <ListConsumibles contents={this.state.bebidas} />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(OrderView);