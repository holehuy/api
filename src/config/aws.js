const yenv = require('yenv')

const { services, storages } = yenv()

module.exports = {
  accessKeyId: services?.aws?.accessKeyId,
  secretAccessKey: services?.aws?.secretAccessKey,
  regionName: services?.aws?.regionName,
  Bucket: storages?.s3?.bucketName
}
