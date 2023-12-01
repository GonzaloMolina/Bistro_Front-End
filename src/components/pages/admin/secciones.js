import { BiHomeAlt2, BiHelpCircle, BiFoodMenu } from 'react-icons/bi';
import { AiOutlineMail, AiOutlineFolderOpen } from 'react-icons/ai';
import { BsPersonBoundingBox } from 'react-icons/bs';
import { MdTableBar } from 'react-icons/md';

const secciones =
    [
        {
            seccion: 'Home',
            icono: <BiHomeAlt2 />,
            link: '/home'
        },
        {
            seccion: 'Empleados',
            icono: <BsPersonBoundingBox />,
            link: '/empleados',
            descripcion: 'Administra a tus empleados',
            sub: []
        },
        {
            seccion: 'Mesas',
            icono: <MdTableBar />,
            link: '/mesas',
            descripcion: 'Agrega, observa o elimina las mesas de tu establecimiento',
            sub: []
        },
        {
            seccion: 'Menu',
            icono: <BiFoodMenu />,
            link: '/menu',
            descripcion: 'Maneja los consumibles de tu establecimiento',
            sub: []
        },
        {
            seccion: 'Ordenes',
            icono: <AiOutlineFolderOpen />,
            link: '/ordenes',
            descripcion: 'Las ordenes que se han realizado hasta el momento',
            sub: []
        },
        {
            seccion: 'Solicitudes',
            icono: <AiOutlineMail />,
            link: '/solicitudes',
            descripcion: 'Aprueba o rechaza las peticiones de tus empleados',
            sub: []
        },
        {
            seccion: 'Ayuda',
            icono: <BiHelpCircle />,
            link: '/help'
        },
    ]

export default secciones;