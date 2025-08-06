<template>
  <div class="current-weather" v-if="weather">
    <div class="weather-header">
      <h2 class="location">{{ weather.cityName }}, {{ weather.country }}</h2>
      <p class="date">{{ getCurrentDate() }}</p>
    </div>

    <div class="weather-main">
      <div class="temperature-section">
        <img :src="getWeatherIcon(weather.icon)" :alt="weather.description" class="weather-icon" />
        <div class="temperature">{{ weather.temp }}°C</div>
      </div>

      <div class="weather-details">
        <h3 class="condition">{{ weather.main }}</h3>
        <p class="description">{{ weather.description }}</p>
        <p class="feels-like">Feels like {{ weather.feels_like }}°C</p>
      </div>
    </div>

    <div class="weather-stats">
      <div class="stat-grid">
        <div class="stat-item">
          <div class="stat-label">High</div>
          <div class="stat-value">{{ weather.temp_max }}°C</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Low</div>
          <div class="stat-value">{{ weather.temp_min }}°C</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Humidity</div>
          <div class="stat-value">{{ weather.humidity }}%</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Pressure</div>
          <div class="stat-value">{{ weather.pressure }} hPa</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Wind Speed</div>
          <div class="stat-value">{{ Math.round(weather.wind_speed * 3.6) }} km/h</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Visibility</div>
          <div class="stat-value">{{ Math.round(weather.visibility / 1000) }} km</div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="no-data">
    <p>Search for a location to see current weather</p>
  </div>
</template>

<script setup lang="ts">
import { type CurrentWeather } from '../services/weatherService'
import weatherService from '../services/weatherService'

// Props
defineProps<{
  weather: CurrentWeather | null
}>()

// Methods
const getWeatherIcon = (iconCode: string): string => {
  return weatherService.getIconUrl(iconCode)
}

const getCurrentDate = (): string => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
.current-weather {
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  color: white;
  border-radius: 20px;
  padding: 30px;
  margin: 20px 0;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

.weather-header {
  text-align: center;
  margin-bottom: 30px;
}

.location {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.date {
  font-size: 16px;
  opacity: 0.9;
  margin: 5px 0 0 0;
}

.weather-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  gap: 20px;
}

.temperature-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.weather-icon {
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.temperature {
  font-size: 4rem;
  font-weight: 300;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.weather-details {
  text-align: right;
  flex: 1;
}

.condition {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 5px 0;
  text-transform: capitalize;
}

.description {
  font-size: 16px;
  opacity: 0.9;
  margin: 0 0 10px 0;
  text-transform: capitalize;
}

.feels-like {
  font-size: 14px;
  opacity: 0.8;
  margin: 0;
}

.weather-stats {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
}

.stat-item {
  text-align: center;
}

.stat-label {
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
}

.no-data {
  text-align: center;
  padding: 60px 20px;
  color: #666;
  background: #f8f9fa;
  border-radius: 20px;
  margin: 20px 0;
}

.no-data p {
  font-size: 18px;
  margin: 0;
}

@media (max-width: 768px) {
  .current-weather {
    padding: 20px;
    margin: 15px 0;
  }

  .location {
    font-size: 24px;
  }

  .weather-main {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .weather-details {
    text-align: center;
  }

  .temperature {
    font-size: 3rem;
  }

  .weather-icon {
    width: 60px;
    height: 60px;
  }

  .stat-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .temperature {
    font-size: 2.5rem;
  }

  .weather-icon {
    width: 50px;
    height: 50px;
  }

  .stat-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }

  .stat-label {
    margin-bottom: 0;
  }
}
</style>
