const initialState = {
  isLogged:true
}

const account = (state = initialState, { type, payload}) => {
  switch(type) {
    case 'LOG_IN':
      return state
    case 'LOG_OUT':
      return initialState
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export default account