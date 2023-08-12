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

export const store = createStore(
  combineReducers({
    posts: postReducer,
    comments: commentsReducer,
  }),
  {
    posts: initialPostreducer,
    comments: initialCommentsReducer,
    // myPosts: [],
  },
  applyMiddleware(thunk)
);
