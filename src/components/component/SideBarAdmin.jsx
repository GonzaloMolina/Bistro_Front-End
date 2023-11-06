import React from "react";
import {withRouter} from 'react-router';

import { Link } from 'react-router-dom/cjs/react-router-dom';
import secciones from "../pages/admin/secciones";
import '../../styles/sidebarAdmin.css'
import { IconContext } from 'react-icons';

class SideBarAdmin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected: undefined
        }
    }

    componentDidMount(){
        this.setState(state => ({selected: this.props.seccion}))
    }

    render(){
        return (
            <React.Fragment>
            <IconContext.Provider value={{color: 'black' }}>
            <div className="head" />
            <div className="sidebar">
                <ul className="items">
                {secciones.map((seccion, k) => {
                        if(this.state.selected === seccion.seccion){
                            return (
                                <li className="item" key={k}>
                                    <Link
                                        style={{backgroundColor: 'lightblue'}}
                                        to={{
                                            pathname: '/admin'+seccion.link,
                                            state: this.props.content
                                        }}
                                    >
                                        {seccion.icono}
                                        <span >
                                            {seccion.seccion}
                                        </span>
                                    </Link>
                                    <ul>
                                        {seccion.sub? seccion.sub.map(ss => <li>ss</li>) : <div/>}
                                    </ul>
                                </li>
                            )
                        }else{
                            return (
                                <li className="item" key={k}>
                                    <Link
                                        to={{
                                            pathname: '/admin'+seccion.link,
                                            state: this.props.content
                                        }}
                                    >
                                        {seccion.icono}
                                        <span >
                                            {seccion.seccion}
                                        </span>
                                    </Link>
                                    <ul>
                                        {seccion.sub? seccion.sub.map(ss => <li>ss</li>) : <div/>}
                                    </ul>
                                </li>
                            )
                        }
                    })
                }
                </ul>
            </div>
            </IconContext.Provider>
            </React.Fragment>
        )
    }
}

export default withRouter(SideBarAdmin)