const apiUrl = 'http://factuapi:1337'
const LOCAL_URL = 'http://localhost:5000'
const REMOTE_URL = 'https://www.mydomain.com'
const siteName = "factuWeb"
const contactEmail = "info@factuWeb.com"
const Url = (process.env.NODE_ENV === 'production') ? REMOTE_URL : LOCAL_URL
const PORT = "5000"
export { apiUrl, Url, siteName, contactEmail, PORT }
