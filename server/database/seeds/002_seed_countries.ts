import type { Knex } from 'knex'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const countryNames: Record<string, string> = {
  US: 'Amerika Birleşik Devletleri',
  GB: 'İngiltere',
  FR: 'Fransa',
  DE: 'Almanya',
  IT: 'İtalya',
  ES: 'İspanya',
  JP: 'Japonya',
  KR: 'Güney Kore',
  CN: 'Çin',
  HK: 'Hong Kong',
  TW: 'Tayvan',
  IN: 'Hindistan',
  CA: 'Kanada',
  AU: 'Avustralya',
  NZ: 'Yeni Zelanda',
  MX: 'Meksika',
  BR: 'Brezilya',
  AR: 'Arjantin',
  RU: 'Rusya',
  TR: 'Türkiye',
  SE: 'İsveç',
  NO: 'Norveç',
  DK: 'Danimarka',
  FI: 'Finlandiya',
  NL: 'Hollanda',
  BE: 'Belçika',
  CH: 'İsviçre',
  AT: 'Avusturya',
  PL: 'Polonya',
  CZ: 'Çekya',
  IE: 'İrlanda',
  PT: 'Portekiz',
  GR: 'Yunanistan',
  IL: 'İsrail',
  ZA: 'Güney Afrika',
  EG: 'Mısır',
  TH: 'Tayland',
  PH: 'Filipinler',
  ID: 'Endonezya',
  MY: 'Malezya',
  SG: 'Singapur',
  VN: 'Vietnam',
  AE: 'Birleşik Arap Emirlikleri',
  SA: 'Suudi Arabistan',
  UA: 'Ukrayna',
  RO: 'Romanya',
  HU: 'Macaristan',
  CO: 'Kolombiya',
  CL: 'Şili',
  PE: 'Peru'
}

export async function seed(knex: Knex): Promise<void> {
  // Clear existing entries
  await knex('film_countries').del()
  await knex('countries').del()

  // Read genre.json (contains country data)
  const genreData = JSON.parse(
    readFileSync(resolve(__dirname, '../../../../dd/genre.json'), 'utf-8')
  )

  // Extract unique countries
  const countryMap = new Map<string, string>()

  for (const imdbId in genreData) {
    const film = genreData[imdbId]
    if (film.origin_country) {
      for (const country of film.origin_country) {
        if (!countryMap.has(country.code)) {
          countryMap.set(country.code, country.flag)
        }
      }
    }
  }

  // Insert countries
  const countries = Array.from(countryMap.entries()).map(([code, flag]) => ({
    code,
    name: countryNames[code] || code,
    flag
  }))

  if (countries.length > 0) {
    await knex('countries').insert(countries)
  }

  console.log(`Inserted ${countries.length} countries`)
}
