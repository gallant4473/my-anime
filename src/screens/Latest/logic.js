import { apiCall } from '../../utils';

const LATEST = 'LATEST'
const LATEST_SUCCESS = 'LATEST_SUCCESS'
const LATEST_MORE = 'LATEST_MORE'
const LATEST_MORE_SUCCESS = 'LATEST_MORE_SUCCESS'
const LATEST_FAILURE = 'LATEST_FAILURE'
const LATEST_RESET = 'LATEST_RESET'

const latestAction = dispatch => async (data = 1) => {
  try {
    dispatch({ type: LATEST })
    const response = await apiCall({
      method: 'GET',
      url: `/recentlyadded/${data}`,
    })
    dispatch({ type: LATEST_SUCCESS, payload: response.results || [] })
  } catch (error) {
    console.log(error)
    if (error.response) {
      console.log(error.response)
    }
    dispatch({ type: LATEST_FAILURE })
  }
}

const latestMoreAction = dispatch => async (data = 1) => {
  try {
    dispatch({ type: LATEST_MORE })
    const response = await apiCall({
      method: 'GET',
      url: `/recentlyadded/${data}`,
    })
    dispatch({ type: LATEST_MORE_SUCCESS, payload: response.results || [] })
  } catch (error) {
    console.log(error)
    if (error.response) {
      console.log(error.response)
    }
    dispatch({ type: LATEST_FAILURE })
  }
}

const latestResetAction = dispatch => () => {
  dispatch({ type: LATEST_RESET })
}

const latestReducer = (state, action) => {
  switch (action.type) {
    case LATEST: {
      return {
        ...state,
        loading: true,
        error: false,
        data: [],
        flag: false,
        errorMessage: '',
        next: true
      }
    }
    case LATEST_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
        flag: true,
        errorMessage: '',
        next: state.data.length !== action.payload.length
      }
    }
    case LATEST_MORE: {
      return {
        ...state,
        flag: false
      }
    }
    case LATEST_MORE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        data: [...state.data, ...action.payload],
        flag: true,
        errorMessage: '',
        next: state.data.length !== [...state.data, ...action.payload].length
      }
    }
    case LATEST_RESET: {
      return {
        ...state,
        flag: false,
        errorMessage: ''
      }
    }
    case LATEST_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
        data: [],
        flag: false,
        errorMessage: action.payload
      }
    }
    default:
      return state;
  }
};

export const LATEST_LOGIC = {
  reducer: latestReducer,
  actions: { latestAction, latestMoreAction, latestResetAction },
  initialState: { data: [], loading: true, error: false, flag: false, errorMessage: '', next: true }
}