import {
  faMessage,
  faPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";

export const ChatSidebar = ({ chatId }) => {
  const [chatList, setChatList] = useState([]);
  useEffect(() => {
    const loadChatList = async () => {
      const response = await fetch(`/api/chat/getChatList`, {
        method: "POST",
      });
      const json = await response.json();
      setChatList(json);
    };
    loadChatList();
  }, [chatId]);

  return (
    <div className="overflex-hidden flex flex-col bg-blue-600">
      <Link
        href="/chat"
        className="side-menu-item bg-[#f1da00] font-bold text-gray-700 hover:bg-[#d8c405]"
      >
        <FontAwesomeIcon icon={faPlus} />
        New Chat
      </Link>
      <div className="flex-1 overflow-auto bg-blue-500 text-white">
        {chatList.map((chat) => (
          <Link
            key={chat._id}
            href={`/chat/${chat._id}`}
            className={`m-2 flex items-center gap-4 rounded-md p-2 hover:bg-blue-600 ${
              chatId === chat._id ? "bg-blue-600 hover:bg-blue-700" : ""
            }`}
          >
            <FontAwesomeIcon icon={faMessage} className="text-white" />
            <span
              title={chat.title}
              className="text-elipsis overflow-hidden whitespace-nowrap"
            >
              {chat.title}
            </span>
          </Link>
        ))}
      </div>
      <Link
        href="/api/auth/logout"
        className="side-menu-item bg-[#f1da00] font-bold text-gray-700 hover:bg-[#d8c405]"
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
        logout
      </Link>
    </div>
  );
};

export default ChatSidebar;
