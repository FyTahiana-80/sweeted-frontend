
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import ReactionButton from './ReactionButton';

export default function Post({ post, onReact }) {
  return (
    <View style={styles.card}>
      
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.user}>{post.user}</Text>
            <Text style={styles.time}>il y a 5 min</Text>
          </View>
        </View>
        <Entypo name="dots-three-horizontal" size={16} color="#666" />
      </View>

     
      <Text style={styles.content}>{post.content}</Text>

      {/* Image du post (si elle existe) */}
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}

      {/* Emojis et boutons de reactions*/}
      <View style={styles.footer}>
        <ReactionButton 
          total={post.totalReactions} 
          topEmojis={post.topEmojis}
          onReact={onReact}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 15,
    borderRadius: 15,
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#ddd',
  },
  user: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  time: {
    fontSize: 11,
    color: '#999',
    marginTop: 1,
  },
  content: {
    fontSize: 16,
    color: '#1c1e21',
    lineHeight: 22,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#eee',
  },
  footer: {
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});