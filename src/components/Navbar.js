import React, { Component } from 'react';
class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand">BIBLIOTECA</div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto"></ul>
          <span className="navbar-text">
          {this.props.account}
          </span>
        </div>
      </nav>
    );
  }
}
export default Navbar;

