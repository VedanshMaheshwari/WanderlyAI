import { useState } from "react";
import { motion } from "framer-motion";
import { axiosInstance } from "../../utils/axiosInstance";

const TripAssistantCard = () => {
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Add user message to chat history
        const userMessage = {
            type: 'user',
            content: message,
            timestamp: new Date().toISOString()
        };
        setChatHistory(prev => [...prev, userMessage]);
        setMessage("");

        try {
            setLoading(true);
            const res = await axiosInstance.post("/trip/chat", { message });
            if (res.data.success) {
                // Add AI response to chat history
                const aiMessage = {
                    type: 'ai',
                    content: res.data.data.response,
                    timestamp: new Date().toISOString()
                };
                setChatHistory(prev => [...prev, aiMessage]);
            }
        } catch (error) {
            console.error("Error chatting with AI:", error);
            // Add error message to chat history
            const errorMessage = {
                type: 'error',
                content: "Sorry, I encountered an error. Please try again.",
                timestamp: new Date().toISOString()
            };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const clearChat = () => {
        setChatHistory([]);
    };

    const formatResponse = (text) => {
        return text.split('\n').map((line, index) => {
            if (line.trim().startsWith('•')) {
                return (
                    <div key={index} className="flex items-start gap-2 mb-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{line.replace('•', '').trim()}</span>
                    </div>
                );
            }
            return <p key={index} className="mb-2">{line}</p>;
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-base-100 rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl">🤖</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-base-content">AI Trip Assistant</h3>
                        <p className="text-sm text-base-content/70">Ask me anything about travel!</p>
                    </div>
                </div>
                {chatHistory.length > 0 && (
                    <button
                        onClick={clearChat}
                        className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                    >
                        Clear Chat
                    </button>
                )}
            </div>

            {/* Chat Messages */}
            <div className="mb-6 max-h-[400px] overflow-y-auto pr-2 space-y-4">
                {chatHistory.map((msg, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-lg p-4 ${
                                msg.type === 'user'
                                    ? 'bg-primary text-primary-content'
                                    : msg.type === 'error'
                                    ? 'bg-error/10 text-error'
                                    : 'bg-base-200 text-base-content'
                            }`}
                        >
                            {msg.type === 'ai' ? (
                                <div className="whitespace-pre-line">
                                    {formatResponse(msg.content)}
                                </div>
                            ) : (
                                <p>{msg.content}</p>
                            )}
                            <span className="text-xs opacity-70 mt-2 block">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                    </motion.div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-base-200 rounded-lg p-4">
                            <span className="loading loading-dots loading-sm"></span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about travel destinations, tips, or planning..."
                    className="input input-bordered flex-1 focus:input-primary"
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        "Send"
                    )}
                </button>
            </form>
        </motion.div>
    );
};

export default TripAssistantCard; 