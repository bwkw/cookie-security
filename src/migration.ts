import * as mysql from 'mysql2/promise';

const createTable = async () => {
  const connection = await createConnection();
  await connection.query(createUserQuery);
  await connection.query(createPostQuery);
  await connection.query(createSessionQuery);
  await connection.end();
}

const createConnection = async (): Promise<mysql.Connection> => {
  return await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'cookie',
    database: 'cookie',
    password: 'testtest',
  });
}

const createUserQuery: string =
  'CREATE TABLE users (\n' +
  '  id int AUTO_INCREMENT,\n' +
  '  name VARCHAR(255) NOT NULL,\n' +
  '  password VARCHAR(255) NOT NULL,\n' +
  '  created_at datetime default current_timestamp,\n' +
  '  PRIMARY KEY (`id`),\n' +
  '  UNIQUE KEY unique_name_password (name, password)\n' +
  ');'

const createPostQuery: string =
  'CREATE TABLE posts (\n' +
  '  id int AUTO_INCREMENT,\n' +
  '  title VARCHAR(255) NOT NULL,\n' +
  '  body TEXT(65535) NOT NULL,\n' +
  '  created_at datetime default current_timestamp,\n' +
  '  user_id int NOT NULL,\n' +
  '  PRIMARY KEY (`id`),\n' +
  '  FOREIGN KEY(`user_id`) REFERENCES users(id)\n' +
  ');'

const createSessionQuery: string =
  'CREATE TABLE sessions (\n' +
  '  id int AUTO_INCREMENT,\n' +
  '  session_token VARCHAR(255) NOT NULL UNIQUE,\n' +
  '  expire_at datetime NOT NULL,\n' +
  '  user_id int NOT NULL,\n' +
  '  PRIMARY KEY (`id`),\n' +
  '  FOREIGN KEY(`user_id`) REFERENCES users(id)\n' +
  ');'

createTable().catch(console.error);
