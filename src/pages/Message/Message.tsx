import React from "react";
import "./Message.scss";
import MessageContent from "./MessageContent/MessageContent";
import MessageUser from "./MessageUser/MessageUser";

interface MessageProps {}

const Message: React.FC<MessageProps> = () => {
  document.title = "Trò chuyện trực tuyến";
  return (
    <div className="message">
      <h3 className="title">Khung trò chuyện trực tuyến với teacher, admin</h3>
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
