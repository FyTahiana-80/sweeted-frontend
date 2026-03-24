import React, { useState } from 'react'; // Importation de useState ajoutée
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Importation de tes contenus
import Home from "../Home/Home";
import SearchScreen from '../Search'; // On remonte d'un dossier (..) pour trouver Search.js

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  
  // ÉTAT : 'home' pour le flux de posts, 'search' pour la recherche
  const [activeScreen, setActiveScreen] = useState('home');

  // CONDITION : Si on est en mode recherche, on affiche SearchScreen
  if (activeScreen === 'search') {
    return <SearchScreen onBack={() => setActiveScreen('home')} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      
      {/* 1. HEADER VERT */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.logoText}>Sweeted</Text> 
        <View style={styles.toggleContainer}>
          <TouchableOpacity style={[styles.toggleButton, styles.activeToggle]}>
            <Text style={styles.activeToggleText}>Etudiant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleButton}>
            <Text style={styles.toggleText}>Officiel</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.avatarIconWrapper}>
            <Ionicons name="person-outline" size={20} color="#666" />
        </View>
      </View>

      {/* 2. CONTENU (FLUX HOME) */}
      <View style={{ flex: 1 }}>
        <Home /> 
      </View>

      {/* 3. BARRE DE NAVIGATION VERTE */}
      <View style={[styles.bottomNavContainer, { paddingBottom: insets.bottom }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => setActiveScreen('home')}>
            <Feather name="home" size={26} color="white" />
          </TouchableOpacity>

          {/* CLIC SUR LA LOUPE : Active l'écran de recherche */}
          <TouchableOpacity onPress={() => setActiveScreen('search')}>
            <Feather name="search" size={26} color="white" />
          </TouchableOpacity>

          <View style={{ width: 60 }} />

          <TouchableOpacity><Feather name="bell" size={26} color="white" /></TouchableOpacity>
          <TouchableOpacity><Feather name="user" size={26} color="white" /></TouchableOpacity>
        </View>

        {/* BOUTON + */}
        <View style={styles.fabWrapper}>
          <TouchableOpacity style={styles.fab}>
            <Ionicons name="add" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

export default HomeScreen;

// --- Garde tes styles styles en dessous ---
const styles = StyleSheet.create({
  header: {
      backgroundColor: '#00b853', 
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15, 
      paddingBottom: 15,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20 },
  logoText: { fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', color: '#000' },
  toggleContainer: { flexDirection: 'row', backgroundColor: '#3bcc7c', borderRadius: 20, borderWidth: 1, borderColor: '#198048' },
  toggleButton: { paddingVertical: 5, paddingHorizontal: 12, borderRadius: 20 },
  activeToggle: { backgroundColor: '#b5e8c4' },
  activeToggleText: { fontSize: 11, fontWeight: 'bold' },
  toggleText: { fontSize: 11 },
  avatarIconWrapper: { backgroundColor: '#e6ccff', borderRadius: 20, padding: 6 },
  bottomNavContainer: { backgroundColor: '#00b853', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 60 },
  fabWrapper: { position: 'absolute', top: -25, alignSelf: 'center' },
  fab: { backgroundColor: '#00b853', width: 55, height: 55, borderRadius: 28, justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: '#fff' },
});