const actionComments = "change-comments";
export const initialCommentsReducer = [
  {
    postId: 1,
    commentId: 3,
    body: "Great",
    rate: 5,
    commentAuthor: "user5@gmail.com",
    date: Date.now(),
    rated: [
      {
        user: "user4@gmail.com",
        rate: 5,
      },
    ],
  },
  {
    postId: 1,
    commentId: 4,
    body: "Hello",
    rate: 3,
    commentAuthor: "user3@gmail.com",
    date: Date.now(),
    rated: [],
  },
  {
    postId: 2,
    commentId: 9,
    body: "Ok",
    rate: 4,
    commentAuthor: "user1@gmail.com",
    date: Date.now(),
    rated: [],
  },
];

export function commentsReducer(state = [], action) {
  if (action.type === actionComments) {
    return [
      {
        posts: action.payload.post,
      },
    ];
  }
  return state;
}
