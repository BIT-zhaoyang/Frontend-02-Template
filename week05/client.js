const net = require('net');
const images = require('images');
const parse = require('./parse');
const render = require('./render.js');

class Request {
  constructor(options) {
    this.method = options.method;
    this.host = options.host;
    this.port = options.port || 80;
    this.path = options.path || '/';
    this.headers = options.headers || {};
    this.body = options.body || {};
    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    if (this.headers['Content-Type'] === 'applicaiton/JSON') {
      this.bodyText = JSON.stringify(options.body);
    } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      this.bodyText = Object.entries(this.body)
                        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                        .join('&');
    }
    this.headers['Content-Length'] = this.bodyText.length;
  }

  send(connection) {
    return new Promise((resolve, reject) => {
        const parser = new ResponseParser();
        if (connection) {
          connection.write(this.toString());
        } else {
          // create connection is using TCP/IP protocol.
          // so we only need host & port as argument.
          connection = net.createConnection({
            host: this.host,
            port: this.port
          }, () => {
            connection.write(this.toString());
          });
        }
        // because response is received in stream
        // so we need to continuesly parse the stream 
        // instead of construct a standalone Response object
        connection.on('data', (data) => {
          parser.receive(data.toString());
          if (parser.isFinished) {
            resolve(parser.response);
            connection.end();
          }
        });
        connection.on('error', (err) => {
          console.error(err);
          reject(err);
          connection.end();
        });
    });
  }

  toString() {
    return `${this.method} ${this.path} HTTP/1.1
${Object.entries(this.headers).map(([key, value]) => `${key}: ${value}`).join('\r\n')}

${this.bodyText}`;
  }

}

class ResponseParser {
  constructor(){
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2; 
    this.WAITING_HEADER_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;
    this.WAITING_BODY = 7;

    this.status = this.WAITING_STATUS_LINE;
    this.statusLine = '';
    this.headers = {};
    this.headerName = '';
    this.headerValue = '';
    this.bodyParser = null;
  }

  receive(str) {
    for (let ch of str) {
      this.recceiveChar(ch);
    }
  }

  recceiveChar(ch) {
    if (this.status === this.WAITING_STATUS_LINE) {
      if (ch === '\r') {
        this.status = this.WAITING_STATUS_LINE_END;
      } else {
        this.statusLine += ch;
      }
    } else if (this.status === this.WAITING_STATUS_LINE_END) {
      if (ch === '\n') {
        this.status = this.WAITING_HEADER_NAME;
      }
    } else if (this.status === this.WAITING_HEADER_NAME) {
      if (ch === ':') {
        this.status = this.WAITING_HEADER_SPACE;
      } else if (ch === '\r') {
        this.status = this.WAITING_HEADER_BLOCK_END;
      } else {
        this.headerName += ch;
      }
    } else if (this.status === this.WAITING_HEADER_SPACE) {
      if (ch === ' ') {
        this.status = this.WAITING_HEADER_VALUE;
      }
    } else if (this.status === this.WAITING_HEADER_VALUE) {
      if (ch === '\r') {
        this.status = this.WAITING_HEADER_LINE_END;
      } else {
        this.headerValue += ch;
      }
    } else if (this.status === this.WAITING_HEADER_LINE_END) {
      if (ch === '\n') {
        this.headers[this.headerName] = this.headerValue;
        this.headerName = '';
        this.headerValue = '';
        this.status = this.WAITING_HEADER_NAME;
      }
    } else if (this.status === this.WAITING_HEADER_BLOCK_END) {
      if (ch === '\n') {
        this.status = this.WAITING_BODY;
        if (this.headers['Transfer-Encoding'] === 'chunked') {
          this.bodyParser = new TrunkedBodyParser();
        }
      }
    } else if (this.status === this.WAITING_BODY) {
      this.bodyParser.receiveChar(ch);
    }
  }

  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished;
  }

  get response() {
    let match = this.statusLine.match(/^HTTP\/1.1 (\d{3}) ([\s\S]+)$/);
    return {
      statusCode: match[1],
      statusText: match[2],
      headers: this.headers,
      body: this.bodyParser.content.join('')
    };
  }
}

class TrunkedBodyParser {
  constructor() {
    this.WAITING_LENGH = 0;
    this.WAITING_LENGH_END = 1;
    this.WAITING_BODY = 2;
    
    this.length = 0;
    this.status = this.WAITING_LENGH;
    this.content = [];
    this.isFinished = false;
  }

  receiveChar(ch) {
    if (this.status === this.WAITING_LENGH) {
      if (ch === '\r') {
        this.status = this.WAITING_LENGH_END;
      } else {
        this.length = this.length * 16 + parseInt(ch, 16);
      }
    } else if (this.status === this.WAITING_LENGH_END) {
      if (ch === '\n') {
        if (this.length === 0) {
          this.isFinished = true;
        } else {
          this.status = this.WAITING_BODY;
        }
      }
    } else if (this.status === this.WAITING_BODY) {
      this.content.push(ch);
      this.length--;
      if (this.length === 0) {
        this.status = this.WAITING_LENGH;
      }
    }
  }
}

void async function() {
  const request = new Request({
    method: 'POST',
    host: 'localhost',
    port: '8088',
    path: '/',
    headers: {
      ['X-Foo2']: 'customed'
    },
    body: {
      name: 'winter'
    }
  });

  const response = await request.send();
  const dom = parse.parseHTML(response.body);
  const viewport = images(800, 600);
  render(viewport, dom);
  viewport.save('view.jpg');
}();
