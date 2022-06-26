import React, { useState } from "react";
import { upload } from "src/assets";
import Input from "src/components/Input";
import InputFile from "src/components/InputFile";
import "./MessageContent.scss";

const MessageContent = () => {
  const [img, setImg] = useState<string>(upload);
  const [text, setText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    console.log("img nè", img, "text nè", text);
  };

  return (
    <div className="mesage-content">
      <div className="chat-content">{text}</div>
      <form className="chat-handle" onSubmit={handleSubmit}>
        <Input
          className="input-text"
          placeholder="Nhập nội dung đoạn chat"
          onChange={(e: any) => setText(e.target.value)}
        />
        <InputFile
          // label="Ảnh đại diện"
          // multiple
          value={img}
          // valueDefault={img}
          onChange={(value) => setImg(value)}
        />
      </form>
    </div>
  );
};
export default MessageContent;
