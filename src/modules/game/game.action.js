export const GAME_ACTION_TYPES = {
  SET_TYPE: "SET_TYPE",
  CHANGE_TURN: "CHANGE_TURN",
  CHANGE_PLAYER_SCORE: "CHANGE_PLAYER_SCORE",
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
