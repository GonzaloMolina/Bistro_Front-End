import React from 'react';
import { withRouter } from 'react-router';
import SelectStep from './SelectStep';
import AcomStep from './AcomStep';
import CheckStep from './CheckStep';

class StepForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            page: 0,
            titles: ["Seleccion", "Acompañamiento", "Check"],
            components: []
        }
    }

    componentDidMount(){
        this.setState(state => ({components: [
            <SelectStep {...this.props}/>, 
            <AcomStep {...this.props}/>, 
            <CheckStep {...this.props}/>
        ]}))
    }

    setPage = (value) => {this.setState(state => ({page: !value}));this.setState(state => ({page: value}));}

    prevPage = () => this.setPage(this.state.page -1)

    nextPage = () => this.state.page === (this.state.titles.length-1)?console.log('doCreate'): this.setPage(this.state.page +1)

    butomNextText = () => this.state.page === (this.state.titles.length-1) ? 'Crear Orden': 'Siguiente'
        

    render(){
        return(
            <React.Fragment>
                <div className='form'>
                    <div className='progressbar'>
                    </div>
                    <div className='form-container'>
                        <div className='header'>
                            <h1>{this.state.titles[this.state.page]}</h1>
                        </div>
                        <div className='body'>
                            {this.state.components[this.state.page]}
                        </div>
                        <div className='footer'>
                            <button 
                                type='button'
                                className='btn btn-primary'
                                disabled={this.state.page === 0}
                                onClick={() => {
                                    this.prevPage()
                                }}
                            >   
                                anterior
                            </button>

                            <button 
                                type='button'
                                className='btn btn-primary'
                                onClick={() => {
                                    this.nextPage()
                                }}
                            >
                                {this.butomNextText()}
                            </button>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(StepForm)