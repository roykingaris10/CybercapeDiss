import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ImageBackground, TextInput } from 'react-native';

interface PasswordSimulationProps {
  onComplete?: () => void;
}

export default function PasswordSimulation({ onComplete }: PasswordSimulationProps) {
  const [password, setPassword] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [requirements, setRequirements] = useState<string[]>([]);

  const validatePassword = () => {
    const hasCapital = /[A-Z]/.test(password);
    const hasNumbers = (password.match(/\d/g) || []).length >= 2;
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasLength = password.length >= 10;

    const newRequirements = [];
    if (!hasCapital) newRequirements.push("• Need at least 1 capital letter");
    if (!hasNumbers) newRequirements.push("• Need at least 2 numbers");
    if (!hasSpecial) newRequirements.push("• Need at least 1 special character");
    if (!hasLength) newRequirements.push("• Need at least 10 characters");

    setRequirements(newRequirements);
    setIsPassed(newRequirements.length === 0);
    setShowFeedback(true);
  };

  const successPoints = [
    "• Strong passwords are your first line of defense",
    "• Unique passwords prevent multiple account breaches",
    "• Complex passwords take years to crack",
    "• Regular password updates maintain security"
  ];

  return (
    <ImageBackground 
      source={require('@/assets/images/Background10.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>CREATE A STRONG PASSWORD</Text>
        
        <Image 
          source={require('@/assets/images/Line5.png')} 
          style={[styles.divider, { tintColor: '#1D4B48' }]}
        />

        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <Image 
              source={require('@/assets/images/Password.png')}
              style={styles.passwordBox}
              resizeMode="contain"
            />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="white"
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={validatePassword}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.submitButtonText}>Check Password</Text>
              <Image 
                source={require('@/assets/images/CheckButton.png')}
                style={styles.checkButton}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>

        <Image 
          source={require('@/assets/images/Line5.png')} 
          style={[styles.divider, { tintColor: '#1D4B48' }]}
        />

        <Modal
          visible={showFeedback}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {isPassed ? (
                <>
                  <Text style={[styles.modalTitle, { color: '#1D4B48' }]}>
                    Excellent Password Choice!
                  </Text>
                  <Text style={styles.modalSubtitle}>
                    Why strong passwords matter:
                  </Text>
                  {successPoints.map((point, index) => (
                    <Text key={index} style={styles.bulletPoint}>
                      {point}
                    </Text>
                  ))}
                </>
              ) : (
                <>
                  <Text style={[styles.modalTitle, { color: '#FF0000' }]}>
                    Password Requirements Not Met
                  </Text>
                  <Text style={styles.modalSubtitle}>
                    Your password needs:
                  </Text>
                  {requirements.map((requirement, index) => (
                    <Text key={index} style={[styles.bulletPoint, { color: '#FF0000' }]}>
                      {requirement}
                    </Text>
                  ))}
                </>
              )}

              <TouchableOpacity 
                style={[styles.closeButton, { 
                  backgroundColor: isPassed ? '#1D4B48' : '#FF0000'
                }]}
                onPress={() => {
                  if (isPassed) {
                    if (onComplete) onComplete();
                  }
                  setShowFeedback(false);
                }}
              >
                <Text style={styles.closeButtonText}>
                  {isPassed ? 'Continue' : 'Try Again'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D4B48',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Italiana',
  },
  divider: {
    width: '80%',
    height: 2,
    marginVertical: 20,
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  passwordBox: {
    width: '100%',
    height: 60,
  },
  input: {
    position: 'absolute',
    width: '80%',
    height: '100%',
    fontSize: 16,
    color: 'white',
    paddingHorizontal: 15,
    top: 0,
  },
  submitButton: {
    alignItems: 'center',
    marginTop: 20,
    height: 50,
    width: 238,
  },
  buttonContent: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  submitButtonText: {
    position: 'absolute',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Italiana',
    zIndex: 1,
  },
  checkButton: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxWidth: 500,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Italiana',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#1D4B48',
    marginBottom: 15,
    textAlign: 'center',
  },
  bulletPoint: {
    fontSize: 14,
    color: '#1D4B48',
    marginBottom: 8,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  closeButton: {
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    width: 200,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Italiana',
  },
}); 