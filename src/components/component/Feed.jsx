import React from "react";
import { withRouter } from 'react-router';
import { BsCheck2Square } from 'react-icons/bs';
//import { GrCheckbox } from 'react-icons/gr'; empty box
import { AiOutlineCloseSquare } from 'react-icons/ai';

class Feed extends React.Component {


    renderEstado = (bool) => bool?  this.greenB() : this.redB()

    greenB = () => {
        return (
        <button type='button' className='btn'
        style={{
            color: 'green',
            fontSize: '20px'
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
            fontSize: '20px'
        }}>
            <AiOutlineCloseSquare/>
        </button>
        )
    }

    render(){
        return(
            <React.Fragment>
            <div className='card' style={{marginLeft:'10%', marginRight:'10%', zIndex: '0', backgroundColor: 'rgba(179, 241, 178, 0.5)', borderRadius:'20px'}}>
                <table>
                    <thead>
                        <tr>
                            <th style={{fontSize: '24px', backgroundColor: '#009933', borderTopLeftRadius:'20px'}}>Asunto</th>
                            <th style={{fontSize: '24px', backgroundColor: '#009933', borderTopRightRadius:'20px'}}>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.solicitudes.map((sol, k) => {
                            return (
                                <tr key={k}>
                                    <td style={{fontSize: '20px'}}>{sol.asunto}</td>
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