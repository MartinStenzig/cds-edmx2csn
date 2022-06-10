const assert = require('assert')
const path = require('path')
const fs = require('fs')
const C = require('./constants')

let Edmx2CsnConverter

describe('Edmx2Csn Library', function () {
  it('should allow for a proper require', function () {
    Edmx2CsnConverter = require('../lib/converter.js')
  })

  describe('empty constructor options', function () {
    let edmx2csn = {}
    it('should be initializable with empty options in constructor', function () {
      edmx2csn = new Edmx2CsnConverter()
      assert.notEqual(edmx2csn, undefined)
      assert.notEqual(edmx2csn, null)
    })
    it('should throw an error when providing undefined as parameter for conversion.', async function () {
      await assert.rejects(async () => { await edmx2csn.convert(undefined) })
    })

    it('should be able to process a simple Edmx String', async function () {
      const csn = await edmx2csn.convert(C.EDMX_SIMPLE_STRING)
      assert.equal(JSON.stringify(csn), JSON.stringify(C.EDMX_SIMPLE_CSN))
    })
  })

  describe('options: serviceoverride=MyService ', function () {
    let edmx2csn = {}
    it('should be initializable with options serviceoverride=MyService in constructor', function () {
      edmx2csn = new Edmx2CsnConverter({ serviceoverride: 'MyService' })
      assert.notEqual(edmx2csn, undefined)
      assert.notEqual(edmx2csn, null)
    })

    it('should be able to process a simple Edmx String with override', async function () {
      const csn = await edmx2csn.convert(C.EDMX_SIMPLE_STRING)
      // console.log(JSON.stringify(csn))
      assert.equal(JSON.stringify(csn), JSON.stringify(C.EDMX_SIMPLE_CSN_MYSERVICE_OVERRIDE))
    })
  })

  describe('options: file=./edmx/northwind_v4.edmx', function () {
    let edmx2csn = {}
    it('should be initializable with options file=./edmx/northwind_v4.edmx', function () {
      edmx2csn = new Edmx2CsnConverter({ file: path.join(__dirname, './edmx/northwind_v4.edmx') })
      assert.notEqual(edmx2csn, undefined)
      assert.notEqual(edmx2csn, null)
    })

    it('should be able to process a file based Edmx', async function () {
      const csn = await edmx2csn.convert()
      const expectedCsn = JSON.parse(await _readFromFile(path.join(__dirname, './csn/northwind_v4.csn')))
      // console.log('expectedCsn: ', expectedCsn)
      assert.equal(JSON.stringify(csn), JSON.stringify(expectedCsn))
    })
  })

  describe('options: url=https://services.odata.org/v4/northwind/northwind.svc/$metadata', function () {
    let edmx2csn = {}
    it('should be initializable with options url=https://services.odata.org/v4/northwind/northwind.svc/$metadata', function () {
      edmx2csn = new Edmx2CsnConverter({ url: 'https://services.odata.org/v4/northwind/northwind.svc/$metadata' })
      assert.notEqual(edmx2csn, undefined)
      assert.notEqual(edmx2csn, null)
    })

    it('should be able to process a url based Edmx', async function () {
      const csn = await edmx2csn.convert()

      const csnFile = await new Edmx2CsnConverter({ file: path.join(__dirname, './edmx/northwind_v4.edmx') }).convert()

      assert.deepEqual(csn, csnFile)
    })
  })
})

/**
 * Returns a promise that resolves to the contents of the file at the provided path
 * @param {String} file Filename
 * @returns {String} File contents
 */
function _readFromFile (file) {
  return new Promise((resolve, reject) => {
    // Resolve provided file path
    const fileName = path.resolve(file)

    // Read File and return contents
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}
