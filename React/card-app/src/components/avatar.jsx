import React from "react";

function avatar(props){
    return(<img className="circle-img" src={props.imgURL} alt="avatar_img" />);
}

export default avatar;