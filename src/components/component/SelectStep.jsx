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
              className={this.state.selected}
          >
              {this.getContent().map((elem, key) => 
                  (
                  <div
                      key={key}
                  >
                      <button className='' 
                      onClick={() => this.props.select(elem)}
                      style={{padding: '0',whiteSpace: 'normal', border:'none'}}>
                          {elem.nombre}
                      </button>
                  </div>
                  )
              )}
          </div>);
      }
  }


  renderMenu() {
    return <div className='select-container'>
              <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" 
                style={{flexDirection: 'column'}}>
                    <div className="btn-group mr-2 flex-wrap" role="group" aria-label="First group"
                    style={{marginBottom: '5px'}}>
                      {this.state.bebidasR.map((bebida, key) => 
                        <button 
                          key={key}
                          type="button" 
                          className="btn btn-secondary"
                          onClick={() => this.setState(state => ({selected: bebida.type}))}
                        >
                          {bebida.type}
                        </button>
                      )}
                    </div>
                    <div className="btn-group mr-2 flex-wrap" role="group" aria-label="First group">
                        {this.state.platosR.map((plato, key) => 
                          <button 
                            key={key}
                            type="button" 
                            className="btn btn-secondary"
                            onClick={() => {this.setState(state => ({selected: plato.type}))}}
                          >
                            {plato.type}
                          </button>
                        )}
                    </div>
                </div>
              <div className='selected-list' style={{marginBottom: '10px'}}>
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