import { apiCall } from '../../utils';

const DETAIL = 'DETAIL'
const DETAIL_SUCCESS = 'DETAIL_SUCCESS'
const DETAIL_FAILURE = 'DETAIL_FAILURE'
const DETAIL_RESET = 'DETAIL_RESET'

const detailAction = dispatch => async (data) => {
  try {
    dispatch({ type: DETAIL })
    const response = await apiCall({
      method: 'GET',
      url: `/details/${data}`,
    })
    dispatch({ type: DETAIL_SUCCESS, payload: response.results || {} })
  } catch (error) {
    console.log(error)
    if (error.response) {
      console.log(error.response)
    }
    dispatch({ type: DETAIL_FAILURE })
  }
}

const detailResetAction = dispatch => () => {
  dispatch({ type: DETAIL_RESET })
}

const detailReducer = (state, action) => {
  switch (action.type) {
    case DETAIL: {
      return {
        ...state,
        loading: true,
        error: false,
        data: {},
        flag: false,
        errorMessage: ''
      }
    }
    case DETAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
        flag: true,
        errorMessage: ''
      }
    }
    case DETAIL_RESET: {
      return {
        ...state,
        data: {},
        loading: true,
        error: false,
        flag: false,
        errorMessage: ''
      }
    }
    case DETAIL_FAILURE: {
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

export const DETAIL_LOGIC = {
  reducer: detailReducer,
  actions: { detailAction, detailResetAction },
  initialState: { data: {}, loading: true, error: false, flag: false, errorMessage: '' }
}