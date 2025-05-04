import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CybersecurityRelationsProps {
  role: string;
  onComplete: () => void;
}

export default function CybersecurityRelations({ role, onComplete }: CybersecurityRelationsProps) {
  const getRoleContent = () => {
    switch(role.toLowerCase()) {
      case 'doctor':
        return {
          title: "How Cybersecurity Relates to Doctors",
          points: [
            "• Safeguarding patient information is important to your daily practice",
            "• Electronic health records require secure access management",
            "• Medical devices must be protected from cyber threats as rapid adoption of technology has increased security risks",
            "• Compliance with NHS standards of data protection (Refer to NHS Website for more information)",
            "• Take Breaks! Cybercriminals prance on employee negligence, which can be dervied from overworking!"
          ]
        };
      case 'nurse':
        return {
          title: "How Cybersecurity Relates to Nurses",
          points: [
            "• Direct access to confidential patient information",
            "• Workstation security is important to protect patient data, ensure that you are logging out of your sessions ",
            "• Never leave your device unattended, cybercriminals can install malware.",
            "• Communication security with other staff promotes cyber",
          ]
        };
      case 'admin':
        return {
          title: "How Cybersecurity Relates to Admins",
          points: [
            "• Managing system access rights",
            "• Learn about phishing attacks and how to recognise them! See the learning modules",
            "• Cybersecurity starts with you, visit the resources sections to learn more about data protection",
            "• 95% of cyber attacks are due to Human Error! Be that 5% that stops it!",
          ]
        };
      case 'student':
        return {
          title: "How Cybersecurity Relates to Students",
          points: [
            "• Approach placements with an efficaous attitude to learn and apply your knowledge!",
            "• Understanding data protection and privacy is important to ensure compliance",
            "• Following adequate security protocols and report to the chain of command! Do not take cyber risks!",
            "• Ask Questions! To Ask is to Learn!",
            "• The only proper way to eliminate bad habits is to replace them with good ones!  "
          ]
        };
      case 'specialist':
        return {
          title: "How Cybersecurity Relates to Specialists",
          points: [
            "• Managing system access rights",
            "• Protecting administrative databases through updated security policies",
            "• Promote a cybersecurity culture by educating non-technical staff!",
            "• Perform regular security audits and keep updated with the latest cybersecurity trends",
            "• Coordinating security training with your staff to ensure that employees are keeping aware and not becoming complacent!"
          ]
        };
      default:
        return {
          title: "How Cybersecurity Relates to Healthcare Professionals",
          points: [
            "• Protecting patient information",
            "• Secure system access",
            "• Device and equipment security",
            "• Communication protection",
            "• NHS security compliance"
          ]
        };
    }
  };

  const content = getRoleContent();

  return (
    <ImageBackground 
      source={require('@/assets/images/Background10.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={onComplete}
          >
            <Ionicons name="arrow-back" size={24} color="#1D4B48" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.title}>{content.title}</Text>
          {content.points.map((point, index) => (
            <Text key={index} style={styles.bulletPoint}>{point}</Text>
          ))}
        </ScrollView>
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#1D4B48',
    fontSize: 18,
    marginLeft: 5,
    fontFamily: 'Italiana',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D4B48',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Italiana',
  },
  bulletPoint: {
    fontSize: 16,
    color: '#1D4B48',
    marginBottom: 15,
    fontFamily: 'Italiana',
  },
}); 