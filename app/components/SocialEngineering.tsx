import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SocialEngineeringProps {
  onComplete: () => void;
}

export default function SocialEngineering({ onComplete }: SocialEngineeringProps) {
  const content = {
    title: "Social Engineering Awareness",
    sections: [
      {
        title: "What is Social Engineering?",
        points: [
          "• Manipulation techniques to gain unauthorized access",
          "• Exploits human psychology rather than technical vulnerabilities",
          "• Common in healthcare due to high-value data"
        ]
      },
      {
        title: "Common Tactics",
        points: [
          "• Phishing emails impersonating colleagues",
          "• Phone calls pretending to be IT support",
          "• Impersonation of patients or staff",
          "• Tailgating into restricted areas"
        ]
      },
      {
        title: "Prevention Tips",
        points: [
          "• Verify identities through official channels",
          "• Never share passwords or access codes",
          "• Be cautious of unusual requests",
          "• Report suspicious activities immediately"
        ]
      },
      {
        title: "NHS Guidelines",
        points: [
          "• Follow NHS Data Security Standards",
          "• Complete regular security training",
          "• Use secure communication methods",
          "• Maintain physical security protocols"
        ]
      }
    ]
  };

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
          {content.sections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.points.map((point, pointIndex) => (
                <Text key={pointIndex} style={styles.bulletPoint}>{point}</Text>
              ))}
            </View>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D4B48',
    marginBottom: 10,
    fontFamily: 'Italiana',
  },
  bulletPoint: {
    fontSize: 16,
    color: '#1D4B48',
    marginBottom: 8,
    fontFamily: 'Italiana',
  },
}); 