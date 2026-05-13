# Lumina Elite Travel

Lumina Elite Travel is a luxury travel concierge application designed to provide a seamless and sophisticated experience for planning high-end journeys.

## Features

- **Curated Collections**: Explore hand-picked destinations, hotels, and private tours.
- **AI Concierge**: An elite AI assistant powered by OpenRouter (Gemini) to help with inquiries and bookings in multiple languages.
- **Luxury Aesthetic**: A refined, dark-themed UI with fluid animations using Framer Motion.
- **Real-time Interaction**: Instant chat and dynamic routing for an immersive experience.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion.
- **Icons**: Lucide React.
- **AI**: OpenRouter API.
- **Server**: Express (for API routing and production hosting).

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository or extract the ZIP.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file based on `.env.example`.
   - Add your `OPENROUTER_API_KEY`.

### Development

Run the development server (which includes the Express API):
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

### Production

Build the application:
```bash
npm run build
```
The static files will be generated in the `dist` directory. The Express server is configured to serve these files in production mode.

## Usage Instructions

- **Chat**: Use the chat bubble in the bottom right to talk to Lumina AI. It supports Russian and English.
- **Destinations**: Click on cards in the Destinations page to view detailed information about the location, curated hotels, and experiences.
- **Tours**: Use the "View Curated Tours" buttons to explore our exclusive private journeys.

## Author

Built with Passion for Luxury Travel.
