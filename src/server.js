import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import {apiUrl,PORT} from './config';

const proxy = require('http-proxy-middleware');
const apiProxy = proxy('/api', {target: apiUrl, changeOrigin: true});
const dev = 'development';

function logger(req, res, next) {
    // console.log(`~> Received ${req.method} on ${req.url}`);
    next();
}

import { post } from "./lib/api";
async function authenticationMiddleware(req, res, next) {
    const isFile = req.path.includes('.');
    if (isFile || req.path.substr(0, 4) == "/api") return next();
    const cookies = require('cookie-universal')(req, res);

    if (cookies.get('fw-token')!=undefined && cookies.get('fw-data') == undefined) {
        try {
            let data = await post("auth/relogin", {}, cookies.get('fw-token'));
            cookies.set('fw-data', data.user);
            req.user = data.user
            req.token = data.token
        } catch (e) {
            req.user = {}
            req.token = null
            cookies.remove('fw-token')
            cookies.remove('fw-data')
            console.log('err at users', e.toString());
        }
    } else {
        if (cookies.get('fw-token') == undefined) {
            req.user = {}
            req.token = null
            cookies.remove('fw-token')
            cookies.remove('fw-data');

            if (req.path!="/login" && req.path!="/"){
                res.statusCode= 302;
                res.setHeader('Location', '/login');
                res.end();
            }
        } else {
            req.user = cookies.get('fw-data')
            req.token = cookies.get('fw-token')
            // console.log("all ok");
        }
    }
    next();
}
polka()
    .use(
        compression({
            threshold: 0
        }),
        sirv('static', {
            dev
        }),
		authenticationMiddleware,
		logger,
        apiProxy,
        sapper.middleware({
            session: (req, res) => ({
                user: req.user || {},
                token: req.token
            })
        })
    )
    .listen(PORT, err => {
        if (err) {
            console.log('error', err);
        } else {
            console.log(`> Running on localhost:${PORT}`);
        }
    });
