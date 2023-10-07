import React from 'react';
import { withRouter } from 'react-router';

import LogInForm from "../component/LogInForm";
import API from "../../service/api";

import logo from "../img/Bistro_logo.png";

class LogIn extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        form: this.formComponent()
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
            nombre: res.data.nombre,
            apellido: res.data.apellido,
            email: email,
            password: password,
            mesas: res.data.mesas,
            peticiones: res.data.peticiones
          }
          console.log(content);
          this.props.history.push('/home', content)
      })
      .catch(error => {
        console.log(error)
        this.setState({form: !this.formComponent(error.response.data.title)})
        this.setState({form: this.formComponent(error.response.data.title)})
      })
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
                  {this.state.form}
              </div>
            </div>
        </React.Fragment>
      );
    }
  }
  
export default withRouter(LogIn);  