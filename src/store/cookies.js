import { writable } from 'svelte/store';
import Cookie from 'cookie-universal';
const cookies = Cookie()

import { formatDate } from '../lib/functions';

function _Cookies() {
	const { subscribe, set } = writable();

	return {
		subscribe,
		accept: () => {
			return new Promise(async (resolve, reject) => {
				var d = new Date();
				let Resp = 'Accept: ' + formatDate(d, true);
				cookies.set('fw-cookies', Resp);
				return resolve(Resp);
			});
		}
	}
}

export const fwCookies = _Cookies()
