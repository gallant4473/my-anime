const THEME = 'THEME'

const themeAction = dispatch => async () => {
  dispatch({
    type: THEME
  })
}

const themeReducer = (state, action) => {
  switch (action.type) {
    case THEME: 
      return !state
    default:
      return state;
  }
};

export const THEME_LOGIC = {
  reducer: themeReducer,
  actions: { themeAction },
  initialState: true
}