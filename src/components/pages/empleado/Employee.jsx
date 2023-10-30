import React from 'react';
import {withRouter} from 'react-router';
import CardList from '../component/CardList';
import API from '../../../service/api'

class Employee extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
                        nombre: "",
                        apellido: "",
                        mesas:[]
                    }
    }

    componentDidMount(){
        API.get('/mozo/'+this.props.content.id)
            .then(res => 
                this.setState(res.data)
            )
            .catch(err => console.log(err))
    }
        
   render() {
    console.log(this.props)
    return (
      <React.Fragment>
        <div>
            <div id="name" className="card" style={{margin: "2%", zIndex:"-1", backgroundColor:'rgba(179, 241, 178, 0.5)'}}>
                <div style={{margin: "2%"}}>
                    <h1>{this.state.apellido + ", "+this.state.nombre}</h1>
                </div>
            </div>
            
            <div id="MesasLS" className="card" style={{margin: "2%", backgroundColor:'rgba(179, 241, 178, 0.5)'}}>
                <div style={{margin: "2%"}}>
                    <h3><b>Mesas</b></h3>
                    <div className="card" style={{margin: "2%", opacity: "0.9"}}>
                        <div style={{margin: "1%", marginBottom: "0%"}}>
                            <CardList mozo={this.state} contents={this.state.mesas}/>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
      </React.Fragment>
    );
  } 
}

export default withRouter(Employee);