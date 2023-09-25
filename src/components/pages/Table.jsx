import React from 'react';
import { withRouter } from 'react-router';
import Sidebar from '../component/Sidebar';
import ErrorMessage from '../component/ErrorMessage';
import '../../styles/table.css'
import API from '../../service/api';
//import OrderView from '../component/OrderView';
import {AiOutlinePlus, AiOutlineReload, AiOutlineMinus} from 'react-icons/ai';

class Table extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            content: {
                credenciales: { email: "admin@mail.com", pass: "public123" },
                mesaId: 0,
                mesas: [],
                peticiones: []
            },
            mesa: undefined,
            orden: undefined,
        }
    }

    componentDidMount(){
        if(this.props.content === undefined){
            this.props.history.push("/");
        }
        else{
            this.setState(state => ({content: this.props.content}))
            const headers= {
                auth: {username: 'admin@mail.com',password: 'public123'}
            }
            API.getAuth('mesa/'+this.props.content.mesaId, headers)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    componentDidUpdate(){
        if(this.props.content !== undefined && this.props.content.mesaId !== this.state.content.mesaId){
            window.location.reload();
        }
    }

    handleOnClick(){
        console.log("Create state: ", this.state);
    }

    handleOnClickUpdate(){
        console.log("Update state: ", this.state);
    }

    handleOnClickDelete(){
        console.log("Delete state: ", this.state);
    }

    renderOrden(){
        if(this.state.orden === undefined){
            return (
                <div className='contenedor'>
                    <ErrorMessage error={"No hay una orden que mostrar"}/>
                </div>
            );
        }
        else{
            return (
                <div className="contenedor">
                    <div className='card'>
                        <h1>{'cuenta: '}{this.state.mesa.cuenta}</h1>
                    </div>
                    <div className='card'>
                        <h1>{'Orden Nro: '}{this.state.orden.id}</h1>
                    </div>
                    <div>
                        <div className="contenedorB">
                            <button type='button' className='btn btn-secondary' style={{}}>Ver Orden</button>
                        </div>
                    </div>
                </div>
            );
        }
    }

    render(){
        return (
            <React.Fragment>
                <div style={{zIndex:9}}>
                    <Sidebar 
                        mesas={this.state.content.mesas}
                        peticiones={this.state.content.peticiones}
                        credenciales={this.state.content.credenciales}
                    />
                </div>

                <div className='contenedor'>
                    <div className='card'>
                        <h1><b>{'Mesa Nro. '}</b> {this.state.content.mesaId}</h1>
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
                                onClick={() => this.props.history.push('/create', this.state.content)}
                            >
                                <AiOutlinePlus/>
                            </button>
                        </div>
                        <div className="">
                            <button className="btnu"><AiOutlineReload/></button>
                        </div>
                        <div className="">
                            <button className="btnd" style={{ fontSize: '24px' }}><AiOutlineMinus/></button>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default withRouter(Table)