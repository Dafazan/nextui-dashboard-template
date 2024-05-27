"use client";
import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["code-block", "link"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ align: [] }],
      ["clean"],
    ],
  },
};

const formats = [
  "strike",
  "bold",
  "italic",
  "underline",
  "link",
  "align",
  "direction",
  "list",
  "code-block",
  "script",
  "indent",
  "direction",
  "color",
  "background",
];

interface QuilltextProps {
  value: string;
  onChange: (content: string) => void; // Specify the type as string
}

const Quilltext: React.FC<QuilltextProps> = (props) => {
  return (
    <ReactQuill
      value={props.value}
      onChange={props.onChange} // Directly pass onChange
      modules={modules}
      formats={formats}
      theme="snow"
      className="h-[200px] w-full pb-10"
    />
  );
};

export default Quilltext;
