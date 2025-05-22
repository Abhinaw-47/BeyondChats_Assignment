import React from 'react'

const Details = ({onClose}) => {
      const sections = [
    { id: 'links', title: 'LINKS', expanded: true },
    { id: 'userData', title: 'USER DATA', expanded: false },
    { id: 'attributes', title: 'CONVERSATION ATTRIBUTES', expanded: false },
    { id: 'company', title: 'COMPANY DETAILS', expanded: false },
    { id: 'salesforce', title: 'SALESFORCE', expanded: false },
    { id: 'stripe', title: 'STRIPE', expanded: false },
    { id: 'jira', title: 'JIRA FOR TICKETS', expanded: false }
  ];
  return (
     <div className="bg-gray-50 border-t border-gray-200 p-3 overflow-y-auto flex-1">
       <div className="flex flex-col h-full">
     <div className="p-4 border-b border-gray-200 flex justify-between items-center">
       <div className="flex items-center">
          <h2 className="text-lg font-semibold">
            Details
          </h2>
           </div>
          <button onClick={onClose} className="md:hidden text-gray-500">
            <svg
             className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
            </div>

            <div className="overflow-y-auto p-4 flex-1">
          <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
         <span className="text-sm text-gray-500">Assignee</span>
          <div className="flex items-center">
           <div className="w-6 h-6 rounded-full bg-gray-300 mr-2 flex items-center justify-center text-xs text-white">
                    B
              </div>
             <span className="text-sm">Brian Byrne</span>
              </div>
             </div>
             <div className="flex justify-between items-center">
             <span className="text-sm text-gray-500">Team</span>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
               fill="none"
               stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                  strokeLinecap="round"
                 strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
                  </svg>
            <span className="text-sm">Unassigned</span>
                  </div>
                </div>
              </div>

              {sections.map((section) => (
                <div key={section.id} className="border-t border-gray-200 py-4">
               <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{section.title}</span>
               <button className="text-gray-500">
              <svg
                  className={`w-5 h-5 transform ${section.expanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                    viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                   >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
               </svg>
              </button>
                  </div>

                  {section.expanded && section.id === 'links' && (
                 <div className="mt-2 space-y-2">
                <div className="flex justify-between items-center">
            <div className="flex items-center text-blue-600">
                  <svg
                     className="w-5 h-5 mr-2"
                     fill="none"
                    stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                          >
                    <path
                        strokeLinecap="round"
                          strokeLinejoin="round"
                        strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                          <span className="text-sm">Tracker ticket</span>
                        </div>
                   <button className="text-gray-500">
                       <svg
                      className="w-5 h-5"
                       fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                          >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-blue-600">
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                          <span className="text-sm">Back-office tickets</span>
                        </div>
                        <button className="text-gray-500">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-blue-600">
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 0a2 2 0 11-4 0 2 2 0 014 0zm-8 0a2 2 0 114 0 2 2 0 01-4 0z"
                            />
                          </svg>
                      <span className="text-sm">Salesforce link</span>
                    </div>
                     <button className="text-gray-500">
                      <svg
                        className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                     </button>
                    </div>
                    </div>
                  )}
            </div>
           ))}
            </div>
          </div>
        </div>
  )
}

export default Details