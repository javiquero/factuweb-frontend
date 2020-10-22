import Cookie from 'cookie-universal'
import { PORT} from '@/config';
const cookies = Cookie()


async function send({ method, path, data, token, cookie }) {
	return new Promise(async (resolve, reject) => {
		// console.log( method + "://api/" + path  );
		const fetch = process.browser ? window.fetch : require('node-fetch').default;
		const opts = {
			method, headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
				'Cache': 'no-cache',
				'cookie': cookie||cookies
			},
			credentials: 'include',
			mode: 'cors'
		};
		// console.log(cookies.getAll());
		if (data)
			opts.body = JSON.stringify(data);


		if (!token) token = cookies.get('fw-token');
		// console.log("tkn",path,"|",tkn,"|", token);
		if (token) 	opts.headers['Authorization'] = `Bearer ${token}`;

		try {
			let Url = "";
			if (typeof window === "undefined") {
				Url = "http://localhost:" + PORT;;
			} else {
				Url = window.location.origin;
			}
			let response = await fetch(`${Url}/api/${path}`, opts)
			if (response.status == 403) {
				cookies.set('fw-token', null)
				cookies.set('fw-data', null)
			}
			let json = await response.text()
			if (!response.ok) {
				return reject(json);
			}
			try {
				return resolve(JSON.parse(json));
			} catch (e) {
				return reject(json);
			}

		}
		catch (e) {
			return reject(e);
		}
	});
};

async function get(path, params, token, cookie) {
	return await send({ method: 'GET', path, params, token, cookie });
}

async function del(path, token) {
	return await send({ method: 'DELETE', path, token });
}

async function post(path, data, token) {
	return await send({ method: 'POST', path, data, token });
}

async function put(path, data, token) {
	return await send({ method: 'PUT', path, data, token });
}

export { get, del, post, put }
