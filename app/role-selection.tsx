import { StyleSheet, Pressable, View, ImageBackground, Image } from 'react-native';
import { Text } from '@/components/Themed';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

const roles = [
  { id: 'doctor', title: 'DOCTOR' },
  { id: 'nurse', title: 'NURSE' },
  { id: 'admin', title: 'ADMIN' },
  { id: 'student', title: 'STUDENT' },
  { id: 'specialist', title: 'IT SPECIALIST' },
];

export default function RoleSelection() {
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

  const handleRoleSelect = (roleId: string) => {
    // Navigate to the hub page with the selected role
    router.push({
      pathname: "hub" as any,
      params: { role: roleId }
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('@/assets/images/Background.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.headerContainer}>
          <Text style={[styles.headerTitle, { fontFamily: 'Italiana' }]}>CYBERCARE</Text>
          <Image 
            source={require('@/assets/images/DividerHome1.png')}
            style={styles.divider}
          />
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.rolesContainer}>
            {roles.map((role) => (
              <Pressable
                key={role.id}
                style={styles.roleButton}
                onPress={() => handleRoleSelect(role.id)}
              >
                <ImageBackground
                  source={require('@/assets/images/RoleButton.png')}
                  style={styles.roleButtonImage}
                >
                  <Text style={[styles.roleButtonText, { fontFamily: 'Italiana' }]}>{role.title}</Text>
                </ImageBackground>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.footerContainer}>
          <Image 
            source={require('@/assets/images/DividerHome1.png')}
            style={styles.divider}
          />
          <Text style={styles.descriptionText}>
            Choose your current job role for a personalised experience
          </Text>
          <Pressable 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={[styles.backButtonText, { fontFamily: 'Italiana' }]}>BACK</Text>
          </Pressable>
        </View>
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
    paddingTop: 60,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 48,
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 40,
  },
  rolesContainer: {
    width: 360,
    gap: 25,
  },
  footerContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 40,
  },
  descriptionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
    fontFamily: 'Italiana',
  },
  divider: {
    width: '80%',
    height: 2,
    tintColor: 'white',
  },
  roleButton: {
    width: 360,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleButtonImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleButtonText: {
    color: 'white',
    fontSize: 26,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
}); 