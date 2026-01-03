import { BaseModel } from './BaseModel'

export type SidebarSectionType = 'trending' | 'genres' | 'languages' | 'years' | 'comments'

export class SidebarSection extends BaseModel {
  static tableName = 'sidebar_sections'

  id!: number
  type!: SidebarSectionType
  title!: string
  icon!: string | null
  order!: number
  is_active!: boolean
  item_limit!: number
  footer_link!: string | null
  footer_text!: string | null

  // Aktif bölümleri sıralı getir
  static async getActive() {
    return this.query()
      .where('is_active', true)
      .orderBy('order', 'asc')
  }

  // Tüm bölümleri getir (admin için)
  static async getAll() {
    return this.query()
      .orderBy('order', 'asc')
  }
}
