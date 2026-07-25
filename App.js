import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, 
  StatusBar, ActivityIndicator, Image 
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import ProfileScreen from './components/profil';

// Imports pour la navigation et la gestion des zones sécurisées
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PostDetails from './ecran/PostDetails/PostDetails';


import HomeScreen from './ecran/tabs/index'; 
import Home from './ecran/Home/Home';

const Stack = createStackNavigator();

const COLORS = {
  primary: '#1DB954',
  background: '#FFFFFF',
  formBackground: '#F5F5F7',
  text: '#121212',
  textSecondary: '#6A6A6A',
  textInput: '#E8E8E8',
  toggleInactive: '#E0E0E0',
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isLoginView, setIsLoginView] = useState(true);
  const [password, setPassword] = useState('');
  const [matricule, setMatricule] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
    

      <View style={styles.contentContainer}>
        <View style={styles.topSection}>
          {/* Correction ici : Utilisation de blanc en dur pour plus de clarté */}
          <Image 
          source={require('./8ltEY16Q.jpg')} 
          style={styles.loadingLogo} 
          resizeMode="contain"
        />
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity 
              style={[styles.toggleButton, isLoginView && styles.activeToggle]} 
              onPress={() => setIsLoginView(true)}
            >
              <Text style={isLoginView ? styles.activeToggleText : styles.inactiveToggleText}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.toggleButton, !isLoginView && styles.activeToggle]} 
              onPress={() => setIsLoginView(false)}
            >
              <Text style={!isLoginView ? styles.activeToggleText : styles.inactiveToggleText}>Inscription</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.inputLabel}>Numéro matricule:</Text>
            <View style={styles.inputContainer}>
              <Icon name="account-outline" size={22} color={COLORS.textSecondary} />
              <TextInput
                style={styles.textInputStyle}
                placeholder="Ex: 37-40014/24"
                value={matricule}
                onChangeText={setMatricule}
              />
            </View>

            <Text style={styles.inputLabel}>Mot de passe:</Text>
            <View style={styles.inputContainer}>
              <Icon name="lock-outline" size={22} color={COLORS.textSecondary} />
              <TextInput
                style={styles.textInputStyle}
                placeholder="•••••"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Icon name={isPasswordVisible ? 'eye' : 'eye-off'} size={22} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Bouton de navigation vers l'écran principal */}
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.loginButtonText}>
              {isLoginView ? 'Se connecter' : "S'inscrire"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isAppLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Image 
          source={require('./assets/8ltEY16Q.jpg')} 
          style={styles.loadingLogo} 
          resizeMode="contain"
        />
        <ActivityIndicator size="large" color="#FFFFFF" style={{ marginTop: 20 }} />
      </View>
    );
  }

return (
    <SafeAreaProvider style={{ flex: 1 }}> 
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="accueil" component={Home} />
          <Stack.Screen name="PostDetails" component={PostDetails} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loadingContainer: { flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1DB954' },
  loadingLogo: { width: 150, height: 150, borderRadius: 20 },
  contentContainer: { flex: 1, marginHorizontal: 16, borderRadius: 28, overflow: 'hidden', borderWidth: 1, borderColor: '#EEE', marginBottom: 20 },
  topSection: { backgroundColor: COLORS.primary, padding: 30, alignItems: 'center' },
  bottomSection: { flex: 1, backgroundColor: COLORS.formBackground, padding: 20 },
  toggleContainer: { flexDirection: 'row', backgroundColor: COLORS.toggleInactive, borderRadius: 25, height: 50, marginBottom: 20 },
  toggleButton: { flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 25 },
  activeToggle: { backgroundColor: COLORS.primary },
  activeToggleText: { color: '#FFF', fontWeight: 'bold' },
  inactiveToggleText: { color: COLORS.text },
  form: { flex: 1 },
  inputLabel: { fontWeight: 'bold', marginBottom: 5, color: COLORS.text },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.textInput, borderRadius: 10, paddingHorizontal: 10, height: 50, marginBottom: 15 },
  textInputStyle: { flex: 1, marginLeft: 10 },
  loginButton: { backgroundColor: COLORS.primary, height: 55, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  loginButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
