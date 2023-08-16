export const filterAction = "search-posts";
export const initialFilterReducer = [];

export const filterReducer = (state = [], action) => {
  if (action.type === filterAction) {
    return action.payload.filteredPosts;
  }
  return state;
};

export const selectFilteredPosts = (state) => {
  return state.filteredPosts.sort((a, b) => {
    return b.date - a.date;
  });
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
