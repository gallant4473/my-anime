import { apiCall } from '../../utils';

const SEARCH = 'SEARCH'
const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
const SEARCH_MORE = 'SEARCH_MORE'
const SEARCH_MORE_SUCCESS = 'SEARCH_MORE_SUCCESS'
const SEARCH_FAILURE = 'SEARCH_FAILURE'
const SEARCH_RESET = 'SEARCH_RESET'

const searchAction = dispatch => async (data = 1) => {
  try {
    dispatch({ type: SEARCH })
    const response = await apiCall({
      method: 'GET',
      url: data,
    })
    dispatch({ type: SEARCH_SUCCESS, payload: response.results || [] })
  } catch (error) {
    console.log(error)
    if (error.response) {
      console.log(error.response)
    }
    dispatch({ type: SEARCH_FAILURE })
  }
}

const searchMoreAction = dispatch => async (data = 1) => {
  try {
    dispatch({ type: SEARCH_MORE })
    const response = await apiCall({
      method: 'GET',
      url: data,
    })
    dispatch({ type: SEARCH_MORE_SUCCESS, payload: response.results || [] })
  } catch (error) {
    console.log(error)
    if (error.response) {
      console.log(error.response)
    }
    dispatch({ type: SEARCH_FAILURE })
  }
}

const searchResetAction = dispatch => () => {
  dispatch({ type: SEARCH_RESET })
}

const searchReducer = (state, action) => {
  switch (action.type) {
    case SEARCH: {
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
    case SEARCH_SUCCESS: {
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
    case SEARCH_MORE: {
      return {
        ...state,
        flag: false
      }
    }
    case SEARCH_MORE_SUCCESS: {
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
    case SEARCH_RESET: {
      return {
        ...state,
        flag: false,
        errorMessage: ''
      }
    }
    case SEARCH_FAILURE: {
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

export const SEARCH_LOGIC = {
  reducer: searchReducer,
  actions: { searchAction, searchMoreAction, searchResetAction },
  initialState: { data: [], loading: true, error: false, flag: false, errorMessage: '', next: true }
}