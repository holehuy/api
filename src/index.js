const app = require('./app')
const { host, port } = require('./config/app')

app.listen(port, host)
console.log(`Server listening on http://${host}:${port}`)
