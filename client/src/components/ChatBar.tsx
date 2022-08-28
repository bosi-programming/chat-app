import React, { FC, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface ChatBarProps {
  socket: Socket;
}

const ChatBar: FC<ChatBarProps> = ({ socket }) => {
  const [users, setUsers] = useState<{ socketID: string; userName: string }[]>(
    []
  );

  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
