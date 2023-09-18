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
        this.state = { sidebar: false }
    }

    showSidebar = () => {
        this.setState(prev => ({sidebar: !this.state.sidebar}))
        this.setState(prev => ({sidebar: !this.state.sidebar}))
    }

    render(){
        return (
            <React.Fragment>
                <IconContext.Provider value={{color: '#faf60e' }}>
                    <div className='navbar'>
                        <Link to="#" className='menu-bars'>
                            <FaBars onClick={() => {this.showSidebar()}}/>
                        </Link>
                    </div>
                    <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items' onClick={() => this.showSidebar()}>
                            <li className='navbar-toggle'>
                                <AiFillCloseCircle /> <span> <h2>Bistro</h2></span>
                            </li>

                            <li className='nav-text'>
                                <BsPencilSquare/><span className='head'>Mesas</span>
                            </li>

                            {this.props.mesas.map((elem, i) => {
                                return (
                                <li key={i} className='nav-text'>
                                    <Link to={elem.path}>
                                        <span> {'mesa Nro. ' +elem}</span>
                                    </Link>
                                </li>)
                            })}

                            {sidebarData.map((elem, index) => {
                                return (
                                    <li key={index} className={elem.cName}>
                                        <Link to={elem.path}>
                                            {elem.icon}
                                            <span> {elem.title}</span>
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