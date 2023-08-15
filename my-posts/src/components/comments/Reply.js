import React from "react";

export default function Reply(props) {
  const { rep } = props;

  return (
    <div style={{ paddingLeft: "15px" }}>
      <h4> {rep.body} </h4>
    </div>
  );
}
