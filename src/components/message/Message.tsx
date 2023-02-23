import React from "react";

const Message = ({msg, bgColor}:{msg: string, bgColor: string}): JSX.Element => {
  let styles: object = {
    padding: "1rem",
    marginBottom: "1rem",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: `${bgColor}`,
  };
  return (
    <div style={styles}>
      <p>{msg}</p>
    </div>
  );
};

export default Message;
