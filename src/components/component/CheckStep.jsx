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
        this.createBody(selected, cantidad, values);
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

    belongs(elem, ls){
        return ls.filter(e => e.id !== elem.id).length > 1;
    }

    stateView(selected, cantidad, values){
        if(selected.tamanio === undefined){
            if(!(this.belongs(selected, this.props.getLs[2]()))){
                let tempView = {
                    "key": selected,
                    "values": values
                }
                this.props.setLs[2](this.props.getLs[2]().concat([tempView]));
                this.setState(state => ({platosView: this.props.getLs[2]().concat(tempView)}));
            }
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
                <div key={i} className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" 
                        style={{flexDirection: 'column', marginTop: '5px'}}>
                    <div className="btn-group mr-2 flex-wrap" role="group" aria-label="First group"
                            style={{marginBottom:'0px'}}>
                        <button type='button' className='btn btn-secondary'
                                style={{
                                    borderRadius: '10px',
                                    borderTopLeftRadius:'30px',
                                    borderBottomLeftRadius:'30px',
                                    marginBottom: '0px', height: '50px',
                                    backdropFilter: 'blur(10px)', backgroundColor:'rgba(179, 241, 178, 0.5)',
                                    color: 'black'
                                }}
                            >
                            <div class="container">
                                <div class="row">
                                    <div class="col-8">
                                        <span>{pla.key.nombre}</span>
                                    </div>
                                    <div class="col">
                                        <span>{''}</span>
                                    </div>
                                </div>
                            </div>
                        </button>
                            {this.renderDBotton(pla)}
                    </div>
                </div>
            )
        } else{
            return pla.values.map((acom, k) => {
                return (
                    <div key={k} className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" 
                        style={{flexDirection: 'column', marginTop: '5px'}}>
                        <div className="btn-group mr-2" role="group" aria-label="First group"
                            style={{marginBottom:'0px'}}>
                            <button type='button' className='btn btn-secondary'
                                    style={{
                                        borderRadius: '10px',
                                        borderTopLeftRadius:'30px',
                                        borderBottomLeftRadius:'30px',
                                        marginBottom: '0px', height: 'auto',
                                        backdropFilter: 'blur(10px)', backgroundColor:'rgba(179, 241, 178, 0.5)',
                                        color: 'black'
                                    }}
                                >
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-4" align='left'>
                                                <p style={{fontSize:''}}>{pla.key.nombre}</p>
                                            </div>
                                            <div className="col-5" align='left'>
                                                <p style={{fontSize:''}}>{acom.nombre}</p>
                                            </div>
                                            <div className="col-1" align='right' style={{}}>
                                                <span style={{fontSize:''}}>x{pla.values.length}</span>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            
                                {this.renderDBotton(pla)}
                        </div>
                    </div>
                )
            })
        }
    }

    renderDBotton(b){
        return (
            <button type='button' className='btn-secondary'
                onClick={() => {console.log(b);}}
                style={{zIndex:'0', borderRadius: '10px', 
                    border:'0px',
                    marginRight:'5px', 
                    marginLeft:'2px',
                    borderTopRightRadius:'30px',
                    borderBottomRightRadius:'30px',
                    backdropFilter: 'blur(10px)', 
                    backgroundColor:'rgba(179, 241, 178, 0.5)',
                }}
            >
                <AiOutlineCloseSquare 
                color='red'
                fontSize='1.5em'
                style={{zIndex:'0', 
                    borderRadius: '10px', 
                    margin:'0px'
                }}
            />
            </button>
        )
    }

    renderBebida(bebida){
        return (
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" 
                style={{flexDirection: 'column', marginTop: '5px'}}>
                <div className="btn-group mr-2 flex-wrap" role="group" aria-label="First group"
                    style={{marginBottom:'0px'}}>
                    <button type='button' className='btn btn-secondary'
                            style={{
                                borderRadius: '10px',
                                borderTopLeftRadius:'30px',
                                borderBottomLeftRadius:'30px',
                                marginBottom: '0px', height: '50px',
                                backdropFilter: 'blur(10px)', backgroundColor:'rgba(179, 241, 178, 0.5)',
                                color: 'black'
                            }}
                        >
                            <div class="container">
                                <div class="row">
                                    <div class="col-8">
                                        <span>{bebida.key.nombre}</span>
                                    </div>
                                    <div class="col">
                                        <span>x{bebida.amount}</span>
                                    </div>
                                </div>
                            </div>
                        </button>
                    
                        {this.renderDBotton(bebida)}
                </div>
            </div>
        )
    }

    render(){
        return(
            <React.Fragment>
                <div className='check-container' style={{margin:'10px', marginRight: '20px', marginLeft:'20px'}}>
                <IconContext.Provider value={{ className: "shared-class", size: 20 }}/>
                    {this.props.getLs[2]().map((pla, i) => {
                        console.log(pla)
                        return this.renderAcompañamiento(pla,i)
                    })}
                    {this.props.getLs[3]().map(b => {
                        return (
                            this.renderBebida(b)
                        )
                    })}
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(CheckStep)