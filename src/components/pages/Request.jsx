import React from 'react';
import {withRouter} from 'react-router';
import Sidebar from '../component/Sidebar';
import logo from "../img/bistrot.jpg";
import { BsCheck2Square } from 'react-icons/bs';
import { GrCheckbox } from 'react-icons/gr';
import { AiOutlineCloseSquare } from 'react-icons/ai';
//import '../../styles/table.css'

class Request extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            email: "",
            password: "",
            mesas: [],
            solicitudes: []
        }
    }

    componentDidMount(){
        if(this.props.user === undefined){this.props.history.push('/')}
        else{
            this.setState(state => ({email: !this.props.user.email}));
            this.setState(state => ({email: this.props.user.email}));
            this.setState(state => ({password: !this.props.user.pass}));
            this.setState(state => ({password: this.props.user.pass}));
            this.setState(state => ({mesas: !this.props.user.mesas}));
            this.setState(state => ({mesas: this.props.user.mesas}));
            this.setState(state => ({solicitudes: !this.props.user.peticiones}));
            this.setState(state => ({solicitudes: this.props.user.peticiones}));
        }
    }

    renderEstado = (state) => state==='ACEPTADA'?  this.greenB() : state==='RECHAZADA'?  this.redB() : this.blackB()

    greenB = () => {
        return (
        <button type='button' className='btn'
        style={{
            color: 'green',
            fontSize: '20px',
            cursor: 'default'
        }}>
            <BsCheck2Square/>
        </button>
        )
    }

    redB = () => {
        return (
        <button type='button' className='btn'
        style={{
            color: 'red',
            fontSize: '20px',
            cursor: 'default'
        }}>
            <AiOutlineCloseSquare/>
        </button>
        )
    }

    blackB = () => {
        return (
        <button type='button' className='btn'
        style={{
            color: 'red',
            fontSize: '20px',
            cursor: 'default'
        }}>
            <GrCheckbox/>
        </button>
        )
    }

    render(){
        return (
            <div style={{
                backgroundImage: `url(${logo})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh',
                zIndex: '-10'
            }}>
                <div>
                    <Sidebar
                        mesas={this.state.mesas} 
                        peticiones={this.state.solicitudes}
                        email={this.state.email}
                        pass={this.state.password}
                    />
                </div>

                <div className='card' 
                    style={{
                        marginTop: '2%',
                        marginLeft:'5%', 
                        marginRight:'5%', 
                        zIndex: '0', 
                        backgroundColor: 'rgba(179, 241, 178, 0.4)', 
                        borderRadius:'20px'
                    }}
                >
                    <ul style={{ 
                        listStyleType: 'none',
                    }}>
                    {this.state.solicitudes.map((sol, i) => {
                        return (
                            <li>
                                <div className='container'>
                                    <div className='row'>
                                        <div classname='col' style={{}}>
                                            <span> {sol.asunto} </span> 
                                        </div>
                                        <div classname='col'>
                                            {this.renderEstado(sol.estado)}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                    </ul>
                </div>

                <div className="container">
                    <div className='btn-holder' 
                    style={{
                        bottom: '15%',
                        right: '8%'
                    }}>
                        <div className="">
                            <button 
                                className="btn btn-secondary"
                                onClick={() => console.log('a')}
                            >
                                Redactar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Request);