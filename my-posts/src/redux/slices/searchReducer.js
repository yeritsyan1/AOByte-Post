export const filterAction = "search-posts";
export const initialFilterReducer = { allPosts: [], totalCount: 0 };

export const filterReducer = (state = initialFilterReducer, action) => {
  if (action.type === filterAction) {
    return action.payload.filteredPosts;
  }
  return state;
};

export const selectFilteredPosts = (state) => {
  return state.filteredPosts;
};

const updateFilter = (newValue) => {
  return {
    type: filterAction,
    payload: {
      filteredPosts: newValue,
    },
  };
};

export const filterPost = (filterBy) => {
  return (dispatch) => {
    fetch("/filterPosts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        title: filterBy.title,
        category: filterBy.category,
        starttime: filterBy.startTime,
        endtime: filterBy.endTime,
        isActive: filterBy.isActive,
        currentpage: filterBy.currentpage,
        perpage: filterBy.perpage,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return dispatch(updateFilter(res));
      })
      .catch(() => {
        return;
      });
  };
};
