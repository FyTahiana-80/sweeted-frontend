import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Post from '../../Post'; // On réutilise ton composant existant

export default function PostDetails({ route }) {
  const { post } = route.params;

  // Exemple de données de commentaires (à lier à ton post plus tard)
  const comments = [
    { id: 'c1', user: 'User1', text: 'Trop vrai ! 😂' },
    { id: 'c2', user: 'User2', text: 'Bon courage pour le devoir.' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<Post post={post} />} // Le post s'affiche en haut
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Text style={styles.commentUser}>{item.user}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  commentItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  commentUser: { fontWeight: 'bold', marginBottom: 2 },
});