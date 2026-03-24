import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const COLORS = {
  primary: '#1DB954',
  background: '#FFFFFF',
  formBackground: '#F5F5F7',
  text: '#121212',
  textSecondary: '#6A6A6A',
  textInput: '#E8E8E8',
  placeholder: '#9E9E9E',
  toggleInactive: '#E0E0E0',
};

const LoginScreen = () => {

const navigation = useNavigation(); // Garde une seule fois cette ligne

  const [isLoginView, setIsLoginView] = useState(true);
  const [password, setPassword] = useState('');
  const [matricule, setMatricule] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  // 1. On garde l'état pour le chargement
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // 2. La fonction qui se déclenche au clic
  const handleLogin = () => {
    setIsLoggingIn(true); // On affiche le chargement

    // On attend 2 secondes avant de changer d'interface
    setTimeout(() => {
      setIsLoggingIn(false); 
      navigation.navigate("Home"); 
    }, 2000);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

    <SafeAreaView style={styles.container}>
      {/* ... ton code de logo et formulaire ... */}

      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={handleLogin} 
        disabled={isLoggingIn} 
      >
        {isLoggingIn ? (
       
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.loginButtonText}>
            {isLoginView ? 'Se connecter' : "S'inscrire"}
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIconContainer}>
          <Icon name="close" size={26} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sweeted</Text>
        <View style={styles.headerRightIcons}>
          <TouchableOpacity style={styles.headerIconContainer}>
            <Icon name="magnify" size={26} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconContainer}>
            <Icon name="file-document-outline" size={26} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconContainer}>
            <Icon name="dots-vertical" size={26} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
 
        <View style={styles.topSection}>
          <View style={styles.logoContainer}>
            <Icon name="leaf" size={40} color={COLORS.background} />
            <Text style={styles.logoText}>Sweeted</Text>
          </View>
          <Text style={styles.ispmText}>ISPM</Text>
        </View>

    
        <View style={styles.bottomSection}>

          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                isLoginView ? styles.activeToggle : styles.inactiveToggle,
              ]}
              onPress={() => setIsLoginView(true)}
            >
              <Text style={isLoginView ? styles.activeToggleText : styles.inactiveToggleText}>
                Connexion
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                !isLoginView ? styles.activeToggle : styles.inactiveToggle,
              ]}
              onPress={() => setIsLoginView(false)}
            >
              <Text style={!isLoginView ? styles.activeToggleText : styles.inactiveToggleText}>
                Inscription
              </Text>
            </TouchableOpacity>
          </View>


          <View style={styles.form}>
            <Text style={styles.inputLabel}>Numéro matricule:</Text>
            <View style={styles.inputContainer}>
              <Icon name="account-outline" size={22} color={COLORS.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.textInputStyle} 
                placeholder="Ex: 37-40014/24"
                placeholderTextColor={COLORS.placeholder}
                keyboardType="default" 
                value={matricule}
                onChangeText={setMatricule}
              />
            </View>

            <Text style={styles.inputLabel}>Mot de passe:</Text>
            <View style={styles.inputContainer}>
              <Icon name="lock-outline" size={22} color={COLORS.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.textInputStyle}
                placeholder="• • • • •"
                placeholderTextColor={COLORS.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Icon
                  name={isPasswordVisible ? 'eye' : 'eye-off-outline'}
                  size={22}
                  color={COLORS.textSecondary}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        <TouchableOpacity 
  style={styles.loginButton} 
  onPress={() => navigation.navigate("HomeScreen")} 
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconContainer: {
    padding: 8,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 20,
  },
  topSection: {
    backgroundColor: COLORS.primary,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.background,
    marginLeft: 10,
  },
  ispmText: {
    fontSize: 18,
    color: COLORS.background,
    fontWeight: '600',
  },
  bottomSection: {
    backgroundColor: COLORS.formBackground,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.toggleInactive,
    borderRadius: 30,
    height: 50,
    alignItems: 'center',
    marginBottom: 30,
  },
  toggleButton: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  activeToggle: {
    backgroundColor: COLORS.primary,
  },
  inactiveToggle: {
    backgroundColor: 'transparent',
  },
  activeToggleText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inactiveToggleText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'normal',
  },
  form: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.textInput,
    borderRadius: 12,
    height: 56,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInputStyle: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
  },
  eyeIcon: {
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;