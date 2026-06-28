import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, MessageSquare, HelpCircle, Settings, ChevronDown, Share2, Paperclip, Image as ImageIcon, Zap, ArrowUp, Code, MessageCircle, Menu, X, Diamond, Activity, MoreHorizontal, Check, PanelLeftClose, Copy, Mic } from 'lucide-react';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { fetchModels } from '../hooks/useBackend';
import MarkdownRenderer from './MarkdownRenderer';
import ThemeToggle from './ThemeToggle';
import VoiceChatView from './VoiceChatView';
import CONFIG from '../config';

function timeSince(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
}

interface Message {
    id: number;
    type: 'user' | 'ana';
    text: string;
    image?: string | null;
    attachments?: {name: string; type: string; url?: string}[];
    time: string;
}

interface ChatFusionDemoProps {
    messages: Message[];
    onSendMessage: (data: any) => void;
    onNewChat: () => void;
    onSettingsClick: () => void;
    isProcessing: boolean;
    status: string;
    startRecording: () => void;
    stopRecording: () => void;
    isRecording: boolean;
    selectedModel: string;
    onModelChange: (model: string) => void;
    conversations: {id: string; title: string; messages: Message[]; time: string}[];
    onSelectConversation: (id: string) => void;
    onDeleteConversation: (id: string) => void;
    onClearConversations: () => void;
    user?: { username: string; token: string; device_id: string } | null;
    onLogout?: () => void;
}

const ChatFusionDemo: React.FC<ChatFusionDemoProps> = ({ 
    messages, 
    onSendMessage, 
    onNewChat,
    onSettingsClick,
    isProcessing, 
    status,
    startRecording,
    stopRecording,
    isRecording,
    selectedModel,
    onModelChange,
    conversations,
    onSelectConversation,
    onDeleteConversation,
    onClearConversations,
    user,
    onLogout
}) => {
    const [inputText, setInputText] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const chatFileInputRef = useRef<HTMLInputElement>(null);
    const chatImageInputRef = useRef<HTMLInputElement>(null);
    const [attachments, setAttachments] = useState<{name: string; type: string; url?: string; file: File}[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [voiceMode, setVoiceMode] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [profileSaving, setProfileSaving] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [greeting, setGreeting] = useState("");
    const [models, setModels] = useState<{id: string; name: string; engine: string; description: string}[]>([]);

    useEffect(() => {
        const updateGreeting = () => {
            const currentHour = new Date().getHours();
            if (currentHour < 12) setGreeting("Good Morning");
            else if (currentHour < 18) setGreeting("Good Afternoon");
            else setGreeting("Good Evening");
        };

        updateGreeting();
        const interval = setInterval(updateGreeting, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetchModels().then(setModels).catch(() => {});
    }, []);

    const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
    const [isHeroModelDropdownOpen, setIsHeroModelDropdownOpen] = useState(false);
    const modelDropdownRef = useRef<HTMLDivElement>(null);
    const heroModelDropdownRef = useRef<HTMLDivElement>(null);

    // Click outside to close dropdowns
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modelDropdownRef.current && !modelDropdownRef.current.contains(event.target as Node)) {
                setIsModelDropdownOpen(false);
            }
            if (heroModelDropdownRef.current && !heroModelDropdownRef.current.contains(event.target as Node)) {
                setIsHeroModelDropdownOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + "px";
        }
    }, [inputText]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isProcessing]);

    const handleSend = () => {
        if (!inputText.trim() && attachments.length === 0) return;
        onSendMessage({ message: inputText, attachments, model: selectedModel });
        setInputText("");
        setAttachments([]);
        if (textareaRef.current) textareaRef.current.style.height = 'auto';
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'file' | 'image') => {
        const files = Array.from(e.target.files || []);
        const newAttachments = files.map(file => ({
            name: file.name,
            type: type,
            url: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
            file
        }));
        setAttachments(prev => [...prev, ...newAttachments]);
        e.target.value = ''; // reset so same file can be re-selected
    };

    const removeAttachment = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const handleAvatarUpload = async (file: File) => {
        if (!user) return;
        setUploadingAvatar(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch(`${CONFIG.backendUrl}/api/upload/avatar`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${user.token}` },
                body: formData,
            });
            if (!res.ok) throw new Error('Upload failed');
            const data = await res.json();
            setAvatarUrl(data.url);
        } catch (err) {
            console.error('Avatar upload error:', err);
        } finally {
            setUploadingAvatar(false);
        }
    };

    const handleCopy = async (id: number, text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch {}
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };


    return (
        <div className="flex h-screen w-full bg-bg-0 text-text-100 font-sans overflow-hidden">
            
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-bg-100 border-r border-bg-200 flex flex-col h-full flex-shrink-0 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 pb-2">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="w-8 h-8 rounded-full bg-bg-200 border border-bg-300 flex items-center justify-center overflow-hidden hover:bg-bg-300 transition-colors">
                            <img src="/ana-logo.png" alt="Ana" className="w-full h-full object-cover" />
                        </Link>
                        <div className="w-8 h-8 flex items-center justify-center rounded-md cursor-pointer hover:bg-bg-300 transition-colors text-text-200">
                            <Search className="w-[18px] h-[18px]" />
                        </div>
                    </div>
                    <button 
                        className="p-1.5 text-text-300 hover:text-text-100 transition-colors rounded-lg hover:bg-bg-200"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <PanelLeftClose className="w-5 h-5" />
                    </button>
                </div>

                {/* New Chat Button */}
                <div className="px-3 py-2">
                    <button onClick={onNewChat} className="w-full flex items-center justify-between px-3 py-2 bg-bg-200 hover:bg-bg-300 transition-colors rounded-md text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <Plus className="w-[18px] h-[18px]" />
                            <span>New Chat</span>
                        </div>
                        <div className="flex items-center gap-1 text-text-300 text-[11px] font-mono bg-bg-100 px-1.5 py-0.5 rounded-md border border-bg-300">
                            <span>⌘N</span>
                        </div>
                    </button>
                </div>

                {/* Recent Chats List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar px-3 mt-2">
                    <div className="flex items-center justify-between mb-2 px-3">
                        <span className="text-[11px] font-semibold text-text-300">Recent</span>
                        {conversations.length > 0 && (
                            <button onClick={onClearConversations} className="text-[10px] text-text-300 hover:text-text-100 transition-colors">Clear</button>
                        )}
                    </div>
                    <div className="space-y-[2px]">
                        {conversations.slice(0, 20).map((chat) => (
                            <button 
                                key={chat.id} 
                                className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-bg-200 rounded-lg text-[13px] text-text-200 hover:text-text-100 transition-colors text-left truncate group"
                                onClick={() => { onSelectConversation(chat.id); setIsSidebarOpen(false); }}
                            >
                                <MessageSquare className="w-4 h-4 shrink-0 opacity-70 group-hover:opacity-100" />
                                <span className="truncate">{chat.title}</span>
                            </button>
                        ))}
                        {conversations.length === 0 && (
                            <div className="px-3 py-4 text-[12px] text-text-300 text-center">No recent chats</div>
                        )}
                    </div>
                </div>

                {/* Bottom: Voice Chat, Home and User */}
                <div className="p-3 space-y-[2px] border-t border-bg-200 mt-auto">
                    <button 
                        onClick={() => { setVoiceMode(true); setIsSidebarOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-bg-200 rounded-lg text-[13px] text-text-200 hover:text-text-100 transition-colors"
                    >
                        <Mic className="w-[18px] h-[18px]" />
                        <span>Voice Chat</span>
                    </button>
                    <Link to="/" className="w-full flex items-center gap-3 px-3 py-2 hover:bg-bg-200 rounded-lg text-[13px] text-text-200 hover:text-text-100 transition-colors no-underline">
                        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        <span>Home</span>
                    </Link>
                    <div className="relative" ref={userMenuRef}>
                        <button 
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-bg-200 rounded-lg text-[13px] text-text-200 hover:text-text-100 transition-colors"
                        >
                            <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 bg-bg-200">
                                <img src={avatarUrl || user?.avatar_url || '/ana-logo.png'} alt="User" className="w-full h-full object-cover" />
                            </div>
                            <span className="truncate">{user?.username || 'Anonymous'}</span>
                        </button>
                        {isUserMenuOpen && (
                            <div className="absolute bottom-full left-0 right-0 mb-1 bg-bg-100 border border-bg-200 rounded-md shadow-2xl overflow-hidden animate-fade-in z-50">
                                <div className="p-3 border-b border-bg-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-bg-200 border border-bg-300 overflow-hidden flex-shrink-0">
                                            <img src={avatarUrl || user?.avatar_url || '/ana-logo.png'} alt="User" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[14px] font-medium text-text-100 truncate">{user?.username || 'Anonymous'}</div>
                                            <div className="text-[12px] text-text-300 truncate">{user ? `ID: ${user.device_id.slice(0, 8)}...` : 'Not signed in'}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-1.5">
                                    {user ? (
                                        <>
                                            <button 
                                                onClick={() => { onSettingsClick(); setIsUserMenuOpen(false); }}
                                                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-bg-200 rounded-lg text-[13px] text-text-200 hover:text-text-100 transition-colors"
                                            >
                                                <Settings className="w-[18px] h-[18px]" />
                                                <span>Settings</span>
                                            </button>
                                            <button 
                                                onClick={async () => { 
                                                    setEditProfileOpen(true); 
                                                    setIsUserMenuOpen(false);
                                                    if (user?.token) {
                                                        try {
                                                            const res = await fetch(`${CONFIG.backendUrl}/api/auth/profile`, {
                                                                headers: { 'Authorization': `Bearer ${user.token}` },
                                                            });
                                                            if (res.ok) {
                                                                const profile = await res.json();
                                                                setDisplayName(profile.display_name || user.username);
                                                                setEmail(profile.email || '');
                                                                setAvatarUrl(profile.avatar_url || '');
                                                            }
                                                        } catch {}
                                                    }
                                                }}
                                                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-bg-200 rounded-lg text-[13px] text-text-200 hover:text-text-100 transition-colors"
                                            >
                                                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                                <span>Edit Profile</span>
                                            </button>
                                            <button 
                                                onClick={() => { onLogout?.(); setIsUserMenuOpen(false); }}
                                                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-bg-200 rounded-lg text-[13px] text-text-200 hover:text-text-100 transition-colors"
                                            >
                                                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                                                <span>Log out</span>
                                            </button>
                                        </>
                                    ) : (
                                        <Link 
                                            to="/signin"
                                            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white text-black text-[13px] font-medium rounded-lg hover:bg-[#E3E3E3] transition-colors no-underline"
                                        >
                                            Sign in
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Area */}
            <div className={`flex-1 flex flex-col h-full bg-bg-0 relative min-w-0 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-[260px]' : 'lg:ml-0'}`}>
                {voiceMode ? (
                    <VoiceChatView
                        messages={messages}
                        isProcessing={isProcessing}
                        status={status}
                        isRecording={isRecording}
                        startRecording={startRecording}
                        stopRecording={stopRecording}
                        onExitVoiceMode={() => setVoiceMode(false)}
                    />
                ) : (<>
                
                {/* Topbar */}
                <div className="h-[60px] flex items-center justify-between px-3 sm:px-6 flex-shrink-0 w-full z-10">
                    <div className="flex items-center gap-2">
                        <button 
                            className="p-1.5 text-text-300 hover:text-text-100 transition-colors rounded-lg hover:bg-bg-100"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="relative" ref={modelDropdownRef}>
                            <div 
                                className="flex items-center gap-1.5 cursor-pointer hover:bg-bg-100 px-2 py-1.5 rounded-lg transition-colors -ml-2"
                                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                            >
                                <span className="text-[13px] sm:text-[15px] font-medium tracking-tight">{models.find(m => m.id === selectedModel)?.name || 'Ana Moon v1.0'}</span>
                                <ChevronDown className={`w-[14px] h-[14px] text-text-300 transition-transform ${isModelDropdownOpen ? 'rotate-180' : ''}`} />
                            </div>
                            
                            {/* Model Dropdown */}
                            {isModelDropdownOpen && (
                                <div className="absolute top-full left-0 mt-1 w-[240px] bg-bg-100 border border-bg-200 rounded-md shadow-2xl overflow-hidden animate-fade-in z-50 p-1.5">
                                    {models.map(m => (
                                        <button 
                                            key={m.id}
                                            className={`w-full text-left px-3 py-2.5 rounded-lg flex flex-col group transition-colors ${selectedModel === m.id ? 'bg-bg-200' : 'hover:bg-bg-200'}`}
                                            onClick={() => { onModelChange(m.id); setIsModelDropdownOpen(false); }}
                                        >
                                            <div className="flex items-center justify-between w-full">
                                                <span className="text-[13px] font-semibold text-text-100">{m.name}</span>
                                                {selectedModel === m.id && (
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                                )}
                                            </div>
                                            <span className="text-[11px] text-text-200 mt-0.5">{m.description}</span>
                                        </button>
                                    ))}
                                    {models.length === 0 && (
                                        <div className="px-3 py-4 text-[12px] text-text-300 text-center">Loading models...</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <ThemeToggle />
                        <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-bg-200 hover:bg-bg-100 text-text-100 text-[13px] transition-colors">
                            <Share2 className="w-3.5 h-3.5" />
                            <span>Share</span>
                        </button>
                        <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-bg-200 hover:bg-bg-100 text-text-100 text-[13px] transition-colors">
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>Help</span>
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                {messages && messages.length > 0 ? (
                    // Chat View
                    <div className="flex-1 flex flex-col overflow-hidden w-full max-w-[1000px] mx-auto px-4">
                        <div className="flex-1 overflow-y-auto scrollbar-hide py-6 flex flex-col gap-6">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex w-full group ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.type === 'ana' && (
                                        <div className="w-8 h-8 rounded-full bg-bg-200 border border-bg-300 flex items-center justify-center mr-3 mt-1 shrink-0 overflow-hidden">
                                            <img src="/ana-logo.png" alt="Ana" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className={`relative max-w-[90%] sm:max-w-[85%] rounded-lg px-4 sm:px-5 py-3 sm:py-3.5 text-[14px] sm:text-[15px] leading-relaxed shadow-sm font-sans
                                        ${msg.type === 'user' 
                                            ? 'bg-bg-200 text-text-100 rounded-br-sm' 
                                            : 'bg-transparent text-text-100 rounded-bl-sm'}`}
                                    >
                                        {/* Attachment images shown above text */}
                                        {msg.attachments && msg.attachments.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {msg.attachments.map((att, i) => (
                                                    att.url ? (
                                                        <img
                                                            key={i}
                                                            src={att.url}
                                                            alt={att.name}
                                                            className="max-w-[200px] max-h-[200px] rounded-md object-cover border border-bg-300 shadow-sm"
                                                        />
                                                    ) : (
                                                        <div key={i} className="flex items-center gap-2 bg-bg-300 rounded-lg px-3 py-2">
                                                            <Paperclip className="w-3.5 h-3.5 text-text-200" />
                                                            <span className="text-[12px] text-text-200 max-w-[140px] truncate">{att.name}</span>
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        )}
                                        {msg.type === 'ana' ? (
                                            <MarkdownRenderer content={msg.text} />
                                        ) : (
                                            msg.text && <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                                        )}
                                        <button
                                            onClick={() => handleCopy(msg.id, msg.text)}
                                            className={`absolute w-7 h-7 rounded-md bg-bg-200 border border-bg-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-bg-300 ${msg.type === 'user' ? '-bottom-2 -left-2' : '-top-2 -right-2'}`}
                                        >
                                            {copiedId === msg.id ? (
                                                <Check className="w-3.5 h-3.5 text-green-400" />
                                            ) : (
                                                <Copy className="w-3.5 h-3.5 text-text-300" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {isProcessing && (
                                <div className="flex w-full justify-start animate-fade-in">
                                    <div className="w-8 h-8 rounded-full bg-bg-200 border border-bg-300 flex items-center justify-center mr-3 mt-1 shrink-0 overflow-hidden">
                                        <img src="/ana-logo.png" alt="Ana" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex items-center gap-3 max-w-[85%] rounded-lg px-5 py-3.5 bg-transparent text-text-100 rounded-bl-sm">
                                        <div className="w-2 h-2 bg-text-300 rounded-full animate-pulse" />
                                        <div className="w-2 h-2 bg-text-300 rounded-full animate-pulse delay-75" />
                                        <div className="w-2 h-2 bg-text-300 rounded-full animate-pulse delay-150" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Pinned Input Area for Chat */}
                        <div className="py-4 bg-bg-0">
                            <div className="w-full bg-bg-100 rounded-lg border border-bg-200 focus-within:border-bg-400 transition-colors p-3 flex flex-col shadow-sm">
                                {/* Attachment Previews */}
                                {attachments.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-3 pb-3 border-b border-bg-200">
                                        {attachments.map((att, i) => (
                                            <div key={i} className="flex items-center gap-1.5 bg-bg-200 rounded-lg px-2.5 py-1.5 group">
                                                {att.url ? (
                                                    <img src={att.url} alt={att.name} className="w-6 h-6 rounded object-cover" />
                                                ) : (
                                                    <Paperclip className="w-3.5 h-3.5 text-text-300" />
                                                )}
                                                <span className="text-[11px] text-text-200 max-w-[100px] truncate">{att.name}</span>
                                                <button onClick={() => removeAttachment(i)} className="text-text-300 hover:text-text-100 transition-colors ml-1">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="flex items-end gap-2">
                                    <button onClick={() => chatFileInputRef.current?.click()} className="p-1.5 text-text-300 hover:text-text-100 transition-colors rounded-lg hover:bg-bg-200 flex-shrink-0" title="Attach file">
                                        <Paperclip className="w-4 h-4" />
                                    </button>
                                    <input ref={chatFileInputRef} type="file" multiple className="hidden" onChange={(e) => handleFileSelect(e, 'file')} />
                                    <button onClick={() => chatImageInputRef.current?.click()} className="p-1.5 text-text-300 hover:text-text-100 transition-colors rounded-lg hover:bg-bg-200 flex-shrink-0" title="Attach image">
                                        <ImageIcon className="w-4 h-4" />
                                    </button>
                                    <input ref={chatImageInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFileSelect(e, 'image')} />
                                    <div className="flex-1 min-h-[24px]">
                                        <textarea
                                            ref={textareaRef}
                                            value={inputText}
                                            onChange={(e) => setInputText(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="How can ANA help you today?"
                                            className="w-full bg-transparent border-0 outline-none text-text-100 text-[15px] placeholder:text-text-300 resize-none overflow-y-auto custom-scrollbar py-1 leading-relaxed block"
                                            rows={1}
                                            autoFocus
                                        />
                                    </div>
                                    <button 
                                        className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${isRecording ? 'bg-red-500/20 text-red-500' : 'text-text-300 hover:text-text-100 hover:bg-bg-200'}`}
                                        onClick={isRecording ? stopRecording : startRecording}
                                        title={isRecording ? 'Stop recording' : 'Voice input'}
                                    >
                                        <Zap className={`w-4 h-4 ${isRecording ? 'animate-pulse' : ''}`} />
                                    </button>
                                    <button 
                                        onClick={handleSend}
                                        disabled={!inputText.trim() && attachments.length === 0}
                                        className={`w-8 h-8 flex items-center justify-center rounded-md transition-all flex-shrink-0
                                            ${(inputText.trim() || attachments.length > 0) ? 'bg-white text-black hover:bg-[#E3E3E3]' : 'bg-bg-200 text-text-300'}`}
                                    >
                                        <ArrowUp className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-[10px] sm:text-[11px] text-text-300 text-center mt-2 tracking-wide w-full px-2">ANA can make mistakes, so please double check the response.</p>
                        </div>
                    </div>
                ) : (
                    // Initial Hero View
                    <div className="flex-1 flex flex-col items-center justify-center max-w-[1000px] w-full mx-auto px-4 mt-[-60px]">
                        
                        {/* Greeting */}
                        <h1 className="text-[28px] sm:text-[38px] font-medium text-text-100 mb-2 sm:mb-3 tracking-tight animate-fade-in text-center flex items-center justify-center gap-2">
                            {greeting} <span className="hidden sm:inline">{user?.username || 'Anonymous'}</span> <span className="animate-bounce inline-block">👋</span>
                        </h1>

                        {/* Large Input Box */}
                        <div className="w-full bg-bg-100 rounded-lg border border-bg-200 p-4 sm:p-5 flex flex-col min-h-[160px] sm:min-h-[180px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-colors focus-within:border-bg-400 animate-fade-in relative">
                            {/* Attachment Previews */}
                            {attachments.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3 pb-3 border-b border-bg-200">
                                    {attachments.map((att, i) => (
                                        <div key={i} className="flex items-center gap-1.5 bg-bg-200 rounded-lg px-2.5 py-1.5 group">
                                            {att.url ? (
                                                <img src={att.url} alt={att.name} className="w-6 h-6 rounded object-cover" />
                                            ) : (
                                                <Paperclip className="w-3.5 h-3.5 text-text-300" />
                                            )}
                                            <span className="text-[11px] text-text-200 max-w-[100px] truncate">{att.name}</span>
                                            <button onClick={() => removeAttachment(i)} className="text-text-300 hover:text-text-100 transition-colors ml-1">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="flex items-start gap-3 text-text-300 mb-3">
                                <button onClick={() => fileInputRef.current?.click()} title="Attach file" className="hover:text-text-100 transition-colors mt-[3px] flex-shrink-0">
                                    <Paperclip className="w-[18px] h-[18px]" />
                                </button>
                                <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => handleFileSelect(e, 'file')} />
                                <textarea
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="How can ANA help you today?"
                                    className="w-full bg-transparent border-0 outline-none text-text-100 text-[16px] placeholder:text-text-300 resize-none h-[80px] py-0 leading-relaxed font-sans"
                                    autoFocus
                                />
                            </div>

                            <div className="flex items-end justify-between mt-auto">
                                <div className="flex items-center gap-3">
                                    <div className="relative" ref={heroModelDropdownRef}>
                                        <div 
                                            className="flex items-center gap-1.5 bg-bg-200 text-text-100 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-bg-300 transition-colors border border-bg-300"
                                            onClick={() => setIsHeroModelDropdownOpen(!isHeroModelDropdownOpen)}
                                        >
                                            <span className="text-[12px] font-medium">{models.find(m => m.id === selectedModel)?.name || 'Ana Moon v1.0'}</span>
                                            <ChevronDown className={`w-3.5 h-3.5 text-text-200 transition-transform ${isHeroModelDropdownOpen ? 'rotate-180' : ''}`} />
                                        </div>
                                        
                                        {/* Hero Model Dropdown */}
                                        {isHeroModelDropdownOpen && (
                                            <div className="absolute bottom-full left-0 mb-2 w-[220px] bg-bg-100 border border-bg-200 rounded-md shadow-2xl overflow-hidden animate-fade-in z-50 p-1.5">
                                                {models.map(m => (
                                                    <button 
                                                        key={m.id}
                                                        className={`w-full text-left px-3 py-2.5 rounded-lg flex flex-col group transition-colors ${selectedModel === m.id ? 'bg-bg-200' : 'hover:bg-bg-200'}`}
                                                        onClick={() => { onModelChange(m.id); setIsHeroModelDropdownOpen(false); }}
                                                    >
                                                        <div className="flex items-center justify-between w-full">
                                                            <span className="text-[13px] font-semibold text-text-100">{m.name}</span>
                                                            {selectedModel === m.id && (
                                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                                            )}
                                                        </div>
                                                        <span className="text-[11px] text-text-200 mt-0.5">{m.description}</span>
                                                    </button>
                                                ))}
                                                {models.length === 0 && (
                                                    <div className="px-3 py-4 text-[12px] text-text-300 text-center">Loading models...</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 ml-1 text-text-300">
                                        <button onClick={() => imageInputRef.current?.click()} className="p-1.5 hover:bg-bg-200 rounded-lg hover:text-text-100 transition-colors" title="Attach image">
                                            <ImageIcon className="w-[18px] h-[18px]" />
                                        </button>
                                        <input ref={imageInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFileSelect(e, 'image')} />
                                        <button 
                                            className={`p-1.5 rounded-lg transition-colors ${isRecording ? 'bg-red-500/20 text-red-500' : 'hover:bg-bg-200 hover:text-text-100'}`}
                                            onClick={isRecording ? stopRecording : startRecording}
                                        >
                                            <Zap className={`w-[18px] h-[18px] ${isRecording ? 'animate-pulse' : ''}`} />
                                        </button>
                                    </div>
                                </div>
                                <button 
                                    onClick={handleSend}
                                    disabled={!inputText.trim()}
                                    className={`w-9 h-9 flex items-center justify-center rounded-md transition-all shadow-sm flex-shrink-0
                                        ${inputText.trim() ? 'bg-white text-black hover:bg-[#E3E3E3] scale-100' : 'bg-bg-200 text-text-300 scale-95'}`}
                                >
                                    <ArrowUp className="w-4.5 h-4.5" />
                                </button>
                            </div>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-text-300 text-center mt-3 mb-2 tracking-wide px-2">ANA can make mistakes, so please double check the response.</p>

                        {/* Hint Text */}
                        <div className="w-full mt-2 mb-6 sm:mb-8 text-left px-2 animate-fade-in hidden sm:block">
                            <p className="text-[12px] text-text-300">Collaborate with ANA using documents, images and more</p>
                        </div>

                        {/* Action Pills */}
                        <div className="flex flex-wrap items-center justify-center gap-3 w-full mb-10 animate-fade-in">
                                    <button className="flex items-center gap-2 px-4 py-2 border border-dashed border-bg-400 rounded-lg text-[13px] text-text-200 hover:text-text-100 hover:border-text-300 transition-colors bg-bg-0">
                                <ImageIcon className="w-4 h-4" />
                                <span>Create images</span>
                            </button>
                                    <button className="flex items-center gap-2 px-4 py-2 border border-dashed border-bg-400 rounded-lg text-[13px] text-text-200 hover:text-text-100 hover:border-text-300 transition-colors bg-bg-0">
                                <Search className="w-4 h-4" />
                                <span>Analyze images</span>
                            </button>
                                    <button className="flex items-center gap-2 px-4 py-2 border border-dashed border-bg-400 rounded-lg text-[13px] text-text-200 hover:text-text-100 hover:border-text-300 transition-colors bg-bg-0">
                                <Code className="w-4 h-4" />
                                <span>Code</span>
                            </button>
                                    <button className="flex items-center gap-2 px-4 py-2 border border-dashed border-bg-400 rounded-lg text-[13px] text-text-200 hover:text-text-100 hover:border-text-300 transition-colors bg-bg-0">
                                <span>More</span>
                            </button>
                        </div>

                    </div>
                )}
                </>)}
            </div>
            {/* Edit Profile Modal */}
            {editProfileOpen && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center" onClick={() => setEditProfileOpen(false)}>
                    <div className="bg-bg-100 border border-bg-200 rounded-lg shadow-2xl w-[320px] animate-fade-in" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-4 border-b border-bg-200">
                            <h3 className="text-[15px] font-semibold text-text-100">Edit Profile</h3>
                            <button onClick={() => setEditProfileOpen(false)} className="text-text-300 hover:text-text-100 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="relative w-16 h-16">
                                    <div className="w-16 h-16 rounded-full bg-bg-200 flex items-center justify-center text-[24px] font-bold text-text-300 overflow-hidden border border-bg-300 cursor-pointer group" onClick={() => document.getElementById('avatar-input')?.click()}>
                                        {avatarUrl ? (
                                            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <span>{(user?.username || 'A')[0].toUpperCase()}</span>
                                        )}
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                                            <span className="text-[10px] text-text-100 font-medium">{uploadingAvatar ? '...' : 'Edit'}</span>
                                        </div>
                                    </div>
                                    <input id="avatar-input" type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleAvatarUpload(f); }} />
                                </div>
                                <div>
                                    <div className="text-[14px] font-medium text-text-100">{user?.username || 'Anonymous'}</div>
                                    <div className="text-[12px] text-text-300">{user?.device_id ? `ID: ${user.device_id.slice(0, 12)}...` : 'Not signed in'}</div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[12px] text-text-300 font-medium">Display Name</label>
                                <input 
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="w-full bg-bg-200 border border-bg-300 rounded-md px-3 py-2 text-[13px] text-text-100 focus:outline-none focus:border-bg-400 transition-colors"
                                    placeholder="Enter display name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[12px] text-text-300 font-medium">Email</label>
                                <input 
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-bg-200 border border-bg-300 rounded-md px-3 py-2 text-[13px] text-text-100 focus:outline-none focus:border-bg-400 transition-colors"
                                    placeholder="Enter email"
                                />
                            </div>
                            {!user && (
                                <div className="bg-bg-200 rounded-md p-3">
                                    <p className="text-[12px] text-text-300">Sign in to save your profile across devices.</p>
                                    <a href="/signin" className="text-[12px] text-blue-400 hover:text-blue-300 mt-1 inline-block" onClick={() => setEditProfileOpen(false)}>Sign in</a>
                                </div>
                            )}
                        </div>
                        {user && (
                            <div className="p-4 pt-0">
                                <button 
                                    className="w-full bg-white text-black text-[13px] font-medium py-2 rounded-md hover:bg-[#E3E3E3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={profileSaving}
                                    onClick={async () => {
                                        setProfileSaving(true);
                                        try {
                                            const res = await fetch(`${CONFIG.backendUrl}/api/auth/profile`, {
                                                method: 'PUT',
                                                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user?.token}` },
                                                body: JSON.stringify({ display_name: displayName, email }),
                                            });
                                            if (!res.ok) throw new Error('Failed to save');
                                            setEditProfileOpen(false);
                                        } catch (err) {
                                            console.error('Profile save error:', err);
                                        } finally {
                                            setProfileSaving(false);
                                        }
                                    }}
                                >
                                    {profileSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatFusionDemo;
