import React from "react";
import { withRouter } from "react-router";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

class AcompStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cantidad: 0,
      selected: {},
      ls: []
    };
  }

  componentDidMount() {
    console.log(this.props.plate());
    this.setState((state) => ({ 
      selected: this.props.plate(),
      ls: []
    }));
  }

  getls = () => this.state.ls;

  update = (cant) => {
    this.setState((state) => ({ cantidad: cant }));
    this.props.setOther[0](cant);
  };

  addelem(zs) {
    console.log("zs_", zs);
    this.setState((state) => ({ ls: zs }));
    this.props.setOther[1](zs);
  }

  removeElem(zs, elem){
    let flag = true;
    let res = [];
    zs.forEach(e => {
      if(flag && e === elem){flag = !flag;}
      else{res.push(e);}
    })
    this.setState((state) => ({ ls: res }));
    this.props.setOther[1](res);
  }

  renderBebidas() {
    return (
      <div className="cantidad">
        <div className="card"
          style={{
            margin: '10px',
            marginBottom:'0px',
            zIndex: '0', 
            backdropFilter: 'blur(10px)',
            backgroundColor:'rgba(179, 241, 178, 0.5)'
          }}
        >
          <h1>{this.state.selected.nombre}</h1>
        </div>
        <div
          className="card"
          style={{
            margin: '10px',
            marginBottom: '1%',
            martinTop:'0px',
            zIndex: '0', 
            backdropFilter: 'blur(10px)',
            backgroundColor:'rgba(179, 241, 178, 0.5)'
          }}
        >
          <h4>Seleccione una cantidad</h4>
        </div>
        <div className="card"
          style={{
            marginBottom: '5%',
            marginRight: '15%',
            marginLeft: '15%',
            zIndex: '0', 
            backdropFilter: 'blur(10px)',
            backgroundColor:'rgba(179, 241, 178, 0.5)'
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', margin:'5%'}}>
            <button
              type="button"
              className="btn btn-danger"
              disabled={this.state.cantidad === 0}
              onClick={() => this.update(this.state.cantidad - 1)}
            >
              <AiOutlineMinus />
            </button>
            <h2 style={{marginRight: '10%', marginLeft: '10%'}}>{this.state.cantidad}</h2>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.update(this.state.cantidad + 1)}
          
            >
              <AiOutlinePlus />
            </button>

          </div>
        </div>
      </div>
    );
  }

  cantRender(elem){
    if (this.state.ls.filter(e => e === elem).length === 0){
      return (
        <button
              type="button"
              className="btn btn-secondary "
              onClick={() => {
              }}
            >
              {''}
            </button>
      )
    }else{
      return (
        <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                this.removeElem(this.state.ls, elem)
                console.log(this.state.ls);
              }} style={{}}
            >
              {this.state.ls.filter(e => e === elem).length}
            </button>
      )
    }
  }

  acompField(elem, key) {
    return (
      <div key={key} style={{marginLeft: '4%', marginBottom:'2%'}}>
        <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" 
            style={{marginTop: '2%', marginRight:'3px'}}>
          <div className="btn-group mr-2" role="group" aria-label="First group"
              style={{marginBottom:'0px',marginTop:'2px'}}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                this.addelem(this.state.ls.concat([elem]));
              }}
            >
              {elem.nombre}
            </button>
            {this.cantRender(elem)}
          </div>
        </div>
      </div>
    );
  }

  renderPlato() {
    if (this.state.selected.tipo === "PASTA") {
      return (
        <div className="cantidad">
          <div className="card"
          style={{
            margin: '2%',
            zIndex: '0', 
            backdropFilter: 'blur(10px)',
            backgroundColor:'rgba(179, 241, 178, 0.5)'
          }}
          >
            <h1>{this.state.selected.nombre}</h1>
          </div>

          <div className="card"
            style={{
              margin: '2%',
              zIndex: '0', 
              backdropFilter: 'blur(10px)',
              backgroundColor:'rgba(179, 241, 178, 0.5)'
            }}
          >
            <h4>seleccione una salsa</h4>
          </div>
          <div className="card" 
            style={{
              zIndex: '0', 
              backdropFilter: 'blur(10px)', 
              backgroundColor:'rgba(179, 241, 178, 0.5)',
              margin:'5%'
            }}
          >
            <div
              style={{
                flexDirection: 'column'
              }}>
                {this.state.selected.salsa.map((elem, key) =>
                  this.acompField(elem, key)
                )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="cantidad">
          <div className="card"
          style={{
            margin: '2%',
            zIndex: '0', 
            backdropFilter: 'blur(10px)',
            backgroundColor:'rgba(179, 241, 178, 0.5)'
          }}
        >
          <h1>{this.state.selected.nombre}</h1>
        </div>

        <div className="card"
          style={{
            margin: '2%',
            zIndex: '0', 
            backdropFilter: 'blur(10px)',
            backgroundColor:'rgba(179, 241, 178, 0.5)'
          }}
        >
          <h4>seleccione un acompañamiento</h4>
        </div>

        <div className="card" 
            style={{
              zIndex: '0', 
              backdropFilter: 'blur(10px)', 
              backgroundColor:'rgba(179, 241, 178, 0.5)',
              margin:'5%'
            }}
          >
            <div className="" style={{ flexDirection: "column" }}>
            {this.state.selected.acompanamiento.map((elem, key) =>
              this.acompField(elem, key)
            )}
          </div>
          </div>
        </div>
      );
    }
  }

  susyRender() {
    if (this.state.selected.tipo !== undefined) {
      return this.renderPlato();
    } else {
      return this.renderBebidas();
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="acomp-container">{this.susyRender()}</div>
      </React.Fragment>
    );
  }
}

export default withRouter(AcompStep);
