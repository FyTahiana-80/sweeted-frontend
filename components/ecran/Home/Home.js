import React, { useState } from 'react';
import { FlatList, View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import indispensable pour le clic
import Post from '../../Post';

export default function Home() {
  const navigation = useNavigation(); // Initialisation de la navigation

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
          /* Enveloppe le Post pour le rendre cliquable */
          <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={() => navigation.navigate('PostDetails', { post: item })}
          >
            <Post 
              post={item} 
              onReact={() => handleReact(item.id)} 
            />
          </TouchableOpacity>
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
    backgroundColor: '#F5F5F5',
  },
  listContent: {
    paddingVertical: 10,
    paddingBottom: 100,
  },
});