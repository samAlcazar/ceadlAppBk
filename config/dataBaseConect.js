import pg from 'pg'

const { Pool } = pg

const config = {
  host: 'postgres.railway.internal',
  port: 5432,
  database: 'railway',
  user: 'postgres',
  password: 'FLWxTllCzqbJgjrTdxsZmUpvJJtAutdD'
}

export const pool = new Pool(config)
