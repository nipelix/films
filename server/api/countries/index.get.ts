import { Country } from '../../database/models'
import '../../database/connection'

export default defineEventHandler(async () => {
  const countries = await Country.query()
    .select('countries.*')
    .count('film_countries.film_id as film_count')
    .leftJoin('film_countries', 'countries.id', 'film_countries.country_id')
    .groupBy('countries.id')
    .having('film_count', '>', 0)
    .orderByRaw('COUNT(film_countries.film_id) DESC')

  return { data: countries }
})
