import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Image, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { Avatar } from '../components/Avatar';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';

export default function MessagesScreen({ navigation }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const loadConversations = async () => {
      const conversationsRef = collection(FIREBASE_DB, 'conversations');
      const q = query(
        conversationsRef,
        orderBy('lastMessage.timestamp', 'desc')
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const loadedConversations: ((prevState: never[]) => never[]) | { id: string; name: any; lastMessage: any; avatarUrl: any; chatroomId: string; }[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          loadedConversations.push({
            id: doc.id,
            name: data.name,
            lastMessage: data.lastMessage.text,
            avatarUrl: data.avatarUrl,
            chatroomId: doc.id,
          });
        });

        setConversations(loadedConversations);
      });

      return () => unsubscribe();
    };

    loadConversations();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate('Chat', { chatroomId: item.chatroomId });
      }}
    >
      <View style={styles.avatar}>
        <Avatar size={50} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Mensagens" hasBorder hasBack />
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
