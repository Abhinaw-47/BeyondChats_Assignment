import { useState, useRef, useEffect } from 'react';

function MainContainer({message,setMessage,handleMessage,currentConversation, onMenuToggle, onDetailsToggle,setNewMessage}) {
 
  const [selectedText, setSelectedText] = useState('');
  const [showCopilotPopup, setShowCopilotPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const messagesContainerRef = useRef(null);
   const textareaRef = useRef(null);


      {/* Text selection popup logic */}
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      setSelectedText(selection.toString());
      setPopupPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 40
      });
      setShowCopilotPopup(true);
    } else {
      setShowCopilotPopup(false);
    }
  };
  
  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      messagesContainer.addEventListener('mouseup', handleTextSelection);
      return () => {
        messagesContainer.removeEventListener('mouseup', handleTextSelection);
      };
    }
  }, []);
  



  

  const askCopilot = () => {

    setNewMessage(selectedText);

    console.log(`Asking copilot about: ${selectedText}`);
    onDetailsToggle();
    setShowCopilotPopup(false);
  };

  return (
    <div className="flex flex-col h-full ">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
      <div className="flex items-center">
      <button className="md:hidden mr-2 text-gray-500" onClick={onMenuToggle}>
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
       <h2 className="text-lg font-semibold">{currentConversation.name}</h2>
        
    </div>
      <div className="flex items-center space-x-2">
     <button className="ml-2 text-black font-semibold ">
   <svg className="w-6 h-6 bg-gray-300 rounded-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" />
            </svg>
          </button>
       <button className="text-gray-500 p-1 rounded hover:bg-gray-100">
             <svg class="w-6 h-6 bg-gray-300 rounded-md dark:text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M17 4c.5523 0 1 .44772 1 1v2h2c.5523 0 1 .44771 1 1 0 .55228-.4477 1-1 1h-2v2c0 .5523-.4477 1-1 1s-1-.4477-1-1V9h-2c-.5523 0-1-.44772-1-1s.4477-1 1-1h2V5c0-.55228.4477-1 1-1Z" clip-rule="evenodd"/>
  <path d="M12.3224 4.68708c.2935-.31028.3575-.77266.1594-1.15098-.1981-.37832-.6146-.5891-1.0368-.52467-1.50847.2302-2.93175.83665-4.12869 1.76276-1.19717.92628-2.12732 2.1411-2.69465 3.52702-.56744 1.38618-.75115 2.89299-.53164 4.37079.2195 1.4776.83393 2.8711 1.77895 4.0436.9448 1.1722 2.18683 2.0826 3.60103 2.6449 1.414.5623 2.9539.7584 4.4683.57 1.5145-.1884 2.9549-.7551 4.1784-1.6475 1.2237-.8924 2.1892-2.0806 2.7972-3.4499.1723-.3879.0809-.8423-.2279-1.1335-.3089-.2911-.7679-.3556-1.145-.1608-.8631.4459-1.8291.6799-2.8118.6791h-.0018c-1.1598.0013-2.2925-.3234-3.2596-.931-.9667-.6074-1.7244-1.4697-2.1856-2.4779-.4611-1.00776-.6079-2.1209-.4243-3.20511.1835-1.08442.6905-2.09837 1.4645-2.91681Z"/>
</svg>

     </button>
    <button 
      className="bg-black text-white px-3 py-1 rounded-md text-sm"
      onClick={onDetailsToggle}
          >
            Close
     </button>
         </div>
   </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 bg-white-50" ref={messagesContainerRef}>
     <div className="max-w-4xl mx-auto space-y-4">
      {currentConversation.messages.map((message) => {
    if (message.type === 'system') {
          return (
                <div key={message.id} className=" bg-yellow-100 p-3 rounded-lg mx-auto max-w-lg">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-yellow-800 mx-auto">{message.content}</p>
                  </div>
                </div>
              );
            } else if (message.type === 'customer') {
              return (
                <div key={message.id} className="flex justify-start">
               <div className="bg-gray-200 p-3 rounded-lg max-w-lg">
                <p className="text-sm">{message.content}</p>
               <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={message.id} className="flex justify-end">
              <div className="bg-blue-100 p-3 rounded-lg max-w-lg">
            <p className="text-sm whitespace-pre-line">{message.content}</p>
              <div className="flex justify-end mt-1 items-center">
                 <span className="text-xs text-gray-500 mr-1">
                        {message.seen ? 'Seen · ' : ''}{message.timestamp}
                      </span>
                      {message.seen && (
                  <div className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-xs text-white">✓</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        
        {/* Text selection popup */}
        {showCopilotPopup && (
          <div 
            className="absolute bg-white rounded-md shadow-lg p-2 transform -translate-x-1/2 hover:bg-blue-300 hover:text-blue-800"
            style={{ 
              left: `${popupPosition.x}px`, 
              top: `${popupPosition.y}px` 
            }}
          >
            <button 
              className="flex items-center text-sm font-bold"
              onClick={askCopilot}
            >
              <span className="w-5 h-5 rounded-md bg-gray-800 flex items-center justify-center text-white mr-2">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6h8M6 10h12M8 14h8M6 18h12"/>
</svg>

              </span>
              Ask Fin Copilot
            </button>
          </div>
        )}
      </div>

    

      {/* Message input */}
      <div className=" justify-center bg-white border border-gray-300 p-2 h-30 w-[80%] rounded-xl mx-auto mb-3">
        <div className="flex items-center space-x-2">
            <svg className="w-6 h-6 text-gray-800 "  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
</svg><p class="text-lg font-semibold text-gray-800 dark:text-black">Chat</p><svg class="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
</svg>
        </div>
        <div className="text-xs text-gray-500 mt-1 ml-1">
            Use ⌘K for shortcuts
          </div>
        <form onSubmit={handleMessage} className="">
          <div className="flex flex-col items-center bg-white rounded-lg ">
            <textarea
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder=""
              className="flex-1 outline-gray-200 text-sm w-full h-20"
            />
            <div className="flex justify-between items-center w-full h-10">
                <div className="flex items-center">
                <button type="button" className="text-gray-500 border-r-2 pr-1">
                <svg className="w-5 h-5" fill="black" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </button>
              <button type="button" className="text-gray-500 pl-1">
              
                     <svg class="w-6 h-6 text-black-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
  <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z"/>
</svg>
              </button>
         

              <button type="button" className="text-gray-500 pl-2">
               <svg class="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2ZM7.99 9a1 1 0 0 1 1-1H9a1 1 0 0 1 0 2h-.01a1 1 0 0 1-1-1ZM14 9a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H15a1 1 0 0 1-1-1Zm-5.506 7.216A5.5 5.5 0 0 1 6.6 13h10.81a5.5 5.5 0 0 1-8.916 3.216Z" clip-rule="evenodd"/>
</svg>

              </button>
                </div>
               <button
              type="submit"
              className={` flex text-sm font-medium ${!message ? 'text-white-500 bg-white' : 'text-white bg-black'} rounded-xl p-1`}
            >
              <p className='mr-2'>Send</p>
              <svg className="border-l-2 pl-2 w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
</svg>
      </button>
      </div>
      </div>
      </form>
      </div>
    </div>
  );
}

export default MainContainer;