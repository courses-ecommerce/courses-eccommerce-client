import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import chatApi from "src/apis/chatApi";
import { upload } from "src/assets";
import Input from "src/components/Input";
import InputFile from "src/components/InputFile";
import { LINK_DOMAIN } from "src/data/link";
import { IMessage } from "src/types/chat";
import { IAccesstoken } from "src/types/token";
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
  const [newMessage, setNewMessages] = useState<IMessage>();

  const socket = useRef<any>();

  useEffect(() => {
    conservationId && getConservation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conservationId]);

  useEffect(() => {
    const { accessToken }: IAccesstoken = JSON.parse(
      localStorage.getItem("access_token") ||
        JSON.stringify({ accessToken: "" })
    );

    // console.log("accessToken", accessToken);

    //connect
    socket.current = io(LINK_DOMAIN, {
      extraHeaders: { token: `Beaer ${accessToken}` },
    });

    //on event
    socket.current.on("send-message", (data: any) => setNewMessages(data.text));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log("sadsa", [...messages, newMessage]);
    const newValue: any[] = [...messages, newMessage];
    setMessages(newValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

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

  const handleSubmit = async (e: React.FormEvent<any>) => {
    e.preventDefault();
    if (text) {
      const params = { conversation: conservationId, text };
      // console.log("params là", params);
      try {
        await chatApi.sendMessage(params);
        // console.log("response", response);
        setText("");
      } catch (error) {
        console.log("lỗi rồi", error);
      }
    }
    // console.log("img nè", img, "text nè", text);
  };

  const renderChatMessage = (messages: IMessage[]) => {
    return (
      messages.length > 0 &&
      messages.map((message, index) => (
        <MessageItem data={message} key={index} />
      ))
    );
  };

  const handleImagePost = async (image: any) => {
    // console.log("lấy được img là", image);
    let formData = new FormData();
    formData.append("images", image);
    formData.append("conversation", conservationId || "");

    try {
      const response = await chatApi.sendMessage(formData);
      console.log("response", response);
      setText("");
    } catch (error) {
      console.log("lỗi rồi", error);
    }
    // setImg(upload);
  };

  return (
    <>
      {conservationId ? (
        <div className="mesage-content">
          {/* messages content */}
          <div className="chat-content">{renderChatMessage(messages)}</div>
          <form className="chat-handle" onSubmit={handleSubmit}>
            <Input
              value={text}
              hideErrorMessage={true}
              className="input-text"
              placeholder="Nhập nội dung đoạn chat"
              onChange={(e: any) => setText(e.target.value)}
            />
            <InputFile value={img} onChange={handleImagePost} />
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
