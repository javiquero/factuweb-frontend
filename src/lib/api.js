import { Url } from './../config'
import Cookie from 'cookie-universal'
const cookies = Cookie()

async function send({ method, path, data, token, cookie }) {
	return new Promise(async (resolve, reject) => {
		const fetch = process.browser ? window.fetch : require('node-fetch').default;
		const opts = {
			method, headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
				'Cache': 'no-cache',
				'cookie': cookie
			},
			credentials: 'include',
			mode: 'cors'
		};

		if (data)
			opts.body = JSON.stringify(data);


		let tkn = cookies.get('fw-token');

		if (token) {
			opts.headers['Authorization'] = `Bearer ${token}`;
		} else if (tkn) {
			opts.headers['Authorization'] = `Bearer ${tkn}`;
		}
		// else {
		// 	console.log ("Path",path);
		// 	console.log ("OPTS",opts);
		// 	console.log ("tkn",tkn);
		// 	console.log ("token",token);
		// }

		try {
			let response = await fetch(`${Url}/api/${path}`, opts)

			if (response.status == 403) {
				console.log("RESPONSE 403");
				cookies.set('fw-token', null)
				cookies.set('fw-data', null)
				// cookies.remove('fw-token');
				// cookies.remove('fw-data');
			}

			let json = await response.text()
			if (!response.ok) {
				return reject(json)
				// throw json
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
	// var url = new URL("https://geo.example.org/api"),
	// if (params)
	// Object.keys(params).forEach(key => path.searchParams.append(key, params[key]))
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
