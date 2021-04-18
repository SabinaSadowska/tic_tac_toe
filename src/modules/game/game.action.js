export const GAME_ACTION_TYPES = {
  SET_TYPE: "SET_TYPE",
  CHANGE_TURN: "CHANGE_TURN",
  CHANGE_PLAYER_SCORE: "CHANGE_PLAYER_SCORE",
  SET_GAME_STATUS: "SET_GAME_STATUS",
  PLAY_AGAIN: "PLAY_AGAIN",
  RESET_STATISTICS: "RESET_STATISTICS",
};

export const ACTION_SET_TYPE = (player, id) => {
  return { type: GAME_ACTION_TYPES.SET_TYPE, player: player, id: id };
};

export const ACTION_CHANGE_TURN = (currentTurn) => {
  return { type: GAME_ACTION_TYPES.CHANGE_TURN, currentTurn: currentTurn };
};

export const ACTION_CHANGE_PLAYER_SCORE = (player) => {
  return {
    type: GAME_ACTION_TYPES.CHANGE_PLAYER_SCORE,
    player: player,
  };
};

export const ACTION_SET_GAME_STATUS = (status) => {
  return {
    type: GAME_ACTION_TYPES.SET_GAME_STATUS,
    status: status,
  };
};

export const ACTION_PLAY_AGAIN = () => {
  return {
    type: GAME_ACTION_TYPES.PLAY_AGAIN,
  };
};

export const ACTION_RESET_STATISTICS = () => {
  return {
    type: GAME_ACTION_TYPES.RESET_STATISTICS,
  };
};
