import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';

const patients = [
  {
    id: 1,
    name: "Ahmed Khan",
    condition: "Heart Disease",
    image: "/placeholder.svg",
    lastMessage: "I'll follow your advice, doc. Thanks!",
    lastMessageTime: "10:30 AM",
    unread: 2,
    hasAppointment: true,
    messages: [
      { id: 1, text: "Hello Ahmed, how are you feeling today?", sender: "doctor", time: "10:15 AM" },
      { id: 2, text: "I've been experiencing chest pain occasionally.", sender: "patient", time: "10:20 AM" },
      { id: 3, text: "I see. Could you describe the pain? Is it sharp or dull?", sender: "doctor", time: "10:22 AM" },
      { id: 4, text: "It's more of a pressure, sometimes when I exercise.", sender: "patient", time: "10:25 AM" },
      { id: 5, text: "Your test results look promising. There's no immediate concern, but let's monitor this.", sender: "doctor", time: "10:30 AM" },
      { id: 6, text: "I'll follow your advice, doc. Thanks!", sender: "patient", time: "10:32 AM" }
    ]
  },
  {
    id: 2,
    name: "Maria Siddiqui",
    condition: "Dermatitis",
    image: "/placeholder.svg",
    lastMessage: "Will do. Thanks for the advice!",
    lastMessageTime: "Yesterday",
    unread: 0,
    hasAppointment: true,
    messages: [
      { id: 1, text: "Good morning Maria! How's your skin feeling?", sender: "doctor", time: "9:00 AM" },
      { id: 2, text: "It's been less itchy since I started the new cream.", sender: "patient", time: "9:05 AM" },
      { id: 3, text: "Great to hear! Remember to apply it twice a day.", sender: "doctor", time: "9:07 AM" },
      { id: 4, text: "Will do. Thanks for the advice!", sender: "patient", time: "9:10 AM" },
      { id: 5, text: "Don't forget to apply sunscreen daily, even on cloudy days.", sender: "doctor", time: "9:15 AM" }
    ]
  },
  {
    id: 3,
    name: "Bilal Hussain",
    condition: "Migraine",
    image: "/placeholder.svg",
    lastMessage: "Stress seems to make it worse.",
    lastMessageTime: "2 days ago",
    unread: 1,
    hasAppointment: true,
    messages: [
      { id: 1, text: "Hello Bilal, I'm reviewing your case. Can you describe your symptoms?", sender: "doctor", time: "2:00 PM" },
      { id: 2, text: "I've been having frequent headaches and dizziness.", sender: "patient", time: "2:05 PM" },
      { id: 3, text: "I understand. Have you noticed any triggers?", sender: "doctor", time: "2:10 PM" },
      { id: 4, text: "Stress seems to make it worse.", sender: "patient", time: "2:15 PM" },
      { id: 5, text: "Let's schedule an MRI to get a clearer picture. I'll call you to set it up.", sender: "doctor", time: "2:20 PM" }
    ]
  },
  {
    id: 4,
    name: "Fatima Zaidi",
    condition: "Knee Injury",
    image: "/placeholder.svg",
    lastMessage: "Okay, what's the next step?",
    lastMessageTime: "1 week ago",
    unread: 0,
    hasAppointment: false,
    messages: [
      { id: 1, text: "Hi doctor. Just checking in about my knee.", sender: "patient", time: "11:00 AM" },
      { id: 2, text: "I've reviewed your scans. Surgery is the best option.", sender: "doctor", time: "11:05 AM" },
      { id: 3, text: "Okay, what's the next step?", sender: "patient", time: "11:10 AM" },
      { id: 4, text: "Your surgery is scheduled for next Tuesday. We'll send you pre-op instructions.", sender: "doctor", time: "11:15 AM" }
    ]
  },
  {
    id: 5,
    name: "Imran Ali",
    condition: "Anxiety Disorder",
    image: "/placeholder.svg",
    lastMessage: "Yes, especially the breathing exercises.",
    lastMessageTime: "3 weeks ago",
    unread: 0,
    hasAppointment: true,
    messages: [
      { id: 1, text: "Good afternoon Imran. How have you been feeling this week?", sender: "doctor", time: "3:00 PM" },
      { id: 2, text: "I've had some ups and downs, but overall better.", sender: "patient", time: "3:05 PM" },
      { id: 3, text: "That's progress. Are you using the techniques we discussed?", sender: "doctor", time: "3:10 PM" },
      { id: 4, text: "Yes, especially the breathing exercises.", sender: "patient", time: "3:15 PM" },
      { id: 5, text: "Remember to practice mindfulness daily. It can make a big difference.", sender: "doctor", time: "3:20 PM" }
    ]
  }
];

const Chat = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [activePatientId, setActivePatientId] = useState(null);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState({});
  const [showPatientsList, setShowPatientsList] = useState(true);
  const [patientsWithAppointments, setPatientsWithAppointments] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState({});
  const messageContainerRef = useRef(null);
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }
    
    const filteredPatients = patients.filter(patient => patient.hasAppointment);
    setPatientsWithAppointments(filteredPatients);
    
    const initialConversations = {};
    const initialUnreadMessages = {};
    
    filteredPatients.forEach(patient => {
      initialConversations[patient.id] = patient.messages || [];
      initialUnreadMessages[patient.id] = patient.unread || 0;
    });
    
    setConversations(initialConversations);
    setUnreadMessages(initialUnreadMessages);
    
    if (location.state && location.state.selectedPatientId) {
      const patientId = location.state.selectedPatientId;
      const selectedPatient = filteredPatients.find(p => p.id === patientId);
      if (selectedPatient) {
        setActivePatientId(patientId);
        setUnreadMessages(prev => ({
          ...prev,
          [patientId]: 0
        }));
        if (isMobile) {
          setShowPatientsList(false);
        }
      }
    } else if (filteredPatients.length > 0) {
      setActivePatientId(filteredPatients[0].id);
    }
  }, [location.state, isMobile]);
  
  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [conversations, activePatientId]);
  
  const handleSendMessage = () => {
    if (!message.trim() || !activePatientId) return;
    
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: "doctor",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setConversations(prev => ({
      ...prev,
      [activePatientId]: [...(prev[activePatientId] || []), newMessage]
    }));
    
    setMessage("");
    
    // Simulate patient response
    setTimeout(() => {
      const patientResponse = {
        id: Date.now() + 1,
        text: "Thank you, doctor. I'll follow your instructions.",
        sender: "patient",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setConversations(prev => ({
        ...prev,
        [activePatientId]: [...(prev[activePatientId] || []), patientResponse]
      }));
    }, 1000);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const togglePatientsList = () => {
    setShowPatientsList(!showPatientsList);
  };
  
  const handleSelectPatient = (patientId) => {
    setActivePatientId(patientId);
    
    setUnreadMessages(prev => ({
      ...prev,
      [patientId]: 0
    }));
    
    if (isMobile) {
      setShowPatientsList(false);
    }
  };
  
  const activePatient = patientsWithAppointments.find(p => p.id === activePatientId);
  const activeConversation = activePatientId ? conversations[activePatientId] || [] : [];
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="p-0">
          <div className="flex h-[calc(100vh-64px)]">
            {isMobile && (
              <button 
                onClick={togglePatientsList}
                className="fixed left-4 bottom-4 z-10 bg-healthcare-primary text-white p-3 rounded-full shadow-lg"
              >
                {showPatientsList ? <X size={20} /> : <MessageSquare size={20} />}
              </button>
            )}
            
            <div 
              className={`w-full md:w-80 bg-white border-r border-gray-100 flex-shrink-0 ${
                isMobile ? (showPatientsList ? 'block' : 'hidden') : 'block'
              }`}
            >
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">Patients</h2>
                <p className="text-sm text-gray-500">Chat with your patients</p>
              </div>
              
              <div className="divide-y divide-gray-100 overflow-y-auto h-[calc(100vh-170px)]">
                {patientsWithAppointments.length > 0 ? (
                  patientsWithAppointments.map(patient => (
                    <div 
                      key={patient.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${
                        patient.id === activePatientId ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleSelectPatient(patient.id)}
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-3 flex-shrink-0">
                          {patient.image ? (
                            <img src={patient.image} alt={patient.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500">
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gray-900 truncate">{patient.name}</h3>
                            <span className="text-xs text-gray-500">{patient.lastMessageTime}</span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">{patient.condition}</p>
                        </div>
                        {unreadMessages[patient.id] > 0 && (
                          <div className="ml-2 bg-blue-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                            {unreadMessages[patient.id]}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No patients available</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      You have no patients with scheduled appointments.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div 
              className={`flex-1 flex flex-col bg-gray-50 ${
                isMobile && showPatientsList ? 'hidden' : 'block'
              }`}
            >
              {activePatientId && activePatient ? (
                <>
                  <div className="py-3 px-4 border-b border-gray-100 bg-white flex items-center">
                    {isMobile && (
                      <button onClick={() => setShowPatientsList(true)} className="mr-3">
                        <Menu size={20} className="text-gray-500" />
                      </button>
                    )}
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                      {activePatient.image ? (
                        <img src={activePatient.image} alt={activePatient.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500">
                          {activePatient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{activePatient.name}</h3>
                      <p className="text-xs text-gray-500">{activePatient.condition}</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-4 overflow-y-auto" ref={messageContainerRef}>
                    <div className="max-w-2xl mx-auto space-y-4">
                      {activeConversation.map(msg => (
                        <div 
                          key={msg.id}
                          className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-xs md:max-w-md rounded-lg px-4 py-3 ${
                              msg.sender === 'doctor' 
                                ? 'bg-healthcare-primary text-white rounded-br-none' 
                                : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                            }`}
                          >
                            <p>{msg.text}</p>
                            <span className={`text-xs ${msg.sender === 'doctor' ? 'text-blue-100' : 'text-gray-500'} block text-right mt-1`}>
                              {msg.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-gray-100 bg-white">
                    <div className="flex space-x-2">
                      <Input 
                        type="text" 
                        placeholder="Type your message..." 
                        className="flex-1"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                      <Button 
                        onClick={handleSendMessage}
                        className="bg-healthcare-primary hover:bg-healthcare-secondary text-white"
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center max-w-md px-4">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No conversation selected</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Select a patient from the list to start a conversation.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;