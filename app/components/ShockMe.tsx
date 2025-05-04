import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Database of real cybersecurity incidents in healthcare
const cybersecurityIncidents = [
  {
    id: 1,
    title: "WannaCry Ransomware Attack",
    date: "May 2017",
    description: "The WannaCry ransomware attack affected over 200,000 computers across 150 countries, including the UK's National Health Service (NHS). The attack caused estimated damages of $4 billion and disrupted healthcare services for days.",
    impact: "Critical",
    source: "NHS Digital",
    imageName: "anthem"
  },
  {
    id: 2,
    title: "Anthem Data Breach",
    date: "February 2015",
    description: "Health insurance company Anthem suffered a massive data breach exposing the personal information of nearly 79 million people, including names, social security numbers, and medical IDs. The breach cost the company over $115 million in settlement fees.",
    impact: "Severe",
    source: "U.S. Department of HHS",
    imageName: "anthem"
  },
  {
    id: 3,
    title: "NotPetya Attack on Merck",
    date: "June 2017",
    description: "The NotPetya cyberattack cost pharmaceutical company Merck an estimated $870 million in damages. The attack disrupted vaccine production and other critical operations for weeks.",
    impact: "Severe",
    source: "Merck Annual Report",
    imageName: "anthem"
  },
  {
    id: 4,
    title: "Hollywood Presbyterian Medical Center Ransomware",
    date: "February 2016",
    description: "The hospital paid a $17,000 ransom in Bitcoin after its systems were locked by ransomware. The attack forced staff to revert to paper records and caused significant operational disruption.",
    impact: "Moderate",
    source: "Los Angeles Times",
    imageName: "anthem"
  },
  {
    id: 5,
    title: "MedStar Health System Attack",
    date: "March 2016",
    description: "A ransomware attack forced MedStar Health to shut down its entire network, affecting 10 hospitals and 250 outpatient facilities. The system had to operate without electronic health records for over a week.",
    impact: "Severe",
    source: "Washington Post",
    imageName: "anthem"
  },
  {
    id: 6,
    title: "UCLA Health System Data Breach",
    date: "July 2015",
    description: "UCLA Health System suffered a data breach affecting 4.5 million patients. The breach exposed names, addresses, dates of birth, social security numbers, and medical information.",
    impact: "Severe",
    source: "UCLA Health",
    imageName: "anthem"
  },
  {
    id: 7,
    title: "Premera Blue Cross Breach",
    date: "January 2015",
    description: "Premera Blue Cross suffered a data breach affecting 11 million customers. The breach exposed names, dates of birth, email addresses, addresses, phone numbers, social security numbers, member identification numbers, and bank account information.",
    impact: "Severe",
    source: "Premera Blue Cross",
    imageName: "anthem"
  },
  {
    id: 8,
    title: "Excellus Health Plan Breach",
    date: "December 2015",
    description: "Excellus Health Plan suffered a data breach affecting 10 million people. The breach exposed names, dates of birth, social security numbers, member identification numbers, financial account information, and claims information.",
    impact: "Severe",
    source: "Excellus Health Plan",
    imageName: "anthem"
  },
  {
    id: 9,
    title: "21st Century Oncology Breach",
    date: "October 2015",
    description: "21st Century Oncology suffered a data breach affecting 2.2 million patients. The breach exposed names, social security numbers, physicians' names, diagnoses, and insurance information.",
    impact: "Moderate",
    source: "21st Century Oncology",
    imageName: "anthem"
  },
  {
    id: 10,
    title: "Community Health Systems Breach",
    date: "April-June 2014",
    description: "Community Health Systems suffered a data breach affecting 4.5 million patients. The breach exposed names, addresses, birth dates, telephone numbers, and social security numbers.",
    impact: "Severe",
    source: "Community Health Systems",
    imageName: "anthem"
  }
];

// Helper function to get the correct image source
const getImageSource = (imageName: string) => {
  const images: { [key: string]: any } = {
    anthem: require('@/assets/images/anthem.png'),
  };
  return images[imageName] || images.anthem;
};

export default function ShockMe() {
  const [currentIncident, setCurrentIncident] = useState(cybersecurityIncidents[0]);

  // Generate a random incident
  const generateRandomIncident = () => {
    const randomIndex = Math.floor(Math.random() * cybersecurityIncidents.length);
    setCurrentIncident(cybersecurityIncidents[randomIndex]);
  };

  // Initialize with a random incident when component mounts
  useEffect(() => {
    generateRandomIncident();
  }, []);

  return (
    <ImageBackground 
      source={require('@/assets/images/Background10.png')}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        {/* Title section */}
        <View style={styles.header}>
          <Text style={styles.title}>SHOCK ME!</Text>
          <Text style={styles.subtitle}>
            Discover real cybersecurity incidents in healthcare
          </Text>
        </View>

        {/* Incident display */}
        <View style={styles.contentContainer}>
          <View style={styles.card}>
            <Image 
              source={getImageSource(currentIncident.imageName)}
              style={styles.incidentImage}
              resizeMode="cover"
            />
            <Text style={styles.cardTitle}>{currentIncident.title}</Text>
            <Text style={styles.cardDate}>{currentIncident.date}</Text>
            <Text style={styles.cardDescription}>{currentIncident.description}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.impactText}>Impact: {currentIncident.impact}</Text>
              <Text style={styles.sourceText}>Source: {currentIncident.source}</Text>
            </View>
          </View>

          {/* Refresh button */}
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={generateRandomIncident}
          >
            <Ionicons name="refresh" size={24} color="#1D4B48" />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1D4B48',
    marginBottom: 10,
    fontFamily: 'Italiana',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1D4B48',
    marginBottom: 10,
  },
  cardDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    lineHeight: 24,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  incidentImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  impactText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  sourceText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  refreshButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
}); 