import React, { useState } from "react";
import CreateForm from "./Create_Form/CreateForm";
import DisplayForm from "./Display_Form/DisplayForm";

const Forms = () => {
  const [data, setData] = useState(null);
  const sendData = (details) => {
    setData(details);
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, border: "1px solid black" }}>
          <CreateForm sendData={sendData} />
        </div>
        <div style={{ flex: 1, border: "1px solid black" }}>
          <DisplayForm data={data} />
        </div>
      </div>
    </>
  );
};

export default Forms;
