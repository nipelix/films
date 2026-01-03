import { Model } from 'objection'
import { BaseModel } from './BaseModel'

export type MenuPosition = 'main' | 'sub' | 'mobile'

export class MenuItem extends BaseModel {
  static tableName = 'menu_items'

  id!: number
  title!: string
  url!: string
  icon!: string | null
  badge_text!: string | null
  badge_color!: string | null
  position!: MenuPosition
  parent_id!: number | null
  order!: number
  is_active!: boolean
  open_new_tab!: boolean

  // Relations
  children?: MenuItem[]
  parent?: MenuItem

  static relationMappings = () => ({
    children: {
      relation: Model.HasManyRelation,
      modelClass: MenuItem,
      join: {
        from: 'menu_items.id',
        to: 'menu_items.parent_id'
      }
    },
    parent: {
      relation: Model.BelongsToOneRelation,
      modelClass: MenuItem,
      join: {
        from: 'menu_items.parent_id',
        to: 'menu_items.id'
      }
    }
  })

  // Pozisyona göre menü öğelerini getir
  static async getByPosition(position: MenuPosition) {
    return this.query()
      .where('position', position)
      .where('is_active', true)
      .whereNull('parent_id')
      .withGraphFetched('children(activeOnly)')
      .modifiers({
        activeOnly(builder) {
          builder.where('is_active', true).orderBy('order', 'asc')
        }
      })
      .orderBy('order', 'asc')
  }

  // Tüm menüleri getir (position'a göre gruplu)
  static async getAllGrouped() {
    const items = await this.query()
      .where('is_active', true)
      .whereNull('parent_id')
      .withGraphFetched('children(activeOnly)')
      .modifiers({
        activeOnly(builder) {
          builder.where('is_active', true).orderBy('order', 'asc')
        }
      })
      .orderBy('order', 'asc')

    return {
      main: items.filter(item => item.position === 'main'),
      sub: items.filter(item => item.position === 'sub'),
      mobile: items.filter(item => item.position === 'mobile')
    }
  }
}
