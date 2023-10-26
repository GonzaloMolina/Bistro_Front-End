import React from 'react';
import { withRouter } from 'react-router';

class SelectStep extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          selected: undefined,
          bebidasR: [],
          platosR: []
        }
    }

    componentDidMount(){
      this.props.menu()
        .then(res => 
          {
            //console.log(res.data);
            this.setState(state => ({bebidasR: res.data.bebidasR}));
            this.setState(state => ({platosR: res.data.platosR}));
          }
        )
        .catch(err => console.log(err));
    }

    esBebida(){return this.state.selected === 'GRANDE' || this.state.selected === 'CHICO' || this.state.selected === 'MEDIANO'}

    getContent(){
        if(this.esBebida()){
            return this.state.bebidasR
            .filter(elem => elem.type === this.state.selected)[0].content;
        }
        else{
            return this.state.platosR
            .filter(elem => elem.type === this.state.selected)[0].content;
        }
    }

    renderSelectedContent(){
      if(this.state.selected === undefined){
          return (<div className='emptySelected'></div>);
      }
      else{
          return (
          <div
              style={{marginTop:'1%', zIndex: '0',minWidth:'90%'}}
          >
              {this.getContent().map((elem, key) => 
                  (
                  <div
                      key={key}
                      style={{
                        alignContent: 'center',
                        marginBottom: '1%'
                      }}>
                      <button className='btn btn-success' 
                      onClick={() => this.props.select(elem)}
                      style={{
                        alignContent: 'center',
                        width: '80%'
                      }}>
                          {elem.nombre}
                      </button>
                  </div>
                  )
              )}
          </div>);
      }
  }


  renderMenu() {
    return <div className='card' style={{backgroundColor:'rgba(179, 241, 178, 0.5)', margin: '10px', marginTop:'1px'}}>
              <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" 
                style={{flexDirection: 'column', marginTop: '2%'}}>
                    <div className="btn-group mr-2 flex-wrap" role="group" aria-label="First group"
                    style={{margin: '30px',marginBottom:'0px',marginTop:'2px'}}>
                      {this.state.bebidasR.map((bebida, key) => 
                        <button 
                          key={key}
                          type="button" 
                          className="btn btn-secondary"
                          onClick={() => this.setState(state => ({selected: bebida.type}))}
                          style={{borderRadius: '20px', margin: '2px', marginBottom:'0px', marginTop:'1px'}}
                        >
                          {bebida.type}
                        </button>
                      )}
                    </div>
                    <div className="btn-group mr-2 flex-wrap" role="group" aria-label="First group"
                         style={{margin: '30px',marginTop:'0px',marginBottom:'5px'}}>
                        {this.state.platosR.map((plato, key) => 
                          <button 
                            key={key}
                            type="button" 
                            className="btn btn-secondary"
                            onClick={() => {this.setState(state => ({selected: plato.type}))}}
                            style={{borderRadius: '20px', margin: '2px', marginBottom:'0px', marginTop:'1px'}}
                          >
                            {plato.type}
                          </button>
                        )}
                    </div>
                </div>
              <div className='selected-list' style={{marginBottom: '10px',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  {this.renderSelectedContent()}
              </div>
          </div>
  }
    render(){
        return(
        <React.Fragment>
          {this.renderMenu()}
        </React.Fragment>
        );
    }
}

export default withRouter(SelectStep)