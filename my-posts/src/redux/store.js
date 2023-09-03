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
import { initialReply, initialReplyReducer } from "./slices/replyReducer";
import { emailReducer, initialEmailReducer } from "./slices/email";
import {
  initialRefreshTokenReducer,
  refreshTokenReducer,
} from "./slices/refreshTokenReducer";

export const store = createStore(
  combineReducers({
    posts: postReducer,
    comments: commentsReducer,
    myPosts: myPostReducer,
    filteredPosts: filterReducer,
    reply: initialReplyReducer,
    emailVerify: emailReducer,
    refreshToken: refreshTokenReducer,
  }),
  {
    posts: initialPostreducer,
    comments: initialCommentsReducer,
    myPosts: initialMyPostsReducer,
    filteredPosts: initialFilterReducer,
    reply: initialReply,
    emailVerify: initialEmailReducer,
    refreshToken: initialRefreshTokenReducer,
  },
  applyMiddleware(thunk)
);
