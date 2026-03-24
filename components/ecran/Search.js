import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  FlatList, SafeAreaView, Image 
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

// 1. DONNÉES DE L'HISTORIQUE
const INITIAL_HISTORY = [
  { id: '1', title: 'Comment réviser le Java', type: 'text' }, // Simple phrase
  { id: '2', title: 'Olona Fotsiny', type: 'user', avatar: 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg' }, // Un profil
  { id: '3', title: 'Smatchin', type: 'page' },
  { id: '4', title: 'Avatar_98', type: 'user', avatar: 'https://tse1.explicit.bing.net/th/id/OIP.PK4lHhCeeStm8qhedGTeVAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3' }, // Un autre profil
  { id: '5', title: 'Kevin', type: 'user', avatar: 'https://i.pinimg.com/originals/fd/06/01/fd060115ee1e540b89c912d08a43b3f9.jpg' },
];

export default function SearchScreen({ onBack }) {
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false); // État pour déplier la liste

  // On filtre la liste : 4 éléments si "Voir tout" n'est pas cliqué, sinon toute la liste
  const dataToDisplay = showAll ? INITIAL_HISTORY : INITIAL_HISTORY.slice(0, 4);

  // 2. RENDU D'UNE LIGNE DE RECHERCHE
  const renderSearchItem = ({ item }) => (
    <TouchableOpacity style={styles.itemRow}>
      <View style={styles.itemLeft}>
        <View style={styles.iconContainer}>
          {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
          ) : (
            <Feather name="clock" size={18} color="#666" />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
          {item.avatar && <Text style={styles.itemSubtitle}>Voir le profil</Text>}
        </View>
      </View>
      {/* Bouton pour supprimer l'entrée (Croix) */}
      <TouchableOpacity style={styles.closeBtn}>
        <Ionicons name="close" size={20} color="#999" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* HEADER : S'adapte proportionnellement à l'écran */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        
        <View style={styles.searchBarWrapper}>
          <Ionicons name="search" size={18} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Rechercher sur Sweeted"
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            autoFocus
            returnKeyType="search"
          />
        </View>
      </View>

      {/* SECTION RÉCENTES */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Récentes</Text>
        <TouchableOpacity onPress={() => setShowAll(!showAll)}>
          <Text style={styles.seeAllBtn}>
            {showAll ? "Réduire" : "Voir tout"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* LISTE DES RECHERCHES */}
      <FlatList
        data={dataToDisplay}
        keyExtractor={(item) => item.id}
        renderItem={renderSearchItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#fff' },
  
  // Header Adaptatif (Flexbox)
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  backBtn: { padding: 5 },
  searchBarWrapper: {
    flex: 1, // Prend 100% de la largeur restante du téléphone
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    borderRadius: 25,
    height: 40,
    marginLeft: 10,
    paddingHorizontal: 12,
  },
  searchIcon: { marginRight: 8 },
  input: { flex: 1, fontSize: 16, color: '#000', paddingVertical: 0 },

  // Titres
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  sectionTitle: { fontSize: 17, fontWeight: 'bold' },
  seeAllBtn: { color: '#0064d2', fontSize: 14, fontWeight: '600' },

  // Lignes de l'historique
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center', flex: 0.9 },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  avatarImage: { width: '100%', height: '100%' },
  textContainer: { flex: 1 },
  itemTitle: { fontSize: 16, color: '#1c1e21' },
  itemSubtitle: { fontSize: 12, color: '#65676b' },
  closeBtn: { padding: 5 }
});