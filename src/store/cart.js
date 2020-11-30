// import { listen } from 'svelte/internal';
import { writable } from 'svelte/store';
import { get, post } from "./../lib/api";

function getCart() {
    const { subscribe, set } = writable({
		items: [],
		outOfCart:[]
    });
    return {
        subscribe,
        fetch: async () => {// This is only to get data from saved cart
            try {
                const data = await get('cart', null)
				set(data)
                return data
            }
            catch (e) { }
		},
		finalize: async (payload) => {
            try {
				const data = await post("cart/finalize", payload);
				set(data);
                return data
            }
            catch (e) {
                throw e
            }
		},
		set: async (payload) => {
            try {
				const data = await post("cart/set", payload);
				set(data);
                return data
            }
            catch (e) {
                throw e
            }
		},
		setList: (list) => {
			return new Promise(async (resolve, reject) =>{
				try {
					for (let i = 0; i < list.length; i++) {
						const data = await post("cart/set", list[i]);
						set(data);
					}
					return resolve()
				}
				catch (e) {
					return reject(e)
				}
			});
		},
		del: async () => {
            try {
                const data = await post("cart/del");
                set(data)
                return data
            }
            catch (e) {
                throw e
            }
		},
    }
}
export const cart = getCart()
