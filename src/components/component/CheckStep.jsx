import React from 'react';
import { withRouter } from 'react-router';
import '../../styles/sidebar.css';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { IconContext } from "react-icons";

class CheckStep extends React.Component {
    constructor(props){
        super(props)
        this.state={
            platos: [],
            bebidas: [],
            platosView: [],
            bebidasView: []
        }
    }

    componentDidMount(){
        console.log(this.props);
        const selected = this.props.elem().elem;console.log("elem:", selected);
        const cantidad = this.props.elem().amount;
        const values = this.props.elem().values;console.log("values: ",values);
        this.createBody(selected, cantidad, values)
        this.stateView(selected, cantidad, values)
    }

    createBody(selected, cantidad, values){
        if(this.props.elem().elem.tamanio === undefined){
            let temp = {
                "key": selected.id,
                "values": values.map(a => a.id)
            }
            this.setState(state => ({platos: this.props.getLs[0]().concat([temp])}));
            this.props.setLs[0](this.props.getLs[0]().concat([temp]));
        }else{
            let temp = {
                "key": selected.id,
                "amount": cantidad
            }
            this.setState(state => ({bebidas:  this.props.getLs[1]().concat([temp])}));
            this.props.setLs[1](this.props.getLs[1]().concat([temp]));
        }
    }

    stateView(selected, cantidad, values){
        if(this.props.elem().elem.tamanio === undefined){
            let tempView = {
                "key": selected,
                "values": values
            }
            this.props.setLs[2](this.props.getLs[2]().concat([tempView]));
            this.setState(state => ({platosView: this.props.getLs[2]().concat(tempView)}));
            console.log(this.state)
            console.log(this.props.getLs[2]())
        }else{
            let tempView = {
                "key": selected,
                "amount": cantidad
            }
            this.props.setLs[3](this.props.getLs[3]().concat([tempView]))
            this.setState(state => ({bebidasView: this.props.getLs[3]().concat(tempView)}));
        }
    }

    renderAcompañamiento(pla,i){
        if(pla.values.length === 0){
            return (
                <div className='card'
                    style={{
                        zIndex: '0', 
                        backdropFilter: 'blur(10px)', 
                        backgroundColor:'rgba(179, 241, 178, 0.5)',
                        margin: '30px',
                        marginTop:'0px',
                        marginBottom:'0px'
                    }}
                >
                    <li span className='nav-text'>
                        <span style={{ fontFamily: 'Cinzel' }}> {pla.key.nombre}</span>
                        <div style={{overflow: 'auto'}}>
                            <button 
                                type='button'
                                className='btn'
                                onClick={() => {
                                    console.log(this.state)
                                }}
                                style={{
                                    color: 'red',
                                    float:'right'
                                }}
                            >
                                <AiOutlineCloseSquare/>
                            </button>
                        </div>
                    </li>
                </div>
            )
        } else{
            return pla.values.map((acom, k) => {
                return (
                    <div className='card'
                        style={{
                            zIndex: '0', 
                            backdropFilter: 'blur(10px)', 
                            backgroundColor:'rgba(179, 241, 178, 0.5)',
                            margin: '30px',
                            marginTop:'0px',
                            marginBottom:'0px'
                        }}
                    >
                        <li key={k} span className='nav-text'>
                            <span style={{ fontFamily: 'Cinzel' }}> {pla.key.nombre}</span>
                            <span style={{ fontFamily: 'Cinzel' }}> {acom.nombre}</span>
                            <div style={{overflow: 'auto'}}>
                                <button 
                                    type='button'
                                    className='btn'
                                    onClick={() => {
                                        console.log(this.state)
                                    }}
                                    style={{
                                        color: 'red',
                                        float:'right'
                                    }}
                                >
                                    <AiOutlineCloseSquare/>
                                </button>
                            </div>
                        </li>
                    </div>
                )
        })
    }
}

    render(){
        return(
            <React.Fragment>
                <div className='check-container'>
                <IconContext.Provider value={{ className: "shared-class", size: 40 }}>
                    {this.props.getLs[2]().map((pla, i) => {
                        console.log(pla)
                        return this.renderAcompañamiento(pla,i)
                    })}
                    {this.props.getLs[3]().map(b => {
                        return (
                            <div className='card'
                                style={{
                                    zIndex: '0', 
                                    backdropFilter: 'blur(10px)', 
                                    backgroundColor:'rgba(179, 241, 178, 0.5)',
                                    margin: '30px',
                                    marginTop:'0px',
                                    marginBottom:'0px'
                                }}
                            >
                                <li span className='nav-text'>
                                    <span style={{ fontFamily: 'Cinzel' }}> {b.key.nombre}</span>
                                    <span style={{ fontFamily: 'Cinzel' }}> {b.amount}</span>
                                    <div style={{overflow: 'auto'}}>
                                        <button 
                                            type='button'
                                            className='btn'
                                            onClick={() => {
                                                console.log(this.state)
                                            }}
                                            style={{
                                                color: 'red',
                                                float:'right'
                                            }}
                                        >
                                            <AiOutlineCloseSquare/>
                                        </button>
                                    </div>
                                </li>
                            </div>
                        )
                    })}
                </IconContext.Provider>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(CheckStep)