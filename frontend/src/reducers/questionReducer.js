const questionReducer = (state = {}, action) => {
  switch (action.type) {
    case "SETQUESTION":
      return action.payload;
    default:
      return state;
  }
};

export default questionReducer;
