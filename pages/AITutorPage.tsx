import React, { useState, useEffect, useRef, useCallback } from 'react';
import useI18n from '../hooks/useI18n';
import { useVoiceInteraction } from '../hooks/useVoiceInteraction';
import { Brain, Send, Paperclip, RotateCw, XCircle, Mic, MicOff, Volume2, VolumeX, MessageSquare } from 'lucide-react';
import { UserAvatar } from '../constants';
import Button from '../components/Button';
import Card from '../components/Card';
import { ChatMessage, ChatRole } from '../types';

const AITutorPage: React.FC = () => {
    const { t, language } = useI18n();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isVoiceMode, setIsVoiceMode] = useState(false);
    const [autoSpeak, setAutoSpeak] = useState(true);
    const [apiKey, setApiKey] = useState<string | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Voice interaction hook
    const voice = useVoiceInteraction({
        onTranscript: (text) => {
            if (text.trim()) {
                setUserInput(text);
                // Auto-send after transcript is final
                setTimeout(() => handleSendMessage(text), 500);
            }
        },
        language: language === 'ar' ? 'ar-SA' : 'en-US'
    });

    useEffect(() => {
        const key = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
        console.log('🔑 Checking API Key:', key ? 'Found' : 'Not found');
        
        if (key && key !== 'PLACEHOLDER_API_KEY' && key !== 'YOUR_API_KEY_HERE') {
            console.log('✅ API Key loaded successfully');
            setApiKey(key);
            
            // List available models
            fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`)
                .then(res => res.json())
                .then(data => {
                    console.log('📄 Available Gemini models:', data.models?.map((m: any) => m.name));
                })
                .catch(err => console.error('❌ Failed to list models:', err));
            
            // Set welcome message
            setMessages([{
                role: ChatRole.MODEL,
                text: t('aiTutorPage.welcomeMessage'),
                timestamp: new Date(),
            }]);
        } else {
            console.error('❌ API Key is missing or invalid');
            setError(t('aiTutorPage.error.apiKey'));
        }
    }, [t]);



    useEffect(() => {
        chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
    }, [messages, isLoading]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSendMessage = useCallback(async (voiceText?: string) => {
        const textToSend = voiceText || userInput;
        console.log('📤 Sending message:', textToSend.substring(0, 50) + '...');
        
        if (isLoading || (!textToSend.trim() && !uploadedImage)) {
            console.log('⚠️ Message blocked:', { isLoading, hasText: textToSend.trim().length > 0, hasImage: !!uploadedImage });
            return;
        }

        const userMessage: ChatMessage = {
            role: ChatRole.USER,
            text: textToSend,
            image: uploadedImage || undefined,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        
        const textForAPI = textToSend;
        const imageForAPI = uploadedImage;

        setUserInput('');
        setUploadedImage(null);
        setIsLoading(true);
        setError(null);

        const modelMessagePlaceholder: ChatMessage = { role: ChatRole.MODEL, text: '', timestamp: new Date(), isStreaming: true };
        setMessages(prev => [...prev, modelMessagePlaceholder]);

        try {
            console.log('🤖 API Key:', apiKey ? 'Set' : 'NOT SET');
            if (!apiKey) throw new Error("API Key not initialized");

            // Build the request for Gemini REST API
            const contents: any[] = [];
            
            // Add user message parts
            const parts: any[] = [];
            if (textForAPI) {
                parts.push({ text: textForAPI });
            }
            if (imageForAPI) {
                const mimeType = imageForAPI.split(';')[0].split(':')[1];
                const base64Data = imageForAPI.split(',')[1];
                parts.push({ 
                    inline_data: { 
                        mime_type: mimeType, 
                        data: base64Data 
                    } 
                });
            }
            
            contents.push({
                role: 'user',
                parts: parts
            });

            console.log('🚀 Sending to Gemini REST API...');
            console.log('📤 Request:', { contents });
            
            // Add system instruction as first message
            const systemInstruction = isVoiceMode 
                ? t('aiTutorPage.voiceSystemPrompt')
                : t('aiTutorPage.systemPrompt');
            
            // Prepend system instruction to contents
            const fullContents = [
                {
                    role: 'user',
                    parts: [{ text: `System: ${systemInstruction}\n\nUser: ${textForAPI}` }]
                }
            ];
                
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: fullContents,
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 2048,
                        },
                        safetySettings: [
                            {
                                category: "HARM_CATEGORY_HARASSMENT",
                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                            },
                            {
                                category: "HARM_CATEGORY_HATE_SPEECH",
                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                            },
                            {
                                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                            },
                            {
                                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                            }
                        ]
                    })
                }
            );
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('❌ API Error:', errorData);
                
                // Handle quota exceeded error
                if (response.status === 429) {
                    const retryAfter = errorData.error?.details?.find((d: any) => d['@type']?.includes('RetryInfo'))?.retryDelay || '60s';
                    const seconds = parseInt(retryAfter.replace('s', ''));
                    throw new Error(`تجاوزت حد الاستخدام المجاني (10 طلبات/دقيقة). يرجى الانتظار ${seconds} ثانية والمحاولة مجدداً.`);
                }
                
                throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
            }
            
            const data = await response.json();
            console.log('✅ Response received from Gemini');
            console.log('📤 Response data:', data);
            
            const fullResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'لم أتمكن من الحصول على رد';
            
            setMessages(prev => prev.map((msg, index) =>
                index === prev.length - 1 ? { ...msg, text: fullResponse, isStreaming: false } : msg
            ));
            
            // Speak if in voice mode
            if (isVoiceMode && autoSpeak && fullResponse) {
                voice.speak(fullResponse);
            }

        } catch (err: any) {
            console.error("❌ AI Tutor Error:", err);
            console.error("❌ Error details:", {
                message: err?.message,
                name: err?.name,
                stack: err?.stack?.substring(0, 200)
            });
            setError(t('aiTutorPage.error.generic') + ': ' + (err?.message || String(err)));
             setMessages(prev => prev.slice(0, -1)); // Remove placeholder
        } finally {
            setIsLoading(false);
            console.log('🏁 Message handling complete');
        }
    }, [isLoading, userInput, uploadedImage, apiKey, t, isVoiceMode, autoSpeak, voice]);

    return (
        <div className="py-12 bg-gray-50 dark:bg-neutral-dark min-h-[calc(100vh-128px)]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-8">
                    <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h1 className="text-4xl font-extrabold text-neutral-dark dark:text-neutral-light sm:text-5xl">
                        {t('aiTutorPage.title')}
                    </h1>
                    <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-gray-400">
                        {t('aiTutorPage.subtitle')}
                    </p>
                    
                    {/* Mode Toggle */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <button
                            onClick={() => {
                                setIsVoiceMode(false);
                                voice.stopListening();
                                voice.stopSpeaking();
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                                !isVoiceMode
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                        >
                            <MessageSquare className="w-5 h-5" />
                            {t('voice.mode.text')}
                        </button>
                        <button
                            onClick={() => setIsVoiceMode(true)}
                            disabled={!voice.isSupported}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                                isVoiceMode
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            <Mic className="w-5 h-5" />
                            {t('voice.mode.voice')}
                        </button>
                    </div>
                    
                    {!voice.isSupported && (
                        <p className="mt-3 text-sm text-warning">{t('voice.notSupported')}</p>
                    )}
                </header>

                <Card className="shadow-2xl flex flex-col h-[70vh]">
                    <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-6 space-y-6">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-3 ${msg.role === ChatRole.USER ? 'flex-row-reverse' : ''}`}>
                                {msg.role === ChatRole.MODEL ? (
                                    <div className="w-8 h-8 flex-shrink-0 bg-primary-light rounded-full flex items-center justify-center">
                                        <Brain className="w-5 h-5 text-primary-dark" />
                                    </div>
                                ) : (
                                    <UserAvatar initial="U" size="sm" className="w-8 h-8 mt-1"/>
                                )}
                                <div className={`max-w-lg rounded-[1.5rem] px-4 py-3 ${
                                    msg.role === ChatRole.USER
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-neutral-dark dark:text-neutral-light'
                                }`}>
                                    {msg.image && <img src={msg.image} alt="User upload" className="rounded-[1.25rem] mb-2 max-h-48" />}
                                    <p className="text-sm whitespace-pre-wrap">{msg.text}{msg.isStreaming && <span className="blinking-cursor"></span>}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-xl">
                        {/* Voice Mode Status */}
                        {isVoiceMode && (
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700">
                                    {voice.state === 'listening' && (
                                        <>
                                            <Mic className="w-5 h-5 text-error animate-pulse" />
                                            <span className="text-sm font-medium text-neutral-dark dark:text-neutral-light">
                                                {t('voice.state.listening')}
                                            </span>
                                        </>
                                    )}
                                    {voice.state === 'processing' && (
                                        <>
                                            <RotateCw className="w-5 h-5 text-primary animate-spin" />
                                            <span className="text-sm font-medium text-neutral-dark dark:text-neutral-light">
                                                {t('voice.state.processing')}
                                            </span>
                                        </>
                                    )}
                                    {voice.state === 'speaking' && (
                                        <>
                                            <Volume2 className="w-5 h-5 text-success animate-pulse" />
                                            <span className="text-sm font-medium text-neutral-dark dark:text-neutral-light">
                                                {t('voice.state.speaking')}
                                            </span>
                                        </>
                                    )}
                                    {voice.state === 'idle' && (
                                        <>
                                            <Mic className="w-5 h-5 text-gray-400" />
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {t('voice.state.idle')}
                                            </span>
                                        </>
                                    )}
                                </div>
                                {voice.state === 'speaking' && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={voice.stopSpeaking}
                                    >
                                        <VolumeX className="w-5 h-5" />
                                        {t('voice.button.stopSpeaking')}
                                    </Button>
                                )}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setAutoSpeak(!autoSpeak)}
                                    title={autoSpeak ? 'Disable auto-speak' : 'Enable auto-speak'}
                                >
                                    {autoSpeak ? <Volume2 className="w-5 h-5 text-primary" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
                                </Button>
                            </div>
                        )}
                        
                        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
                        {voice.error && <p className="text-red-500 text-sm text-center mb-2">{voice.error}</p>}
                        
                        {uploadedImage && (
                            <div className="relative w-24 h-24 mb-2">
                                <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover rounded-md" />
                                <button
                                    onClick={() => setUploadedImage(null)}
                                    className="absolute -top-2 -right-2 bg-gray-700 text-white rounded-full p-0.5 hover:bg-red-500"
                                    title={t('aiTutorPage.removeImageTooltip')}
                                >
                                    <XCircle className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                            {/* Voice Mode Microphone Button */}
                            {isVoiceMode ? (
                                <Button
                                    variant={voice.state === 'listening' ? 'solid' : 'outline'}
                                    onClick={() => {
                                        if (voice.state === 'listening') {
                                            voice.stopListening();
                                        } else {
                                            voice.startListening();
                                        }
                                    }}
                                    disabled={!voice.isSupported || voice.state === 'processing' || voice.state === 'speaking'}
                                    className={`${
                                        voice.state === 'listening'
                                            ? 'bg-error hover:bg-error-dark animate-pulse'
                                            : ''
                                    } flex-shrink-0`}
                                    title={voice.state === 'listening' ? t('voice.button.stop') : t('voice.button.start')}
                                >
                                    {voice.state === 'listening' ? (
                                        <MicOff className="w-8 h-8" />
                                    ) : (
                                        <Mic className="w-8 h-8" />
                                    )}
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        variant="ghost"
                                        onClick={() => fileInputRef.current?.click()}
                                        title={t('aiTutorPage.uploadImageTooltip')}
                                    >
                                        <Paperclip className="w-6 h-6" />
                                    </Button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                className="hidden"
                                accept="image/*"
                            />
                            <textarea
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                placeholder={t('aiTutorPage.inputPlaceholder')}
                                className="flex-grow p-3 bg-gray-100 border border-transparent rounded-full focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-500 dark:bg-gray-700 dark:text-neutral-light dark:placeholder-gray-400 resize-none"
                                rows={1}
                                disabled={isLoading}
                            />
                            <Button onClick={() => handleSendMessage()} disabled={isLoading || (!userInput.trim() && !uploadedImage)} className="bg-secondary hover:bg-secondary-dark">
                                {isLoading ? <RotateCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            </Button>
                                </>
                            )}
                        </div>
                    </div>
                </Card>
                 <style>{`
                  .blinking-cursor {
                    display: inline-block;
                    width: 8px;
                    height: 1.1em;
                    background-color: #0D9488;
                    animation: blink 1s step-end infinite;
                    margin-left: 2px;
                    vertical-align: sub;
                  }
                  @keyframes blink {
                    50% { background-color: transparent; }
                  }
                  textarea { scrollbar-width: none; -ms-overflow-style: none; }
                  textarea::-webkit-scrollbar { display: none; }
                `}</style>
            </div>
        </div>
    );
};

export default AITutorPage;
