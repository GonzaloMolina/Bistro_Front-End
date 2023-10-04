import React from "react";
import { withRouter } from "react-router";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

class AcompStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cantidad: 0,
      selected: {},
      ls: [],
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.setState((state) => ({ 
      selected: this.props.plate(),
      ls: []
    }));
  }

  componentDidUpdate(){
    console.log(this.state);
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

  renderBebidas() {
    return (
      <div className="cantidad">
        <h1>{this.state.selected.nombre}</h1>
        <br />
        <h4>seleccione una cantidad</h4>
        <div className="" style={{ flexDirection: "column" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.update(this.state.cantidad + 1)}
          >
            <AiOutlinePlus />
          </button>
          <h2>{this.state.cantidad}</h2>
          <button
            type="button"
            className="btn btn-danger"
            disabled={this.state.cantidad === 0}
            onClick={() => this.update(this.state.cantidad - 1)}
          >
            <AiOutlineMinus />
          </button>
        </div>
      </div>
    );
  }

  acompField(elem, key) {
    return (
      <div key={key}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            this.addelem(this.state.ls.concat([elem]));
          }}
        >
          {elem.nombre}
        </button>
      </div>
    );
  }

  renderPlato() {
    if (this.state.selected.tipo === "PASTA") {
      return (
        <div className="cantidad">
          <h3>{this.state.selected.nombre}</h3>
          <br />
          <h4>seleccione una salsa</h4>
          <div className="" style={{ flexDirection: "column" }}>
            {this.state.selected.salsa.map((elem, key) =>
              this.acompField(elem, key)
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="cantidad">
          <h3>{this.state.selected.nombre}</h3>
          <br />
          <h4>seleccione un acompañamiento</h4>
          <div className="" style={{ flexDirection: "column" }}>
            {this.state.selected.acompanamiento.map((elem, key) =>
              this.acompField(elem, key)
            )}
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
