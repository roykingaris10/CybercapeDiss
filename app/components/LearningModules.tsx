import { StyleSheet, View, ScrollView, Pressable, Image, Linking, ImageBackground, Modal } from 'react-native';
import { Text } from '@/components/Themed';
import { useState } from 'react';
import PhishingSimulation from './PhishingSimulation';
import PasswordSimulation from './PasswordSimulation';
import CybersecurityRelations from './CybersecurityRelations';
import SocialEngineering from './SocialEngineering';

// Role-specific content
const roleSpecificContent = {
  doctor: {
    learn: [
      { id: 1, title: "How Cybersecurity Relates to Doctors", description: "Understanding your role in healthcare cybersecurity" },
      { id: 2, title: "Social Engineering Awareness", description: "Understanding and preventing social engineering" },
      { id: 3, title: "Coming Soon", description: "More content coming soon" }
    ],
    simulations: [
      { id: 1, title: "Phishing Attack", description: "Identify and avoid phishing attempts" },
      { id: 2, title: "Stronger Passwords", description: "Create and manage secure passwords" },
      { id: 3, title: "Coming Soon", description: "More simulations coming soon" }
    ],
    resources: [
      { id: 1, title: "NHS Digital Security", description: "Official NHS security guidance", url: "https://digital.nhs.uk/cyber-and-data-security" },
      { id: 2, title: "Healthcare Cybersecurity", description: "NHS cybersecurity training", url: "https://www.e-lfh.org.uk/programmes/data-security-awareness/" },
      { id: 3, title: "Security Best Practices", description: "NHS security best practices video", url: "https://www.youtube.com/watch?v=GJpn7_t_jZA" }
    ]
  },
  nurse: {
    learn: [
      { id: 1, title: "How Cybersecurity Relates to Nurses", description: "Understanding your role in healthcare cybersecurity" },
      { id: 2, title: "Social Engineering Awareness", description: "Understanding and preventing social engineering" },
      { id: 3, title: "Coming Soon", description: "More content coming soon" }
    ],
    simulations: [
      { id: 1, title: "Phishing Attack", description: "Identify and avoid phishing attempts" },
      { id: 2, title: "Stronger Passwords", description: "Create and manage secure passwords" },
      { id: 3, title: "Coming Soon", description: "More simulations coming soon" }
    ],
    resources: [
      { id: 1, title: "Nursing Data Security", description: "NHS data security for nurses", url: "https://digital.nhs.uk/services/data-security-and-protection-toolkit" },
      { id: 2, title: "Patient Data Protection", description: "Protecting patient information", url: "https://www.england.nhs.uk/ig/" },
      { id: 3, title: "Security Training", description: "NHS security awareness video", url: "https://www.youtube.com/watch?v=V0rR2Gk9WXk" }
    ]
  },
  admin: {
    learn: [
      { id: 1, title: "How Cybersecurity Relates to Admins", description: "Understanding your role in healthcare cybersecurity" },
      { id: 2, title: "Social Engineering Awareness", description: "Understanding and preventing social engineering" },
      { id: 3, title: "Coming Soon", description: "More content coming soon" }
    ],
    simulations: [
      { id: 1, title: "Phishing Attack", description: "Identify and avoid phishing attempts" },
      { id: 2, title: "Stronger Passwords", description: "Create and manage secure passwords" },
      { id: 3, title: "Coming Soon", description: "More simulations coming soon" }
    ],
    resources: [
      { id: 1, title: "Admin Security Guide", description: "NHS administrative security guide", url: "https://digital.nhs.uk/data-and-information/looking-after-information/data-security-and-information-governance" },
      { id: 2, title: "Information Governance", description: "NHS information governance framework", url: "https://www.nhsx.nhs.uk/information-governance/" },
      { id: 3, title: "Security Awareness", description: "Healthcare security overview video", url: "https://www.youtube.com/watch?v=2TxLPG-pqHs" }
    ]
  },
  student: {
    learn: [
      { id: 1, title: "How Cybersecurity Relates to Students", description: "Understanding your role in healthcare cybersecurity" },
      { id: 2, title: "Social Engineering Awareness", description: "Understanding and preventing social engineering" },
      { id: 3, title: "Coming Soon", description: "More content coming soon" }
    ],
    simulations: [
      { id: 1, title: "Phishing Attack", description: "Identify and avoid phishing attempts" },
      { id: 2, title: "Stronger Passwords", description: "Create and manage secure passwords" },
      { id: 3, title: "Coming Soon", description: "More simulations coming soon" }
    ],
    resources: [
      { id: 1, title: "Student Guide", description: "NHS student security guide", url: "https://digital.nhs.uk/cyber-and-data-security/cyber-security-good-practice-guides" },
      { id: 2, title: "Learning Hub", description: "NHS Digital learning resources", url: "https://www.e-lfh.org.uk/programmes/data-security-awareness/" },
      { id: 3, title: "Security Basics", description: "Healthcare security basics video", url: "https://www.youtube.com/watch?v=sdpxddDzXfE" }
    ]
  },
  specialist: {
    learn: [
      { id: 1, title: "How Cybersecurity Relates to Specialists", description: "Understanding your role in healthcare cybersecurity" },
      { id: 2, title: "Social Engineering Awareness", description: "Understanding and preventing social engineering" },
      { id: 3, title: "Coming Soon", description: "More content coming soon" }
    ],
    simulations: [
      { id: 1, title: "Phishing Attack", description: "Identify and avoid phishing attempts" },
      { id: 2, title: "Stronger Passwords", description: "Create and manage secure passwords" },
      { id: 3, title: "Coming Soon", description: "More simulations coming soon" }
    ],
    resources: [
      { id: 1, title: "Technical Security", description: "NHS technical security guidance", url: "https://digital.nhs.uk/services/data-and-cyber-security-protecting-information-and-data-in-health-and-care" },
      { id: 2, title: "Security Standards", description: "NHS security standards and frameworks", url: "https://digital.nhs.uk/data-and-information/looking-after-information/data-security-and-information-governance/data-security-and-protection-toolkit" },
      { id: 3, title: "Advanced Security", description: "Advanced healthcare security video", url: "https://www.youtube.com/watch?v=ULUL4PW7X3Y" }
    ]
  }
};

export default function LearningModules({ role }: { role: string }) {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [showPhishingSimulation, setShowPhishingSimulation] = useState(false);
  const [showPasswordSimulation, setShowPasswordSimulation] = useState(false);
  const [showCybersecurityRelations, setShowCybersecurityRelations] = useState(false);
  const [showSocialEngineering, setShowSocialEngineering] = useState(false);
  
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
    } else if (moduleId === 'learn-1') {
      console.log('Opening cybersecurity relations');
      setShowCybersecurityRelations(true);
    } else if (moduleId === 'learn-2') {
      console.log('Opening social engineering awareness');
      setShowSocialEngineering(true);
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

        {/* Cybersecurity Relations Modal */}
        <Modal
          visible={showCybersecurityRelations}
          animationType="slide"
          onRequestClose={() => setShowCybersecurityRelations(false)}
        >
          <CybersecurityRelations 
            role={role} 
            onComplete={() => setShowCybersecurityRelations(false)} 
          />
        </Modal>

        {/* Social Engineering Modal */}
        <Modal
          visible={showSocialEngineering}
          animationType="slide"
          onRequestClose={() => setShowSocialEngineering(false)}
        >
          <SocialEngineering 
            onComplete={() => setShowSocialEngineering(false)} 
          />
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