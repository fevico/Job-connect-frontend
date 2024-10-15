

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import DOMPurify from 'dompurify';


const JobSummaryEditor = ({ onChange }) => {
  const [editorHtml, setEditorHtml] = useState("");

  const handleEditorChange = (html) => {
    setEditorHtml(html);
    onChange(html); // Call the onChange prop with the current content
  };

  return (
    <div className="editor-container bg-white min-h-[200px]">
      <ReactQuill
        value={editorHtml}
        onChange={handleEditorChange}
        modules={JobSummaryEditor.modules}
        formats={JobSummaryEditor.formats}
      />

 {/* <div className="preview-container bg-white p-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(editorHtml) }} /> */}
    </div>
  );
};

// Quill editor modules and formats
JobSummaryEditor.modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"], // remove formatting button
  ],
};

JobSummaryEditor.formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "link",
  "image",
];

export default JobSummaryEditor;
