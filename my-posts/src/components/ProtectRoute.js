import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIGNIN } from "../constants/constants";

export default function ProtectRoute(props) {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");
  const auth = currentUser;
  const [isLogged, setIsLogged] = useState(null);

  useEffect(() => {
    auth ? setIsLogged(props.children) : navigate(`/${SIGNIN}`);
  }, [auth]);

  return <>{isLogged}</>;
}
