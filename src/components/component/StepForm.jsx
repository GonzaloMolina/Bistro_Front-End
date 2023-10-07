import React, { Component } from 'react';
import SelectStep from './SelectStep';
import AcomStep from './AcomStep';
import CheckStep from './CheckStep';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import '../../styles/table.css';
import '../../styles/stepform.css'; // Importa tu archivo de estilos CSS

class StepForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      titles: ["Selección", "Acompañamiento", "Check"],
      components: [],
      selectedPlate: {},
      values: [],
      amount: 0,
      platos: [],
      bebidas: [],
      platosView: [],
      bebidasView: [],
    };
  }

  componentDidMount() {
    this.setState((state) => ({
      components: [
        <SelectStep menu={this.props.menu} select={this.selectPlate} />,
        <AcomStep plate={this.getSelected} setOther={[this.setCant, this.setValues]} />,
        <CheckStep elem={this.ordenValues} getLs={[this.getP, this.getB, this.getPV, this.getBV]} setLs={[this.setP, this.setB, this.setPV, this.setBV]} />
      ]
    }));
  }

  setComp = () => {
    this.setState((state) => ({ values: [] }));
  }

  componentDidUpdate() { }

  ordenValues = () => {
    return {
      elem: this.state.selectedPlate,
      values: this.state.values,
      amount: this.state.amount
    };
  }

  getSelected = () => this.state.selectedPlate;

  selectPlate = (elem) => {
    this.setState((state) => ({ selectedPlate: !elem }));
    this.setState((state) => ({ selectedPlate: elem }));
  }

  esBebida = (s) => s === 'CHICO' || s === 'MEDIANO' || s === 'GRANDE';

  setCant = (newElem) => this.setState((state) => ({ amount: newElem }));
  setValues = (newElem) => this.setState((state) => ({ values: newElem }));

  getP = () => this.state.platos;
  getB = () => this.state.bebidas;
  getPV = () => this.state.platosView;
  getBV = () => this.state.bebidasView;

  setP = (newElem) => this.setState((state) => ({ platos: newElem }));
  setB = (newElem) => this.setState((state) => ({ bebidas: newElem }));
  setPV = (newElem) => this.setState((state) => ({ platosView: newElem }));
  setBV = (newElem) => this.setState((state) => ({ bebidasView: newElem }));

  setPage = (value) => {
    this.setState((state) => ({ page: !value }));
    this.setState((state) => ({ page: value }));
  }

  prevPage = () => {
    if (this.state.page === (this.state.titles.length - 1)) {
      this.setPage(0);
      this.setComp();
    } else {
      if (this.state.page === 0) {
        console.log('Volver a la mesa');
      } else {
        this.setPage(this.state.page - 1);
      }
    }
  }

  nextPage = () => this.state.page === (this.state.titles.length - 1) ?
  this.props.create(this.state.platos, this.state.bebidas) : this.setPage(this.state.page + 1)

  butomNextText = () => this.state.page === (this.state.titles.length - 1) ? 'Crear Orden' : 'Siguiente';
  butomPrevText = () => this.state.page === (this.state.titles.length - 1) ? 'Agregar otro' : 'Anterior';

  render() {
    return (
      <React.Fragment>
        <div className='base'>
          <div className='navbar' style={{
            backgroundColor: 'green',
            height: '80px',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            zIndex: 10,
            marginBottom: '3%'
          }}>
            <div className='btn-holder'>
              <div className="">
                <AiOutlineArrowLeft
                  className="btnc"
                  onClick={() => this.props.history.push('/table', this.props.content)}
                  style={{ backgroundColor: '#faf60e', marginLeft: '20%' }}
                />
              </div>
            </div>
          </div>
          <div className='form'>
            <div className='progressbar'>
              {/* Pasos numéricos */}
              <div className="step-numbers">
                {this.state.titles.map((title, index) => (
                    <span
                        key={index}
                        className={`step-number ${index === this.state.page ? 'active-step' : ''} ${index === this.state.titles.length - 1 ? 'no-line' : ''}`}
                        >
                        {index + 1}
                    </span>
                ))}
              </div>
            </div>
            <div className='form'>
            <div className='progress' style={{ width: `${(this.state.page + 1) * 26}%` }}></div>
            <div className='form-container'>
              <div className='card' style={{ zIndex: '0', backdropFilter: 'blur(10px)', backgroundColor: 'white',margin: '20px',marginBottom:'0px' }}>
                <h1>{this.state.titles[this.state.page]}</h1>
              </div>
              <div className='body'>
                {this.state.components[this.state.page]}
              </div>
                <button
                  type='button'
                  className='btn btn-primary'
                  disabled={this.state.page === 0}
                  onClick={() => {
                    this.prevPage()
                  }}
                  style={{ marginLeft: '2%' }}
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
                    style={{ float: 'right', marginRight: '2%' }}
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

export default StepForm;
