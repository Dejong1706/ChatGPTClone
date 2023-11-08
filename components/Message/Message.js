import { useUser } from "@auth0/nextjs-auth0/client";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";

export const Message = ({ role, content }) => {
  const { user } = useUser();
  return (
    <div
      className={`grid grid-cols-[30px_1fr] gap-5 p-5 ${
        role === "assistant"
          ? "bg-blue-200"
          : role === "notice"
          ? "bg-red-100"
          : ""
      }`}
    >
      <div>
        {role === "user" && !!user && (
          <Image
            src={user.picture}
            width={30}
            height={30}
            alt="User avatar"
            className="rounded-sm shadow-md shadow-black/50"
          />
        )}
        {role === "assistant" && (
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-sm bg-blue-600 shadow-md shadow-black/50">
            <FontAwesomeIcon icon={faRobot} className="text-yellow-300" />
          </div>
        )}
      </div>
      <div className="prose prose-invert text-gray-800">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};
