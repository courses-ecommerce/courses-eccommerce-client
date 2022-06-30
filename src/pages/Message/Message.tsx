import React, { useEffect, useState } from "react";
import chatApi from "src/apis/chatApi";
import { IConservation } from "src/types/chat";
import MessageContent from "./MessageContent/MessageContent";
import MessageUser from "./MessageUser/MessageUser";
import "./Message.scss";

interface MessageProps {}

const Message: React.FC<MessageProps> = () => {
  document.title = "Trò chuyện trực tuyến";

  const [conservation, setConservation] = useState<IConservation[]>([]);
  const [conservationId, setConservationId] = useState<string>();

  useEffect(() => {
    getUserChatList();
  }, []);
  // id chat
  // useEffect(() => {
  //   console.log("đã lấy được id chat", conservationId);
  // }, [conservationId]);

  const getUserChatList = async () => {
    try {
      const response = await chatApi.getUserChatList();
      // console.log(response);
      const { conversations }: any = response;
      // console.log("conversations", conversations);
      setConservation(conversations);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const renderUserChatItems = (userChatList: IConservation[]) => {
    return (
      userChatList.length > 0 &&
      userChatList.map((userItem, index) => (
        <MessageUser
          onClick={() => setConservationId(userItem._id)}
          receiver={userItem.receiver}
          message={userItem.message}
          key={index}
        />
      ))
    );
  };

  return (
    <div className="message">
      <h3 className="title">Khung trò chuyện trực tuyến</h3>
      <div className="message-container">
        <div className="message-users">
          <div className="title">Danh sách người dùng</div>
          <div className="content">{renderUserChatItems(conservation)}</div>
        </div>
        <div className="message-contents">
          <div className="title">Nội dung cuộc hội thoại</div>
          <MessageContent conservationId={conservationId} />
        </div>
      </div>
    </div>
  );
};

export default Message;
