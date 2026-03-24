import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TextInput, 
  TouchableOpacity, KeyboardAvoidingView, Platform, Image 
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Post from '../../components/Post';

export default function PostDetails({ route }) {
  const { post } = route.params;
  const [newComment, setNewComment] = useState('');
  
  // On met les commentaires dans un state pour pouvoir en ajouter
  const [comments, setComments] = useState([
    { id: 'c1', user: 'Olonafotsiny', text: 'Trop vrai ! 😂', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 'c2', user: 'Kevin', text: 'Bon courage pour le devoir.', avatar: 'https://i.pravatar.cc/150?u=2' },
  ]);

  const addComment = () => {
    if (newComment.trim().length > 0) {
      const commentObj = {
        id: Date.now().toString(),
        user: "Moi", // Ici tu pourras mettre le vrai nom de l'utilisateur connecté
        text: newComment,
        avatar: 'https://i.pravatar.cc/150?u=me', 
      };
      setComments([commentObj, ...comments]); // Ajoute le comm en haut de la liste
      setNewComment(''); // Vide le champ
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90} // Ajuste selon la taille de ton header
    >
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Post post={post} />
            <Text style={styles.sectionTitle}>Commentaires ({comments.length})</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Image source={{ uri: item.avatar }} style={styles.commentAvatar} />
            <View style={styles.commentTextContainer}>
              <Text style={styles.commentUser}>{item.user}</Text>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />

      {/* Barre de saisie dynamique en bas */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Écrire un commentaire..."
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendButton, !newComment.trim() && styles.sendButtonDisabled]} 
            onPress={addComment}
            disabled={!newComment.trim()}
          >
            <Icon name="send" size={24} color={newComment.trim() ? "#1DB954" : "#ccc"} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerContainer: { borderBottomWidth: 1, borderBottomColor: '#F0F0F0', marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginBottom: 10, color: '#333' },
  listContent: { paddingBottom: 20 },
  
  // Style des commentaires
  commentItem: { 
    flexDirection: 'row', 
    paddingHorizontal: 15, 
    paddingVertical: 12, 
    alignItems: 'flex-start' 
  },
  commentAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 12 },
  commentTextContainer: { flex: 1, backgroundColor: '#F2F3F5', padding: 10, borderRadius: 15 },
  commentUser: { fontWeight: 'bold', fontSize: 13, marginBottom: 2, color: '#1DB954' },
  commentText: { fontSize: 14, color: '#444', lineHeight: 18 },

  // Barre de saisie en bas
  inputWrapper: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#FFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    paddingVertical: 8,
    fontSize: 15,
  },
  sendButton: { marginLeft: 10, padding: 5 },
  sendButtonDisabled: { opacity: 0.5 },
});
