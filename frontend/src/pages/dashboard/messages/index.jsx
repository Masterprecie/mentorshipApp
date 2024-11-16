import { useEffect, useState, useRef } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { formatDistanceToNow } from "date-fns";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  onSnapshot,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "../../../features/auth/hook";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const Messages = () => {
  const { user } = useAuth();
  const fullName = `${user?.firstName} ${user?.lastName}`;
  const currentUser = { id: user?.id, name: fullName, role: user?.role };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mentorId = queryParams.get("mentorId");
  const mentorName = queryParams.get("mentorName");

  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Create or load the chat
  useEffect(() => {
    const initializeChat = async () => {
      if (mentorId && mentorName) {
        const chatId = `${currentUser.id}_${mentorId}`;
        const chatRef = doc(db, "chats", chatId);
        const chatDoc = await getDoc(chatRef);
        if (!chatDoc.exists()) {
          // Create a new chat if it doesn't exist
          await setDoc(chatRef, {
            chatId,
            menteeId: currentUser.id,
            menteeName: currentUser.name,
            mentorId,
            mentorName,
          });
        }

        setSelectedChat({
          id: chatId,
          mentorId,
          menteeName: currentUser.name,
          mentorName,
        });
      }
    };
    initializeChat();
  }, [mentorId, mentorName, currentUser.id, currentUser.name]);

  // Load messages for the selected chat
  useEffect(() => {
    if (selectedChat) {
      const q = query(
        collection(db, "messages"),
        where("chatId", "==", selectedChat.id),
        orderBy("createdAt")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });

      return () => unsubscribe();
    }
  }, [selectedChat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      createdAt: new Date(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      chatId: selectedChat.id,
    });

    setNewMessage("");
  };
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedChat]);
  return (
    <div className="flex h-screen pt-16">
      <Sidebar currentUser={currentUser} onSelectChat={setSelectedChat} />
      <div className="flex-grow px-3">
        {selectedChat ? (
          <>
            <div className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-300">
              <h2 className="text-xl font-semibold">
                {currentUser.role === "mentor"
                  ? selectedChat?.menteeName
                  : selectedChat?.mentorName}{" "}
              </h2>
            </div>
            <div className="messages flex-grow space-y-4 pt-4 h-[350px] overflow-y-auto">
              {messages.map((message) => {
                const timestamp = message.createdAt?.seconds
                  ? new Date(message.createdAt.seconds * 1000)
                  : null;
                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === currentUser.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div>
                      <div
                        className={`max-w-xs p-3 rounded-lg shadow-md ${
                          message.senderId === currentUser.id
                            ? "bg-blue-500 text-white rounded-br-none" // Mentee's styling
                            : "bg-gray-300 text-black rounded-bl-none" // Mentor's styling
                        }`}
                      >
                        <p className="font-medium">{message.senderName}</p>
                        <p>{message.text}</p>
                      </div>
                      {timestamp && (
                        <p
                          className={`text-xs text-gray-500 mt-1 ${
                            message.senderId === currentUser.id
                              ? "text-right" // Mentee's styling
                              : "text-left" // Mentor's styling
                          }`}
                        >
                          {formatDistanceToNow(timestamp, {
                            addSuffix: true,
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="mt-4 flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-r-lg"
              >
                Send
              </button>
            </form>
          </>
        ) : (
          <p className="pt-5">Select a chat to start messaging</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
