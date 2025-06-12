import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, MessageSquare, User, LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import LanguageToggle from './LanguageToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const isMobile = useIsMobile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [unreadMessages, setUnreadMessages] = useState(5);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Detect if user is a doctor based on localStorage
  const isDoctor = localStorage.getItem('isDoctor') === 'true';
  
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      const email = localStorage.getItem('userEmail');
      const name = localStorage.getItem('userName');
      setUserEmail(email || '');
      setUserName(name || '');
    }
  }, []);
  
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('isDoctor');
    setIsLoggedIn(false);
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    
    // Redirect to home page
    navigate('/');
  };

  const navigateToChat = () => {
    navigate('/chat');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/doctors?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const chatMessages = [
    { id: 1, sender: 'Dr. Smith', message: 'Your test results look good!', time: '10:30 AM', read: false },
    { id: 2, sender: 'Dr. Johnson', message: 'Remember to take your medication', time: 'Yesterday', read: true },
    { id: 3, sender: 'Nurse Williams', message: 'Your appointment is confirmed', time: 'Yesterday', read: false },
    { id: 4, sender: 'Dr. Brown', message: 'How are you feeling today?', time: '2 days ago', read: false },
    { id: 5, sender: 'Reception', message: 'Your insurance has been updated', time: '3 days ago', read: true }
  ];

  const notifications = [
    { id: 1, title: 'Appointment Reminder', message: 'You have an appointment tomorrow at 2:30 PM', time: '1 hour ago', read: false },
    { id: 2, title: 'Prescription Ready', message: 'Your prescription is ready for pickup', time: '3 hours ago', read: false },
    { id: 3, title: 'Test Results', message: 'Your lab results are now available', time: 'Yesterday', read: false },
    { id: 4, title: 'Payment Confirmation', message: 'Payment received for your last visit', time: '2 days ago', read: true }
  ];

  const markAllMessagesAsRead = () => {
    setUnreadMessages(0);
  };

  const markAllNotificationsAsRead = () => {
    setUnreadNotifications(0);
  };
  
  // Handle click outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Navigate to appropriate settings page based on user type
  const handleSettingsClick = () => {
    if (isDoctor) {
      navigate('/doctor/settings');
    } else {
      navigate('/settings');
    }
    setShowDropdown(false);
  };
  
  return (
    <header className={`h-auto min-h-16 md:h-20 border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 md:px-8 py-2 bg-white sticky top-0 z-10 w-full animate-fade-in`}>
      {isMobile && (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <form onSubmit={handleSearch}>
              <button 
                type="submit" 
                className="p-2 rounded-full bg-gray-50 text-gray-500 transition-all duration-200 hover:bg-gray-100"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
          
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <LanguageToggle variant="ghost" size="icon" />
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="relative p-2 rounded-full bg-blue-50 text-blue-500 transition-all duration-200 hover:bg-blue-100">
                      <Bell size={20} />
                      {unreadNotifications > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{unreadNotifications}</span>
                      )}
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-sm">
                    <SheetHeader className="text-left">
                      <SheetTitle>Notifications</SheetTitle>
                      <SheetDescription className="flex justify-between items-center">
                        <span>You have {unreadNotifications} unread notifications</span>
                        {unreadNotifications > 0 && (
                          <Button variant="ghost" size="sm" onClick={markAllNotificationsAsRead}>
                            Mark all as read
                          </Button>
                        )}
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-4 max-h-[80vh] overflow-y-auto pr-2">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-3 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-blue-500'}`}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-sm mt-1 text-gray-600">{notification.message}</p>
                        </div>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>

                <Sheet>
                  <SheetTrigger asChild>
                    <button 
                      className="relative p-2 rounded-full bg-indigo-50 text-indigo-500 transition-all duration-200 hover:bg-indigo-100"
                    >
                      <MessageSquare size={20} />
                      {unreadMessages > 0 && (
                        <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{unreadMessages}</span>
                      )}
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-sm">
                    <SheetHeader className="text-left">
                      <SheetTitle>Messages</SheetTitle>
                      <SheetDescription className="flex justify-between items-center">
                        <span>You have {unreadMessages} unread messages</span>
                        <div className="flex gap-2">
                          {unreadMessages > 0 && (
                            <Button variant="ghost" size="sm" onClick={markAllMessagesAsRead}>
                              Mark all as read
                            </Button>
                          )}
                          <Button size="sm" onClick={navigateToChat}>
                            Open Chat
                          </Button>
                        </div>
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-4 max-h-[80vh] overflow-y-auto pr-2">
                      {chatMessages.map(message => (
                        <div 
                          key={message.id} 
                          className={`p-3 rounded-lg flex items-start gap-3 cursor-pointer ${message.read ? 'bg-gray-50' : 'bg-indigo-50 border-l-4 border-indigo-500'}`}
                          onClick={navigateToChat}
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{message.sender.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-sm">{message.sender}</h4>
                              <span className="text-xs text-gray-500">{message.time}</span>
                            </div>
                            <p className="text-sm mt-1 text-gray-600">{message.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{userName || userEmail}</p>
                      <p className="text-xs text-gray-500">My Account</p>
                    </div>
                    <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                      <User className="text-gray-500" size={20} />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {isDoctor ? (
                      // Doctor-specific menu items
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/doctor/dashboard">Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/doctor/appointments">Appointments</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/doctor/chat">Patient Messages</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/doctor/patients">My Patients</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/doctor/prescriptions">Write Prescriptions</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/doctor/settings">Profile Settings</Link>
                        </DropdownMenuItem>
                      </>
                    ) : (
                      // Patient-specific menu items
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/appointments">My Appointments</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/doctors">My Doctors</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/prescriptions">Prescriptions</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/chat">Chat</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/settings">Settings</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <LanguageToggle variant="ghost" size="icon" />
                <Button asChild size="sm" className="bg-healthcare-primary hover:bg-healthcare-secondary">
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {!isMobile && (
        <>
          <div className="flex-1">
            <form onSubmit={handleSearch} className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="search" 
                className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-full block w-full pl-10 p-2.5 focus:ring-healthcare-primary focus:border-healthcare-primary transition-all duration-200 hover:border-gray-200"
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6">
            <LanguageToggle />
            
            {isLoggedIn ? (
              <>
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="relative p-2 rounded-full bg-blue-50 text-blue-500 transition-all duration-200 hover:bg-blue-100">
                      <Bell size={20} />
                      {unreadNotifications > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{unreadNotifications}</span>
                      )}
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-sm">
                    <SheetHeader className="text-left">
                      <SheetTitle>Notifications</SheetTitle>
                      <SheetDescription className="flex justify-between items-center">
                        <span>You have {unreadNotifications} unread notifications</span>
                        {unreadNotifications > 0 && (
                          <Button variant="ghost" size="sm" onClick={markAllNotificationsAsRead}>
                            Mark all as read
                          </Button>
                        )}
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-4 max-h-[80vh] overflow-y-auto pr-2">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-3 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-blue-500'}`}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-sm mt-1 text-gray-600">{notification.message}</p>
                        </div>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <button 
                      className="relative p-2 rounded-full bg-indigo-50 text-indigo-500 transition-all duration-200 hover:bg-indigo-100"
                    >
                      <MessageSquare size={20} />
                      {unreadMessages > 0 && (
                        <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{unreadMessages}</span>
                      )}
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-sm">
                    <SheetHeader className="text-left">
                      <SheetTitle>Messages</SheetTitle>
                      <SheetDescription className="flex justify-between items-center">
                        <span>You have {unreadMessages} unread messages</span>
                        <div className="flex gap-2">
                          {unreadMessages > 0 && (
                            <Button variant="ghost" size="sm" onClick={markAllMessagesAsRead}>
                              Mark all as read
                            </Button>
                          )}
                          <Button size="sm" onClick={navigateToChat}>
                            Open Chat
                          </Button>
                        </div>
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-4 max-h-[80vh] overflow-y-auto pr-2">
                      {chatMessages.map(message => (
                        <div 
                          key={message.id} 
                          className={`p-3 rounded-lg flex items-start gap-3 cursor-pointer ${message.read ? 'bg-gray-50' : 'bg-indigo-50 border-l-4 border-indigo-500'}`}
                          onClick={navigateToChat}
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{message.sender.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-sm">{message.sender}</h4>
                              <span className="text-xs text-gray-500">{message.time}</span>
                            </div>
                            <p className="text-sm mt-1 text-gray-600">{message.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
                
                <div className="flex items-center gap-3 pl-3 sm:pl-6 border-l border-gray-100">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{userName || userEmail}</p>
                        <p className="text-xs text-gray-500">{isDoctor ? 'Doctor' : 'My Account'}</p>
                      </div>
                      <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                        <User className="text-gray-500" size={20} />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {isDoctor ? (
                        // Doctor-specific menu items
                        <>
                          <DropdownMenuItem asChild>
                            <Link to="/doctor/dashboard">Dashboard</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/doctor/appointments">Appointments</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/doctor/chat">Patient Messages</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/doctor/patients">My Patients</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/doctor/prescriptions">Write Prescriptions</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/doctor/settings">Profile Settings</Link>
                          </DropdownMenuItem>
                        </>
                      ) : (
                        // Patient-specific menu items
                        <>
                          <DropdownMenuItem asChild>
                            <Link to="/appointments">My Appointments</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/doctors">My Doctors</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/prescriptions">Prescriptions</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/chat">Chat</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/settings">Settings</Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Button asChild variant="outline">
                  <Link to="/signup">Sign Up</Link>
                </Button>
                <Button asChild className="bg-healthcare-primary hover:bg-healthcare-secondary">
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
