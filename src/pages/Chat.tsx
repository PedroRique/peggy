import React, { useState, useEffect } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { Header } from "../components/Header";
import { useSelector } from "react-redux";
import { AppState } from "../store";

export function ChatScreen({ route }: { route: any }) {
  const { chatroomId } = route.params;
  const currentUserUid = FIREBASE_AUTH.currentUser?.uid || "";
  const currentUserData = useSelector((state: AppState) => state.user.UserData);
  const profileUserData = useSelector((state: AppState) => state.user.profileUserData);

  const [localMessages, setLocalMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const messagesRef = collection(
      FIREBASE_DB,
      "conversations",
      chatroomId,
      "messages"
    );
  
    const unsubscribe = onSnapshot(messagesRef, (querySnapshot) => {
      const loadedMessages: IMessage[] = [];
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        loadedMessages.push({
          _id: doc.id,
          text: data.message,
          createdAt: data.createdAt.toDate(),
          user: {
            _id: data.uid,
            name: data.userName,
            avatar: data.userAvatar,
          },
        });
      });
  
      loadedMessages.sort((a, b) => a.createdAt - b.createdAt);
      
      loadedMessages.reverse();
  
      setLocalMessages(loadedMessages);
    });
  
    return unsubscribe;
  }, [chatroomId]);
  

  const onSend = async (newMessages: IMessage[] = []) => {
    const messagesRef = collection(
      FIREBASE_DB,
      "conversations",
      chatroomId,
      "messages"
    );

    const formattedNewMessages = newMessages.map((message) => ({
      _id: Math.random().toString(36).substring(7),
      text: message.text,
      createdAt: new Date(),
      user: {
        _id: currentUserUid,
        name: currentUserData?.name || "",
        avatar: currentUserData?.photoURL || "",
      },
    }));

    setLocalMessages((previousMessages) =>
      GiftedChat.append(previousMessages, formattedNewMessages)
    );

    for (const message of formattedNewMessages) {
      await addDoc(messagesRef, {
        message: message.text,
        uid: currentUserUid,
        createdAt: message.createdAt,
        userName: currentUserData?.name || "",
        userAvatar: currentUserData?.photoURL || "",
      });
    }

    const conversaRef = doc(FIREBASE_DB, "conversations", chatroomId);
    await updateDoc(conversaRef, {
      lastMessage: {
        text: newMessages[0].text,
        timestamp: new Date(),
      },
      messages: arrayUnion(
        ...formattedNewMessages.map((message) => message._id)
      ),
    });
  };

  return (
    <>
      <Header title={profileUserData?.name} hasBorder hasBack />
      <GiftedChat
        messages={localMessages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: currentUserUid,
        }}
      />
    </>
  );
}