import React, { Component } from "react";
import "./game.css";
import { connect } from "react-redux";
import {
  selectSquares,
  selectTurn,
  selectScoreX,
  selectScoreO,
} from "../../modules/game/game.selector";
import {
  ACTION_SET_TYPE,
  ACTION_CHANGE_TURN,
  ACTION_CHANGE_PLAYER_SCORE,
} from "../../modules/game/game.action";

class Game extends Component {
  changeTurn(currentTurn) {
    this.props.actionChangeTurn(currentTurn);
  }

  checkSquares(index1, index2, index3) {
    const squares = this.props.squares;
    if (
      squares[index1].player === squares[index2].player &&
      squares[index1].player === squares[index3].player &&
      squares[index1].player !== null &&
      squares[index2].player !== null &&
      squares[index3].player !== null
    ) {
      let winner = squares[index2].player;
      if (winner == "x") {
        console.log("won x");
        this.props.changePlayerScore("x");
        this.scoreX++;
      } else {
        console.log("won o");
        this.props.changePlayerScore("o");
        this.scoreO++;
      }
      return true;
    } else {
      return false;
    }
  }

  checkWinner() {
    return this.checkSquares(0, 1, 2) ||
      this.checkSquares(3, 4, 5) ||
      this.checkSquares(6, 7, 8) ||
      this.checkSquares(0, 4, 8) ||
      this.checkSquares(8, 5, 2) ||
      this.checkSquares(2, 5, 8) ||
      this.checkSquares(1, 4, 7) ||
      this.checkSquares(0, 3, 6) ||
      this.checkSquares(2, 4, 6)
      ? "win"
      : null;
  }

  handlePlayerClick(player, squareId, disabled) {
    if (disabled) {
      return;
    }
    if (this.checkWinner() === "win") {
      return;
    }

    this.props.actionSetType(player, squareId);
    this.props.changeTurn(player);
  }

  render() {
    return (
      <div>
        <h3>Tic tac toe</h3>
        <h4>Statistics:</h4>
        <p>{`X: ${this.props.scoreX || 0}`}</p>
        <p>{`O: ${this.props.scoreO || 0}`}</p>
        <div className="game">
          {this.props.squares.map(({ id, player, disabled }) => (
            <div
              key={id}
              data-number={id}
              className="game__square"
              onClick={() =>
                this.handlePlayerClick(this.props.turn, id, disabled)
              }
            >
              <p>{player}</p>
            </div>
          ))}
          {this.checkWinner()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  squares: selectSquares(state),
  turn: selectTurn(state),
  //scoreX: selectScoreX(state),scoreO: selectScoreO(state),
});

const mapDispatchToProps = (dispatch) => ({
  actionSetType: (player, squareId) => {
    dispatch(ACTION_SET_TYPE(player, squareId));
  },
  changeTurn: (currentTurn) => {
    dispatch(ACTION_CHANGE_TURN(currentTurn));
  },
  changePlayerScore: (player) => {
    dispatch(ACTION_CHANGE_PLAYER_SCORE(player));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
