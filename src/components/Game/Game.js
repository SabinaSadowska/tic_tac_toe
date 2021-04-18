import React, { Component } from "react";
import "./game.css";
import { connect } from "react-redux";
import Button from "../../components/Button/Button";
import {
  selectSquares,
  selectTurn,
  selectScoreX,
  selectScoreO,
  selectGameStatus,
} from "../../modules/game/game.selector";
import {
  ACTION_SET_TYPE,
  ACTION_CHANGE_TURN,
  ACTION_CHANGE_PLAYER_SCORE,
  ACTION_SET_GAME_STATUS,
  ACTION_PLAY_AGAIN,
  ACTION_RESET_STATISTICS,
} from "../../modules/game/game.action";

class Game extends Component {
  changeTurn(currentTurn) {
    this.props.actionChangeTurn(currentTurn);
  }

  winCoordinates = null;

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
      this.winCoordinates = [index1, index2, index3];
      if (winner === "x") {
        console.log("won x");
        this.props.changePlayerScore("x");
        this.props.actionSetGameStatus("win");
      } else {
        console.log("won o");
        this.props.changePlayerScore("o");
        this.props.actionSetGameStatus("win");
      }

      return true;
    } else {
      return false;
    }
  }

  winner = false;

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
      ? (this.winner = true)
      : null;
  }

  checkStatus() {
    return this.props.actionSetGameStatus(this.winner);
  }

  handlePlayerClick(player, squareId, disabled) {
    if (disabled) {
      return;
    }

    if (this.props.gameStatus) {
      return;
    }

    this.props.actionSetType(player, squareId);
    this.props.changeTurn(player);
    setTimeout(() => this.checkWinner(), 200);
  }

  handlePlayAgain(winner) {
    winner = false;
    this.winCoordinates = false;
    return this.props.actionPlayAgain();
  }

  render() {
    return (
      <div>
        <h3>Tic tac toe</h3>
        <h4>Statistics:</h4>
        <p>{`X: ${this.props.scoreX}`}</p>
        <p>{`O: ${this.props.scoreO}`}</p>
        <Button
          disabled={
            this.props.gameStatus ||
            this.props.squares
              .map((square) => (square.player ? true : false))
              .reduce((previousValue, currentValue) =>
                previousValue && currentValue ? true : false
              )
              ? false
              : true
          }
          text="Play again"
          onClick={() => this.handlePlayAgain(this.winner)}
        />
        <Button
          text="Reset statistics"
          onClick={this.props.actionResetStatistics}
        />

        <div className="game">
          {this.props.squares.map(({ id, player, disabled }, index) => (
            <div
              key={id}
              data-number={id}
              className="game__square"
              onClick={() =>
                this.handlePlayerClick(this.props.turn, id, disabled)
              }
            >
              <p
                className={
                  this.winCoordinates && this.winCoordinates.includes(index)
                    ? "color"
                    : "not"
                }
              >
                {player}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  squares: selectSquares(state),
  turn: selectTurn(state),
  scoreX: selectScoreX(state),
  scoreO: selectScoreO(state),
  gameStatus: selectGameStatus(state),
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
  actionSetGameStatus: (status) => {
    dispatch(ACTION_SET_GAME_STATUS(status));
  },
  actionPlayAgain: () => {
    dispatch(ACTION_PLAY_AGAIN());
  },
  actionResetStatistics: () => {
    dispatch(ACTION_RESET_STATISTICS());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
