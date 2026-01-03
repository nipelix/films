import { BaseModel } from './BaseModel'

export class Source extends BaseModel {
  static tableName = 'sources'

  id!: number
  name!: string
  slug!: string
  priority!: number
  status!: boolean
}
