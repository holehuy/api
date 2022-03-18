const AWS = require('aws-sdk')
const fs = require('fs')
const pdf = require('pdf-parse')
const axios = require('axios')
const { accessKeyId, secretAccessKey, regionName, Bucket } = require('../config/aws')

AWS.config.update({
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  },
  region: regionName
})

const s3 = new AWS.S3()

const uploadFile = async (file) => {
  try {
    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
      Bucket: Bucket,
      Body: fileStream,
      ACL: 'public-read',
      Key: `avatar/${file.filename}`,
      ContentType: file.mimetype
    }
    const result = await s3.upload(uploadParams).promise()
    return result
  } catch (error) {
    throw new Error(error.message)
  }
}

const uploadFdf = async (file, query) => {
  try {
    const fileStream = fs.readFileSync(file.path)
    const { text } = await pdf(fileStream)
    let summary
    if (query?.num_sentences) {
      await axios.post('https://tldrthis.p.rapidapi.com/v1/model/extractive/summarize-text/', {
        text,
        num_sentences: query?.num_sentences
      }, {
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-host': 'tldrthis.p.rapidapi.com',
          'x-rapidapi-key': '38e60424b8msh64268c080a9e889p1d1ff1jsndcf349070004'
        }
      }).then(response => {
        summary = response.data.summary.map(e => e.replace(/(\r\n|\n|\r)/gm, ''))
      })
    } else {
      await axios.post('https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-text/', {
        text,
        min_length: query?.min_length,
        max_length: query?.maxx_length
      }, {
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-host': 'tldrthis.p.rapidapi.com',
          'x-rapidapi-key': '38e60424b8msh64268c080a9e889p1d1ff1jsndcf349070004'
        }
      }).then(response => {
        summary = response.data.summary.split('.')
      })
    }
    return { summary }
  } catch (error) {
    throw new Error(error.message)
  }
}
// Text Extractive Summary
const textExtractiveSummary = async (query) => {
  const { text, num_sentences: numSentences } = query
  try {
    let summary
    await axios.post('https://tldrthis.p.rapidapi.com/v1/model/extractive/summarize-text/', {
      text,
      num_sentences: numSentences
    }, {
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': 'tldrthis.p.rapidapi.com',
        'x-rapidapi-key': '38e60424b8msh64268c080a9e889p1d1ff1jsndcf349070004'
      }
    }).then(response => {
      summary = response.data.summary.map(e => e.replace(/(\r\n|\n|\r)/gm, ''))
      console.log(summary)
    })
    return { summary }
  } catch (error) {
    throw new Error(error.message)
  }
}

// Text Abstractive Summary
const textAbstractiveSummary = async (query) => {
  const { text, min_length: minLength, max_length: maxLength } = query
  try {
    let summary
    await axios.post('https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-text/', {
      text,
      min_length: minLength,
      max_length: maxLength
    }, {
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': 'tldrthis.p.rapidapi.com',
        'x-rapidapi-key': '38e60424b8msh64268c080a9e889p1d1ff1jsndcf349070004'
      }
    }).then(response => {
      console.log('huyhuy')
      summary = response.data.summary.split('.')
      // console.log(summary)
    })
    return { summary }
  } catch (error) {
    throw new Error(error.message)
  }
}

const textSummary = async (query) => {
  const { text, sentences } = query

  const data = await axios.post('https://tldrthis.p.rapidapi.com/v1/model/extractive/summarize-text/', {
    text,
    num_sentences: sentences
  }, {
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-host': 'tldrthis.p.rapidapi.com',
      'x-rapidapi-key': '38e60424b8msh64268c080a9e889p1d1ff1jsndcf349070004'
    }
  })
  // .then(response => {
  //   summary = response.data.summary.map(e => e.replace(/(\r\n|\n|\r)/gm, ''))
  //   console.log(summary)
  // })
  console.log(data)

  return { data: 'ss' }
}

module.exports = { s3, uploadFile, uploadFdf, textSummary, textExtractiveSummary, textAbstractiveSummary }
