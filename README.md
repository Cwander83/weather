# 🌤️ Weather App

A modern, responsive weather application built with Vue.js 3, TypeScript, and the OpenWeatherMap API. Get real-time weather information for any location worldwide with beautiful, intuitive interface.

## 🌟 Features

- **🔍 Smart Search**: Search for any city worldwide with auto-complete suggestions
- **🌡️ Current Weather**: Real-time temperature, humidity, pressure, and wind information
- **⏰ Hourly Forecast**: 24-hour weather forecast with 3-hour intervals
- **📅 Weekly Forecast**: 7-day weather outlook with detailed daily information
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **🎨 Beautiful UI**: Modern, clean interface with smooth animations
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- Yarn or npm package manager
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/weather.git
   cd weather
   ```

2. **Install dependencies**

   ```bash
   yarn install
   # or
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Edit .env and add your OpenWeatherMap API key
   VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**

   ```bash
   yarn dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the app running!

## 🔑 Getting an API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to your API keys section
4. Copy your API key
5. Add it to your `.env` file

**Note**: Free tier includes 1,000 API calls per day, which is perfect for personal use!

## 🛠️ Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier
- `yarn type-check` - Run TypeScript type checking

## 📁 Project Structure

```
src/
├── components/           # Vue components
│   ├── SearchComponent.vue    # City search with autocomplete
│   ├── CurrentWeather.vue     # Current weather display
│   ├── HourlyWeather.vue      # Hourly forecast slider
│   └── WeeklyWeather.vue      # Weekly forecast
├── services/            # API services
│   └── weatherService.ts     # Weather API integration
├── App.vue             # Main app component
└── main.ts            # App entry point
```

## 🌐 API Integration

This app uses the OpenWeatherMap API for weather data:

- **Current Weather API**: Real-time weather conditions
- **5-Day Forecast API**: Hourly and daily forecasts
- **Geocoding API**: City search and coordinates

## 📱 Responsive Design

The app is fully responsive and works great on:

- 🖥️ Desktop computers
- 💻 Laptops
- 📱 Tablets
- 📱 Mobile phones

## 🎨 UI/UX Features

- **Modern Design**: Clean, minimalist interface
- **Smooth Animations**: Engaging hover effects and transitions
- **Intuitive Navigation**: Easy-to-use search and navigation
- **Visual Weather Icons**: Beautiful weather condition icons
- **Color-Coded Information**: Temperature and weather condition indicators

## 🔧 Technical Stack

- **Frontend Framework**: Vue.js 3 with Composition API
- **Language**: TypeScript for type safety
- **Build Tool**: Vite for fast development and building
- **HTTP Client**: Axios for API requests
- **Styling**: CSS3 with modern features (Grid, Flexbox, Animations)
- **Code Quality**: ESLint + Prettier for consistent code style

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

Made with ❤️ using Vue.js and OpenWeatherMap API

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
