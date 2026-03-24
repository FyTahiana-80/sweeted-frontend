import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Pressable } from 'react-native';

export default function ReactionButton({ total, topEmojis = [], onReact }) {
  const [showMenu, setShowMenu] = useState(false);
  const emojis = ["❤️", "😭", "😂", "🤦‍♀️", "😡"];

  const handleSelect = (emoji) => {
    setShowMenu(false);
    onReact(); //  incrémentation du total
  };

  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        {topEmojis.slice(0, 3).map((emoji, index) => (
          <Text key={index} style={[styles.topEmoji, { zIndex: 3 - index }]}>
            {emoji}
          </Text>
        ))}
        {total > 0 && <Text style={styles.totalText}>{total}</Text>}
      </View>

      {/* Le bouton de reaction flottant */}
      <TouchableOpacity 
        onLongPress={() => setShowMenu(true)} 
        delayLongPress={300}
        style={styles.mainButton}
        activeOpacity={0.7}
      >
        <Text style={styles.reactText}>Réagir</Text>
      </TouchableOpacity>

    
      <Modal 
        transparent 
        visible={showMenu} 
        animationType="fade" 
        onRequestClose={() => setShowMenu(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setShowMenu(false)}>
   
          <View style={styles.popoverContainer}>
            <View style={styles.popover}>
              {emojis.map((emoji) => (
                <TouchableOpacity key={emoji} onPress={() => handleSelect(emoji)} style={styles.emojiWrapper}>
                  <Text style={styles.emoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  topEmoji: {
    fontSize: 20, 
    marginRight: -4, 
  },
  totalText: {
    fontWeight: '600',
    color: '#65676b',
    fontSize: 14,
    marginLeft: 10, // Espace après les emojis
  },
  mainButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
  },
  reactText: {
    fontWeight: '600',
    color: '#65676b',
    fontSize: 13,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  // Conteneur absolu pour faire flotter le menu
  popoverContainer: {
    position: 'absolute',
    bottom: 150, 
    left: 20, 
    zIndex: 10,
  },
  popover: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  emojiWrapper: {
    marginHorizontal: 5,
  },
  emoji: {
    fontSize: 32,
  }
});