import React, { useState, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { collection, addDoc, query, orderBy, onSnapshot, where, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { Header } from '../components/Header';
import { useSelector } from 'react-redux';
import { AppState } from '../store';

export function Chat({ route }: { route: any }) {
  const { chatroomId } = route.params;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const currentUserUid = FIREBASE_AUTH.currentUser?.uid;
  const currentUserData = useSelector(
    (state: AppState) => state.user.userData
  );

  const [localMessages, setLocalMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const messagesRef = collection(FIREBASE_DB, 'conversations', chatroomId, 'messages');
    const q = query(messagesRef, orderBy('createdAt'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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

      setMessages(loadedMessages);
      setLocalMessages(loadedMessages);
    });

    return unsubscribe;
  }, [chatroomId]);

  const onSend = async (newMessages: IMessage[] = []) => {
    const conversationRef = doc(FIREBASE_DB, 'conversations', chatroomId);
    const messagesRef = collection(FIREBASE_DB, 'messages');

    const formattedNewMessages = newMessages.map((message) => {
      const formattedMessage: IMessage = {
        _id: Math.random().toString(36).substring(7),
        text: message.text,
        createdAt: new Date(),
        user: {
          _id: currentUserUid,
          name: 'Nome do Usuário',
          avatar: 'URL_da_Foto',
        },
      };

      return formattedMessage;
    });

    setLocalMessages((previousMessages) =>
      GiftedChat.append(previousMessages, formattedNewMessages)
    );

    for (const message of formattedNewMessages) {
      await addDoc(messagesRef, {
        message: message.text,
        uid: currentUserUid,
        createdAt: message.createdAt,
        userName: currentUserData?.name,
        userAvatar: currentUserData?.avatar,
      });
    }

    await updateDoc(conversationRef, {
      lastMessage: {
        text: newMessages[0].text, 
        timestamp: new Date(),
      },
      messages: arrayUnion(...formattedNewMessages.map((message) => message._id)),
    });
  };

  return (
    <>
      <Header title={currentUserData?.name} hasBorder hasBack />
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
