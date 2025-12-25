import React, { useState, useRef, useEffect } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { generateResponse } from '../../config/gemini';

const Main = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = { type: 'user', text: input, id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await generateResponse(userInput);
      const aiMessage = { type: 'ai', text: aiResponse, id: Date.now() + 1 };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = { type: 'ai', text: "Sorry, something went wrong.", id: Date.now() + 2 };
      setMessages(prev => [...prev, errorMessage]);
    }
    setIsLoading(false);
  };

  const handleCardClick = (prompt) => {
    setInput(prompt);
  };

  return (
    <div className='main'>
      {/* Nav */}
      <div className='nav'>
        <div className='nav-left'>
          <img src={assets.gemini_icon} alt='Gemini' className='gemini-logo'/>
          <span>Gemini</span>
        </div>
        <img src={assets.user_icon} alt='User' className='user-icon'/>
      </div>

      <div className='main-container'>
        {/* Welcome Screen */}
        {!messages.length && (
          <>
            <div className='greet'>
              <p><span>Hello, Dev</span></p>
              <p>How can I help you today?</p>
            </div>

            {/* 4 PERFECT CARDS */}
            <div className='suggestions-grid'>
              <div className='suggestion-card' onClick={() => handleCardClick("Suggest beautiful places to see on an upcoming road trip")}>
                <div className='card-content'>
                  <p>Suggest beautiful places to see on an upcoming road trip</p>
                  <div className='card-icon compass'>
                    <img src={assets.compass_icon} alt='Compass'/>
                  </div>
                </div>
              </div>
              
              <div className='suggestion-card' onClick={() => handleCardClick("Briefly summarize this concept: urban planning")}>
                <div className='card-content'>
                  <p>Briefly summarize this concept: urban planning</p>
                  <div className='card-icon bulb'>
                    <img src={assets.bulb_icon} alt='Bulb'/>
                  </div>
                </div>
              </div>
              
              <div className='suggestion-card' onClick={() => handleCardClick("Brainstorm team bonding activities for work retreat")}>
                <div className='card-content'>
                  <p>Brainstorm team bonding activities for work retreat</p>
                  <div className='card-icon message'>
                    <img src={assets.message_icon} alt='Message'/>
                  </div>
                </div>
              </div>
              
              <div className='suggestion-card' onClick={() => handleCardClick("Improve readability of this code")}>
                <div className='card-content'>
                  <p>Improve readability of this code</p>
                  <div className='card-icon code'>
                    <img src={assets.code_icon} alt='Code'/>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Chat */}
        {messages.length > 0 && (
          <div className='chat-messages'>
            {messages.map((message) => (
              <div key={message.id} className={`chat-message fade-in ${message.type}`}>
                <div className={`avatar ${message.type}`}>
                  <img 
                    src={message.type === 'ai' ? assets.gemini_icon : assets.user_icon} 
                    alt={message.type === 'ai' ? 'Gemini' : 'You'}
                  />
                </div>
                <div className={`message-bubble ${message.type}`}>
                  <p>{message.text}</p>
                  <span className='time'>{new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className='chat-message fade-in ai typing'>
                <div className='avatar ai'>
                  <img src={assets.gemini_icon} alt='Gemini'/>
                </div>
                <div className='message-bubble ai typing-indicator'>
                  <div className='dots'>
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className='input-container'>
        <div className='search-box'>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder={messages.length ? 'Ask anything...' : 'Enter a prompt or ask something...'}
            className='chat-input'
            disabled={isLoading}
          />
          <div className='input-actions'>
            <button className='action-btn gallery' title='Upload'>
              <img src={assets.gallery_icon} alt='Gallery'/>
            </button>
            <button className='action-btn voice' title='Voice'>
              <img src={assets.mic_icon} alt='Voice'/>
            </button>
            <button 
              className={`action-btn send ${isLoading || !input.trim() ? 'disabled' : ''}`}
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
            >
              <img src={assets.send_icon} alt='Send'/>
            </button>
          </div>
        </div>
      </div>

      <div className='footer'>
        <p>Gemini may display inaccurate info about people. Double-check its responses.</p>
      </div>
    </div>
  );
};

export default Main;
