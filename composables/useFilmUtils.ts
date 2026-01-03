// Film ile ilgili yardımcı fonksiyonlar

export const useFilmUtils = () => {
  // Film poster URL'i oluştur
  const getFilmPoster = (poster: string | null | undefined, size: 'small' | 'medium' | 'large' = 'medium') => {
    if (!poster) return '/images/no-poster.jpg'

    // Zaten tam URL ise direkt döndür
    if (poster.startsWith('http')) return poster

    // Local path ise başına / ekle
    if (poster.startsWith('poster/')) {
      return `/${poster}`
    }

    // Sadece dosya adı ise poster klasörüne yönlendir
    return `/${poster}`
  }

  // Oyuncu/Yönetmen profil resmi
  const getProfileImage = (image: string | null | undefined) => {
    if (!image) return '/images/no-profile.jpg'
    if (image.startsWith('http')) return image
    return `/${image}`
  }

  // Tarih formatla (göreceli)
  const formatRelativeDate = (dateStr: string): string => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (hours < 1) return 'Az önce'
    if (hours < 24) return `${hours} Saat Önce`
    if (days === 1) return 'Dün'
    if (days < 7) return `${days} Gün Önce`
    if (days < 30) return `${Math.floor(days / 7)} Hafta Önce`
    return `${Math.floor(days / 30)} Ay Önce`
  }

  // Metin kısalt
  const truncateText = (text: string, maxLength: number = 80) => {
    if (!text || text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  // Süre formatla (dakika -> saat:dakika)
  const formatRuntime = (minutes: number | null): string => {
    if (!minutes) return ''
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours === 0) return `${mins}dk`
    return `${hours}s ${mins}dk`
  }

  return {
    getFilmPoster,
    getProfileImage,
    formatRelativeDate,
    truncateText,
    formatRuntime
  }
}
