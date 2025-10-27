
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Aiicon from '../assets/aiicon.png';

export default function ChatbotSpace({ position = 'bottom-right', initialOpen = false }) {
  const [open, setOpen] = useState(initialOpen);
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: "Hi — I'm your assistant. How can I help today?" },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMsg = { id: Date.now(), from: 'user', text };
    setMessages([...messages, userMsg]);
    setInput('');

    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, from: 'bot', text: `You said: ${text}` }]);
    }, 600);
  };

  const positions = {
    'bottom-right': 'right-6 bottom-6',
    'bottom-left': 'left-6 bottom-6',
    'top-right': 'right-6 top-6',
    'top-left': 'left-6 top-6',
  };

  return (
    <div aria-live="polite">
      <div className={`fixed z-50 ${positions[position] || positions['bottom-right']}`}>
        <AnimatePresence>
          {!open && (
            <motion.button
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              onClick={() => setOpen(true)}
              className="group w-14 h-14 rounded-4xl shadow-2xl flex items-center justify-center bg-white border-1 hover:scale-105 focus:outline-none"
            >
              <img src={Aiicon} alt="" className='h-9 w-9 '/>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              className="w-80 md:w-96 max-h-[80vh] rounded-2xl shadow-2xl bg-white border border-gray-100 overflow-hidden flex flex-col"
            >
              <header className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg primary flex items-center justify-center text-white font-semibold">AI</div>
                  <div>
                    <div className="text-sm font-semibold">Chat Assistant</div>
                    <div className="text-xs text-gray-500">Ask me anything</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMessages([{ id: 1, from: 'bot', text: "Hi — I'm your assistant. How can I help today?" }])}
                    className="text-xs px-2 py-1 rounded-md hover:bg-gray-100"
                  >
                    Reset
                  </button>
                  <button onClick={() => setOpen(false)} className="p-1 rounded-md hover:bg-gray-100">✕</button>
                </div>
              </header>

              <main className="p-3 overflow-auto flex-1">
                <ul className="flex flex-col gap-3">
                  {messages.map((m) => (
                    <li key={m.id} className={`${m.from === 'user' ? 'self-end' : 'self-start'} max-w-[80%]`}>
                      <div className={`px-3 py-2 rounded-lg ${m.from === 'user' ? 'primary text-white' : 'bg-gray-100 text-gray-800'}`}>
                        <div className="text-sm">{m.text}</div>
                      </div>
                    </li>
                  ))}
                  <div ref={messagesEndRef} />
                </ul>
              </main>

              <form onSubmit={sendMessage} className="px-3 py-2 border-t flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-xl px-3 py-2 text-sm border focus:border-indigo-300 outline-none"
                />
                <button type="submit" className="px-3 py-2 rounded-xl primary text-white text-sm font-medium hover:brightness-105">
                  Send
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
