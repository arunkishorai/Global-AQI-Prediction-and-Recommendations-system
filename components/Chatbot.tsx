
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { sendMessageToGemini, startChat } from '../services/geminiService';
import type { AirQualityData, ChatMessage } from '../types';
import { PaperAirplaneIcon, SparklesIcon, CloseIcon } from './icons';

interface ChatbotProps {
    airQualityData: AirQualityData;
    onClose: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ airQualityData, onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    useEffect(() => {
        startChat(airQualityData);
        setMessages([
            {
                id: 'initial',
                role: 'model',
                text: `Hello! I'm Aura, your air quality assistant for ${airQualityData.location}. How can I help you today?`
            }
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [airQualityData.location]);


    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === '' || isLoading) return;

        const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const modelMessageId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: '' }]);

        try {
            const stream = await sendMessageToGemini(input, airQualityData);
            let fullResponse = '';
            for await (const chunk of stream) {
                fullResponse += chunk;
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === modelMessageId ? { ...msg, text: fullResponse } : msg
                    )
                );
            }
        } catch (error) {
            console.error('Error sending message to Gemini:', error);
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === modelMessageId ? { ...msg, text: "Sorry, I'm having trouble connecting. Please try again later." } : msg
                )
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50 w-[calc(100vw-2rem)] max-w-sm h-[70vh] max-h-[500px] bg-slate-800/80 backdrop-blur-md flex flex-col rounded-2xl shadow-2xl border border-slate-700/50">
            <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <SparklesIcon className="h-6 w-6 text-cyan-400" />
                    <h3 className="text-lg font-semibold text-slate-200">Aura Assistant</h3>
                </div>
                <button onClick={onClose} className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full">
                    <CloseIcon className="h-5 w-5" />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className={`flex items-end gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                       {message.role === 'model' && <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0"><SparklesIcon className="h-5 w-5 text-cyan-400"/></div>}
                        <div className={`max-w-xs px-4 py-2 rounded-2xl ${message.role === 'user' ? 'bg-cyan-600 text-white rounded-br-lg' : 'bg-slate-700 text-slate-200 rounded-bl-lg'}`}>
                            <p className="text-sm whitespace-pre-wrap">{message.text}{isLoading && message.id === messages[messages.length - 1].id && <span className="inline-block w-2 h-2 ml-1 bg-slate-300 rounded-full animate-pulse"></span>}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-slate-700/50">
                <form onSubmit={handleSend} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about air quality..."
                        className="w-full bg-slate-700/80 border border-slate-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900">
                        <PaperAirplaneIcon className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};
