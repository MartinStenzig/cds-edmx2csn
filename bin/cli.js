#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const Edmx2CsnConverter = require('../lib/converter.js')

const isTTY = process.stdin.isTTY

let parameterObjects = {}

// console.log('isTTY: ', process.stdin.isTTY)

processing()

async function processing () {
// Handle command line arguments
  parameterObjects = handleArguments()

  if (isTTY) {
  // Execute real command
    try {
      // Run converter
      const csn = await new Edmx2CsnConverter(parameterObjects).convert()

      process.stdout.write(JSON.stringify(csn))
    } catch (err) {
      if (err.message === 'No Edmx String provided.') {
        console.log('Please provide at least one options.')
        console.log('Find details by calling the command with --help.')
      } else {
        console.error(err)
      }
      process.exit(1)
    }
  } else {
  // Handle piped in data
    handlePipedContent()
  }
}
function handleArguments () {
// Yargs command line fefinition
  const res = yargs(hideBin(process.argv))
    .scriptName('edmx2csn')
    .usage('$0 [options]', 'converts the edmx representation to a SAP CSN object.')
    .example([
      ['$0 -u http://localhost:4004/refsvc/$metadata', 'Convert the edmx file directly from a the metadata URL endpoint.'],
      ['$0 -f ./test/sf.edmx', 'Connverts the file in the file system.'],
      ['curl https://services.odata.org/v4/northwind/northwind.svc/$metadata | $0 | jq', 'Command line Piping with following json formatting']
    ])
    .wrap(null)
    .option('file', {
      alias: 'f',
      type: 'string',
      description: 'Reference to a file i.e.: -f ./mydir/file.edmx'
    })
    .option('url', {
      alias: 'u',
      type: 'string',
      description: 'Reference to a URL i.e.: -u https://services.odata.org/v4/northwind/northwind.svc/$metadata'
    })
    .option('serviceoverride', {
      alias: 's',
      type: 'string',
      description: 'Value to overvrite the service name in the CSN object. i.e.: -s MyService'
    })
    .strict()
    .argv

  // deterine parameter object
  const paramObject = res
  delete paramObject._
  return paramObject
}

async function handlePipedContent () {
  let clineData = ''

  // Hande piped in data
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', (buf) => {
    clineData += buf.toString()
  })
  process.stdin.on('end', async () => {
    // Trigger CSN Converter
    const csn = await new Edmx2CsnConverter().convert(clineData)

    // Output CSN to console
    process.stdout.write(JSON.stringify(csn))

    // console.log('End: ', clineData)
  // process.stdout.write(JSON.stringify(csn))
  })
}
