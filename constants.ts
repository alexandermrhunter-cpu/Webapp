
import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How do you usually spend your free time?",
    hint: "Habits reveal your programming.",
    options: ["Consuming content", "Working on projects", "Hanging with crowds", "Exploring alone"]
  },
  {
    id: 2,
    text: "How comfortable are you being seen or heard?",
    hint: "Visibility is a choice.",
    options: ["Avoid attention", "Okay if necessary", "Love the spotlight", "Unfazed by judgment"]
  },
  {
    id: 3,
    text: "How often do you take risks?",
    hint: "Comfort is the NPC's cage.",
    options: ["Never", "Rarely", "Calculated risks", "I live for risk"]
  },
  {
    id: 4,
    text: "What do you secretly want more of in life?",
    hint: "Your soul's deepest hunger.",
    options: ["Security", "Fame", "Freedom", "Impact"]
  },
  {
    id: 5,
    text: "How would friends describe you?",
    hint: "Your social mirror.",
    options: ["Reliable", "Quiet", "Intense", "Unpredictable"]
  },
  {
    id: 6,
    text: "Do you follow or create trends?",
    hint: "The shepherd or the sheep?",
    options: ["Follow others", "Mix of both", "I ignore trends", "I set the pace"]
  },
  {
    id: 7,
    text: "What scares you most about your future?",
    hint: "Fear defines your boundaries.",
    options: ["Being lonely", "Being average", "Failure", "Loss of control"]
  },
  {
    id: 8,
    text: "When you fail, what do you do?",
    hint: "The protagonist's rebound.",
    options: ["Give up", "Reflect and try later", "Pivot immediately", "Double down harder"]
  },
  {
    id: 9,
    text: "How motivated are you to change your life?",
    hint: "The spark of awakening.",
    options: ["I'm fine as is", "Thinking about it", "Ready to move", "Obsessed with growth"]
  }
];

export const MOCK_LEADERBOARD = [
  { name: "Alex K.", score: 98, role: "MAIN CHARACTER", rarity: "1 in 84k" },
  { name: "Sarah J.", score: 94, role: "MAIN CHARACTER", rarity: "1 in 32k" },
  { name: "Mike L.", score: 82, role: "AWAKENING", rarity: "1 in 12k" },
  { name: "Jordan P.", score: 79, role: "AWAKENING", rarity: "1 in 8k" },
  { name: "Dana W.", score: 42, role: "NPC", rarity: "1 in 100" },
];
