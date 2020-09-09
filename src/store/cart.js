import { writable } from 'svelte/store';
import { get, post } from "./../lib/api";

function getCart() {
    const { subscribe, set } = writable({
        items: []
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
		// total: () => {
		// 	let total = 0;
		// 	let g = get();
		// 	console.log(g);
		// 	console.log(items);
		// 	return total;

		// }
    }
}
export const cart = getCart()
