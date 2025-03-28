// node-tasks/db/task.ts
import sql from 'mssql';
import { sqlConfig } from './database';

export async function testSqlConnection(): Promise<string[]> {
  try {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().query('SELECT name FROM sys.databases');
    await pool.close();

    // Retornamos los nombres
    return result.recordset.map((row) => row.name);
  } catch (error) {
    console.error('❌ Error de conexión SQL:', error);
    throw error;
  }
}
