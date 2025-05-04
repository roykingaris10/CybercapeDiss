import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
}

interface ChatbotProps {
  role: string;
}

export default function Chatbot({ role }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Hardcoded API key
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  
  // Scroll to bottom when messages change or when keyboard appears
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, loading]);

  // Format the response text with bullet points and bold text
  const formatResponse = (text: string) => {
    // Replace markdown-style bold with React Native bold
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    
    // Replace dashes with bullet points
    formattedText = formattedText.replace(/^- /gm, '• ');
    
    // Add bullet points if they don't exist
    if (!formattedText.includes('•') && !formattedText.includes('-')) {
      // Split by newlines and add bullet points
      const lines = formattedText.split('\n').filter(line => line.trim() !== '');
      formattedText = lines.map(line => `• ${line}`).join('\n\n');
    } else {
      // Add extra spacing between bullet points
      formattedText = formattedText.replace(/\n•/g, '\n\n•');
    }
    
    // Add extra spacing between paragraphs
    formattedText = formattedText.replace(/\n\n/g, '\n\n');
    
    return formattedText;
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      console.log('Sending request to OpenAI API...');
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Your name is Stacey. Refer them by their name ${role}. You are a cybersecurity expert assistant for healthcare professionals. The user is a ${role}. Provide specific, relevant advice about healthcare cybersecurity, focusing on their role. Keep responses concise, keep it every short and concise, they are healthcare professionals so think about it, they wouldn't want to read large pockets of information, so instead keep it limited to bullet points only and practical, relative to a clinical setting.
              
              When giving the information:
              • On the first message, introduce yourself as Stacey and say that you are a cybersecurity expert assistant for healthcare professionals, only if it is convinient to do so.
              .
              • Use bullet points for all information
              • Space out the text with line breaks between points
              • Make important terms bold using **term**
              • Keep responses short and to the point
              • Focus on practical, actionable advice
              • Avoid large blocks of text
              • Use simple language that's easy to understand
              • Prioritize information relevant to their role as a ${role}`
            },
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            })),
            {
              role: 'user',
              content: inputText
            }
          ],
          temperature: 0.7,
          max_tokens: 250
        }),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API error:', errorData);
        throw new Error(errorData.error?.message || 'Failed to get response from OpenAI');
      }

      const data = await response.json();
      console.log('OpenAI API response received');
      
      // Format the response text
      const formattedText = formatResponse(data.choices[0].message.content.trim());
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: formattedText,
        sender: 'assistant',
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to get response from the AI assistant. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Render text with bold formatting
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(<b>.*?<\/b>)/g);
    
    return (
      <Text style={styles.assistantMessageText}>
        {parts.map((part, index) => {
          if (part.startsWith('<b>') && part.endsWith('</b>')) {
            const boldText = part.replace(/<\/?b>/g, '');
            return <Text key={index} style={styles.boldText}>{boldText}</Text>;
          }
          return <Text key={index}>{part}</Text>;
        })}
      </Text>
    );
  };

  return (
    <ImageBackground 
      source={require('@/assets/images/Background10.png')}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContentContainer}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={true}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.sender === 'user' ? styles.userBubble : styles.assistantBubble,
              ]}
            >
              {message.sender === 'user' ? (
                <Text style={styles.userMessageText}>{message.text}</Text>
              ) : (
                renderFormattedText(message.text)
              )}
            </View>
          ))}
          {loading && (
            <View style={[styles.messageBubble, styles.assistantBubble]}>
              <ActivityIndicator size="small" color="#1D4B48" />
            </View>
          )}
          {/* Add extra padding at the bottom to ensure content doesn't get cut off */}
          <View style={styles.bottomPadding} />
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim() || loading}
          >
            <Ionicons
              name="send"
              size={24}
              color={!inputText.trim() || loading ? '#999' : '#1D4B48'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  messagesContentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 14,
  },
  userBubble: {
    backgroundColor: '#1D4B48',
    alignSelf: 'flex-end',
  },
  assistantBubble: {
    backgroundColor: '#D0D0D0',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 23,
  },
  userMessageText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 23,
  },
  assistantMessageText: {
    color: '#1D4B48',
    fontSize: 16,
    lineHeight: 23,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#1D4B48',
  },
  bottomPadding: {
    height: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E9E9EB',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
    maxHeight: 100,
    color: '#1D4B48',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
}); 