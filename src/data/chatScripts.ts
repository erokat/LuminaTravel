export interface ScriptStep {
  text: string;
  options: { label: string; action: any }[];
}

export const CHAT_SCRIPTS: Record<string, ScriptStep> = {
  'booking_start': {
    text: "Превосходный выбор. Чтобы начать планирование, скажите, для скольких путешественников мы создаем этот опыт?",
    options: [
      { label: 'Для одного (Соло)', action: { type: 'scripted_next', nextStep: 'booking_date' } },
      { label: 'Для пары (2 человека)', action: { type: 'scripted_next', nextStep: 'booking_date' } },
      { label: 'Частная группа (3+)', action: { type: 'scripted_next', nextStep: 'booking_date' } }
    ]
  },
  'booking_date': {
    text: "Прекрасно. И когда вы планируете отправиться в этот необыкновенный побег?",
    options: [
      { label: 'В ближайшие 3 месяца', action: { type: 'scripted_next', nextStep: 'booking_contact' } },
      { label: 'Позже в этом году', action: { type: 'scripted_next', nextStep: 'booking_contact' } },
      { label: 'Просто изучаю варианты', action: { type: 'navigate', path: '/tours' } }
    ]
  },
  'booking_contact': {
    text: "Благодарю. Наш старший куратор рассмотрит ваши предпочтения. Как вам удобнее получить готовый маршрут: по электронной почте или по телефону?",
    options: [
      { label: 'Только Email', action: { type: 'scripted_next', nextStep: 'booking_finish' } },
      { label: 'Запланировать звонок', action: { type: 'scripted_next', nextStep: 'booking_finish' } }
    ]
  },
  'booking_finish': {
    text: "Идеально. Ваш запрос был передан в VIP-отдел. Мы свяжемся с вами в течение 2 часов для окончательного оформления вашего опыта Lumina.",
    options: [
      { label: 'На главную', action: { type: 'navigate', path: '/' } },
      { label: 'Все направления', action: { type: 'navigate', path: '/destinations' } }
    ]
  }
};

export const FAQ_DATA = [
  { keywords: ['отмен', 'возврат', 'вернут', 'бронь'], answer: "Lumina предлагает гибкие условия отмены бронирования за 14 дней до отправления для наших участников уровня Elite." },
  { keywords: ['виза', 'паспорт', 'документ'], answer: "Наша консьерж-служба берет на себя оформление всех визовых требований для выбранных вами направлений, как только бронирование будет подтверждено." },
  { keywords: ['интернет', 'wifi', 'вайфай', 'связь'], answer: "Высокоскоростная спутниковая связь предоставляется по умолчанию на всех объектах нашей коллекции частных яхт и вилл." }
];
