import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Collection of cybersecurity incidents
const cybersecurityIncidents = [
  {
    id: 1,
    title: "WannaCry Ransomware Attack",
    date: "May 2017",
    description: "The WannaCry ransomware attack affected over 200,000 computers across 150 countries, including the UK's National Health Service (NHS). The attack caused estimated damages of $4 billion and disrupted healthcare services for days.",
    impact: "Critical",
    source: "NHS Digital",
    imageName: "anthem" // Just store the image name
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

// Cybersecurity statistics
const cybersecurityStats = [
  {
    id: 1,
    title: "Healthcare Data Breach Costs",
    description: "The average cost of a healthcare data breach in 2023 was $10.93 million, making healthcare the most expensive industry for data breaches for the 13th consecutive year.",
    source: "IBM Cost of a Data Breach Report 2023"
  },
  {
    id: 2,
    title: "Ransomware in Healthcare",
    description: "In 2022, 66% of healthcare organizations experienced a ransomware attack, with 61% of those attacks resulting in data encryption.",
    source: "Sophos State of Ransomware in Healthcare 2023"
  },
  {
    id: 3,
    title: "Healthcare Cyberattacks",
    description: "Healthcare organizations experienced an average of 1,426 cyberattacks per week in 2022, a 86% increase from 2021.",
    source: "Check Point Research"
  },
  {
    id: 4,
    title: "Patient Data Exposure",
    description: "Between 2009 and 2021, over 3,705 healthcare data breaches of 500+ records were reported to HHS, affecting over 268 million people.",
    source: "HIPAA Journal"
  },
  {
    id: 5,
    title: "Medical Device Vulnerabilities",
    description: "A 2021 study found that 53% of connected medical devices and other IoT devices in hospitals had known critical vulnerabilities.",
    source: "Cynerio IoT Security Report"
  },
  {
    id: 6,
    title: "Healthcare Phishing Attacks",
    description: "91% of all cyberattacks begin with a phishing email, and healthcare workers are three times more likely to click on phishing links than other industries.",
    source: "Proofpoint 2023 State of the Phish"
  },
  {
    id: 7,
    title: "Healthcare Recovery Time",
    description: "Healthcare organizations take an average of 287 days to identify and contain a data breach, longer than any other industry.",
    source: "IBM Cost of a Data Breach Report 2023"
  },
  {
    id: 8,
    title: "Medical Identity Theft",
    description: "Medical identity theft affects 1.5 million people in the U.S. each year, with victims paying an average of $13,500 to resolve the crime.",
    source: "Medical Identity Fraud Alliance"
  },
  {
    id: 9,
    title: "Healthcare IoT Security",
    description: "By 2025, there will be over 50 billion connected medical devices worldwide, creating an expanded attack surface for cybercriminals.",
    source: "Statista"
  },
  {
    id: 10,
    title: "Healthcare Cybersecurity Investment",
    description: "Healthcare organizations are expected to spend $125 billion on cybersecurity products and services between 2020 and 2025.",
    source: "Market and Markets Healthcare Cybersecurity Report"
  }
];

// Role-specific cybersecurity facts
const roleSpecificFacts = {
  doctor: [
    "In 2022, 83% of healthcare organizations reported that their doctors had fallen victim to phishing attacks.",
    "Medical professionals are 3 times more likely to click on phishing links than other industries.",
    "A 2021 study found that 67% of doctors use personal devices to access patient data, creating significant security risks.",
    "Medical identity theft can lead to incorrect medical records, potentially causing life-threatening treatment errors.",
    "Healthcare providers can face fines of up to $50,000 per HIPAA violation, with a maximum annual penalty of $1.5 million."
  ],
  nurse: [
    "Nurses are often targeted by cybercriminals due to their access to patient records and limited cybersecurity training.",
    "A 2020 survey found that 78% of nurses had received suspicious emails at work, but only 37% reported them to IT.",
    "Mobile nursing stations and tablets used for patient care are frequently targeted by malware and ransomware.",
    "Nurses working remotely are 3.5 times more likely to experience a security incident than those working in hospitals.",
    "Healthcare organizations lose an average of $7.13 million per year due to nurse-related security incidents."
  ],
  admin: [
    "Administrative staff are responsible for 60% of healthcare data breaches, often due to human error.",
    "Healthcare administrators receive an average of 14.2 malicious emails per month, with 28% being opened.",
    "A single compromised administrative account can provide access to thousands of patient records.",
    "Healthcare organizations spend an average of $1.4 million annually on administrative staff cybersecurity training.",
    "Administrative staff are 4 times more likely to use weak passwords than clinical staff."
  ],
  student: [
    "Medical students are increasingly targeted by cybercriminals due to their access to hospital systems and limited security awareness.",
    "A 2021 study found that 72% of medical students had never received formal cybersecurity training.",
    "Medical students using personal devices for clinical rotations create significant security vulnerabilities.",
    "Healthcare organizations report that 45% of security incidents involve students or residents.",
    "Medical students are 5 times more likely to share login credentials than practicing physicians."
  ],
  specialist: [
    "Healthcare IT specialists face an average of 816 cyberattacks per week, a 71% increase from 2021.",
    "Medical devices have an average of 6.2 vulnerabilities per device, with 60% being critical or high severity.",
    "Healthcare networks are scanned by malicious actors an average of 16,500 times per day.",
    "IT specialists in healthcare spend an average of 18.3 hours per week addressing security incidents.",
    "Healthcare organizations with dedicated security teams reduce breach costs by an average of $2.1 million."
  ]
};

// Function to get the correct image source
const getImageSource = (imageName: string) => {
  switch (imageName) {
    case "anthem":
      return require('../../assets/images/anthem.png');
    default:
      return require('../../assets/images/Background.png');
  }
};

interface ShockMeProps {
  role: string;
}

export default function ShockMe({ role }: ShockMeProps) {
  const [currentIncident, setCurrentIncident] = useState<any>(null);

  // Generate random incident on component mount
  useEffect(() => {
    generateRandomIncident();
  }, [role]);

  const generateRandomIncident = () => {
    // Generate random incident
    const randomIncidentIndex = Math.floor(Math.random() * cybersecurityIncidents.length);
    setCurrentIncident(cybersecurityIncidents[randomIncidentIndex]);
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('@/assets/images/Background10.png')}
        style={styles.backgroundImage}
      >
        <ScrollView style={styles.contentContainer}>
          {currentIncident && (
            <ImageBackground 
              source={require('@/assets/images/shockback.png')}
              style={styles.contentBackground}
            >
              <View style={styles.contentBox}>
                <Text style={styles.contentTitle}>{currentIncident.title}</Text>
                <Text style={styles.contentDate}>{currentIncident.date}</Text>
                <Text style={styles.contentDescription}>{currentIncident.description}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardImpact}>Impact: {currentIncident.impact}</Text>
                  <Text style={styles.cardSource}>Source: {currentIncident.source}</Text>
                </View>
                
                {/* Image with proper loading */}
                <View style={styles.imageContainer}>
                  <Image 
                    source={getImageSource(currentIncident.imageName)}
                    style={styles.incidentImage}
                    resizeMode="cover"
                    onError={(error) => console.error('Image loading error:', error.nativeEvent)}
                  />
                </View>
              </View>
            </ImageBackground>
          )}
        </ScrollView>

        <TouchableOpacity style={styles.refreshButton} onPress={generateRandomIncident}>
          <Ionicons name="refresh" size={24} color="#FFFFFF" />
          <Text style={styles.refreshButtonText}>SHOCK ME AGAIN</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginBottom: 20,
    marginTop: 20,
  },
  contentBackground: {
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: 15,
  },
  contentBox: {
    padding: 20,
    alignItems: 'center',
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  contentDate: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  contentDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
  },
  cardImpact: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardSource: {
    color: '#FFFFFF',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  imageContainer: {
    height: 200,
    borderRadius: 0,
    overflow: 'hidden',
    marginTop: 10,
    position: 'relative',
    width: '100%',
  },
  incidentImage: {
    width: '100%',
    height: '100%',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#286964',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 0,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
}); 