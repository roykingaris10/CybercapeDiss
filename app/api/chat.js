import { Configuration, OpenAIApi } from 'openai';

// This is a simple serverless function that will be called from the Chatbot component
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, role } = req.body;

    // Add system message based on role
    const systemMessage = {
      role: 'system',
      content: `You are a healthcare cybersecurity expert AI assistant. You are speaking with a ${role}. 
      Provide clear, concise, and practical advice about healthcare cybersecurity. 
      Focus on best practices, compliance, and practical implementation.`
    };

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Call OpenAI API
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 500,
    });

    return res.status(200).json({ 
      message: completion.data.choices[0].message.content 
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
} 