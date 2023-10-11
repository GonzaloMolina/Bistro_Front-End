import React from "react";
import { withRouter } from 'react-router';
import { BsCheck2Square } from 'react-icons/bs';
import { GrCheckbox } from 'react-icons/gr';
import { AiOutlineCloseSquare } from 'react-icons/ai';

class Feed extends React.Component {


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
        return(
            <React.Fragment>
            <div className='card' style={{marginLeft:'5%', marginRight:'5%', zIndex: '0', backgroundColor: 'rgba(179, 241, 178, 0.4)', borderRadius:'20px'}}>
                <table>
                    <thead>
                        <tr>
                            <th style={{fontSize: '20px', backgroundColor: '#009933', borderTopLeftRadius:'20px'}}>Asunto</th>
                            <th style={{fontSize: '20px', backgroundColor: '#009933', borderTopRightRadius:'20px'}}>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.solicitudes.slice(0, 3).map((sol, k) => {
                            return (
                                <tr key={k}>
                                    <td style={{fontSize: '18px'}}>{sol.asunto}</td>
                                    <td>{this.renderEstado(sol.estado)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Feed);