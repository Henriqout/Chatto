import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';

const sendEmotionToBackend = async (emotion) => {
  try {
    const response = await axios.post('http://localhost:3000/emotion', { emotion });
    console.log('Emoção salva no backend:', response.data);
  } catch (error) {
    console.error('Error to send emotion to backend:', error);
  }
};

// No seu componente onde a emoção é selecionada
const handleEmotionPress = (emotion) => {
  setSelectedEmotion(emotion);
  sendEmotionToBackend(emotion); // 
};

const App = () => {
  const wheelRef = useRef([]);

  const emotions = [
    { label: 'Happy', emoji: '😊', color: '#ffd700' },
    { label: 'Sad', emoji: '😢', color: '#4682b4' }, 
    { label: 'Sadness', emoji: '😔', color: '#03071e' }, 
    { label: 'Upset', emoji: '😒', color: '#8D99AE' }, 
    { label: 'Loving', emoji: '😍', color: '#EF233C' }, 
    { label: 'Notalk', emoji: '🤐', color: '#9d4edd' }, 
    { label: 'seasick', emoji: '🤢', color: '#006400' }, 
    { label: 'Scared', emoji: '😨', color: '#FF5733' }, 
  ];

  const [selectedEmotion, setSelectedEmotion] = useState(null);

  useEffect(() => {
    if (wheelRef.current) {
      const numEmotions = emotions.length;
      const angleIncrement = (2 * Math.PI) / numEmotions;
      const radius = 100; 
      emotions.forEach((emotion, index) => {
        const angle = index * angleIncrement;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        wheelRef.current[index].transitionTo(
          {
            transform: [{ translateX: x }, { translateY: y }],
          },
          2500 // tempo de transição
        );
      });
    }
  }, [emotions]);

  const handleEmotionPress = (emotion) => {
    setSelectedEmotion(emotion);
  };

  return (
    <View style={styles.container}>
      <Animatable.Text animation="bounceIn" duration={2000} style={styles.title}>
        C h a t t o
      </Animatable.Text>
      <Animatable.Text animation="bounceIn" duration={1500} delay={1000} style={styles.question}>
        Como você se sente?
      </Animatable.Text>
      <View style={styles.wheelContainer}>
        {emotions.map((item, index) => (
          <Animatable.View
            ref={(ref) => (wheelRef.current[index] = ref)}
            key={index}
            style={[styles.emotionButton, styles[item.label + 'Button'], { top: '40%', left: '38.5%' }]}
            animation="bounceIn"
            duration={2000}
            delay={500}
          >
            <TouchableOpacity onPress={() => handleEmotionPress(item.label)}>
              <View style={[styles.circle, { backgroundColor: item.color }]} />
              <Text>{item.emoji}</Text>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    position: 'absolute',
    top: '10%', 
  },
  question: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20,
    position: 'relative',
    top: '-5%', 
  },
  wheelContainer: {
    position: 'relative',
    width: 200,
    height: 200, 
  },
  emotionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  circle: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', 
    position: 'absolute',
    top: -17, 
    left: -19,
  },
});

export default App;
