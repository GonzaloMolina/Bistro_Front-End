import React from 'react';
import { withRouter } from 'react-router';

import ErrorMessage from './ErrorMessage';
   

class LogInForm extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            error: props.error,
            email: '', 
            password: ''};
    }

    handleChange(value, prop) {
        this.setState(prevState => ({ ...prevState, [prop]: value }));
        this.setState({error: undefined})
    }

    logIn = () => {
        if (this.state.email.length === 0){
            this.setState({ error: "debe completar el campo email"});
            return;
        }

        if (!this.state.email.includes('@gmail.com') &&
            !this.state.email.includes('@outlook.com') && !this.state.email.includes('@mail.com') &&
            !this.state.email.includes('@admin.com')){
            this.setState({ error: "el campo email debe contener un email valido"});
            return;
        }
        this.props.login(this.state)
    }

    render(){//width='device-width,height=device-height initial-scale=1'
        return(
            <React.Fragment>
            <div align="center" style={{backgroundColor:'#004000'}}>
                <div  className="card" style={{margin: "10%", backgroundColor: "rgba(43, 143, 50, 0.9)", zIndex:0}} >
                    <ErrorMessage error={this.state.error}/>
                    <div>
                        <form style={{margin: "5%"}}>  
                        <div align="left" className="form-group" style={{opacity: "", marginBottom: "10px"}}>
                            <input
                                className="form-control"
                                type="email"
                                id="email"
                                placeholder="E-mail"
                                value={this.state.email}
                                onChange={event => this.handleChange(event.target.value, 'email')}
                            />
                        </div>

                        <div align="left" className="form-group" style={{opacity: "", marginBottom: "10px"}}>
                            <input
                                className="form-control"
                                type="password"
                                id="password"
                                placeholder="Contraseña"
                                value={this.state.password}
                                onChange={event => this.handleChange(event.target.value, 'password')}
                            />
                        
                        </div>  
                        
                        <div>
                            <button 
                                className="btn btn-primary"
                                type="button" 
                                id="LogIn" 
                                onClick={() => {this.logIn()}}>
                                    <b>LogIn</b>
                            </button>
                        </div>
                    </form>
                    </div>
                
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default withRouter(LogInForm);