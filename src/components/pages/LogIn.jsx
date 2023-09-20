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
      API.post('mozo/logIn', {email: email, password: password})
      .then(response => {
          let res = response.data
          res.password = password
          this.props.history.push('/home', res)
      })
      .catch(error => {
        console.log(error.response.data)
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
                />
                </div>
              <div align="center" style={{marginTop: "10%", zIndex: 0, backgroundColor:'#004000'}}>
                  {this.state.form}
              </div>
            </div>
        </React.Fragment>
      );
    }
  }
  
export default withRouter(LogIn);  