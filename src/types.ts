type Weather = {
  id: number
  main: string
  description: string
  icon: string
}

export type TempTime = {
  day: number
  min?: number
  max?: number
  night: number
  eve: number
  morn: number
}

type CommontForecast = {
  dt: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: Array<Weather>
}

export type MinuteForecast = {
  dt: number
  precipitation: number
}

export type HourlyForecast = CommontForecast & {
  pop: number
}

export type CurrentForecast = CommontForecast & {
  sunrise: number
  sunset: number
}

export type DayForecast = CurrentForecast & {
  temp: TempTime
  feels_like: TempTime
  moonrise: number
  moonset: number
  moon_phase: number
  pop: number
  rain: number
}

export type LatLon = {
  lat: number
  lon: number
}

export type City = LatLon & {
  name: string
  state: string
  country: string
}

export type Forecast = LatLon & {
  timezone: string
  timezone_offset: number
  current: CurrentForecast
  minutely: Array<MinuteForecast>
  hourly: Array<HourlyForecast>
  daily: Array<DayForecast>
}
