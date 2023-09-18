import React from "react";
import { AiOutlineMail, AiOutlineInfoCircle, AiFillSetting } from 'react-icons/ai';



export const sidebarData =[
    {
        title: 'Peticiones',
        path: '#peticiones',
        icon: <AiOutlineMail/>,
        cName: 'nav-text'
    },
    {
        title: 'Info del Restaurante',
        path: '#info',
        icon: <AiOutlineInfoCircle/>,
        cName: 'nav-text'
    },
    {
        title: 'Ajustes',
        path: '#ajustes',
        icon: <AiFillSetting/>,
        cName: 'nav-text'
    }
]