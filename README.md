# CyberCare - Healthcare Cybersecurity Education App

CyberCare is a React Native mobile application designed to educate healthcare professionals about cybersecurity through interactive learning modules, simulations, and an AI-powered chatbot.

## 🚀 Features

- Role-based learning content (Doctor, Nurse, Admin, Student, Specialist)
- Interactive cybersecurity simulations
- AI-powered chatbot for personalized guidance
- Real-world case studies and statistics
- Progress tracking and achievements

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Git
- VS Code (recommended)
- iOS Simulator (for Mac users) or Android Studio (for Android development)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/roykingaris10/Cybercare.git
   cd Cybercare
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with:
   ```
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Run on your device**
   - Scan the QR code with the Expo Go app on your phone
   - Press 'i' for iOS simulator
   - Press 'a' for Android emulator

## 📱 Running the App

1. **Development Mode**
   ```bash
   npm start
   ```

2. **Production Build**
   ```bash
   expo build:android
   # or
   expo build:ios
   ```

## 🛠️ Project Structure

```
CyberCare/
├── app/                    # Main application code
│   ├── components/         # Reusable components
│   ├── assets/            # Images, fonts, and other static files
│   └── (routes)           # Application routes
├── .env.local             # Environment variables
├── app.config.js          # Expo configuration
└── package.json           # Project dependencies
```

## 🤖 AI Chatbot Integration

The application uses OpenAI's API for the chatbot functionality. To use this feature:
1. Get an OpenAI API key from [OpenAI](https://platform.openai.com/)
2. Add it to your `.env.local` file
3. Restart the development server

## 🐛 Troubleshooting

Common issues and solutions:

1. **Module not found**
   ```bash
   npm install
   ```

2. **Expo Go connection issues**
   - Ensure your phone and computer are on the same network
   - Try using the tunnel option: `expo start --tunnel`

3. **Font loading issues**
   - Clear the Expo cache: `expo start --clear`

## 📚 Learning Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Roy Kingaris - Initial work

## 🙏 Acknowledgments

- OpenAI for the AI chatbot integration
- React Native and Expo teams
- All contributors and supporters
