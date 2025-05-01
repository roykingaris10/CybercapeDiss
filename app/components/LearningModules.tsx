import { StyleSheet, View, ScrollView, Pressable, Image, Linking, ImageBackground, Modal } from 'react-native';
import { Text } from '@/components/Themed';
import { useState } from 'react';
import PhishingSimulation from './PhishingSimulation';
import PasswordSimulation from './PasswordSimulation';

// Role-specific content
const roleSpecificContent = {
  doctor: {
    learn: [
      { id: 1, title: "How Doctors Pertain to Security", description: "Understanding your role in healthcare cybersecurity" },
      { id: 2, title: "Social Engineering Awareness", description: "Understanding and preventing social engineering" },
      { id: 3, title: "Medical Device Protection", description: "Securing medical devices and equipment" }
    ],
    simulations: [
      { id: 1, title: "Phishing Attack", description: "Identify and avoid phishing attempts" },
      { id: 2, title: "Stronger Passwords", description: "Create and manage secure passwords" },
      { id: 3, title: "Medical Record Access", description: "Proper access control for patient records" }
    ],
    resources: [
      { id: 1, title: "HIPAA Guidelines", description: "Official HIPAA security guidelines and regulations", url: "https://www.hhs.gov/hipaa" },
      { id: 2, title: "Medical Device Security", description: "FDA guidance on securing medical devices", url: "https://www.fda.gov/medical-devices" },
      { id: 3, title: "Healthcare Cybersecurity", description: "Professional security resources for healthcare", url: "https://www.hhs.gov/hipaa/for-professionals/security" }
    ]
  },
  nurse: {
    learn: [
      { id: 1, title: "How Nurses Pertain to Security", description: "Understanding your role in healthcare cybersecurity" },
      { id: 2, title: "Social Engineering Awareness", description: "Understanding and preventing social engineering" },
      { id: 3, title: "Patient Data Security", description: "Protecting sensitive patient information" }
    ],
    simulations: [
      { id: 1, title: "Phishing Attack", description: "Identify and avoid phishing attempts" },
      { id: 2, title: "Stronger Passwords", description: "Create and manage secure passwords" },
      { id: 3, title: "Mobile Device Safety", description: "Protecting patient data on mobile devices" }
    ],
    resources: [
      { id: 1, title: "Nursing Informatics", description: "Health IT basics for nursing professionals", url: "https://www.healthit.gov/topic/health-it-and-health-information-management-basics" },
      { id: 2, title: "Mobile Security", description: "Guidance for securing mobile devices", url: "https://www.hhs.gov/hipaa/for-professionals/security/guidance/mobile-devices" },
      { id: 3, title: "Nursing Cybersecurity", description: "Cybersecurity resources for nurses", url: "https://www.nursingworld.org/practice-policy/work-environment/health-safety/cybersecurity/" }
    ]
  },
  admin: {
    learn: [
      { id: 1, title: "How Administrators Pertain to Security", description: "Understanding your role in healthcare cybersecurity" },
      { id: 2, title: "Social Engineering Awareness", description: "Understanding and preventing social engineering" },
      { id: 3, title: "System Access Control", description: "Managing and securing system access" }
    ],
    quizzes: [
      { id: 1, title: "System Security Quiz", description: "Test your knowledge of system security" },
      { id: 2, title: "Access Control Management", description: "Managing access to healthcare systems" },
      { id: 3, title: "Security Policy Implementation", description: "Implementing security policies" }
    ],
    simulations: [
      { id: 1, title: "Phishing Attack", description: "Identify and avoid phishing attempts" },
      { id: 2, title: "Stronger Passwords", description: "Create and manage secure passwords" },
      { id: 3, title: "Incident Response", description: "Responding to security incidents" }
    ],
    resources: [
      { id: 1, title: "Healthcare IT Security", description: "Comprehensive security guidelines", url: "https://www.hhs.gov/hipaa/for-professionals/security" },
      { id: 2, title: "Access Control", description: "Best practices for access management", url: "https://www.hhs.gov/hipaa/for-professionals/security/guidance/access-control" },
      { id: 3, title: "Security Policies", description: "Templates and guides for security policies", url: "https://www.hhs.gov/hipaa/for-professionals/security/guidance/security-policies" }
    ]
  },
  student: {
    learn: [
      { id: 1, title: "How Students Pertain to Security", description: "Understanding your role in healthcare cybersecurity" },
      { id: 2, title: "Social Engineering Awareness", description: "Understanding and preventing social engineering" },
      { id: 3, title: "Healthcare Privacy Basics", description: "Introduction to healthcare data privacy" }
    ],
    quizzes: [
      { id: 1, title: "Healthcare Cybersecurity Basics", description: "Fundamentals of healthcare cybersecurity" },
      { id: 2, title: "Patient Data Protection", description: "How to protect patient information" },
      { id: 3, title: "Security Best Practices", description: "Basic security practices for beginners" }
    ],
    simulations: [
      { id: 1, title: "Phishing Attack", description: "Identify and avoid phishing attempts" },
      { id: 2, title: "Stronger Passwords", description: "Create and manage secure passwords" },
      { id: 3, title: "Social Engineering", description: "Recognize and prevent social engineering attacks" }
    ],
    resources: [
      { id: 1, title: "Healthcare Cybersecurity 101", description: "Introduction to healthcare security", url: "https://www.hhs.gov/hipaa/for-professionals/security/guidance/cybersecurity" },
      { id: 2, title: "Student Resources", description: "Learning materials for students", url: "https://www.healthit.gov/topic/health-it-and-health-information-management-basics" },
      { id: 3, title: "Learning Materials", description: "Additional educational resources", url: "https://www.hhs.gov/hipaa/for-professionals/security/guidance/learning-materials" }
    ]
  },
  specialist: {
    learn: [
      { id: 1, title: "How Specialists Pertain to Security", description: "Understanding your role in healthcare cybersecurity" },
      { id: 2, title: "Social Engineering Awareness", description: "Understanding and preventing social engineering" },
      { id: 3, title: "Advanced Security Protocols", description: "Implementation of advanced security measures" }
    ],
    quizzes: [
      { id: 1, title: "Advanced Security Measures", description: "Advanced security techniques" },
      { id: 2, title: "Network Security Protocols", description: "Understanding network security" },
      { id: 3, title: "Security Audit Procedures", description: "Conducting security audits" }
    ],
    simulations: [
      { id: 1, title: "Phishing Attack", description: "Identify and avoid phishing attempts" },
      { id: 2, title: "Stronger Passwords", description: "Create and manage secure passwords" },
      { id: 3, title: "Penetration Testing", description: "Simulated penetration testing" }
    ],
    resources: [
      { id: 1, title: "Advanced Security", description: "Advanced security implementation guides", url: "https://www.hhs.gov/hipaa/for-professionals/security/guidance/advanced-security" },
      { id: 2, title: "Network Security", description: "Network security best practices", url: "https://www.hhs.gov/hipaa/for-professionals/security/guidance/network-security" },
      { id: 3, title: "Security Auditing", description: "Guidelines for security auditing", url: "https://www.hhs.gov/hipaa/for-professionals/security/guidance/security-auditing" }
    ]
  }
};

export default function LearningModules({ role }: { role: string }) {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [showPhishingSimulation, setShowPhishingSimulation] = useState(false);
  const [showPasswordSimulation, setShowPasswordSimulation] = useState(false);
  
  // Get content based on role
  const content = roleSpecificContent[role as keyof typeof roleSpecificContent] || roleSpecificContent.doctor;
  
  const handleModulePress = (moduleId: string) => {
    console.log('Module pressed:', moduleId);
    if (moduleId === 'sim-1') {
      console.log('Opening phishing simulation');
      setShowPhishingSimulation(true);
    } else if (moduleId === 'sim-2') {
      console.log('Opening password simulation');
      setShowPasswordSimulation(true);
    } else {
      setActiveModule(moduleId === activeModule ? null : moduleId);
    }
  };
  
  const handleResourcePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('@/assets/images/Background10.png')}
        style={styles.backgroundImage}
      >
        <ScrollView style={styles.scrollView}>
          {/* Learn Frame */}
          <View style={styles.frameContainer}>
            <Image 
              source={require('@/assets/images/Rectangle15.png')} 
              style={styles.frameBackground}
              resizeMode="stretch"
            />
            <View style={styles.frameContent}>
              <View style={styles.frameHeader}>
                <Image 
                  source={require('@/assets/images/Rectangle14.png')} 
                  style={styles.frameHeaderBackground}
                  resizeMode="stretch"
                />
                <Text style={styles.frameTitle}>Learn</Text>
              </View>
              
              <View style={styles.frameBody}>
                {content.learn.map((item, index) => (
                  <View key={item.id}>
                    <Pressable 
                      style={styles.moduleItem}
                      onPress={() => handleModulePress(`learn-${item.id}`)}
                    >
                      <Text style={styles.moduleTitle}>{item.title}</Text>
                      <Text style={styles.moduleDescription}>{item.description}</Text>
                    </Pressable>
                    {index < content.learn.length - 1 && (
                      <Image 
                        source={require('@/assets/images/Line5.png')} 
                        style={[styles.divider, { tintColor: '#1a4a45' }]}
                        resizeMode="stretch"
                      />
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
          
          {/* Simulations Frame */}
          <View style={styles.frameContainer}>
            <Image 
              source={require('@/assets/images/Rectangle15.png')} 
              style={styles.frameBackground}
              resizeMode="stretch"
            />
            <View style={styles.frameContent}>
              <View style={styles.frameHeader}>
                <Image 
                  source={require('@/assets/images/Rectangle14.png')} 
                  style={styles.frameHeaderBackground}
                  resizeMode="stretch"
                />
                <Text style={styles.frameTitle}>Simulations</Text>
              </View>
              
              <View style={styles.frameBody}>
                {content.simulations.map((sim, index) => (
                  <View key={sim.id}>
                    <Pressable 
                      style={styles.moduleItem}
                      onPress={() => handleModulePress(`sim-${sim.id}`)}
                    >
                      <Text style={styles.moduleTitle}>{sim.title}</Text>
                      <Text style={styles.moduleDescription}>{sim.description}</Text>
                    </Pressable>
                    {index < content.simulations.length - 1 && (
                      <Image 
                        source={require('@/assets/images/Line5.png')} 
                        style={[styles.divider, { tintColor: '#1a4a45' }]}
                        resizeMode="stretch"
                      />
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
          
          {/* Resources Frame */}
          <View style={styles.frameContainer}>
            <Image 
              source={require('@/assets/images/Rectangle15.png')} 
              style={styles.frameBackground}
              resizeMode="stretch"
            />
            <View style={styles.frameContent}>
              <View style={styles.frameHeader}>
                <Image 
                  source={require('@/assets/images/Rectangle14.png')} 
                  style={styles.frameHeaderBackground}
                  resizeMode="stretch"
                />
                <Text style={styles.frameTitle}>Resources</Text>
              </View>
              
              <View style={styles.frameBody}>
                {content.resources.map((resource, index) => (
                  <View key={resource.id}>
                    <Pressable 
                      style={styles.moduleItem}
                      onPress={() => handleResourcePress(resource.url)}
                    >
                      <Text style={styles.moduleTitle}>{resource.title}</Text>
                      <Text style={styles.moduleDescription}>{resource.description}</Text>
                    </Pressable>
                    {index < content.resources.length - 1 && (
                      <Image 
                        source={require('@/assets/images/Line5.png')} 
                        style={[styles.divider, { tintColor: '#1a4a45' }]}
                        resizeMode="stretch"
                      />
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Phishing Simulation Modal */}
        <Modal
          visible={showPhishingSimulation}
          animationType="slide"
          onRequestClose={() => setShowPhishingSimulation(false)}
        >
          <PhishingSimulation onComplete={() => setShowPhishingSimulation(false)} />
        </Modal>

        {/* Password Simulation Modal */}
        <Modal
          visible={showPasswordSimulation}
          animationType="slide"
          onRequestClose={() => setShowPasswordSimulation(false)}
        >
          <PasswordSimulation onComplete={() => setShowPasswordSimulation(false)} />
        </Modal>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    padding: 5,
    paddingTop: 40,
  },
  frameContainer: {
    marginBottom: 10,
    position: 'relative',
    height: 176,
    width: 365,
    alignSelf: 'center',
  },
  frameBackground: {
    position: 'absolute',
    width: 365,
    height: '100%',
    left: 0,
    opacity: 1,
  },
  frameContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0,
  },
  frameHeader: {
    height: 40,
    width: 365,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    left: 0,
  },
  frameHeaderBackground: {
    position: 'absolute',
    width: 365,
    height: '100%',
    left: 0,    
  },
  frameTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Italiana',
    zIndex: 1,
  },
  frameBody: {
    flex: 1,
    paddingTop: 2,
    paddingHorizontal: 0,
  },
  moduleItem: {
    paddingVertical: 2,
    paddingHorizontal: 10,
  },  
  moduleTitle: {
    color: '#286964',
    fontSize: 12,
    fontFamily: 'Italiana',
    marginBottom: 0,
    fontWeight: 'bold',
  },
  moduleDescription: {
    color: 'rgba(40, 105, 100, 0.9)',
    fontSize: 10,
    fontWeight: '600',
  },
  divider: {
    width: '100%',
    height: 1,
    marginVertical: 2,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
}); 