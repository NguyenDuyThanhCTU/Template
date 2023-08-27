import React, { useState } from "react";
import TextEditor from "../../../../Item/TextEditor";

const Introduce = () => {
  const [editorData, setEditorData] = useState("");

  return (
    <div className=" gap-5 w-full">
      <div className="text-black">
        {" "}
        <TextEditor editorData={editorData} setEditorData={setEditorData} />
      </div>
    </div>
  );
};

export default Introduce;
