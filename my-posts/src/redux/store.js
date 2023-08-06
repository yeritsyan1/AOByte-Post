import { legacy_createStore as createStore } from "redux";

export const store = createStore(
  function (state, action) {
    return state;
  },

  {
    posts: [
      {
        authorId: "ds0iHW9qQIZwUglr5TU3EfvvKEu2",
        url: "/post1",
        postId: 1,
        category: "General",
        title: "Япония",
        body: "Япония – островное государство в Тихом океане, которое славится своими густонаселенными городами, императорскими дворцами, национальными парками, храмами и святилищами. Сеть высокоскоростных железных дорог Синкансэн представлена на всех основных островах Японского архипелага: Кюсю с субтропическими пляжами Окинавы, Хонсю, на котором расположены Токио и Хиросима с мемориалом жертвам атомной бомбардировки, и Хоккайдо с горнолыжными курортами. Столица страны Токио – центр японской поп-культуры, известный своими небоскребами и магазинами.",
        date: "16998789986",
      },
      {
        authorId: "zQPmcYzVecdlDRTzUyoochMcs3S2",
        url: "/post2",
        postId: 2,
        category: "Country",
        title: "Russia",
        body: "Russia, country that stretches over a vast expanse of eastern Europe and northern Asia. Once the preeminent republic of the Union of Soviet Socialist Republics (U.S.S.R.; commonly known as the Soviet Union), Russia became an independent country after the dissolution of the Soviet Union in December 1991. Russia Russia Russia is a land of superlatives. By far the world’s largest country, it covers nearly twice the territory of Canada, the second largest. It extends across the whole of northern Asia and the eastern third of Europe, spanning 11 time zones and incorporating a great range of environments and landforms, from deserts to semiarid steppes to deep forests and Arctic tundra. Russia contains Europe’s longest river, the Volga, and its largest lake, Ladoga. Russia also is home to the world’s deepest lake, Baikal, and the country recorded the world’s lowest temperature outside the North and South poles.",
        date: "1689080789",
      },
    ],
    comments: [
      {
        postId: 1,
        commentId: 3,
        body: "Great",
        rate: 5,
        commentAuthor: "user5@gmail.com",
        date: "1689080980",
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
        date: "168906870",
        rated: [],
      },
      {
        postId: 2,
        commentId: 9,
        body: "Ok",
        rate: 4,
        commentAuthor: "user1@gmail.com",
        date: "1689689090",
        rated: [],
      },
    ],
  }
);
