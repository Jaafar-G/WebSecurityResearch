const express = require('express');
const time = require('express-timestamp');
const knex = require('knex');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const ipHandler = require('./controllers/handleIP');
const urlHandler = require('./controllers/handleUrl');
const dataHandler = require('./controllers/handleData');
const quitHandler = require('./controllers/handleQuit');
// let child_process = require('child_process');
const db = knex({
        client: 'pg',
        connection: {
                host: '127.0.0.1',
                user: 'postgres',
                password: 'postgres',
                database: 'bot_traffic'
        }
});

app.use(time.init)
app.enable('trust proxy');
app.use(bodyParser.json());
app.use(cors());

const commandLine = function(command, callback) {
        var exec = require('child_process').exec;
        var child_process = exec(command, function (err, stdout, stderr) {
      
          if (err && err.length > 1) {
                  console.log("failed to find playback or record devices");
                  callback(error("InternalError", "No input or output devices found", 500));
                  return;
              }else{
                  if(stdout){
                          callback(null,stdout); //returns cmd line output 
                  }
                  if(stderr){
                      callback(new Error("STDERR"),stderr);
                  }
      
          }  
        });
        return child_process;
};

app.post('/ip', (req, res) => { ipHandler.handleIP(req,res,commandLine,db)});

app.post('/url', (req, res) => { urlHandler.handleUrl(req,res,db)});

app.post('/data', (req, res) => {dataHandler.handleData(req,res,db)})

app.post('/quit', (req, res) => {quitHandler.handleQuit(req,res,db)})

app.listen(3005);
