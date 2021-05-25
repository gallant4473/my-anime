import { apiCall } from '../../utils';

const GENRE = 'GENRE'
const GENRE_SUCCESS = 'GENRE_SUCCESS'
const GENRE_MORE = 'GENRE_MORE'
const GENRE_MORE_SUCCESS = 'GENRE_MORE_SUCCESS'
const GENRE_FAILURE = 'GENRE_FAILURE'
const GENRE_RESET = 'GENRE_RESET'

const genreAction = dispatch => async (data = 1) => {
  try {
    dispatch({ type: GENRE })
    const response = await apiCall({
      method: 'GET',
      url: data,
    })
    dispatch({ type: GENRE_SUCCESS, payload: response.results || [] })
  } catch (error) {
    console.log(error)
    if (error.response) {
      console.log(error.response)
    }
    dispatch({ type: GENRE_FAILURE })
  }
}

const genreMoreAction = dispatch => async (data = 1) => {
  try {
    dispatch({ type: GENRE_MORE })
    const response = await apiCall({
      method: 'GET',
      url: data,
    })
    dispatch({ type: GENRE_MORE_SUCCESS, payload: response.results || [] })
  } catch (error) {
    console.log(error)
    if (error.response) {
      console.log(error.response)
    }
    dispatch({ type: GENRE_FAILURE })
  }
}

const genreResetAction = dispatch => () => {
  dispatch({ type: GENRE_RESET })
}

const genreReducer = (state, action) => {
  switch (action.type) {
    case GENRE: {
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
    case GENRE_SUCCESS: {
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
    case GENRE_MORE: {
      return {
        ...state,
        flag: false
      }
    }
    case GENRE_MORE_SUCCESS: {
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
    case GENRE_RESET: {
      return {
        ...state,
        flag: false,
        errorMessage: ''
      }
    }
    case GENRE_FAILURE: {
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

export const GENRE_LOGIC = {
  reducer: genreReducer,
  actions: { genreAction, genreMoreAction, genreResetAction },
  initialState: { data: [], loading: false, error: false, flag: false, errorMessage: '', next: true }
}


const GENRE_TYPE = 'GENRE_TYPE'
const GENRE_TYPE_SUCCESS = 'GENRE_TYPE_SUCCESS'
const GENRE_TYPE_FAILURE = 'GENRE_TYPE_FAILURE'
const GENRE_TYPE_RESET = 'GENRE_TYPE_RESET'

const genreTypeAction = dispatch => async (data) => {
  try {
    dispatch({ type: GENRE_TYPE })
    const response = await apiCall({
      method: 'GET',
      url: '/genrelist',
    })
    dispatch({ type: GENRE_TYPE_SUCCESS, payload: response.results || [] })
  } catch (error) {
    console.log(error)
    if (error.response) {
      console.log(error.response)
    }
    dispatch({ type: GENRE_TYPE_FAILURE })
  }
}

const genreTypeResetAction = dispatch => () => {
  dispatch({ type: GENRE_TYPE_RESET })
}

const genreTypeReducer = (state, action) => {
  switch (action.type) {
    case GENRE_TYPE: {
      return {
        ...state,
        loading: true,
        error: false,
        data: [],
        flag: false,
        errorMessage: ''
      }
    }
    case GENRE_TYPE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        data: ['popular', ...action.payload],
        flag: true,
        errorMessage: ''
      }
    }
    case GENRE_TYPE_RESET: {
      return {
        ...state,
        flag: false,
        errorMessage: ''
      }
    }
    case GENRE_TYPE_FAILURE: {
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

export const GENRE_TYPE_LOGIC = {
  reducer: genreTypeReducer,
  actions: { genreTypeAction, genreTypeResetAction },
  initialState: { data: [], loading: true, error: false, flag: false, errorMessage: '' }
}