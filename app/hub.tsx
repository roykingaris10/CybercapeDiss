import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text } from '@/components/Themed';
import { useLocalSearchParams, router } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

// Import components
import LearningModules from './components/LearningModules';
import ShockMe from './components/ShockMe';
import Chatbot from './components/Chatbot';

// Create the tab navigator
const Tab = createMaterialTopTabNavigator();

// Healthcare-themed titles based on progress
const healthcareTitles = {
  1: "Medical Student",
  2: "Resident",
  3: "Junior Doctor",
  4: "Senior Doctor",
  5: "Consultant",
  6: "Department Head",
  7: "Hospital Director",
  8: "Medical Director",
  9: "Chief Medical Officer",
  10: "Healthcare Guardian",
  90: "Cyber Medicine Master",
  95: "Digital Health Expert",
  100: "Healthcare Cybersecurity Legend"
};

export default function Hub() {
  const { role } = useLocalSearchParams();
  const [progress, setProgress] = useState(0); // Changed from 0.15 to 0
  const [level, setLevel] = useState(1);
  const [title, setTitle] = useState(healthcareTitles[1]);
  
  const [fontsLoaded] = useFonts({
    'Italiana': require('@/assets/fonts/Italiana.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (!role) {
    router.replace({
      pathname: "role-selection" as any,
    });
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('@/assets/images/Background.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.headerContainer}>
          <Text style={[styles.headerTitle, { fontFamily: 'Italiana' }]}>CYBERCARE</Text>
          <Text style={[styles.roleText, { fontFamily: 'Italiana' }]}>
            {role.toString().toUpperCase()} Dashboard
          </Text>
          <View style={styles.progressContainer}>
            <Text style={[styles.levelTitle, { fontFamily: 'Italiana' }]}>{title}</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
            </View>
            <Text style={[styles.levelText, { fontFamily: 'Italiana' }]}>Level {level}</Text>
          </View>
        </View>

        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabLabel,
            tabBarIndicatorStyle: styles.tabIndicator,
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
            tabBarShowIcon: false,
            tabBarPressColor: 'transparent',
            tabBarPressOpacity: 1,
            tabBarItemStyle: styles.tabItem,
            tabBarIndicatorContainerStyle: styles.tabIndicatorContainer,
            tabBarScrollEnabled: false,
            animationEnabled: true,
            swipeEnabled: false,
          }}
          initialRouteName="Learning"
        >
          <Tab.Screen 
            name="Learning"
            options={{ title: 'Learning' }}
            children={() => <LearningModules role={role as string} />}
          />
          <Tab.Screen 
            name="ShockMe"
            options={{ title: 'ShockMe' }}
            children={() => <ShockMe role={role as string} />}
          />
          <Tab.Screen 
            name="Chatbot"
            options={{ title: 'AI Assistant' }}
            children={() => <Chatbot role={role as string} />}
          />
        </Tab.Navigator>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#286964',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  roleText: {
    fontSize: 18,
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 15,
  },
  progressContainer: {
    width: '80%',
    alignItems: 'center',
  },
  levelTitle: {
    fontSize: 20,
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  levelText: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  tabBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    marginTop: -10,
  },
  tabItem: {
    paddingVertical: 0,
    height: 40,
  },
  tabLabel: {
    fontFamily: 'Italiana',
    fontSize: 14,
    textTransform: 'none',
  },
  tabIndicator: {
    backgroundColor: 'white',
    height: 2,
  },
  tabIndicatorContainer: {
    backgroundColor: 'transparent',
  },
}); 