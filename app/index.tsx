import { StyleSheet, ImageBackground, Pressable, Animated, Platform, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/components/Themed';
import { useFonts } from 'expo-font';
import { useState } from 'react';

export default function Screen() {
  const [fontsLoaded] = useFonts({
    'Italiana': require('@/assets/fonts/Italiana.ttf'),
  });

  const fadeAnim = new Animated.Value(0);
  const [isPressed, setIsPressed] = useState(false);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleStartPress = () => {
    router.push({
      pathname: "role-selection" as any,
    });
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.mainContainer}>
      <ImageBackground 
        source={require('@/assets/images/Background.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <ImageBackground
            source={require('@/assets/images/Logo.png')}
            style={styles.logoImage}
          />
          
          <ImageBackground
            source={require('@/assets/images/DividerHome1.png')}
            style={styles.Divider1}
          />
          
          <Text style={styles.cyberText}>CYBERCARE</Text>
          <Text style={styles.sloganText}>Bridging the gap between healthcare and cyber security.</Text>

          <Pressable
            style={styles.startButton}
            onPress={() => router.push({
              pathname: "role-selection" as any,
            })}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
          >
            <ImageBackground
              source={require('@/assets/images/StartButton.png')}
              style={styles.startButtonImage}
            >
              {isPressed && (
                <View style={styles.gradientOverlay}>
                  <ImageBackground
                    source={require('@/assets/images/GradientHover.png')}
                    style={styles.startButtonImage}
                  />
                </View>
              )}
              <Text style={styles.startText}>START</Text>
            </ImageBackground>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#286964',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },

  startText: {
    fontFamily: 'Italiana',
    fontSize: 30,
    color: 'white',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [
      { translateX: -40 }, // Half of text width (approximate)
      { translateY: -20 }, // Half of text height (approximate)
    ],
    zIndex: 100,
    textAlign: 'center',
  },

  sloganText: {
    fontFamily: 'Italiana',
    fontSize: 15,
    color: 'white',
    position: 'absolute',
    bottom: 335 ,  // Adjust this value to position above the button
    zIndex: 100,  
    textAlign: 'center',
  },

  logoImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 340,
    left: '50%',
    marginLeft: -50, // Half of width (121/2) to center
    marginBottom: 20,
  },

  Divider1: {
    width: 320,
    height: 10,
    position: 'absolute',
    top: 500, // Position below logo
    left: '50%',
    marginLeft: -165, // Half of width (330/2) to center
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#006400', // Dark green color
    marginBottom: 30,
  },

  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7, // Adjust transparency here
  },

  startButton: {
    position: 'absolute',
    bottom: 100,
    width: 280,  // Match container to image size
    height: 59,  // Match container to image size
  },
  startButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',  // Ensures image isn't cut off
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cyberText: {
    fontFamily: 'Italiana',
    fontSize: 40,
    color: 'white',
    position: 'absolute',
    top: 450, // Position below divider
    textAlign: 'center',
  },

});
