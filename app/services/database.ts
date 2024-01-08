import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: 'allow',
  connect_timeout: 5,
});

export { sql };
