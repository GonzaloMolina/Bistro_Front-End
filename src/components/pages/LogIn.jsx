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
        auth: {username: 'admin@mail.com',password: 'public123'}
      }
      API.logIn('mozo/logIn', {email: email, password: password}, headers)
      .then(res => {
          console.log(res);
          this.props.history.push('/home', res.data)
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
                    style={{ maxWidth: '100%'}}
                />
              </div>
              <col></col>
              <div align="center" style={{marginTop: "10%", zIndex: 0, backgroundColor:'#004000', maxWidth:"40%", position:'center',
                                          marginLeft: 'auto', marginRight: 'auto'}}>
                  {this.state.form}
              </div>
            </div>
        </React.Fragment>
      );
    }
  }
  
export default withRouter(LogIn);  