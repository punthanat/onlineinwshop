import * as type from "../actiontype";

export const changeCurrentMenu = (current) => ({
  type: type.CURRENT_MENU_CLICKED,
  payload: {
    currentMenuClicked: current,
  },
});

export const clickedFilter = (val) => ({
  type: type.FILTER_CLICKED,
  payload: {
    filterClicked: val,
  },
});
export const clickedSort = (val) => ({
  type: type.SORT_CLICKED,
  payload: {
    sortClicked: val,
  },
});

export const clearFilterSort = () => ({
  type: type.CLEAR_FILTER_SORT,
});

export const openSearchModal = (open) => ({
  type: type.SEARCH_MODAL_HANDLE,
  payload: {
    searchModalShow: open,
  },
});

export const addResDialog = (content) => ({
  type: type.ADD_RES_DIALOG,
  payload: {
    dialogContent: {
      key: (Math.random() + 1).toString(36).substring(2, 10),
      status: content.status,
      dialogContent: content.dialogContent,
    },
  },
});

export const removeResDialog = (key) => ({
  type: type.REMOVE_RES_DIALOG,
  payload: {
    key: key,
  },
});
