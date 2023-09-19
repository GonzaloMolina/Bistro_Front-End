import React from 'react';
import { withRouter } from 'react-router';
import Sidebar from '../component/Sidebar';
import ErrorMessage from '../component/ErrorMessage';
import '../../styles/table.css'
//import API from '../../service/api';
//import OrderView from '../component/OrderView';
import {AiOutlinePlus, AiOutlineReload, AiOutlineMinus} from 'react-icons/ai';

class Table extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            content: {
                credenciales: { email: "admin@mail.com", pass: "public123" },
                mesaId: 5,
                mesas: [ 5, 6 ],
                peticiones: [ { id: 7, asunto: "Licencia por enfermedad", estado: false } ]
            },
            orden: undefined
        }
    }

    componentDidMount(){
        if(this.props.content === undefined){
            console.log("go to logIn")
        }
        else{
            console.log('state on mount', this.state.content);
        }
    }

    componentDidUpdate(){}

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
                    <ErrorMessage error={"no hay una orden que mostrar"}/>
                </div>
            );
        }
        else{
            return (
                <div className="contenedor">
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
        console.log(this.props.content)
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

                <div className="container">
                    <div className='btn-holder'>
                        <div className="">
                            <button className="btnc"><AiOutlinePlus/></button>
                        </div>
                        <div className="">
                            <button className="btnu"><AiOutlineReload/></button>
                        </div>
                        <div className="">
                            <button className="btnd"><AiOutlineMinus/></button>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default withRouter(Table)