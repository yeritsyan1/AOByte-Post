import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CURRENTUSER } from "../../constants/constants";

export default function ProtectLogin(props) {
  const navigate = useNavigate();
  const auth = CURRENTUSER;
  const [isLogged, setIsLogged] = useState(null);

  useEffect(() => {
    auth ? navigate(`/`) : setIsLogged(props.children);
  }, [auth]);

  return <>{isLogged}</>;
}
