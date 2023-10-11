import React from 'react';
import { withRouter } from 'react-router';
import Sidebar from '../component/Sidebar';
import ErrorMessage from '../component/ErrorMessage';
import '../../styles/table.css'
import API from '../../service/api';
//import OrderView from '../component/OrderView';
import {AiOutlinePlus, AiOutlineReload, AiOutlineMinus} from 'react-icons/ai';
//import OrderView from '../component/OrderView';

class Table extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "", 
            pass: "",
            mesaId: 0,
            mesas: [],
            peticiones: [],
            cuenta: 0,
            orden: undefined,
        }
    }

    componentDidMount(){
        this.setState(state => ({
            email: this.props.content.email,
            pass: this.props.content.pass,
            mesaId: this.props.content.mesaId,
            mesas: this.props.content.mesas,
            peticiones: this.props.content.peticiones
        }))
        if(this.props.content === undefined){
            this.props.history.push("/");
        }
        else{
            this.setState(state => ({content: this.props.content}))
            const headers= {
                auth: {username: this.state.email,password: this.state.pass}
            }
            API.getAuth('mesa/'+this.props.content.mesaId, headers)
            .then(res => {
                console.log(res.data);
                this.setState(state => ({orden: res.data.orden}));
                this.setState(state => ({cuenta: res.data.cuenta}));
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    componentDidUpdate(){
        if(this.props.content !== undefined && this.props.content.mesaId !== this.state.mesaId){
            this.setState(state => ({
                email: this.props.content.email,
                pass: this.props.content.pass,
                mesaId: this.props.content.mesaId,
                mesas: this.props.content.mesas,
                peticiones: this.props.content.peticiones
            }))
            this.setState(state => ({content: this.props.content}))
            const headers= {
                auth: {username: this.state.email,password: this.state.pass}
            }
            API.getAuth('mesa/'+this.props.content.mesaId, headers)
            .then(res => {
                console.log(res.data);
                this.setState(state => ({orden: res.data.orden}));
                this.setState(state => ({cuenta: res.data.cuenta}));
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    handleOnClickCreate(){
        this.props.history.push('/create', this.state.content);
    }

    handleOnClickUpdate(){
        console.log("Update state: ", this.state);
    }

    handleOnClickDelete(){
        if(!(this.state.orden === undefined || this.state.orden === null)){
            const headers= {
                auth: {username: this.state.email, password: this.state.pass}
            }
            const path = "orden/"+this.state.content.mesaId+"/"+this.state.orden.id;
            API.deleteAuth(path, headers)
            .then(res => {
                console.log(res.status)
                this.setState(state => ({orden: undefined}))
            })
            .catch(err => console.log(err))
        }
    }

    renderOrden(){
        if(this.state.orden === undefined || this.state.orden === null){
            return (
                <div style={{zIndex: '0', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(179, 241, 178, 0.5)'}}>
                    <ErrorMessage error={"No hay una orden que mostrar"} />
                </div>
            );
        }
        else{
            return (
                <div className="contenedor">
                    <div className='card' style={{zIndex: '0', backgroundColor:'rgba(179, 241, 178, 0.5)'}}>
                        <h1>{'Cuenta:  $'}{this.state.cuenta}</h1>
                    </div>
                    <br/>
                    <div className='card' style={{zIndex: '0', backdropFilter: 'blur(10px)', backgroundColor:'rgba(179, 241, 178, 0.5)'}}>
                        <h1>{'Orden Nro: '}{this.state.orden.id}</h1>
                    </div>

                    <div className="contenedorB">
                            <button type='button' 
                                className='btn btn-secondary' 
                                style={{}}
                                onClick={() => this.props.history.push('/view', 
                                    {
                                        "info":this.state.content, 
                                        "orden":this.state.orden
                                    })
                                }
                            >
                                Ver Orden
                            </button>
                    </div>
                </div>
            );
        }
    }

    render(){
        return (
            <React.Fragment>
            <div  className='base'>
            <div style={{zIndex:9}}>
                    <Sidebar 
                        mesas={this.state.mesas}
                        peticiones={this.state.peticiones}
                        email={this.state.email}
                        pass={this.state.password}
                    />
                </div>

                <div className='contenedor'>
                    <div className='card' style={{zIndex: '0', backdropFilter: 'blur(10px)', backgroundColor:'rgba(179, 241, 178, 0.5)'}}>
                        <h1><b>{'Mesa Nro. '}</b> {this.state.mesaId}</h1>
                    </div>

                    <div style={{margin:'15px', zIndex: -1}}>
                        {this.renderOrden()}
                    </div>
                </div>
{/**extraer como componenete */}
                <div className="container">
                    <div className='btn-holder'>
                        <div className="">
                            <button 
                                className="btnc"
                                onClick={() => this.handleOnClickCreate()}
                            >
                                <AiOutlinePlus/>
                            </button>
                        </div>
                        <div className="">
                            <button className="btnu"><AiOutlineReload/></button>
                        </div>
                        <div className="">
                            <button 
                                className="btnd" 
                                style={{ fontSize: '24px' }}
                                onClick={() => this.handleOnClickDelete()}
                            >
                                <AiOutlineMinus/>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Table)