'use client';
import { createAuthTable, insertAuth, queryAuth,checkDbPath } from './db/dbop';
import { useState, useEffect } from "react";

// 定义 Auth Row 类型
interface AuthRow {
    id: number;
    userId: string;
    scope: string;
}

function Show() {
    // 使用 useState 时，指定初始值类型为 AuthRow 数组
    const [rows, setRows] = useState<AuthRow[]>([]);

    useEffect(() => {
        async function setupDb() {
            await createAuthTable();
            await checkDbPath();

            await insertAuth('user123', 'admin');
            const queriedRows = await queryAuth() as AuthRow[];
            console.log(`Queried Rows Length: ${queriedRows.length}`);
            setRows(queriedRows);
        }

         setupDb();

    }, []);

    return (
        <div className='App'>
            <h1>Tauri + React Database Example</h1>
            <div>
                <h2>Auth Table Rows</h2>
                <h2>Queried Rows Length: {rows.length}</h2>
                <ul>
                    {
                        rows.map((row, index) => (
                            <li key={index}>
                                ID: {row.id}, UserId: {row.userId}, Scope: {row.scope}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Show;
