<template>
  <div class="app">
    <header class="app-header">
      <h1 class="app-title">
        <span class="weather-icon">🌤️</span>
        Weather App
      </h1>
      <p class="app-subtitle">Get real-time weather information for any location</p>
    </header>

    <main class="app-main">
      <div class="container">
        <!-- Search Component -->
        <SearchComponent @location-selected="handleLocationSelected" />

        <!-- Loading State -->
        <div v-if="isLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>Loading weather data...</p>
        </div>

        <!-- Error State -->
        <div v-if="error" class="error-container">
          <p class="error-message">{{ error }}</p>
          <button @click="clearError" class="retry-button">Try Again</button>
        </div>

        <!-- Weather Data -->
        <div v-if="weatherData && !isLoading && !error" class="weather-content">
          <!-- Current Weather -->
          <CurrentWeather :weather="weatherData.current" />

          <!-- Hourly Forecast -->
          <HourlyWeather :hourly-data="weatherData.hourly" />

          <!-- Weekly Forecast -->
          <WeeklyWeather :weekly-data="weatherData.daily" />
        </div>

        <!-- Default State -->
        <div v-if="!weatherData && !isLoading && !error" class="default-state">
          <div class="default-content">
            <div class="default-icon">🌍</div>
            <h2>Welcome to Weather App</h2>
            <p>Search for any city to get started with real-time weather information</p>
            <div class="features">
              <div class="feature">
                <span class="feature-icon">🌡️</span>
                <span>Current Temperature</span>
              </div>
              <div class="feature">
                <span class="feature-icon">⏰</span>
                <span>Hourly Forecast</span>
              </div>
              <div class="feature">
                <span class="feature-icon">📅</span>
                <span>7-Day Forecast</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="app-footer">
      <p>&copy; 2025 Weather App. Powered by OpenWeatherMap API</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchComponent from './components/SearchComponent.vue'
import CurrentWeather from './components/CurrentWeather.vue'
import HourlyWeather from './components/HourlyWeather.vue'
import WeeklyWeather from './components/WeeklyWeather.vue'
import weatherService, { type LocationData, type WeatherData } from './services/weatherService'

// Reactive data
const weatherData = ref<WeatherData | null>(null)
const isLoading = ref(false)
const error = ref('')

// Methods
const handleLocationSelected = async (location: LocationData) => {
  try {
    isLoading.value = true
    error.value = ''

    // Fetch complete weather data for the selected location
    const data = await weatherService.getCompleteWeatherData(location.lat, location.lon)
    weatherData.value = data
  } catch (err) {
    console.error('Failed to fetch weather data:', err)
    error.value = 'Failed to load weather data. Please check your API key and try again.'
    weatherData.value = null
  } finally {
    isLoading.value = false
  }
}

const clearError = () => {
  error.value = ''
}
</script>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: #333;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  text-align: center;
  padding: 40px 20px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.app-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.weather-icon {
  font-size: 3.5rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.app-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
}

.app-main {
  flex: 1;
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.loading-container {
  text-align: center;
  padding: 60px 20px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-container p {
  color: white;
  font-size: 18px;
}

.error-container {
  text-align: center;
  padding: 40px 20px;
  background: rgba(220, 53, 69, 0.1);
  border-radius: 15px;
  margin: 20px 0;
  backdrop-filter: blur(10px);
}

.error-message {
  color: #dc3545;
  font-size: 16px;
  margin-bottom: 20px;
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.retry-button {
  background: #dc3545;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-button:hover {
  background: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
}

.weather-content {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.default-state {
  text-align: center;
  padding: 60px 20px;
}

.default-content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 50px 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.default-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.default-content h2 {
  color: white;
  font-size: 2rem;
  margin-bottom: 15px;
  font-weight: 600;
}

.default-content p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin-bottom: 30px;
  line-height: 1.6;
}

.features {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: white;
  font-weight: 500;
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 5px;
}

.app-footer {
  text-align: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

@media (max-width: 768px) {
  .app-title {
    font-size: 2.5rem;
    flex-direction: column;
    gap: 10px;
  }

  .weather-icon {
    font-size: 3rem;
  }

  .app-subtitle {
    font-size: 1rem;
  }

  .container {
    padding: 0 15px;
  }

  .features {
    gap: 20px;
  }

  .feature {
    min-width: 120px;
  }

  .default-content {
    padding: 40px 20px;
  }
}

@media (max-width: 480px) {
  .app-title {
    font-size: 2rem;
  }

  .weather-icon {
    font-size: 2.5rem;
  }

  .app-header {
    padding: 30px 15px 15px;
  }

  .app-main {
    padding: 15px;
  }

  .features {
    flex-direction: column;
    gap: 15px;
  }

  .feature {
    flex-direction: row;
    justify-content: center;
  }

  .feature-icon {
    font-size: 1.5rem;
    margin-bottom: 0;
  }
}
</style>
