// import React, { useRef, useEffect } from 'react';
// import Quill from 'quill';
// import 'quill/dist/quill.snow.css';

// export default function JobSummaryEditor({ onChange }) {
//   const quillRef = useRef(null);
//   const editorInstance = useRef(null); // Ref to store the Quill instance

//   useEffect(() => {
//     if (!editorInstance.current) {
//       // Initialize the Quill editor only if it's not already initialized
//       editorInstance.current = new Quill(quillRef.current, {
//         modules: {
//           toolbar: [
//             ['bold', 'italic', 'underline', 'strike'],
//             [{ header: 1 }, { header: 2 }, { header: 3 }],
//             ['blockquote', 'code-block'],
//             [{ list: 'ordered' }, { list: 'bullet' }],
//             [{ script: 'super' }, { script: 'sub' }],
//             [{ indent: '+1' }, { indent: '-1' }],
//             [{ direction: 'rtl' }],
//             [{ size: ['small', 'medium', 'large', 'x-large'] }],
//             [{ color: [] }, { background: [] }],
//             ['link', 'image', 'video'],
//             ['clean'],
//           ],
//         },
//         theme: 'snow',
//       });

//       // Listen to text changes in the Quill editor
//       editorInstance.current.on('text-change', () => {
//         const summary = editorInstance.current.root.innerHTML;
//         if (onChange) {
//           onChange(summary);
//         }
//       });
//     }

//     return () => {
//       // Clean up event listener on unmount
//       if (editorInstance.current) {
//         editorInstance.current.off('text-change');
//       }
//     };
//   }, [onChange]);

//   return <div ref={quillRef} style={{ height: '200px', width: '100%' }} />;
// }

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

<div
        className="preview-container bg-white p-4"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(editorHtml) }} // Use DOMPurify for security
      />
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
