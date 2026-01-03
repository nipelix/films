export const useHome = () => {
  const getHomeData = async () => {
    return await $fetch('/api/home')
  }

  return {
    getHomeData
  }
}
