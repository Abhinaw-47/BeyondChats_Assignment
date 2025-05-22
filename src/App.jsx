import { useState } from 'react';
import LeftSidebar from './components/LeftSidebar';
import MainContainer from './components/MainContainer';
import RightSidebar from './components/RightSidebar';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDetailsOpen, setIsMobileDetailsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
    
  
    const handleSendMessage = (e) => {
e.preventDefault();
  const msg = (newMessage).trim();
      if (!msg) return;
      setNewMessage('');
      setChatHistory([{ role: 'user', text: msg }]);
      setTimeout(() => {
        setChatHistory((prev) => [...prev, { role: 'bot', text: "Searching relevant sources..." }]);
        generateBotResponse([{ role: 'user', text: msg }]);
      }, 600);
    };
  
    //Fetching Response from gemini
    const generateBotResponse = async (history) => {
    const updatedHistory = (text)=>{
        setChatHistory(prev=>[...prev.filter(msg=>msg.text!=="Searching relevant sources..."),{role:'bot',text}])
    }
    history=history.map(({role,text})=>({role,parts:[{text}]}))
       const requestOptions = {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({contents: history})
       }

       try {
        const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
        const data = await response.json();
        if(!response.ok) throw new Error(data.error)
       const botResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1').trim();
       updatedHistory(botResponse)
       } catch (error) {
         console.error('Bot response error:', error);
        updatedHistory("Sorry, I couldn't understand that.");
       }
   }
  // I have taken some demo conversation data for message container
  const [currentConversation, setCurrentConversation] = useState({
    id: '1',
    name: 'Luis Easton',
    messages: [
      { 
        id: 1, 
        type: 'customer', 
        content: 'I bought a product from your store in November as a Christmas gift for a member of my family. However, it turns out they have something very similar already. I was hoping you could be able to refund me, as it is un-opened', 
        timestamp: '26min' 
      },
      { 
        id: 2, 
        type: 'agent', 
        content: 'Let me just look into this for you,Luis.', 
        timestamp: '23min' 
      },
       { 
        id: 3, 
        type: 'customer', 
        content: 'I want my refund as soon as possible.', 
        timestamp: '23min' 
      },
      { 
        id: 4, 
        type: 'system', 
        content: 'This customer has been waiting for 15 minutes.', 
      }
    ]
  });

  const conversations = [
    { id: '1', name: 'Luis', company: 'GitHub', preview: 'I bought a product from your store', time: '21m', unread: true },
    { id: '3', name: 'Ivan', company: 'Nike', preview: 'Hi there, I have a qu...', time: '30m', unread: true, priority: true },
    { id: '4', name: 'Lead from New York', company: '', preview: 'Good morning, let me...', time: '40m', unread: false },
    { id: '5', name: 'Booking API problems', company: '', preview: 'Bug report', time: '45m', unread: false, isBot: true },
    
  ];
  
 const [message, setMessage] = useState('');
    const handleMessage = (e) => {
       e.preventDefault();
       if(!message) return;
    const msg=message;
    setCurrentConversation({ ...currentConversation, messages: [...currentConversation.messages,   { 
        id:6, 
        type: 'agent', 
        content: msg, 
        timestamp:'1min',
      },] });
    setMessage('');
  };

  return (
    <div className="flex h-screen ">
      {/* Left sidebar */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block md:w-72 lg:w-96 bg-white border-r border-gray-200 z-20 md:relative absolute inset-y-0 left-0 w-full`}>
        <LeftSidebar 
          conversations={conversations} 
          onClose={() => setIsMobileMenuOpen(false)}
          currentConversationId={currentConversation.id}
          setCurrentConversation={(id) => {
            const conversation = conversations.find(c => c.id === id);
            setCurrentConversation({
              ...conversation,
              messages: currentConversation.messages 
            });
            
          }}
        />
      </div>

      {/* Main message area */}
      <div className="flex-1 flex flex-col ">
        <MainContainer 
          currentConversation={currentConversation}
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onDetailsToggle={() => setIsMobileDetailsOpen(!isMobileDetailsOpen)}
          setNewMessage={setNewMessage}
          handleMessage={handleMessage}
          message={message}
          setMessage={setMessage}
        />
      </div>

      {/* Right sidebar */}
      <div className={`${isMobileDetailsOpen ? 'block' : 'hidden'} md:block md:w-72 lg:w-96 bg-white border-l border-gray-200 z-20 md:relative absolute inset-y-0 right-0 w-full`}>
        <RightSidebar 
        
          onClose={() => setIsMobileDetailsOpen(false)}
             onDetailsToggle={() => setIsMobileDetailsOpen(!isMobileDetailsOpen)}
             setNewMessage={setNewMessage}
             newMessage={newMessage}
             chatHistory={chatHistory}
             handleSendMessage={handleSendMessage}
            setMessage={setMessage}
        />
      </div>
    </div>
  );
}

export default App;