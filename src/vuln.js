//Cipher algorithms should be robust
const crypto = require('crypto');

crypto.createCipheriv("DES", key, iv);

//Weak SSL/TLS protocols should not be used
const https = require('node:https');
const tls   = require('node:tls');

let options = {
 secureProtocol: 'TLSv1_method' // Noncompliant
};

let req    = https.request(options, (res) => { });
let socket = tls.connect(443, "www.example.com", options, () => { });


//File uploads should be restricted
const Formidable = require('formidable');

const form          = new Formidable(); // Noncompliant
form.uploadDir      = "/tmp/";
form.keepExtensions = true;

//Manual Sanitization
const sanitizedInput = input
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');
const html = `<strong>${sanitizedInput}</strong>`;

const sanitizedInput2 = input
  .replaceAll('bla', '&lt;')
  .replaceAll('foo', '&gt;');

const sanitizedInput3 = input
  .replaceAll('<', '&lt')
  .replaceAll('>', 'gt;');

//SQL Injection
// === MySQL ===
const mysql = require('mysql');
const mycon = mysql.createConnection({ host: host, user: user, password: pass, database: db });
mycon.connect(function(err) {
  mycon.query('SELECT * FROM users WHERE id = ' + userinput, (err, res) => {}); // Sensitive
});

// === PostgreSQL ===
const pg = require('pg');
const pgcon = new pg.Client({ host: host, user: user, password: pass, database: db });
pgcon.connect();
pgcon.query('SELECT * FROM users WHERE id = ' + userinput, (err, res) => {}); // Sensitive

//OS Command should not be vulnerable
async function TestOSCommand(req, res) {
    await execa.command('find /tmp/images/' + req.query.id); // Noncompliant
}
//Forwarding client IP address is security sensitive
var httpProxy = require('http-proxy');

httpProxy.createProxyServer({target:'http://localhost:9000', xfwd:true}) // Noncompliant
  .listen(8000);
