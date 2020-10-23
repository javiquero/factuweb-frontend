import * as sapper from '@sapper/app';
import { cart } from "./store/cart.js";

import Cookie from 'cookie-universal'
const cookies = Cookie()

if (cookies.get('fw-token')) cart.fetch();

sapper.start({
	target: document.getElementsByTagName('app')[0]
});
