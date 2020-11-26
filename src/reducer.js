export const initialState = {
  currentUser: {}
}

const reducer = (state, action) => {
  console.log(state)
  console.log(action)
  switch (action.type) {
    case 'LOGIN':
      return { ...state, currentUser: { ...action.payload } }
    case 'LOGOUT':
      return { ...state, currentUser: {} }
  }
}

export default reducer;