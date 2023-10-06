import React from 'react';
import { withRouter } from 'react-router';
import SelectStep from './SelectStep';
import AcomStep from './AcomStep';
import CheckStep from './CheckStep';
import '../../styles/table.css';

class StepForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            page: 0,
            titles: ["Seleccion", "Acompañamiento", "Check"],
            components: [],
            selectedPlate: {},
            values: [],
            amount: 0,
            platos:[],
            bebidas: []
        }
    }

    componentDidMount(){
        this.setState(state => ({components: [
            <SelectStep menu={this.props.menu} select={this.selectPlate}/>, 
            <AcomStep plate={this.getSelected} setOther={[this.setCant, this.setValues]}/>, 
            <CheckStep elem={this.ordenValues} getLs={[this.getP, this.getB]} setLs={[this.setP, this.setB]}/>
        ]}))
    }

    setComp = () => {
        this.setState(state => ({values: []}))
    }

    componentDidUpdate(){}

    ordenValues = () => {
        return {
            elem: this.state.selectedPlate,
            values: this.state.values,
            amount: this.state.amount
        }
    }

    getSelected = () => this.state.selectedPlate
    
    selectPlate = (elem) => {
        this.setState(state => ({selectedPlate: !elem}));
        this.setState(state => ({selectedPlate: elem}));
    }

    esBebida = (s) => s === 'CHICO' || s === 'MEDIANO'|| s === 'GRANDE'

    setCant = (newElem) => this.setState(state => ({amount: newElem}));
    setValues = (newElem) => this.setState(state => ({values: newElem}));

    getP = () => this.state.platos
    getB = () => this.state.bebidas

    setP = (newElem) => this.setState(state => ({platos: newElem}));
    setB = (newElem) => this.setState(state => ({bebidas: newElem}));

    setPage = (value) => {this.setState(state => ({page: !value}));this.setState(state => ({page: value}));}

    prevPage = () => {
        if(this.state.page === (this.state.titles.length-1)){this.setPage(0);this.setComp()}
        else{
            if(this.state.page === 0){console.log('volver a la mesa')}
            else{this.setPage(this.state.page -1)}
        }
    }

    nextPage = () => this.state.page === (this.state.titles.length-1)? 
        this.props.create(this.state.platos, this.state.bebidas): this.setPage(this.state.page +1)

    butomNextText = () => this.state.page === (this.state.titles.length-1) ? 'Crear Orden': 'Siguiente'
    butomPrevText = () => 
        this.state.page === (this.state.titles.length-1) ? 'Agregar otro': 
        this.state.page === 0 ? 'volver a la mesa' : 'prev'
        

    render(){
        return(
            <React.Fragment>
                <div className='base'>
                    <div className='navbar' style={{
                        backgroundColor: 'green',
                        height: '80px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        zIndex: 10,
                        marginBottom:'3%'
                    }}>
                    </div>
                    <div className='form'>
                        <div className='progressbar'>
                        </div>
                        <div className='form-container'>
                            <div className='card' style={{zIndex: '0', marginBottom: '0',backdropFilter: 'blur(10px)', backgroundColor: 'rgba(179, 241, 178, 0.5)'}}> 
                                <h1>{this.state.titles[this.state.page]}</h1>
                            </div>
                            <div className='body'>
                                {this.state.components[this.state.page]}
                            </div>
                            <div className='footer'>
                                <button 
                                    type='button'
                                    className='btn btn-primary'
                                    onClick={() => {
                                        this.prevPage()
                                    }}
                                >   
                                    {this.butomPrevText()}
                                </button>

                                <button 
                                    type='button'
                                    className='btn btn-primary'
                                    disabled={this.state.selectedPlate.id === undefined}
                                    onClick={() => {
                                        this.nextPage()
                                    }}
                                >
                                    {this.butomNextText()}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(StepForm)