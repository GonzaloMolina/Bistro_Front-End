import React from 'react';
import {withRouter} from 'react-router';
import CardList from '../component/CardList';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
                        nombre: "Nombre",
                        apellido: "Apellido",
                        mesasAsignadas:[1,2,3,4,5,6,7]
                    }
    }
        
   render() {
    return (
      <React.Fragment>
        <div>
            <div id="name" className="card" style={{margin: "2%", zIndex:"-1"}}>
                <div style={{margin: "2%"}}>
                    <h1>{this.state.apellido + ", "+this.state.nombre}</h1>
                </div>
            </div>
            
            <div id="MesasLS" className="card" style={{margin: "2%", zIndex:"-1"}}>
                <div style={{margin: "2%"}}>
                    <h3><b>Mesas</b></h3>
                    <div className="card" style={{margin: "2%", opacity: "0.9"}}>
                        <div style={{margin: "1%", marginBottom: "0%"}}>
                            <CardList contents={this.state.mesasAsignadas}/>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
      </React.Fragment>
    );
  } 
}


export default withRouter(Home);
