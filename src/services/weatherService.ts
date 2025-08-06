import axios from 'axios'

// You'll need to get a free API key from OpenWeatherMap
// Sign up at: https://openweathermap.org/api
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'YOUR_API_KEY_HERE'
const BASE_URL =
  import.meta.env.VITE_OPENWEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5'
const GEO_BASE_URL =
  import.meta.env.VITE_GEOCODING_BASE_URL || 'http://api.openweathermap.org/geo/1.0'

// API response interfaces
interface GeocodingResponse {
  name: string
  country: string
  lat: number
  lon: number
}

interface WeatherResponse {
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  wind?: {
    speed: number
    deg: number
  }
  visibility: number
  name: string
  sys: {
    country: string
  }
}

interface ForecastItem {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  wind?: {
    speed: number
    deg: number
  }
  pop?: number
}

interface ForecastResponse {
  list: ForecastItem[]
}

export interface CurrentWeather {
  id: number
  main: string
  description: string
  icon: string
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  wind_speed: number
  wind_deg: number
  visibility: number
  cityName: string
  country: string
}

export interface HourlyWeather {
  dt: number
  temp: number
  feels_like: number
  humidity: number
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  wind_speed: number
  wind_deg: number
  pop: number // Probability of precipitation
}

export interface DailyWeather {
  dt: number
  temp: {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  }
  feels_like: {
    day: number
    night: number
    eve: number
    morn: number
  }
  humidity: number
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  wind_speed: number
  wind_deg: number
  pop: number
  uvi: number
}

export interface WeatherData {
  current: CurrentWeather
  hourly: HourlyWeather[]
  daily: DailyWeather[]
}

export interface LocationData {
  name: string
  country: string
  lat: number
  lon: number
}

class WeatherService {
  // Search for cities
  async searchCities(query: string): Promise<LocationData[]> {
    try {
      const response = await axios.get<GeocodingResponse[]>(
        `${GEO_BASE_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`,
      )
      return response.data.map((city: GeocodingResponse) => ({
        name: city.name,
        country: city.country,
        lat: city.lat,
        lon: city.lon,
      }))
    } catch (error) {
      console.error('Error searching cities:', error)
      throw new Error('Failed to search cities')
    }
  }

  // Get current weather by coordinates
  async getCurrentWeather(lat: number, lon: number): Promise<CurrentWeather> {
    try {
      const response = await axios.get<WeatherResponse>(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      )

      const data = response.data
      return {
        id: data.weather[0].id,
        main: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        temp: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        temp_min: Math.round(data.main.temp_min),
        temp_max: Math.round(data.main.temp_max),
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        wind_speed: data.wind?.speed || 0,
        wind_deg: data.wind?.deg || 0,
        visibility: data.visibility,
        cityName: data.name,
        country: data.sys.country,
      }
    } catch (error) {
      console.error('Error fetching current weather:', error)
      throw new Error('Failed to fetch current weather')
    }
  }

  // Get complete weather data (current + hourly + daily)
  async getCompleteWeatherData(lat: number, lon: number): Promise<WeatherData> {
    try {
      // Get current weather
      const current = await this.getCurrentWeather(lat, lon)

      // Get hourly and daily forecasts (requires One Call API 3.0)
      // Note: This requires a subscription, but you can use the free 2.5 endpoint for basic forecasts
      const forecastResponse = await axios.get<ForecastResponse>(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      )

      // Process 5-day forecast data for hourly (3-hour intervals)
      const hourlyData: HourlyWeather[] = forecastResponse.data.list
        .slice(0, 8)
        .map((item: ForecastItem) => ({
          dt: item.dt,
          temp: Math.round(item.main.temp),
          feels_like: Math.round(item.main.feels_like),
          humidity: item.main.humidity,
          weather: item.weather,
          wind_speed: item.wind?.speed || 0,
          wind_deg: item.wind?.deg || 0,
          pop: item.pop || 0,
        }))

      // Process daily data (group by day)
      const dailyData: DailyWeather[] = []
      const processedDays = new Set()

      forecastResponse.data.list.forEach((item: ForecastItem) => {
        const date = new Date(item.dt * 1000).toDateString()
        if (!processedDays.has(date) && dailyData.length < 7) {
          processedDays.add(date)
          dailyData.push({
            dt: item.dt,
            temp: {
              day: Math.round(item.main.temp),
              min: Math.round(item.main.temp_min),
              max: Math.round(item.main.temp_max),
              night: Math.round(item.main.temp),
              eve: Math.round(item.main.temp),
              morn: Math.round(item.main.temp),
            },
            feels_like: {
              day: Math.round(item.main.feels_like),
              night: Math.round(item.main.feels_like),
              eve: Math.round(item.main.feels_like),
              morn: Math.round(item.main.feels_like),
            },
            humidity: item.main.humidity,
            weather: item.weather,
            wind_speed: item.wind?.speed || 0,
            wind_deg: item.wind?.deg || 0,
            pop: item.pop || 0,
            uvi: 0, // Not available in free tier
          })
        }
      })

      return {
        current,
        hourly: hourlyData,
        daily: dailyData,
      }
    } catch (error) {
      console.error('Error fetching complete weather data:', error)
      throw new Error('Failed to fetch weather data')
    }
  }

  // Get weather icon URL
  getIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  // Format temperature
  formatTemp(temp: number): string {
    return `${Math.round(temp)}°C`
  }

  // Format date/time
  formatDateTime(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleString()
  }

  formatTime(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    })
  }

  formatDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  }
}

export default new WeatherService()
