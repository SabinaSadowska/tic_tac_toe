import { GAME_ACTION_TYPES } from "./game.action";

const INITIAL_STATE = {
  squares: [
    { id: 1, player: null, disabled: false },
    { id: 2, player: null, disabled: false },
    { id: 3, player: null, disabled: false },
    { id: 4, player: null, disabled: false },
    { id: 5, player: null, disabled: false },
    { id: 6, player: null, disabled: false },
    { id: 7, player: null, disabled: false },
    { id: 8, player: null, disabled: false },
    { id: 9, player: null, disabled: false },
  ],
  turn: "x",
  scoreX: 0,
  scoreO: 0,
  gameStatus: false,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GAME_ACTION_TYPES.SET_TYPE:
      return {
        ...state,
        squares: state.squares.map((square) => {
          if (square.id !== action.id) {
            return square;
          }
          return {
            ...square,
            player: action.player,
            disabled: true,
          };
        }),
      };
    case GAME_ACTION_TYPES.CHANGE_TURN:
      return {
        ...state,
        turn: action.currentTurn === "x" ? "o" : "x",
      };
    case GAME_ACTION_TYPES.CHANGE_PLAYER_SCORE:
      if (action.player === "x") {
        return { ...state, scoreX: state.scoreX + 1 };
      } else {
        return { ...state, scoreO: state.scoreO + 1 };
      }
    case GAME_ACTION_TYPES.SET_GAME_STATUS:
      if (action.status) {
        return {
          ...state,
          gameStatus: "win",
        };
      } else {
        return {
          ...state,
          gameStatus: "draw",
        };
      }
    case GAME_ACTION_TYPES.PLAY_AGAIN:
      return {
        ...state,
        squares: state.squares.map((square) => ({
          id: square.id,
          player: null,
          disabled: false,
        })),

        turn: "x",
        gameStatus: false,
      };

    case GAME_ACTION_TYPES.RESET_STATISTICS:
      return {
        ...state,
        scoreX: 0,
        scoreO: 0,
      };

    default:
      return state;
  }
};

export default game;
