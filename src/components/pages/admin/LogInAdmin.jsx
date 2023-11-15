import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import LogInFormAdmin from './LogInFormAdmin';
import API from "../../../service/api";

import logo from "../../img/Bistro_logo.png";

class LogInAdmin extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        form: this.formComponent(),
        error: undefined
      };
    }
    
    formComponent = (error) => <LogInFormAdmin error={error} login={this.doLogIn} {...this.props}/>
    
    doLogIn = ({email, password}) => {
      const headers= {
        auth: {username: email,password: password}
      }
      API.logIn('restaurante/logIn', {email: email, password: password}, headers)
      .then(res => {
          this.props.history.push('/admin/home', res.data)
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
            <div style={{height: '100vh' ,backgroundColor: 'darkblue'}}>
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
              <div align='center'>
                <Link to='/'>¿ Es empleado ?</Link>
              </div>
              <div align='center' style={{margin: '8px'}}>
                <button className='btn btn-secondary' onClick={() => this.props.history.push('/admin/register')}>
                    Registrarse
                </button>
              </div>
            </div>
        </React.Fragment>
      );
    }
  }
  
export default withRouter(LogInAdmin);  