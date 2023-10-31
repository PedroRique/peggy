import React, { useState, useEffect } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  setDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { Header } from "../components/Header";
import { useSelector } from "react-redux";
import { AppState } from "../store";

export function ChatScreen({ route }: { route: any }) {
  const { chatroomId, id1, id2 } = route.params;
  const currentUserUid = FIREBASE_AUTH.currentUser?.uid || "";
  const currentUserData = useSelector((state: AppState) => state.user.UserData);
  const profileUserData = useSelector((state: AppState) => state.user.profileUserData);

  const [localMessages, setLocalMessages] = useState<IMessage[]>([]);
  const [lastMessage, setLastMessage] = useState<IMessage | null>(null);

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

    getLastMessage(chatroomId).then((message) => {
      setLastMessage(message);
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

    if (id1 && id2) {
      const participantsData = await getParticipantsData([id1, id2]);

      const conversaRef = doc(FIREBASE_DB, "conversations", chatroomId);
      const conversaSnapshot = await getDoc(conversaRef);

      if (!conversaSnapshot.exists()) {
        await createParticipantsCollection([id1, id2]);

        await setDoc(conversaRef, {
          participants: [id1, id2],
        });
      }

      for (const message of formattedNewMessages) {
        await addDoc(messagesRef, {
          message: message.text,
          uid: message.user._id,
          createdAt: message.createdAt,
          userName: message.user.name,
          userAvatar: message.user.avatar,
        });
      }
    }
  };

  const getLastMessage = async (chatroomId: string) => {
    const messagesRef = collection(FIREBASE_DB, "conversations", chatroomId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"), limit(1));
    const lastMessageSnapshot = await getDocs(q);

    if (lastMessageSnapshot.docs.length > 0) {
      const lastMessageDoc = lastMessageSnapshot.docs[0];
      const data = lastMessageDoc.data();

      return {
        _id: lastMessageDoc.id,
        text: data.message,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.uid,
          name: data.userName,
          avatar: data.userAvatar,
        },
      };
    }

    return null;
  };

  const getParticipantsData = async (participantIds: string[]) => {
    const participantsData = [];

    for (const participantId of participantIds) {
      const participantDocRef = doc(FIREBASE_DB, "participants", participantId);
      const participantDoc = await getDoc(participantDocRef);

      if (participantDoc.exists()) {
        participantsData.push(participantDoc.data());
      }
    }

    return participantsData;
  };

  const createParticipantsCollection = async (participantIds: string[]) => {
    for (const participantId of participantIds) {
      const participantData = {
      };

      const participantDocRef = doc(FIREBASE_DB, "participants", participantId);
      await setDoc(participantDocRef, participantData);
    }
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
