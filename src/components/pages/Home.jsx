import React from 'react';
import {withRouter} from 'react-router';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
                        nombre: "Nombre",
                        apellido: "Apellido",
                        mesasAsignadas:[1,2,3,4]
                    }
    }
        
   render() {
    return (
      <React.Fragment>
        <div>
            <h1>{this.state.apellido + ", "+this.state.nombre}</h1>
            {this.state.mesasAsignadas.forEach(mesaId => {
                <h2>{mesaId}</h2>
            })}
        </div>
      </React.Fragment>
    );
  } 
}


export default withRouter(Home);
