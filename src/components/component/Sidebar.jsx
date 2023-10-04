import React from 'react';
import {withRouter} from 'react-router';
import { FaBars} from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import '../../styles/sidebar.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { sidebarData } from './sidebarData';
import { IconContext } from 'react-icons';
import { BsPencilSquare } from 'react-icons/bs';

class Sidebar extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            sidebarVisible: false,
            anchoNav: '200px',
            mesasVisible: false
        }
    }

    showSidebar = () => {
        this.setState(prevState => ({sidebarVisible: !prevState.sidebarVisible}))
    }

    toggleMesas = () => {
        this.setState({ mesasVisible: !this.state.mesasVisible });
    };
      

    render(){
        const estiloNav = {
            width: this.state.anchoNav
        }
        const { sidebarVisible } = this.state;
        return (
            <React.Fragment>
                <IconContext.Provider value={{color: '#faf60e' }}>
                    <div className='navbar'>
                        <Link to="#" className='menu-bars'>
                            <FaBars onClick={() => {this.showSidebar()}}/>
                        </Link>
                    </div>
                    <nav style={estiloNav} className={`nav-menu ${sidebarVisible ? 'active' : ''}`}>
                        <ul className='nav-menu-items' style={{ paddingLeft: '10px' }}>
                            <li className='navbar-toggle'>
                                <AiFillCloseCircle onClick={() => this.showSidebar()}/> <span> <h2>Bistro</h2></span>
                            </li>
                            
                            <li className='nav-text' onClick={this.toggleMesas}>
                                <Link>
                                <BsPencilSquare />
                                <span style={{ fontFamily: 'Cinzel' }} className='head'>Mesas</span>
                                </Link>
                            </li>

                            {this.state.mesasVisible && (
                                // Renderizar elementos de "Mesa Nro" cuando las mesas son visibles
                                this.props.mesas.map((elem, i) => (
                                <li key={i} className='nav-text' onClick={() => this.showSidebar()}>
                                    <Link to={{
                                        pathname: '/table',
                                        state: { 
                                            email: this.props.email,
                                            pass: this.props.pass,
                                            mesas: this.props.mesas, 
                                            mesaId: elem, 
                                            peticiones: this.props.peticiones 
                                        }}}
                                    >
                                    <span style={{ fontFamily: 'Cinzel', fontSize:15}}> {'Mesa Nro. ' + elem}</span>
                                    </Link>
                                </li>
                                ))
                            )}

                            {sidebarData.map((elem, index) => {
                                return (
                                    <li key={index} span className='nav-text' onClick={() => this.showSidebar()}>
                                        <Link to={elem.path}>
                                            {elem.icon}
                                            <span style={{ fontFamily: 'Cinzel' }}> {elem.title}</span>
                                        </Link>
                                    </li>
                                )
                            })}

                        </ul>
                    </nav>
                </IconContext.Provider>
            </React.Fragment>
        );
    }
}

export default withRouter(Sidebar);