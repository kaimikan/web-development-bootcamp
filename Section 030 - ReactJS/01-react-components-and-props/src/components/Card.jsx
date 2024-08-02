import React from "react";
import Avatar from "./Avatar";
import Detail from "./Detail";

function Card(props) {
  return (
    <div className="card">
      <div className="top">
        <h2 className="name">
          {props.id}. {props.name}
        </h2>
        <Avatar imgURL={props.imgURL} />
      </div>
      <div className="bottom">
        <Detail className="info" contents={props.tel} />
        <Detail className="info" contents={props.email} />
      </div>
    </div>
  );
}

export default Card;
