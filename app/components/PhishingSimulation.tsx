import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ImageBackground } from 'react-native';

interface PhishingSimulationProps {
  onComplete?: () => void;
}

export default function PhishingSimulation({ onComplete }: PhishingSimulationProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [isPassed, setIsPassed] = useState(false);

  const handleChoice = (isReal: boolean) => {
    setIsPassed(isReal);
    setShowFeedback(true);
  };

  const feedbackPoints = [
    "• Email is from an unknown/foreign domain",
    "• Contains spelling and grammar mistakes",
    "• Uses generic 'Dear Smith' instead of your title",
    "• Closes with informal 'faithfully'",
    "• Urgent call to action with threatening tone"
  ];

  return (
    <ImageBackground 
      source={require('@/assets/images/Background10.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>IDENTIFY THE PHISHING EMAIL</Text>
        
        <Image 
          source={require('@/assets/images/Line5.png')} 
          style={[styles.divider, { tintColor: '#1D4B48' }]}
        />

        <View style={styles.contentContainer}>
          <View style={styles.emailContainer}>
            <Image 
              source={require('@/assets/images/Group1.png')}
              style={styles.emailImage}
              resizeMode="contain"
            />
            <Text style={styles.questionText}>IS THIS PHISHING EMAIL AUTHENTIC OR FAKE?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.buttonWrapper}
                onPress={() => handleChoice(false)}
              >
                <Image 
                  source={require('@/assets/images/Group2.png')}
                  style={styles.buttonImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.buttonWrapper}
                onPress={() => handleChoice(true)}
              >
                <Image 
                  source={require('@/assets/images/Group3.png')}
                  style={styles.buttonImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

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
                    Correct!
                  </Text>
                  <Text style={styles.modalSubtitle}>
                    Signs this was a phishing attempt:
                  </Text>
                  {feedbackPoints.map((point, index) => (
                    <Text key={index} style={styles.bulletPoint}>
                      {point}
                    </Text>
                  ))}
                </>
              ) : (
                <>
                  <Text style={[styles.modalTitle, { color: '#FF0000' }]}>
                    Incorrect
                  </Text>
                  <Text style={styles.modalSubtitle}>
                    This was a phishing email. Here's what to look for:
                  </Text>
                  {feedbackPoints.map((point, index) => (
                    <Text key={index} style={[styles.bulletPoint, { color: '#FF0000' }]}>
                      {point}
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
                <Text style={styles.checkButtonText}>Check Password</Text>
                <Image 
                  source={require('@/assets/images/CheckButton.png')}
                  style={styles.checkButtonImage}
                  resizeMode="contain"
                />
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
    justifyContent: 'center',
    padding: 20,
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
  },
  emailContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
  },
  emailImage: {
    width: '100%',
    height: 600,
    marginBottom: 0,
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
    width: '100%',
    height: 2,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1D4B48',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: -10,
    fontFamily: 'Italiana',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    gap: 40,
    marginTop: -10,
  },
  buttonWrapper: {
    width: 80,
    height: 80,
  },
  buttonImage: {
    width: '100%',
    height: '100%',
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 200,
  },
  checkButtonImage: {
    width: '100%',
    height: 50,
    marginTop: 10,
  },
  checkButtonText: {
    color: '#1D4B48',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Italiana',
    textAlign: 'center',
  },
}); 