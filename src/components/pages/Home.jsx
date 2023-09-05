import React from 'react';
import { withRouter } from 'react-router-dom';
import CardList from '../component/CardList';
import { FaHome, FaTable } from 'react-icons/fa';
import { Button, Menu, MenuItem, IconButton } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';
import Collapse from '@mui/material/Collapse';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: "Gonzalo",
            apellido: "Molina",
            mesasAsignadas: [1, 2, 3, 4, 5, 6, 7],
            anchorEl: null, // Para controlar la apertura del menú
            mostrarInformacion: false, // Estado para controlar la visibilidad de la información
        }
    }

    // Función para abrir el menú
    handleMenuOpen = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    // Función para cerrar el menú
    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    // Función para alternar la visibilidad de la información al hacer clic en el icono de usuario
    toggleInformacion = () => {
        this.setState((prevState) => ({
            mostrarInformacion: !prevState.mostrarInformacion,
        }));
    };

    // Función para cerrar sesión
    handleLogout = () => {
        // Agrega tu lógica de cierre de sesión aquí
    };

    render() {

        const { anchorEl } = this.state;
        const { mostrarInformacion } = this.state;

        return (
            <React.Fragment>
                <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="navigation">
                        {/* Botón principal para abrir el menú */}
                        <IconButton onClick={this.handleMenuOpen}>
                            <FaHome />
                        </IconButton>
                        {/* Menú desplegable */}
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleMenuClose}
                        >
                            <MenuItem>
                                <Button startIcon={<FaHome />}>Inicio</Button>
                            </MenuItem>
                            <MenuItem>
                                <Button startIcon={<FaTable />}>Mesas</Button>
                            </MenuItem>
                        </Menu>
                    </div>
                    
                    <div>
                    <div style={{ flex: 1, textAlign: 'right' }}>
                        {/* Icono de usuario personalizado con evento onClick */}
                        <IconButton className="user-icon"
                            onClick={this.toggleInformacion}>
                            <FaUserCircle size={32} color="blue" />
                        </IconButton>
                    </div>
                    {/* Recuadro de información */}
                    <Collapse in={mostrarInformacion}>
                        <div className="user-info" style={{ flex: 1, alignItems: "left" }}>
                            <h5>{this.state.nombre} {this.state.apellido}</h5>
                            <Button size="small" variant="contained" color="primary" onClick={this.handleLogout}>
                                Logout
                            </Button>
                        </div>
                    </Collapse>
                    </div>
                </div>

                <div id="MesasLS" className="card" style={{ margin: '2%', zIndex: '-1' }}>
                    <div style={{ margin: '2%' }}>
                        <h3><b>Mesas</b></h3>
                        <div className="card" style={{ margin: '2%', opacity: '0.9' }}>
                            <div style={{ margin: '1%', marginBottom: '0%' }}>
                                <CardList contents={this.state.mesasAsignadas} />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


export default withRouter(Home);
