import { BaseModel } from './BaseModel'

export type BannerPosition = 'header' | 'sidebar' | 'footer' | 'video_top' | 'video_bottom' | 'between_content'
export type BannerType = 'image' | 'html' | 'announcement'

export class Banner extends BaseModel {
  static tableName = 'banners'

  id!: number
  name!: string
  position!: BannerPosition
  type!: BannerType
  image!: string | null
  link!: string | null
  html_content!: string | null
  alt_text!: string | null
  is_active!: boolean
  open_new_tab!: boolean
  order!: number
  start_date!: Date | null
  end_date!: Date | null

  // Get active banners by position
  static async getByPosition(position: BannerPosition) {
    const now = new Date()

    return this.query()
      .where('position', position)
      .where('is_active', true)
      .where((builder) => {
        builder
          .whereNull('start_date')
          .orWhere('start_date', '<=', now)
      })
      .where((builder) => {
        builder
          .whereNull('end_date')
          .orWhere('end_date', '>=', now)
      })
      .orderBy('order', 'asc')
  }

  // Get announcement banner (first active)
  static async getAnnouncement() {
    const now = new Date()

    return this.query()
      .where('type', 'announcement')
      .where('is_active', true)
      .where((builder) => {
        builder
          .whereNull('start_date')
          .orWhere('start_date', '<=', now)
      })
      .where((builder) => {
        builder
          .whereNull('end_date')
          .orWhere('end_date', '>=', now)
      })
      .orderBy('order', 'asc')
      .first()
  }

  // Get all active banners grouped by position
  static async getActiveByPosition() {
    const now = new Date()

    const banners = await this.query()
      .where('is_active', true)
      .where((builder) => {
        builder
          .whereNull('start_date')
          .orWhere('start_date', '<=', now)
      })
      .where((builder) => {
        builder
          .whereNull('end_date')
          .orWhere('end_date', '>=', now)
      })
      .orderBy('order', 'asc')

    // Pozisyona göre grupla
    const grouped: Record<string, Banner[]> = {
      header: [],
      sidebar: [],
      footer: [],
      video_top: [],
      video_bottom: [],
      between_content: []
    }

    for (const banner of banners) {
      if (grouped[banner.position]) {
        grouped[banner.position].push(banner)
      }
    }

    return grouped
  }
}
