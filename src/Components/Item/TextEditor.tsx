import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const TextEditor = ({ editorData, setEditorData }: any) => {
  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(data);
  };

  return (
    <div className="CKEditor border-2">
      <CKEditor
        editor={Editor}
        data={editorData}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default TextEditor;
