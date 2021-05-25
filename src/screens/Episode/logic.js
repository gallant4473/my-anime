import { apiCall } from '../../utils';

const EPISODE = 'EPISODE'
const EPISODE_SUCCESS = 'EPISODE_SUCCESS'
const EPISODE_FAILURE = 'EPISODE_FAILURE'
const EPISODE_RESET = 'EPISODE_RESET'

const episodeAction = dispatch => async (data) => {
  try {
    dispatch({ type: EPISODE })
    const response = await apiCall({
      method: 'GET',
      url: `/watching/${data}`,
    })
    dispatch({ type: EPISODE_SUCCESS, payload: response || {} })
  } catch (error) {
    console.log(error)
    if (error.response) {
      console.log(error.response)
    }
    dispatch({ type: EPISODE_FAILURE })
  }
}

const episodeResetAction = dispatch => () => {
  dispatch({ type: EPISODE_RESET })
}

const episodeReducer = (state, action) => {
  switch (action.type) {
    case EPISODE: {
      return {
        ...state,
        loading: true,
        error: false,
        data: {},
        flag: false,
        errorMessage: ''
      }
    }
    case EPISODE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
        flag: true,
        errorMessage: ''
      }
    }
    case EPISODE_RESET: {
      return {
        ...state,
        data: {},
        loading: true,
        error: false,
        flag: false,
        errorMessage: ''
      }
    }
    case EPISODE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
        data: {},
        flag: false,
        errorMessage: action.payload
      }
    }
    default:
      return state;
  }
};

export const EPISODE_LOGIC = {
  reducer: episodeReducer,
  actions: { episodeAction, episodeResetAction },
  initialState: { data: {}, loading: true, error: false, flag: false, errorMessage: '' }
}