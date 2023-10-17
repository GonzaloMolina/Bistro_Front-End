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
        const selected = this.props.elem().elem;
        const cantidad = this.props.elem().amount;
        const values = this.props.elem().values;
        this.setState(state => ({platosView: this.props.getLs[2]()}));
        this.setState(state => ({bebidasView: this.props.getLs[3]()}));
        this.createBody(selected, cantidad, values);
        this.stateView(selected, cantidad, values);
    }

    createBody(selected, cantidad, values){
        if(this.props.elem().elem.tamanio === undefined){
            if(!(this.belongs(selected, this.props.getLs[0]()))){
                let temp = {
                    "key": selected.id,
                    "values": values.map(a => a.id)
                }
                this.setState(state => ({platos: this.props.getLs[0]().concat([temp])}));
                this.props.setLs[0](this.props.getLs[0]().concat([temp]));
            }
        }else{
            if(!(this.belongs(selected, this.props.getLs[1]()))){
                let temp = {
                    "key": selected.id,
                    "amount": cantidad
                }
                this.setState(state => ({bebidas:  this.props.getLs[1]().concat([temp])}));
                this.props.setLs[1](this.props.getLs[1]().concat([temp]));
            }
        }
    }

    belongs(elem, ls){
        let res = false;
        for (let i = 0; i < ls.length; i++) {
            res = res || elem.id === ls[i].key.id;
        }
        return res;
    }

    stateView(selected, cantidad, values){
        if(selected.tamanio === undefined){
            if(!(this.belongs(selected, this.props.getLs[2]()))){
                let tempView = {
                    "key": selected,
                    "values": values
                }
                this.props.setLs[2](this.props.getLs[2]().concat([tempView]));
                this.setState(state => ({platosView: this.props.getLs[2]()}));
            }
        }else{
            console.log('pertenece?',this.belongs(selected, this.props.getLs[3]()))
            if(!(this.belongs(selected, this.props.getLs[3]()))){
                let tempView = {
                    "key": selected,
                    "amount": cantidad
                }
                this.props.setLs[3](this.props.getLs[3]().concat([tempView]))
                this.setState(state => ({bebidasView: this.props.getLs[3]()}));
            }
        }
    }

    count(ls, acom){
        let x = 0;
        for (let i = 0; i < ls.length; i++) {
            if(ls[i] === acom){x++;}
        }
        return x
    }

    sinRepetidos(ls){
        let rs = []
        ls.forEach(element => {
            if(rs.indexOf(element) === -1){
                rs.push(element);
            }
        });
        return rs;
    }

    renderDPBotton(pla, acom){
        return (
            <button type='button' className='btn-secondary'
                onClick={() => {
                    let newView = this.state.platosView.filter(p => p.key !== pla.key);
                    let ls = pla.values.filter(a => a.id !== acom.id);
                    if(ls.length === 0){
                        this.setState(state => ({platosView: newView}));
                        this.props.setLs[2](newView);
                        //------------update body
                        this.props.setLs[0](newView);
                    }
                    else{
                        const newP = {
                            key: pla.key,
                            values: ls
                        }
                        this.setState(state => ({platosView: newView.concat(newP)}));
                        this.props.setLs[2](newView);
                        //------------update body
                        let temp = this.props.getLs[0]().filter(p => p.key !== pla.key.id);
                        const modElem = {
                            key: pla.key.id,
                            values: ls.map(e => e.id)
                        }
                        this.props.setLs[0](temp.concat(modElem))
                    }
                }}
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
                                    color: 'black', cursor:'default'
                                }}
                            >
                            <div className="container">
                                <div className="row">
                                    <div className="col-8">
                                        <span>{pla.key.nombre}</span>
                                    </div>
                                    <div className="col">
                                        <span>{''}</span>
                                    </div>
                                </div>
                            </div>
                        </button>
                            {this.renderDPBotton(pla)}
                    </div>
                </div>
            )
        } else{
            return this.sinRepetidos(pla.values).map((acom, k) => {
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
                                        color: 'black', cursor:'default'
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
                                                <span style={{fontSize:''}}>x{this.count(pla.values, acom)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            
                                {this.renderDPBotton(pla, acom)}
                        </div>
                    </div>
                )
            })
        }
    }

    updateView(b){
        if(b.amount === 1){
            let lsView = this.state.bebidasView.filter(elem => b !== elem);
        
            this.setState(state => ({bebidasView: lsView}));
            this.props.setLs[3](lsView);
            //----- update body
            let temp = this.props.getLs[1]().filter(e => e.key !== b.key.id);
            this.props.setLs[1](temp);
        }else{
            let lsView = this.state.bebidasView.filter(elem => b !== elem);
            const elem = {
                key: b.key,
                amount: (b.amount -1)
            }
            this.setState(state => ({bebidasView: lsView.concat(elem)}));
            this.props.setLs[3](lsView);
            //----- update body
            let temp = this.props.getLs[1]().filter(e => e.key !== b.key.id);
            this.props.setLs[1](temp.concat({key: b.key.id, amount: elem.amount}));
        }
    }

    renderDBBotton(b){
        return (
            <button type='button' className='btn-secondary'
                onClick={() => {
                    this.updateView(b);
                }}
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

    renderBebida(bebida, i){
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
                                color: 'black', cursor: 'default'
                            }}
                        >
                            <div className="container">
                                <div className="row">
                                    <div className="col-8">
                                        <span>{bebida.key.nombre}</span>
                                    </div>
                                    <div className="col">
                                        <span>x{bebida.amount}</span>
                                    </div>
                                </div>
                            </div>
                        </button>
                    
                        {this.renderDBBotton(bebida)}
                </div>
            </div>
        )
    }

    render(){
        return(
            <React.Fragment>
                <div className='check-container' style={{margin:'10px', marginRight: '20px', marginLeft:'20px'}}>
                <IconContext.Provider value={{ className: "shared-class", size: 20 }}/>
                    {this.state.platosView.map((pla, i) => {
                        return this.renderAcompañamiento(pla,i)
                    })}
                    {this.state.bebidasView.map((b, i) => {
                        return (
                            this.renderBebida(b, i)
                        )
                    })}
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(CheckStep)