import { apiCall } from '../../utils';

const POPULAR = 'POPULAR'
const POPULAR_SUCCESS = 'POPULAR_SUCCESS'
const POPULAR_MORE = 'POPULAR_MORE'
const POPULAR_MORE_SUCCESS = 'POPULAR_MORE_SUCCESS'
const POPULAR_FAILURE = 'POPULAR_FAILURE'
const POPULAR_RESET = 'POPULAR_RESET'

const popularAction = dispatch => async (data = 1) => {
  try {
    dispatch({ type: POPULAR })
    const response = await apiCall({
      method: 'GET',
      url: `/popular/${data}`,
    })
    dispatch({ type: POPULAR_SUCCESS, payload: response.results || [] })
  } catch (error) {
    console.log(error)
    if (error.response) {
      console.log(error.response)
    }
    dispatch({ type: POPULAR_FAILURE })
  }
}

const popularMoreAction = dispatch => async (data = 1) => {
  try {
    dispatch({ type: POPULAR_MORE })
    const response = await apiCall({
      method: 'GET',
      url: `/popular/${data}`,
    })
    dispatch({ type: POPULAR_MORE_SUCCESS, payload: response.results || [] })
  } catch (error) {
    console.log(error)
    if (error.response) {
      console.log(error.response)
    }
    dispatch({ type: POPULAR_FAILURE })
  }
}

const popularResetAction = dispatch => () => {
  dispatch({ type: POPULAR_RESET })
}

const popularReducer = (state, action) => {
  switch (action.type) {
    case POPULAR: {
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
    case POPULAR_SUCCESS: {
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
    case POPULAR_MORE: {
      return {
        ...state,
        flag: false
      }
    }
    case POPULAR_MORE_SUCCESS: {
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
    case POPULAR_RESET: {
      return {
        ...state,
        flag: false,
        errorMessage: ''
      }
    }
    case POPULAR_FAILURE: {
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

export const POPULAR_LOGIC = {
  reducer: popularReducer,
  actions: { popularAction, popularMoreAction, popularResetAction },
  initialState: { data: [], loading: false, error: false, flag: false, errorMessage: '', next: true }
}