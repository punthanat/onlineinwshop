import * as actionTypes from "../actiontype";

const INITIAL_STATE = {
  searchModalShow: false,
  filterType: "",
  sort: {},
  responseDialog: [],
};

const uiStyle = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case actionTypes.SEARCH_MODAL_HANDLE:
      return { ...state, searchModalShow: action.payload.searchModalShow };
    case actionTypes.FILTER_CLICKED:
      let isAlready = false;
      if (state.filterType === action.payload.filterClicked) {
        isAlready = true;
      }
      return {
        ...state,
        filterType: isAlready ? "" : action.payload.filterClicked,
      };
    case actionTypes.SORT_CLICKED:
      let isAlreadySort = false;
      if (state.sort === action.payload.sortClicked) {
        isAlreadySort = true;
      }
      return {
        ...state,
        sort: isAlreadySort ? "" : action.payload.sortClicked,
      };

    case actionTypes.CLEAR_FILTER_SORT:
      return {
        ...state,
        filterType: "",
        sort: {},
      };
    case actionTypes.ADD_RES_DIALOG:
      return {
        ...state,
        responseDialog: [...state.responseDialog, action.payload.dialogContent],
      };
    case actionTypes.REMOVE_RES_DIALOG:
      return {
        ...state,
        responseDialog: state.responseDialog.filter(
          (res) => res.key !== action.payload.key
        ),
      };
    default:
      return state;
  }
};

export default uiStyle;
