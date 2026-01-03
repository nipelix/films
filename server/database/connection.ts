import Knex from 'knex'
import { Model } from 'objection'
import config from '../../knexfile'

const environment = process.env.NODE_ENV || 'development'
const knexConfig = config[environment]

const knex = Knex(knexConfig)

// Bind all models to the knex instance
Model.knex(knex)

export default knex
