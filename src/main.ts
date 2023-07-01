import * as http from 'http';

const parseString = (str: string): {[key: string]: string} => {
  let obj: {[key: string]: string} = {};
  let keyValuePair = str.split(';');
  for (let pair of keyValuePair) {
    let [key, value] = pair.split('=');
    obj[key.trim()] = value;
  }
  return obj;
}

const server = () => {
  const httpServer = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
    switch (req.url) {
      case '/login':
        switch (req.method) {
          case 'GET':
            res.end('login');
            break
          case 'POST':
            // リクエスト情報からnameとpassword取得
            // mysqlのデータと突き合わせ
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Set-Cookie', ['SessionId=bwkw; SameSite=None; Secure']);
            res.writeHead(302, { 'Location': 'http://127.0.0.1:5500/src/post.html' });
            res.end('login post');
            break
        }
        break;
      case '/post':
        const parsedCookie = parseString(req.headers['cookie'] || '');
        console.log(parsedCookie);
        res.end();
        break;
      default:
        res.end('no endpoint');
    }
  });

  httpServer.listen(8080, () => {
    console.log('Server started at http://localhost:8080');
  });
}

// 実行
server();
