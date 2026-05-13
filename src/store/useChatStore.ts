import { create } from 'zustand';
import { Message } from '../api/types';

interface ChatStore {
  messages: Message[];
  isOpen: boolean;
  isTyping: boolean;
  offlineQueue: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateMessageStatus: (id: string, status: 'sent' | 'pending') => void;
  setOpen: (open: boolean) => void;
  setTyping: (typing: boolean) => void;
  clearHistory: () => void;
  addOfflineMessage: (message: Message) => void;
  processOfflineQueue: () => Message[];
}

export const useChatStore = create<ChatStore>()((set, get) => ({
      messages: [
        {
          id: 'initial',
          role: 'bot',
          text: 'Добро пожаловать в Lumina Elite Travel. Чем я могу помочь вам в планировании вашего следующего экстраординарного путешествия?',
          timestamp: Date.now(),
          options: [
            { label: 'Посмотреть отели', action: { type: 'navigate', path: '/hotels' } },
            { label: 'Кураторские туры', action: { type: 'navigate', path: '/tours' } },
            { label: 'Экзотическая Япония', action: { type: 'navigate', path: '/tours', filter: 'Japan' } },
          ]
        }
      ],
      isOpen: false,
      isTyping: false,
      offlineQueue: [],
      addMessage: (msg) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newMessage: Message = { 
          ...msg, 
          id, 
          timestamp: Date.now(),
          status: 'sent' 
        };
        set((state) => ({
          messages: [...state.messages, newMessage]
        }));
      },
      updateMessageStatus: (id, status) => set((state) => ({
        messages: state.messages.map(m => m.id === id ? { ...m, status } : m)
      })),
      setOpen: (isOpen) => set({ isOpen }),
      setTyping: (isTyping) => set({ isTyping }),
      clearHistory: () => set({ 
        messages: [
          {
            id: 'initial',
            role: 'bot',
            text: 'Добро пожаловать в Lumina Elite Travel. Чем я могу помочь вам в планировании вашего следующего экстраординарного путешествия?',
            timestamp: Date.now(),
            options: [
              { label: 'Посмотреть отели', action: { type: 'navigate', path: '/hotels' } },
              { label: 'Кураторские туры', action: { type: 'navigate', path: '/tours' } },
              { label: 'Экзотическая Япония', action: { type: 'navigate', path: '/tours', filter: 'Japan' } },
            ]
          }
        ] 
      }),
      addOfflineMessage: (msg) => set((state) => ({
        offlineQueue: [...state.offlineQueue, msg],
        messages: [...state.messages, msg]
      })),
      processOfflineQueue: () => {
        const queue = get().offlineQueue;
        set({ offlineQueue: [] });
        return queue;
      }
    })
);
