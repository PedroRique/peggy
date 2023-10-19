import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Image, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { Avatar } from '../components/Avatar';

const mockConversation = [
  {
    id: '1',
    name: 'John Doe',
    lastMessage: 'Hello, how are you?',
    avatarUrl: 'https://example.com/avatar1.png',
    chatroomId: 'chatroom1',
  },
  {
    id: '2',
    name: 'Alice Smith',
    lastMessage: 'Im doing well, thanks!',
    avatarUrl: 'https://example.com/avatar2.png',
    chatroomId: 'chatroom2',
  },
  // Adicione mais objetos de conversa conforme necessário
];

export default function MessagesScreen({ navigation }) {
  const [conversations, setConversations] = useState(mockConversation);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate('Chat', { chatroomId: item.chatroomId });
      }}
    >
      <View style={styles.avatar}>
        <Avatar size={50} imageUrl={item.avatarUrl} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Mensagens" hasBorder  />
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
