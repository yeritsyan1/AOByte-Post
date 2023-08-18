import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import Post from "./Post";
import SignIn from "./registration/SignIn";
import PageNotFound from "./PageNotFound";
import EmptyComponent from "../hoc/props/EmptyComponent";
import NavTabs from "./navigation/HeaderNavigation";

export default function PostPage() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [item, setItem] = useState(location.state?.item || null);
  const param = useParams();

  useEffect(() => {
    if (location.pathname === "/post") {
      return navigate("/");
    }
    if (!item) {
      fetch("/postPage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: param["*"],
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          return setItem(res[0]);
        });
    }
  }, []);

  return (
    <>
      {item ? (
        <>
          <NavTabs />
          <Routes>
            <Route
              path={`:${item?._id}/`}
              element={
                <Post
                  item={item}
                  setOpen={setOpen}
                  AdditionalActions={EmptyComponent}
                />
              }
            ></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
          <SignIn open={open} setOpen={setOpen} />
        </>
      ) : (
        <NavTabs />
      )}
    </>
  );
}
