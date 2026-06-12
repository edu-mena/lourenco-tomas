export const MEDIA_BASE = 'https://lightblue-lemur-704992.hostingersite.com/public'

/** Converte um path local (/images/...) no URL remoto completo */
export const mediaUrl = (path) => `${MEDIA_BASE}${path}`
