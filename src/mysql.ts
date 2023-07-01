import * as mysql from 'mysql2/promise';

const createConnection = async (): Promise<mysql.Connection> => {
  return await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'learning',
    database: 'learning',
    password: 'testtest',
  });
}

export const fetchUserByNamePassword = async (name: string, password: string): Promise<any> => {
  const connection = await createConnection();
  const [user] = await connection.execute(selectUserQuery(name, password));

  return user[0];
}

const selectUserQuery = (name: string, password: string): string => {
  return `SELECT * FROM users WHERE name='${name}' AND password='${password}';`
  //SQLインジェクション対策する
}

export const createSession = async (sessionToken: string, userId: number): Promise<void> => {
  const connection = await createConnection();
  await connection.execute(insertSessionQuery(sessionToken, userId));
}

const insertSessionQuery = (sessionToken: string, userId: number): string => {
  const now = new Date();
  now.setHours(now.getHours() + 2);
  const expireAt = now.toLocaleString();
  return `INSERT INTO sessions (session_token, expire_at, user_id) VALUES ('${sessionToken}', '${expireAt}', '${userId}');`
  //SQLインジェクション対策する
}

export const fetchUserIdBySession = async (sessionToken: string): Promise<number> => {
  const connection = await createConnection();
  const [userId] = await connection.execute(selectSessionQuery(sessionToken));

  return userId[0];
}

const selectSessionQuery = (sessionToken: string): string => {
  return `SELECT user_id FROM sessions WHERE session_token='${sessionToken}';`
  //SQLインジェクション対策する
}

export const createPost = async (title: string, body: string, userId: number): Promise<void> => {
  const connection = await createConnection();
  await connection.execute(insertPostQuery(title, body, userId));
}

const insertPostQuery = (title: string, body: string, userId: number): string => {
  return `INSERT INTO posts (title, body, user_id) VALUES ('${title}', '${body}', '${userId}');`
  //SQLインジェクション対策する
}
