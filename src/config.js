const apiUrl = 'http://localhost:1337'
const PORT = "5000"

// const LOCAL_URL = 'http://localhost:'+PORT
// const REMOTE_URL = 'https://www.mydomain.com'
// const Url = (process.env.NODE_ENV === 'production') ? REMOTE_URL : LOCAL_URL

const siteName = "factuWeb";
const siteDescription = "Accede a nuestro amplio catálogo de productos y realiza tus pedidos de la forma más comoda.";
const contactEmail = "info@factuWeb.com";
const showSpecialPrices = false;
const showOrders = false;
const showPriceInOrders = false;
const showInvoices = false;
const showPriceInInvoices = false;
const IDAnalytics = 'G-XXXXXX';

export {
	apiUrl,
	siteName,
	siteDescription,
	contactEmail,
	PORT,
	showSpecialPrices,
	showOrders,
	showPriceInOrders,
	showInvoices,
	showPriceInInvoices,
	IDAnalytics
}
