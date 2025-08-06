<template>
  <div class="weekly-weather" v-if="weeklyData && weeklyData.length > 0">
    <h3 class="section-title">7-Day Forecast</h3>

    <div class="weekly-container">
      <div v-for="day in weeklyData" :key="day.dt" class="day-item">
        <div class="day-info">
          <div class="day-name">{{ formatDayName(day.dt) }}</div>
          <div class="day-date">{{ formatDate(day.dt) }}</div>
        </div>

        <div class="day-weather">
          <img
            :src="getWeatherIcon(day.weather[0].icon)"
            :alt="day.weather[0].description"
            class="day-icon"
          />
          <div class="weather-desc">{{ day.weather[0].main }}</div>
        </div>

        <div class="day-temps">
          <div class="temp-high">{{ day.temp.max }}°</div>
          <div class="temp-low">{{ day.temp.min }}°</div>
        </div>

        <div class="day-details">
          <div class="detail-item">
            <span class="detail-icon">💧</span>
            <span class="detail-value">{{ Math.round(day.pop * 100) }}%</span>
          </div>
          <div class="detail-item">
            <span class="detail-icon">💨</span>
            <span class="detail-value">{{ Math.round(day.wind_speed * 3.6) }} km/h</span>
          </div>
          <div class="detail-item">
            <span class="detail-icon">💦</span>
            <span class="detail-value">{{ day.humidity }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type DailyWeather } from '../services/weatherService'
import weatherService from '../services/weatherService'

// Props
defineProps<{
  weeklyData: DailyWeather[] | null
}>()

// Methods
const getWeatherIcon = (iconCode: string): string => {
  return weatherService.getIconUrl(iconCode)
}

const formatDayName = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow'
  } else {
    return date.toLocaleDateString('en-US', { weekday: 'long' })
  }
}

const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}
</script>

<style scoped>
.weekly-weather {
  margin: 30px 0;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.weekly-container {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.day-item {
  display: grid;
  grid-template-columns: 1fr auto 1fr 1fr;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
  gap: 15px;
  transition: all 0.3s ease;
}

.day-item:last-child {
  border-bottom: none;
}

.day-item:hover {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  padding: 15px;
  margin: 0 -15px;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.day-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.day-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 2px;
}

.day-date {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.day-weather {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.day-icon {
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.weather-desc {
  font-size: 12px;
  color: #666;
  text-align: center;
  text-transform: capitalize;
}

.day-temps {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.temp-high {
  font-size: 18px;
  font-weight: 700;
  color: #333;
}

.temp-low {
  font-size: 14px;
  color: #666;
  position: relative;
}

.temp-low::before {
  content: '';
  position: absolute;
  top: 50%;
  left: -5px;
  right: -5px;
  height: 1px;
  background: #ddd;
  z-index: -1;
}

.day-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
}

.detail-icon {
  font-size: 14px;
}

.detail-value {
  color: #666;
  font-weight: 500;
  min-width: 40px;
  text-align: right;
}

@media (max-width: 768px) {
  .weekly-container {
    padding: 15px;
    margin: 0 -15px;
    border-radius: 0;
  }

  .day-item {
    grid-template-columns: 1fr auto auto;
    gap: 10px;
  }

  .day-details {
    display: none;
  }

  .day-icon {
    width: 35px;
    height: 35px;
  }

  .section-title {
    font-size: 20px;
    margin-bottom: 15px;
  }
}

@media (max-width: 480px) {
  .day-item {
    grid-template-columns: 1fr auto auto;
    padding: 12px 0;
    gap: 8px;
  }

  .day-name {
    font-size: 14px;
  }

  .day-date {
    font-size: 11px;
  }

  .day-icon {
    width: 30px;
    height: 30px;
  }

  .weather-desc {
    font-size: 10px;
  }

  .temp-high {
    font-size: 16px;
  }

  .temp-low {
    font-size: 12px;
  }

  .day-item:hover {
    padding: 12px 10px;
    margin: 0 -10px;
  }
}

/* Animation for today's item */
.day-item:first-child {
  background: linear-gradient(135deg, #e3f2fd 0%, #f8f9fa 100%);
  border-radius: 15px;
  padding: 15px;
  margin: 0 -15px 10px -15px;
}

.day-item:first-child .day-name {
  color: #1976d2;
  font-weight: 700;
}

.day-item:first-child .temp-high {
  color: #1976d2;
}

@media (max-width: 768px) {
  .day-item:first-child {
    margin: 0 -15px 10px -15px;
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .day-item:first-child {
    margin: 0 -10px 10px -10px;
    padding: 12px 10px;
  }
}
</style>
