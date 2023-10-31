import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { Avatar } from '../components/Avatar';
import { collection, query, where, getDocs, doc, getDoc, orderBy, limit } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { fetchUserData } from '../services/user.service';

export default function MessagesScreen({ navigation }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const currentUserUid = FIREBASE_AUTH.currentUser?.uid || '';

    const loadConversations = async () => {
      const conversationsQuery = query(
        collection(FIREBASE_DB, 'conversations'),
        where('participants', 'array-contains', currentUserUid)
      );

      const querySnapshot = await getDocs(conversationsQuery);
      const conversationList = [];

      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const otherParticipant = data.participants.find((participant: string) => participant !== currentUserUid);

        const otherUserData = await fetchUserData(otherParticipant);
        const otherUserName = otherUserData?.name;
        const otherUserAvatar = otherUserData?.photoURL;
        const otherUserUid = otherUserData?.uid;
        const lastMessage = await getLastMessage(doc.id);

        conversationList.push({
          chatroomId: doc.id,
          name: otherUserName, 
          avatar: otherUserAvatar,
          lastMessage: lastMessage || '', 
          UID: otherUserUid,
          currentUserUid: currentUserUid, 
        });
      }

      setConversations(conversationList);
    };

    loadConversations();
  }, []);



  const getLastMessage = async (chatroomId: string) => {
    const messagesRef = collection(FIREBASE_DB, 'conversations', chatroomId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(1));
    const lastMessageSnapshot = await getDocs(q);
  
    if (lastMessageSnapshot.docs.length > 0) {
      const lastMessageDoc = lastMessageSnapshot.docs[0];
      const data = lastMessageDoc.data();
      return data.message; 
    }
  
    return null;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
    style={styles.item}
    onPress={() => {
      console.log('Chatroom ID:', item.chatroomId); 
      navigation.navigate('Chat', { chatroomId: item.chatroomId,
        id1: item.currentUserUid, 
        id2: item.UID,  });
    }}
  >
      <View style={styles.avatar}>
        <Avatar size={50} imageUrl={item.avatar} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Mensagens" hasBorder />
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={(item) => item.chatroomId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatar: {
    paddingRight: 12,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 16,
    color: '#888888',
  },
});
