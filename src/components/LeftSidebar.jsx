import { useState } from "react";

function Sidebar({ conversations, onClose, currentConversationId, setCurrentConversation }) {
  const [filterStatus, setFilterStatus] = useState('Open');
  const [sortBy, setSortBy] = useState('Waiting longest');

  return (
    <div className="flex flex-col h-full">
      
    <div className="p-3.5 border-b border-gray-200 flex justify-between items-center">
    <h2 className="text-lg font-semibold">Your inbox</h2>
    <button onClick={onClose} className="md:hidden text-gray-500">
     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
  </div>
      
  <div className="p-2 border-b border-gray-200 flex justify-between">
     <div className="relative inline-block text-left">
       <button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50">
            {filterStatus} <span className="ml-1">▼</span>
          </button>
  </div>
        
   <div className="relative inline-block text-left">
          <button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50">
            {sortBy} <span className="ml-1">▼</span>
          </button>
        </div>
      </div>
      
      <div>
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
              currentConversationId === conversation.id ? 'bg-blue-50' : ''
            }`}
            onClick={() => setCurrentConversation(conversation.id)}
          >
       <div className="flex justify-between items-start">
        <div className="flex items-center">
               {conversation.isBot ? (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
        </svg>
       </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {conversation.name.charAt(0)}
                  </div>
                )}
        <div className="ml-3">
        <div className="flex items-center">
           <span className={`font-medium ${conversation.unread ? 'text-gray-900' : 'text-gray-600'}`}>
               {conversation.name}
            </span>
                    {conversation.company && (
                      <span className="ml-2 text-xs text-gray-500">- {conversation.company}</span>
                    )}
            </div>
                  <p className="text-sm text-gray-500 truncate w-40">{conversation.preview}</p>
          </div>
              </div>
         <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500">{conversation.time}</span>
                {conversation.priority && (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
               3min
         </span>
          )}
       </div>
        </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;