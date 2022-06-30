import React, { useEffect, useState } from "react";
import chatApi from "src/apis/chatApi";
import { upload } from "src/assets";
import Input from "src/components/Input";
import InputFile from "src/components/InputFile";
import { IMessage } from "src/types/chat";
import "./MessageContent.scss";
import MessageItem from "./MessageItem/MessageItem";

interface MessageContentProps {
  conservationId?: string;
}

const MessageContent: React.FC<MessageContentProps> = ({ conservationId }) => {
  // console.log("đã lấy được conservationId: " + conservationId);

  const [img, setImg] = useState<string>(upload);
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    conservationId && getConservation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conservationId]);

  const getConservation = async () => {
    // console.log("chạy", conservationId);
    try {
      const response = await chatApi.getLatestMessage(conservationId);
      // console.log("response:", response);
      const { messages }: any = response;
      // console.log("messages:", messages);
      setMessages(messages);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    console.log("img nè", img, "text nè", text);
  };

  const renderChatMessage = (messages: IMessage[]) => {
    return (
      messages.length > 0 &&
      messages.map((message, index) => (
        <MessageItem data={message} key={index} />
      ))
    );
  };

  return (
    <>
      {conservationId ? (
        <div className="mesage-content">
          {/* messages content */}
          <div className="chat-content">{renderChatMessage(messages)}</div>
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
      ) : (
        <div className="message-block">
          <span className="message-block-text">
            Chưa có thông tin nội dung, vui lòng chọn user đế tiến thành chat
          </span>
        </div>
      )}
    </>
  );
};
export default MessageContent;
