const answerReducer = (state = {}, action) => {
  switch (action.type) {
    case "SETANSWER":
      return action.payload;
    default:
      return state;
  }
};

export default answerReducer;
