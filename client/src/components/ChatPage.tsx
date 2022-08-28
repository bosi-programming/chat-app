import { FC, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

interface ChatPageProps {
  socket: Socket;
}

export interface Message {
  name: string;
  text: string;
  id: string;
  socketID: string;
}

const ChatPage: FC<ChatPageProps> = ({ socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
