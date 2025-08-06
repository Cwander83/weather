<template>
  <div class="hourly-weather" v-if="hourlyData && hourlyData.length > 0">
    <h3 class="section-title">Hourly Forecast</h3>

    <div class="hourly-container">
      <div class="hourly-scroll">
        <div v-for="hour in hourlyData" :key="hour.dt" class="hour-item">
          <div class="hour-time">{{ formatTime(hour.dt) }}</div>
          <img
            :src="getWeatherIcon(hour.weather[0].icon)"
            :alt="hour.weather[0].description"
            class="hour-icon"
          />
          <div class="hour-temp">{{ hour.temp }}°</div>
          <div class="hour-humidity">{{ hour.humidity }}%</div>
          <div v-if="hour.pop > 0" class="hour-rain">
            <div class="rain-icon">💧</div>
            <div class="rain-chance">{{ Math.round(hour.pop * 100) }}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type HourlyWeather } from '../services/weatherService'
import weatherService from '../services/weatherService'

// Props
defineProps<{
  hourlyData: HourlyWeather[] | null
}>()

// Methods
const getWeatherIcon = (iconCode: string): string => {
  return weatherService.getIconUrl(iconCode)
}

const formatTime = (timestamp: number): string => {
  return weatherService.formatTime(timestamp)
}
</script>

<style scoped>
.hourly-weather {
  margin: 30px 0;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.hourly-container {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.hourly-scroll {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 10px;
  scrollbar-width: thin;
  scrollbar-color: #ddd transparent;
}

.hourly-scroll::-webkit-scrollbar {
  height: 6px;
}

.hourly-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.hourly-scroll::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 3px;
}

.hourly-scroll::-webkit-scrollbar-thumb:hover {
  background: #bbb;
}

.hour-item {
  flex: 0 0 auto;
  min-width: 80px;
  padding: 15px 10px;
  text-align: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.hour-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border-color: #007bff;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.hour-time {
  font-size: 12px;
  font-weight: 600;
  color: #666;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hour-icon {
  width: 40px;
  height: 40px;
  margin: 5px 0;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.hour-temp {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin: 8px 0 5px 0;
}

.hour-humidity {
  font-size: 11px;
  color: #007bff;
  font-weight: 500;
  margin-bottom: 5px;
}

.hour-rain {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.rain-icon {
  font-size: 12px;
}

.rain-chance {
  font-size: 10px;
  color: #0084ff;
  font-weight: 600;
}

@media (max-width: 768px) {
  .hourly-container {
    padding: 15px;
    margin: 0 -15px;
    border-radius: 0;
  }

  .hour-item {
    min-width: 70px;
    padding: 12px 8px;
  }

  .hour-icon {
    width: 35px;
    height: 35px;
  }

  .hour-temp {
    font-size: 16px;
  }

  .section-title {
    font-size: 20px;
    margin-bottom: 15px;
  }
}

@media (max-width: 480px) {
  .hourly-scroll {
    gap: 10px;
  }

  .hour-item {
    min-width: 60px;
    padding: 10px 6px;
  }

  .hour-icon {
    width: 30px;
    height: 30px;
  }

  .hour-temp {
    font-size: 14px;
  }

  .hour-time {
    font-size: 10px;
  }

  .hour-humidity {
    font-size: 9px;
  }
}

/* Custom scrollbar for better UX */
@media (hover: hover) {
  .hourly-scroll {
    scrollbar-width: auto;
  }

  .hourly-scroll::-webkit-scrollbar {
    height: 8px;
  }
}
</style>
