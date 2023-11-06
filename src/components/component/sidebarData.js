import React from "react";
import { AiOutlineInfoCircle, AiFillSetting } from 'react-icons/ai';



export const sidebarData = [
    {
        title: 'Info del Restaurante',
        path: '/info',
        icon: <AiOutlineInfoCircle size={30} />,
        cName: 'nav-text'
    },
    {
        title: 'Ajustes',
        path: '#ajustes',
        icon: <AiFillSetting size={20} />,
        cName: 'nav-text'
    }
]