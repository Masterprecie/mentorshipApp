import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import propTypes from "prop-types";
const Sidebar = ({ currentUser, onSelectChat }) => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    if (currentUser.role === "mentee") {
      const q = query(
        collection(db, "chats"),
        where("menteeId", "==", currentUser.id)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setChatList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            mentorId: doc.data().mentorId,
            mentorName: doc.data().mentorName,
          }))
        );
      });

      return () => unsubscribe();
    } else if (currentUser.role === "mentor") {
      const q = query(
        collection(db, "chats"),
        where("mentorId", "==", currentUser.id)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setChatList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            menteeId: doc.data().menteeId,
            menteeName: doc.data().menteeName,
          }))
        );
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <div className="w-64 bg-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-bold">
        {currentUser.role === "mentee" ? "Mentors" : "Mentees"}
      </h2>
      {chatList.length > 0 ? (
        <ul className="space-y-2 mt-4">
          {chatList.map((chat) => (
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
              {currentUser.role === "mentee"
                ? chat.mentorName
                : chat.menteeName}
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
