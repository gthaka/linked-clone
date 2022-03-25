import React from "react";
import {} from 'react-router-dom';
import MainBody from "../MainBody";
import Titlebar from "../Titlebar";

export default function Team() {
    
  return (
    <React.Fragment>
      <Titlebar />
      <MainBody>
        <p>This is my team</p>
      </MainBody>
    </React.Fragment>
  );
}
