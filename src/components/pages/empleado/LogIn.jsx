import React from 'react';
import { withRouter } from 'react-router';

import LogInForm from "../../component/LogInForm";
import API from "../../../service/api";

import logo from "../../img/Bistro_logo.png";

class LogIn extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        form: this.formComponent(),
        error: undefined
      };
    }
    
    formComponent = (error) => <LogInForm error={error} login={this.doLogIn} {...this.props}/>
    
    doLogIn = ({email, password}) => {
      const headers= {
        auth: {username: email,password: password}
      }
      API.logIn('mozo/logIn', {email: email, password: password}, headers)
      .then(res => {
          let content = {
            id: res.data.id,
            nombre: res.data.nombre,
            apellido: res.data.apellido,
            email: email,
            jafe: res.data.jefe,
            password: password,
            mesas: res.data.mesas,
            peticiones: res.data.peticiones
          }
          this.props.history.push('/home', content)
      })
      .catch(error => {
        if(error.code === 'ERR_NETWORK'){
          this.setState(state => ({error: 'El Backend esta Apagado'}))
        }
        else{
          if(error.code === 'ERR_BAD_REQUEST'){
            this.setState(state => ({form: !this.formComponent('error en mail/password')}))
            this.setState(state => ({form: this.formComponent('error en mail/password')}))
          } else {
            console.log(error);
          }
        }
      })
    }
    
    prompError(){
      return (
        <div className="card text-white bg-danger" style={{margin: '5%'}}>
          <div className="card-header">
            ERROR
          </div>
          <div className="card-body">
            <p>{this.state.error}</p>
            <button 
              type='button' 
              className='btn btn-secondary'
              onClick={() => this.setState(state => ({error: undefined}))}
            > Ok </button>
          </div>
        </div>
      )
    }
    
    render() {
      return (
        <React.Fragment>
            <div style={{height: '100vh' ,backgroundColor:'#004000'}}>
              <div align="center">
                <img 
                    src={logo} 
                    alt="logo"
                    style={{ maxWidth: '100%', margin: '0%', zIndex: '-1'}}
                />
              </div>
              <div align="center" style={{
                marginTop: "2%", 
                zIndex: 0, 
                position:'center',
                marginLeft: 'auto', 
                marginRight: 'auto'}}>
                  {this.state.error? this.state.form: this.state.form}
              </div>
            </div>
        </React.Fragment>
      );
    }
  }
  
export default withRouter(LogIn);  