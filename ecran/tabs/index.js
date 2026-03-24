import React, { useState } from 'react'; // Ajout de useState
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Home from "../Home/Home";



// 1. IMPORTE TON FICHIER SEARCH
import SearchScreen from '../Search'; 

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // 2. ÉTAT POUR LA RECHERCHE
  const [isSearching, setIsSearching] = useState(false);

  // 3. SI ON RECHERCHE : ON AFFICHE SEULEMENT LE SEARCHSCREEN
  if (isSearching) {
    return <SearchScreen onBack={() => setIsSearching(false)} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      
      {/* 1. HEADER FIXE (EN HAUT) */}
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
       <View>
  <Image 
    source={require('../../assets/ispm.png')}

    style={{ width: 70, height: 80, borderRadius: 20 }} 
  />
</View>
      </View>

      {/* 2. ZONE DE CONTENU (MILIEU QUI SCROLLE) */}
      <View style={{ flex: 1 }}>
        <Home /> 
      </View>

      {/* 3. BARRE VERTE FIXE (TOUT EN BAS) */}
      <View style={[styles.bottomNavContainer, { paddingBottom: insets.bottom }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity><Feather name="home" size={26} color="white" /></TouchableOpacity>
          
          {/* 4. ON ACTIVE LA RECHERCHE ICI */}
          <TouchableOpacity onPress={() => setIsSearching(true)}>
            <Feather name="search" size={26} color="white" />
          </TouchableOpacity>

          <View style={{ width: 60 }} />
          <TouchableOpacity ><Feather name="bell" size={26} color="white" /></TouchableOpacity>
          <TouchableOpacity 
          onPress={() => navigation.navigate('Profile')} 
          style={styles.navItem}
        ><Feather name="user" size={26} color="white" /></TouchableOpacity>
        </View>

        {/* BOUTON + FLOTTANT */}
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
  // ... (Garde tout le reste de tes styles identiques)
  logoText: { fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', color: '#000' },
  toggleContainer: { flexDirection: 'row', backgroundColor: '#3bcc7c', borderRadius: 20, borderWidth: 1, borderColor: '#198048' },
  toggleButton: { paddingVertical: 5, paddingHorizontal: 12, borderRadius: 20 },
  activeToggle: { backgroundColor: '#b5e8c4' },
  activeToggleText: { fontSize: 11, fontWeight: 'bold' },
  toggleText: { fontSize: 11 },
  bottomNavContainer: { backgroundColor: '#00b853', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 60 },
  fabWrapper: { position: 'absolute', top: -25, alignSelf: 'center' },
  fab: { backgroundColor: '#00b853', width: 55, height: 55, borderRadius: 28, justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: '#fff' },
});