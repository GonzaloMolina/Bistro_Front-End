import React from 'react';
import { withRouter } from 'react-router';
import Sidebar from '../component/Sidebar';
import ErrorMessage from '../component/ErrorMessage';
import '../../styles/table.css'
import API from '../../service/api';
import {AiOutlinePlus, AiOutlineReload, AiOutlineMinus} from 'react-icons/ai';
import { wait } from '@testing-library/user-event/dist/utils';
import spin from '../img/Animation -SpinLoading.json';
import Lottie from 'lottie-react';
import f1 from "../img/t1.jpg";
import f2 from "../img/t2.jpg";
import f3 from "../img/t3.png";

class Table extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            email: "",
            menuId: 0,
            pass: "",
            mesaId: 0,
            mesas: [],
            peticiones: [],
            jefe: "",
            cuenta: 0,
            orden: undefined,
            flag: true,
            index: Math.floor(Math.random() * 3)
        }
    }

    componentDidMount(){
        if(this.props.content === undefined){
            this.props.history.push("/");
        }
        else{
            console.log(this.props.content)
            this.setState(state => ({
                id: this.props.content.id,
                email: this.props.content.email,
                pass: this.props.content.pass,
                mesaId: this.props.content.mesaId,
                mesas: this.props.content.mesas,
                jefe: this.props.content.jefe,
                peticiones: this.props.content.peticiones
            }))
            const headers= {
                auth: {username: this.state.email,password: this.state.pass}
            }
            API.getAuth('mesa/'+this.props.content.mesaId, headers)
            .then(res => {
                this.setState(state => ({menuId: res.data.menuId}));
                this.setState(state => ({orden: res.data.orden}));
                this.setState(state => ({cuenta: res.data.cuenta}));
                console.log(this.state);
                wait(2000).then(res => this.setState(state => ({flag: false})))
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    componentDidUpdate(){
        if(this.props.content !== undefined && this.props.content.mesaId !== this.state.mesaId){
            this.setState(state => ({flag: true}))
            this.setState(state => ({
                id: this.props.content.id,
                email: this.props.content.email,
                pass: this.props.content.pass,
                mesaId: this.props.content.mesaId,
                mesas: this.props.content.mesas,
                jefe: this.props.content.jefe,
                peticiones: this.props.content.peticiones,
                index: Math.floor(Math.random() * 3)
            }))
            this.setState(state => ({content: this.props.content}))
            const headers= {
                auth: {username: this.state.email,password: this.state.pass}
            }
            API.getAuth('mesa/'+this.props.content.mesaId, headers)
            .then(res => {
                console.log(this.state);
                this.setState(state => ({orden: res.data.orden}));
                this.setState(state => ({cuenta: res.data.cuenta}));
                wait(2000).then(res => this.setState(state => ({flag: false})))
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    content = () => {
        return {
                email: this.state.email,
                pass: this.state.pass,
                mesaId: this.state.mesaId,
                id: this.state.id,
                menuId: this.state.menuId,
                mesas: this.state.mesas,
                peticiones: this.state.peticiones,
                orden: this.state.orden,
                cuenta: this.state.cuenta
            }
    }

    handleOnClickCreate(){
        this.props.history.push('/create', this.content());
    }

    handleOnClickUpdate(){
        console.log("Update state: ", this.state);
    }

    handleOnClickDelete(){
        if(!(this.state.orden === undefined || this.state.orden === null)){
            this.setState(state => ({flag: true}))
            const headers= {
                auth: {username: this.state.email, password: this.state.pass}
            }
            const path = "orden/"+this.state.content.mesaId+"/"+this.state.orden.id;
            API.deleteAuth(path, headers)
            .then(res => {
                console.log(res.status)
                this.setState(state => ({orden: undefined}))
                wait(2000).then(res => {
                    this.setState(state => ({flag: false}))
                })
            })
            .catch(err => console.log(err))
        }
    }

    doRelease(){
        this.setState(state => ({flag: true}))
            const headers= {
                auth: {username: this.state.email, password: this.state.pass}
            }
            const path = "mesa/"+this.state.content.mesaId+"/release";
            API.getAuth(path, headers)
            .then(res => {
                console.log(res.status)
                this.setState(state => ({orden: undefined}))
                wait(2000).then(res => {
                    this.setState(state => ({flag: false}))
                })
            })
            .catch(err => console.log(err))
    }

    renderOrden(){
        if(this.state.flag){
            return (
                <Lottie
                        animationData={spin}
                        style={{
                            right: "50%",
                            zIndex: 1,
                            overflow: "hidden",
                            width: '30%',
                            height: '30%',
                            margin: '0 auto'
                        }}
                    />
            )
        }
        else{
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
                                    style={{margin:'1%', fontSize: '18px'}}
                                    onClick={() => this.props.history.push('/view', 
                                        {
                                            "info":this.state.content, 
                                            "orden":this.state.orden
                                        })
                                    }
                                >
                                    Ver Orden
                                </button>

                                <button type='button' 
                                    className='btn btn-secondary' 
                                    style={{margin:'1%', fontSize: '18px'}}
                                    disabled={this.state.orden === undefined || this.state.orden === null}
                                    onClick={() => 
                                        this.doRelease()
                                    }
                                >
                                    Liberar mesa
                                </button>
                        </div>
                    </div>
                );
            }
        }
    }

    fondo(){return [f1, f2, f3][this.state.index]}

    render(){
        return (
            <React.Fragment>
            <div  className='base'
                style={{
                    backgroundImage: `url(${this.fondo()})`
                }}
            >
            <div style={{zIndex:9}}>
                    <Sidebar 
                        id={this.state.id}
                        mesas={this.state.mesas}
                        peticiones={this.state.peticiones}
                        jefe={this.state.jefe}
                        email={this.state.email}
                        pass={this.state.pass}
                        mesaId={this.state.mesaId}
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