const apiUrl = 'http://localhost:1337'
const PORT = "5000"

// const LOCAL_URL = 'http://localhost:'+PORT
// const REMOTE_URL = 'https://www.mydomain.com'
// const Url = (process.env.NODE_ENV === 'production') ? REMOTE_URL : LOCAL_URL

const siteName = "factuWeb";
const contactEmail = "info@factuWeb.com";
const showSpecialPrices = false;
const showOrders = false;
const showPriceInOrders = false;
const showInvoices = false;
const showPriceInInvoices = false;
const IDAnalytics = 'G-XXXXXX';

const SEO = {
	type: "webpage",
	title: "FactuWeb la forma mas fácil de compartir tu catálogo online.",
	description: "FactuWeb te genera una página web a partir de tu sistema de facturación Factusol y pone tu catálogo de productos a la disposición de tus clientes.",
	locale: "es_ES",
	image: "bigOgImage.png"
}


export {
	apiUrl,
	siteName,
	SEO,
	contactEmail,
	PORT,
	showSpecialPrices,
	showOrders,
	showPriceInOrders,
	showInvoices,
	showPriceInInvoices,
	IDAnalytics
}
