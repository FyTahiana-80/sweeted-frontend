import React, { useState } from 'react';
import { FlatList, View, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'; 
import Post from '../../components/Post';

export default function Home() {
  const navigation = useNavigation();

  const [posts, setPosts] = useState([
    {
      id: '1',
      user: "Olonafotsiny",
      avatar: 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg',
      content: "Quand le prof donne un devoir surprise 😡",
      totalReactions: 0,
      image: 'https://tse4.mm.bing.net/th/id/OIP.U1gTsAsb4ZYxdq0Yb_kFAAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      id: '2',
      user: "Kevin",
      avatar: 'https://i.pinimg.com/originals/fd/06/01/fd060115ee1e540b89c912d08a43b3f9.jpg',
      content: "Moi qui révise 5 min avant l'exam 😂",
      totalReactions: 0,
      image: null,
    },
    {
      id: '3',
      user: "Avatar_98",
      avatar: 'https://tse1.explicit.bing.net/th/id/OIP.PK4lHhCeeStm8qhedGTeVAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3',
      content: "ISPM !",
      image: 'https://tse3.mm.bing.net/th/id/OIP.yOdI9CkfkpsJsBh61eNZcAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', 
      totalReactions: 0,
    }
  ]);

  const handleReact = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, totalReactions: post.totalReactions + 1 }
          : post
      )
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
 
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <TouchableOpacity 
              activeOpacity={0.9} 
              onPress={() => navigation.navigate('PostDetails', { post: item })}
            >
              {/* Le contenu du post */}
              <Post 
                post={item} 
                onReact={() => handleReact(item.id)} 
              />
              
              {/* Indicateur de commentaires cliquable */}
              <View style={styles.commentActionArea}>
                <View style={styles.divider} />
                <View style={styles.commentInfo}>
                  <Icon name="chat-outline" size={20} color="#1DB954" />
                  <Text style={styles.commentText}>Voir ou ajouter un commentaire...</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Fond gris clair type Figma
  },
  listContent: {
    paddingVertical: 10,
    paddingBottom: 100,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    elevation: 1, // Ombre Android
    shadowColor: '#000', // Ombre iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  commentActionArea: {
    paddingHorizontal: 15,
    paddingBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: 10,
  },
  commentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentText: {
    marginLeft: 8,
    color: '#888',
    fontSize: 13,
    fontStyle: 'italic',
  },
});