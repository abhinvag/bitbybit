// export const loginUser = () => {
//     return{
//         type: 'LOGIN',
//     }
// }

// export const logoutUser = () => {
//     return{
//         type: 'LOGOUT',
//     }
// }

export const setQuestion = (question) => {
  return {
    type: "SETQUESTION",
    payload: question,
  };
};

export const setAnswer = (answer) => {
  return {
    type: "SETANSWER",
    payload: answer,
  };
};

export const setUser = (user) => {
  return {
    type: "SETUSER",
    payload: user,
  };
};

export const removeUser = () => {
  return {
    type: "SETUSER",
    payload: {},
  };
};
