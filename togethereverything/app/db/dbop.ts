import Database from '@tauri-apps/plugin-sql';
import { appDataDir } from "@tauri-apps/api/path";
// 定义 AuthRow 类型
interface AuthRow {
    id: number;
    userId: string;
    scope: string;
}



export async function checkDbPath() {
    const appDirectory = await appDataDir();
    console.log("Database file path should be in:", appDirectory);
}



// 初始化数据库连接
async function initDb() {
    // sqlite 数据库，路径相对于 tauri::api::path::BaseDirectory::App
    const db = await Database.load("sqlite://./togethereverything.db");
    console.log("Database file path should be in:", db);
    return db;
}

// 创建表
export async function createAuthTable(): Promise<void> {
    const db = await initDb();
    await db.execute(`
        CREATE TABLE IF NOT EXISTS auth (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId TEXT NOT NULL,
            scope TEXT NOT NULL
        )
    `);
}

// 插入数据
export async function insertAuth(userId: string, scope: string): Promise<void> {
    const db = await initDb();
    await db.execute(`
        INSERT INTO auth (userId, scope) VALUES (?, ?)
    `, [userId, scope]);
}

// 查询数据
export async function queryAuth(): Promise<AuthRow[]> {
    const db = await initDb();
    // 使用泛型指定返回类型为 AuthRow[]
    const rows = await db.select<AuthRow[]>("SELECT id, userId, scope FROM auth");
    return rows;
}

// 更新数据
export async function updateAuth(id: number, userId: string, scope: string): Promise<void> {
    const db = await initDb();
    await db.execute(`
        UPDATE auth SET userId = ?, scope = ? WHERE id = ?
    `, [userId, scope, id]);
}

// 删除数据
export async function deleteAuth(id: number): Promise<void> {
    const db = await initDb();
    await db.execute(`
        DELETE FROM auth WHERE id = ?
    `, [id]);
}
