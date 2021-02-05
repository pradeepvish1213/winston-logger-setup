const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const LoggerService = require('./logger_service');

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.get('/info-log', async (req, res) => {
    let message = 'This is sample value of message we store in log file.';
    LoggerService('info', req, 'info-log', message);
    return res.json({
        logging: "Info",
        data: {
            message,
            level: 'info',
            functionName: 'info-log'
        }
    });
});

app.get('/warn-log', async (req, res) => {
    let message = 'This is sample value of message we store in log file. with additional value.';
    LoggerService('warn', req, 'debug-log', message);
    return res.json({
        logging: "warn",
        data: {
            message,
            level: 'warn',
            functionName: 'warn-log',
            req: {header: req.headers, body: req.body, query: req.query},
        }
    });
});

app.get('/error-log', async (req, res) => {
    let error = 'Found some error in line no 10 file name';
    let message = 'This is sample value of message we store in log file. with additional value error also.';
    LoggerService('error', req, 'fetched values error', message, error);
    return res.json({
        logging: "Error",
        data: {
            message,
            level: 'error',
            functionName: 'error-log',
            req: {header: req.headers, body: req.body, query: req.query},
            error,
        }
    });
});

app.listen(4001, () => {
    console.info('=========Server started at port :',4001)
})