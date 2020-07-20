import { writable } from 'svelte/store';
import { post } from "./../lib/api";
import Cookie from 'cookie-universal';
const cookies = Cookie()

function authenticate() {
	const { subscribe, set } = writable();

	return {
		subscribe,
		login: (client, nif) => {
			return new Promise(async (resolve, reject) => {
				if (!client) return reject("El código de cliente es necesario.");
				if (!nif) return reject("El campo del nif no puede estar vacío.");
				try {
					let data = await post("auth/login", {
						client: client,
						nif: nif
					});
					set({ user: data.user, token: data.token });
					cookies.set('fw-token', data.token);
					cookies.set('fw-data', data.user);
					return resolve(data)
				} catch (e) {
					console.error(e);
					cookies.remove('fw-token')
					cookies.remove('fw-data')
					set({})
					return reject("No hemos podido encontrar el código de cliente o cif/nif. Revisa que estén bien introducidos.")
				}
			});
		},

		logout: async () => {
			try {
				cookies.remove('fw-token');
				cookies.remove('fw-data');
                set({})
				return {};
			} catch (e) {
				set({})
				throw e
			}
		},
	}
}

export const auth = authenticate()
