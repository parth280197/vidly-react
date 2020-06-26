import React from "react";
const Like = ({liked, handleLike}) => {
  let className = liked ? "fa fa-heart" : "fa fa-heart-o";
  return <i className={className} onClick={handleLike} aria-hidden="true"></i>;
};

export default Like;
