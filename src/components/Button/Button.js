import React, { Component } from "react";
import "./button.css";

class Button extends Component {
  render() {
    return (
      <button
        className={`button ${this.props.disabled ? "disabled" : null} ${
          this.props.text === "Reset score" ? "reset" : null
        }`}
        disabled={this.props.disabled ? true : false}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}
export default Button;
