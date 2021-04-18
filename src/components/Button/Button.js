import React, { Component } from "react";

class Button extends Component {
  render() {
    return (
      <button
        disabled={this.props.disabled ? true : false}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}
export default Button;
