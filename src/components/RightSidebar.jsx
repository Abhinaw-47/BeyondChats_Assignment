import { useState } from "react";
import Copilot from "./Copilot";
import Details from "./Details";

function RightSidebar({onClose, onDetailsToggle,setNewMessage,newMessage,chatHistory,handleSendMessage,setMessage }) {
  const [activeTab, setActiveTab] = useState('copilot');


  return (
    <div className="flex flex-col h-full">
      
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-6">
      <div className="flex space-x-6">
     <button
       className={`py-4 text-base flex  justify-center font-medium ${activeTab === 'copilot' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
        onClick={() => setActiveTab('copilot')}
            >
                <svg className="w-5 h-5 mr-2 rounded-md  text-white-800 bg-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6h8M6 10h12M8 14h8M6 18h12"/>
</svg>
        <p>AI Copilot</p> 
        </button>
       <button
              className={`py-4 text-base font-medium ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
          </div>
          <button
      onClick={onDetailsToggle}
       aria-label="Open sidebar"
        className="p-2 rounded hover:bg-gray-100 text-gray-600"
          >
          <svg class="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-width="2" d="M3 11h18m-9 0v8m-8 0h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
</svg>

          </button>
        </div>
      </div>

  
      {activeTab === 'copilot' ? (
        <Copilot setNewMessage={setNewMessage} newMessage={newMessage} chatHistory={chatHistory} handleSendMessage={handleSendMessage} setMessage={setMessage} />
      ) : (
        <Details  onClose={onClose} />
      )}
    </div>
  );
}

export default RightSidebar;
