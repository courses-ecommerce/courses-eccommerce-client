import React, { useEffect } from "react";
import chatApi from "src/apis/chatApi";
import "./Message.scss";
import MessageContent from "./MessageContent/MessageContent";
import MessageUser from "./MessageUser/MessageUser";

interface MessageProps {}

const Message: React.FC<MessageProps> = () => {
  document.title = "Trò chuyện trực tuyến";

  useEffect(() => {
    getUserChatList();
  }, []);

  const getUserChatList = async () => {
    try {
      const response = await chatApi.getUserChatList();
      console.log(response);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <div className="message">
      <h3 className="title">Khung trò chuyện trực tuyến</h3>
      <div className="message-container">
        <div className="message-users">
          <div className="title">Danh sách người dùng</div>
          <MessageUser />
        </div>
        <div className="message-contents">
          <div className="title">Nội dung cuộc hội thoại</div>
          <MessageContent />
        </div>
      </div>
    </div>
  );
};

export default Message;
