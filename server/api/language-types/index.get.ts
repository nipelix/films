import { LanguageType } from '../../database/models'
import '../../database/connection'

export default defineEventHandler(async () => {
  const languageTypes = await LanguageType.getActive()

  return {
    data: languageTypes
  }
})
