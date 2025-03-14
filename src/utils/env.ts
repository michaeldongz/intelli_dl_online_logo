export const getEnvValue = (key: keyof ImportMetaEnv): string => {
  return import.meta.env[key]
}

export const getApiBaseUrl = (): string => {
  return getEnvValue('VITE_APP_API_BASE_URL')
}

export const getAppTitle = (): string => {
  return getEnvValue('VITE_APP_TITLE')
}

export const getBaseUrl = (): string => {
  return getEnvValue('VITE_APP_BASE_URL')
}

export const getUploadUrl = (): string => {
  return getEnvValue('VITE_APP_UPLOAD_URL')
}

export const isDevelopment = (): boolean => {
  return import.meta.env.DEV
}

export const isProduction = (): boolean => {
  return import.meta.env.PROD
} 