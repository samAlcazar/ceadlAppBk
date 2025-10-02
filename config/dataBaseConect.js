import pg from 'pg'

const { Pool } = pg

const config = {
  host: 'localhost',
  port: 5432,
  database: 'ceadl',
  user: 'ceadl',
  password: '4984'
}

export const pool = new Pool(config)
