import React from 'react';
import {withRouter} from 'react-router';
import EmployeeCardList from '../component/EmployeeCardList';
import API from '../../service/api'

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            employees: []
        }
    }

    componentDidMount(){
        API.get('mozo/list')
            .then(res => {
                //this.setState(state => ({employees: !res.data}))
                this.setState(state => ({employees: res.data}))
            }).catch(err => console.log(err))
    }
    
    renderEmpty(){
        if(this.state.employees.length === 0){
            return (
                <div id="name" className="card" style={{margin: "2%", textAlign:"center"}}>
                    <div style={{margin: "2%"}}>
                        <h4>No hay informacion para mostrar</h4>
                    </div>
                </div>
            )
        }else{
            return (
                <div id="name" className="card" style={{margin: "2%"}}>
                    <div style={{margin: "2%"}}>
                        <EmployeeCardList contents={this.state.employees}/>
                    </div>
                </div>
            )
        }
    }

   render() {
    return (
      <React.Fragment>
        <div>
            <div id="MesasLS" className="card" style={{margin: "2%"}}>
                <div style={{margin: "2%"}}>
                    <h3><b>Listado de empleados</b></h3>
                    <div>
                        <div style={{margin: "1%", marginBottom: "0%"}}>
                            {this.renderEmpty()}
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