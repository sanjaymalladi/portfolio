// src/components/Chatbot.tsx
import React, { useState, useRef, useEffect } from 'react';
// Assuming you have these UI components set up (e.g., using shadcn/ui)
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
// Assuming you have a ThemeContext set up
import { useTheme } from '@/context/ThemeContext';
// Using lucide-react for icons
import { Sun, Moon } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

// IMPORTANT: Context for the AI
const CONTEXT = `You are an AI assistant for Sanjay's portfolio website. Use the following context to answer questions:

Resume Context:
Sanjay Malladi
Tadepalligudem, Andhra Pradesh • +91 9642371883 • malladisanjay29@gmail.com
linkedin.com/in/sanjaymalladi

Summary:
Highly motivated Chemical Engineering student at NIT Andhra Pradesh and Data Science student at IIT Madras, adept at leveraging AI and machine learning to address real-world challenges. Currently contributing as an AI Intern at Prosapiens HR Solutions, focusing on developing software and AI-driven solutions to streamline recruitment processes. Proven ability to implement AI for research and technical projects. Published a book chapter on Nanocomposites/Nanomaterials in Biofuel Production.

Work Experience:
- Prosapiens HR Solutions: AI Intern
  - Developing software and AI-powered solutions to enhance and ease the recruitment process
- Indian Institute of Technology (BHU), Varanasi: Summer Intern
  - Conducted CO2 hydrogenation using Ni/MgAl2O3 catalysts for chemical synthesis research
  - Performed product analysis using Gas Chromatography and catalyst characterization with X-ray Diffraction
- TEDx NIT Andhra Pradesh: Sponsorship Lead
  - Secured sponsorships covering 80% of the event budget by targeting industry partners
  - Increased event engagement by 2.5x using data-driven strategies
- Graphic Cafe - Media Cell, NIT Andhra Pradesh: Technical Head
  - Led the design and execution of technical content, increasing digital engagement by 30%
  - Managed workflows for creating and publishing event-related media
- Chemical Engineering Association (ChEA), NIT Andhra Pradesh: Joint Secretary
  - Organized workshops and events, achieving a 20% increase in participation
  - Improved faculty-student communication, enhancing satisfaction by 15%

Education:
- Bachelor of Technology (B.Tech) in Chemical Engineering, National Institute of Technology, Andhra Pradesh
- Bachelor of Science (B.Sc) in Data Science, Indian Institute of Technology, Madras

Publications:
Book Chapter: "Nanocomposites/Nanomaterials and the Risk Management of Biofuels Production" in Nanomaterials as a Catalyst for Biofuel Production, Springer Nature, 2025

Projects:
1. Heat GPT
   - Developed a chatbot to interact with heat exchanger data locally
   - Designed a static dashboard to provide an overview of the data
2. AI Teaching Assistant
   - Developing an AI-powered assistant for teaching Data Structures and Algorithms using the Socratic method and Gemini API
   - Designed interactive question-answering flows with adaptive learning models
3. Career AI (In Progress)
   - Building a personalized career recommendation tool using machine learning and NLP techniques
   - Focuses on skill tracking and tailored growth suggestions
4. AI Notes Maker
   - Created an AI system to generate concise, context-aware notes from academic resources using local LLMs
   - Integrated semantic analysis and NLP for summarization and chat functionality with notes
5. Virtual Try-On using AI
   - Utilized ComfyUI and the Segment Anything Model (SAM) for virtual try-on feature
   - Allows users to visualize different outfits on a segmented image of themselves
6. AI-Generated Ramp Walk Video
   - Leveraged image-to-video models (WAN 2.1) and trained LoRA for video generation
   - Generated realistic ramp walk videos with seamless outfit changes

Skills:
Programming: Python, TensorFlow, PyTorch, SQL, Pandas, NumPy
AI/ML: Natural Language Processing, Computer Vision, Data Analysis
Frameworks: Flask, Streamlit, FastAPI
Tools: Jupyter, Git, Power BI, Matplotlib, Seaborn, ComfyUI
Soft Skills: Collaboration, Problem-Solving, Communication

You should act as a knowledgeable assistant. Provide detailed, accurate responses based *only* on the context above. If asked about something not covered, politely state you don't have that specific information. Keep responses concise but informative.`;

const Chatbot: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm Sanjay's AI assistant. Ask me about his experience, projects, or skills!",
      sender: 'bot'
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check API connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      await checkApiConnection();
      setIsLoading(false);
    };
    checkConnection();
  }, []);

  const checkApiConnection = async () => {
    setApiStatus('checking');
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      setApiStatus('error');
      setError("API Key is missing. Please create a .env file with VITE_GEMINI_API_KEY=your_key_here");
      console.error("API Key is missing. Please create a .env file in your project root with VITE_GEMINI_API_KEY=your_key_here");
      return;
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: "Test connection" }]
          }]
        })
      });

      if (response.ok) {
        setApiStatus('connected');
        setError(null);
        console.log("Successfully connected to Gemini API");
      } else {
        setApiStatus('error');
        const errorData = await response.json();
        const errorMessage = `API Connection Error: ${errorData?.error?.message || 'Unknown error'}`;
        setError(errorMessage);
        console.error(errorMessage);
      }
    } catch (err) {
      setApiStatus('error');
      const errorMessage = 'Failed to connect to Gemini API. Please check your internet connection.';
      setError(errorMessage);
      console.error(errorMessage, err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch response directly from Gemini API (Client-side - Less Secure)
  const getGeminiResponse = async (userMessage: string, chatHistory: Message[]) => {
    setError(null);
    setIsBotTyping(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      const errorMessage = "API Key is missing. Please create a .env file with VITE_GEMINI_API_KEY=your_key_here";
      console.error(errorMessage);
      setError(errorMessage);
      setIsBotTyping(false);
      return "Sorry, I cannot process your request due to a configuration issue. Please check the error message.";
    }

    // Using the Gemini Pro model endpoint
    const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`;

    const limitedHistory = chatHistory.slice(-6);
    const historyText = limitedHistory
      .map(msg => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`)
      .join('\n');

    const prompt = `${CONTEXT}\n\nConversation History:\n${historyText}\n\nUser: ${userMessage}\n\nAssistant:`;

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API Error:', errorData);
        const errorMessage = errorData?.error?.message || `API request failed with status ${response.status}`;
        setError(`Error from AI: ${errorMessage}`);
        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content) {
        console.warn('Gemini Response Blocked or Empty:', data);
        const blockReason = data?.promptFeedback?.blockReason;
        const safetyFeedback = data.candidates?.[0]?.finishReason;
        let msg = "I couldn't generate a response.";
        if (blockReason) msg += ` Reason: ${blockReason}.`;
        else if (safetyFeedback === 'SAFETY') msg += ` The response may violate safety guidelines.`;
        setError(msg);
        return msg;
      }

      return data.candidates[0].content.parts[0].text;

    } catch (error) {
      console.error('Error getting Gemini response:', error);
      if (!error) {
        setError(`Failed to connect to the AI service. Please try again later.`);
      }
      return "I apologize, but I encountered an issue while processing your request. Please check the error message or try again.";
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isBotTyping) return;
    
    const userMessage: Message = {
      id: Date.now(),
      text: trimmedInput,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    const botResponseText = await getGeminiResponse(userMessage.text, [...messages, userMessage]);
    
      const botMessage: Message = {
        id: Date.now() + 1,
      text: botResponseText,
      sender: 'bot'
      };
      
      setMessages(prev => [...prev, botMessage]);
  };

  // --- RETURN JSX (UI - unchanged from previous version) ---
  return (
    <>
      {/* Chat button - only show when not loading */}
      {!isLoading && (
        <Button
          onClick={() => setIsOpen(prev => !prev)}
          className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 p-0 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg flex items-center justify-center text-2xl transition-transform transform hover:scale-110"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? '✕' : '💬'}
        </Button>
      )}
      
      {/* Chat window */}
      {isOpen && (
        <Card className={`fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] max-h-[70vh] flex flex-col border border-indigo-500/30 shadow-xl z-40 rounded-lg overflow-hidden ${
          theme === 'dark'
            ? 'bg-gray-900/90 backdrop-blur-md text-gray-100'
            : 'bg-white/90 backdrop-blur-md text-gray-900'
        }`}>
          <CardHeader className={`py-3 px-4 border-b flex flex-row justify-between items-center ${theme === 'dark' ? 'bg-gray-800/80 border-gray-700' : 'bg-gray-100/80 border-gray-300'}`}>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold">Sanjay's AI Assistant</h3>
              <div className={`w-2 h-2 rounded-full ${
                apiStatus === 'checking' ? 'bg-yellow-500 animate-pulse' :
                apiStatus === 'connected' ? 'bg-green-500' :
                'bg-red-500'
              }`} />
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
              {messages.map((message) => (
                <div
                  key={message.id}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm break-words shadow-sm ${
                    message.sender === 'user'
                    ? 'bg-indigo-500 text-white ml-auto'
                    : `${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-800'} mr-auto`
                }`}
              >
                {message.text.split('\n').map((line, index, arr) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
                </div>
              ))}
              {isBotTyping && (
              <div className={`rounded-lg px-3 py-2 max-w-[85%] mr-auto text-sm shadow-sm ${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
                  <span className="animate-pulse">Typing...</span>
                </div>
              )}
            {error && (
              <div className="text-xs text-red-500 dark:text-red-400 p-2 bg-red-100 dark:bg-red-900/50 rounded border border-red-300 dark:border-red-700">
                <strong>Error:</strong> {error}
              </div>
            )}
              <div ref={messagesEndRef} />
          </CardContent>
          
          <CardFooter className={`border-t p-2 ${theme === 'dark' ? 'bg-gray-800/80 border-gray-700' : 'bg-gray-100/80 border-gray-300'}`}>
            <form 
              className="flex w-full gap-2 items-center"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className={`flex-1 text-sm rounded-md border focus:outline-none focus:ring-2 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-indigo-500 focus:border-indigo-500'
                    : 'bg-white border-gray-300 placeholder-gray-500 text-black focus:ring-indigo-500 focus:border-indigo-500'
                }`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isBotTyping}
              />
              <Button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                disabled={isBotTyping || !inputValue.trim()}
              >
                Send
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Chatbot;