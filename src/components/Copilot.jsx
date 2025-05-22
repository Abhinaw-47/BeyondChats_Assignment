import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

{/* For typing animation */}
const TypingEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
};

const Copilot = ({newMessage,setNewMessage,chatHistory,handleSendMessage,handleMessage,setMessage}) => {

 const handleComposer=()=>{
  setMessage(chatHistory[chatHistory.length-1].text);
 }




  return (
    <div className="flex flex-col flex-1 ">
    <div className={`flex-1 p-4 space-y-2 ${chatHistory?.length === 0 ? 'flex justify-center items-center mx-auto' : ''}`}>
    {chatHistory?.length === 0 && (
      <div className="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center">
      <div className="w-8 h-8 rounded-md bg-gray-800 flex items-center justify-center text-white mr-3">
     <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6h8M6 10h12M8 14h8M6 18h12"/>
</svg>
            </div>
            <div className=" flex flex-col text-center">
        <h3 className="font-medium">Hi, I'm Fin AI Copilot</h3>
         <p className="text-sm text-gray-600">Ask me anything about this conversation.</p>
            </div>
          </div>
        )}
        

        {chatHistory?.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'bot' ? (
           <div>
           <div className='flex p-1'>
                        <svg class="w-6 h-6 bg-black text-white-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/>
</svg><p className='font-bold ml-2'>Fin</p>
      
                    </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-3 rounded-lg max-w-lg shadow-md"
                style={{
                  background: 'linear-gradient(to right, #e0c3fc, #8ec5fc)',
                }}
              >

                {message.text === '....' ? '...' : <TypingEffect text={message.text} />}
                <button className=' mx-auto mt-2 flex items-center justify-center bg-white text-black-600 px-2 py-1 rounded-md w-[90%]' onClick={handleComposer}> <svg class="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 5V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5M9 3v4a1 1 0 0 1-1 1H4m11.383.772 2.745 2.746m1.215-3.906a2.089 2.089 0 0 1 0 2.953l-6.65 6.646L9 17.95l.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z"/>
</svg><p className='font-bold ml-2'>Add to Composer</p>
</button>
              </motion.div>
              
                </div>
                
             
            ) : (
              <div className="bg-blue-100 p-3 rounded-lg max-w-lg">
                <p>{message.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom input */}
      <div className="bg-white border-t border-gray-200 p-3">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2">
        <input
          type="text"
         value={newMessage}
         onChange={(e) => setNewMessage(e.target.value)}
           placeholder="Ask a question..."
        className="flex-1 outline-none text-sm"
            />
            <button
              type="submit"
              className={`ml-2 px-4 py-1 text-sm font-medium  ${newMessage.length? 'bg-black text-white' : 'text-gray-700'}   rounded-md`}
            >
         <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v13m0-13 4 4m-4-4-4 4"/>
</svg>
      </button>
      </div>
     </form>
      </div>
    </div>
  );
};

export default Copilot;
