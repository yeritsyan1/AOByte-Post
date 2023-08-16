import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { initialPostreducer, postReducer } from "./slices/postReducer";
import thunk from "redux-thunk";
import {
  commentsReducer,
  initialCommentsReducer,
} from "./slices/commentsReducer";
import { initialMyPostsReducer, myPostReducer } from "./slices/myPostReducer";
import { filterReducer, initialFilterReducer } from "./slices/searchReducer";

export const store = createStore(
  combineReducers({
    posts: postReducer,
    comments: commentsReducer,
    myPosts: myPostReducer,
    filteredPosts: filterReducer,
  }),
  {
    posts: initialPostreducer,
    comments: initialCommentsReducer,
    myPosts: initialMyPostsReducer,
    filteredPosts: initialFilterReducer,
  },
  applyMiddleware(thunk)
);
