import bodyParser from 'body-parser'

const jsonParser = bodyParser.json()
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

export { jsonParser, urlEncodedParser }