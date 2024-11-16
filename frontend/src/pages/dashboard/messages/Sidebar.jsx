import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import propTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";

const Sidebar = ({ currentUser, onSelectChat }) => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const chatQuery = query(
        collection(db, "chats"),
        where(
          currentUser.role === "mentor" ? "mentorId" : "menteeId",
          "==",
          currentUser.id
        )
      );

      const unsubscribe = onSnapshot(chatQuery, async (snapshot) => {
        const chats = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const chatData = doc.data();
            const messageQuery = query(
              collection(db, "messages"),
              where("chatId", "==", doc.id),
              orderBy("createdAt", "desc"),
              limit(1)
            );
            const messageSnapshot = await getDocs(messageQuery);
            const latestMessage = messageSnapshot.docs[0]?.data();

            return {
              id: doc.id,
              mentorId: chatData.mentorId,
              mentorName: chatData.mentorName,
              menteeId: chatData.menteeId,
              menteeName: chatData.menteeName,
              latestMessage: latestMessage?.text || "",
              createdAt: latestMessage?.createdAt?.seconds
                ? new Date(latestMessage.createdAt.seconds * 1000)
                : null,
            };
          })
        );
        setChatList(chats);
      });

      return () => unsubscribe();
    };

    fetchChats();
  }, [currentUser]);

  return (
    <div className="w-64 bg-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-bold">
        {currentUser.role === "mentee" ? "Mentors" : "Mentees"}
      </h2>
      {chatList.length > 0 ? (
        <ul className="space-y-2 mt-4">
          {chatList?.map((chat) => (
            <li
              key={chat.id}
              className="cursor-pointer p-2 bg-white rounded shadow hover:bg-gray-100"
              onClick={() =>
                onSelectChat({
                  id: chat.id,
                  mentorId: chat.mentorId || null,
                  menteeId: chat.menteeId || null,
                  mentorName: chat.mentorName || "",
                  menteeName: chat.menteeName || "",
                })
              }
            >
              <div>
                <p className="font-bold">
                  {currentUser.role === "mentee"
                    ? chat.mentorName
                    : chat.menteeName}
                </p>
                <p className="text-sm text-gray-600 line-clamp-1 ">
                  {chat.latestMessage}
                </p>
                {chat.createdAt && (
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(chat.createdAt, { addSuffix: true })}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-center">No chats available</p>
      )}
    </div>
  );
};

Sidebar.propTypes = {
  currentUser: propTypes.object.isRequired,
  onSelectChat: propTypes.func.isRequired,
};

export default Sidebar;
