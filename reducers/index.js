import { fromJS } from 'immutable';

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH':
      // return { ...state, search: action.payload.data };
      return state.set('search', fromJS(action.payload.data));
    case 'SET_PLAYLIST': {
      // return { ...state, playlist: action.payload.data };
      return state.set('playlist', fromJS(action.payload.data));
    }
    case 'SET_CURRENT_TRACK': {
      return state.set('currentTrack', action.payload.index);
    }
    case 'SET_ALBUM_DATA':
      return state.set('album', fromJS(action.payload.data));
    default:
      return state;
  }
}

export default reducer;
