const cdsimp = require('@sap/cds-dk/lib/import/index.js')
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

/**
 * Wrapper for the cds-dk/lib/import/index.js functionality to convert EDMX to CSN
 */
class Edmx2CsnConverter {
  /**
     * Constructor for edmx2csn converter
     * Possible option parameters:
     * - file: Path to the edmx file to be converted
     * - url: URL to the edmx file to be converted
     * - serviceoverride: The name to replace the edmx service name with
     * @param {Object} options Options
     */
  constructor (options) {
    this._options = options
  }

  /**
     * Converts the Edmx String passed in into a CSN Object
     * @param {String} edmxString Edmx String to be converted
     * @param {String} replacementServiceName The name to replace the edmx service name with
     * @returns {Object} CSN Object
     */
  async convert (edmxString) {
    // Default option to empty object if nothing was provided
    if (!this._options) {
      this._options = {}
    }

    // Check if url and file are set at the same time
    if (this._options.file && this._options.url) {
      throw new Error('You can only set either the file or the url option.')
    }

    // Check if file is set
    if (!edmxString && this._options.file) {
      // Read Edmx from file
      edmxString = await this._readEdmxFromFile(this._options.file)
    } else if (!edmxString && this._options.url) {
      // Read Edmx from URL
      edmxString = await this._readEdmxFromUrl(this._options.url)
    }

    if (!edmxString) {
      throw new Error('No Edmx String provided.')
    }

    return cdsimp.edmx2csn(edmxString, this._options.serviceoverride, {})
  }

  /**
   * Reads the EDMX string from a file
   * @param {String} file Filename
   * @returns {String} Edmx String
   */
  async _readEdmxFromFile (file) {
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

  /**
   * Reads Edmx from a URL
   * @param {String} url URL to the Edmx
   * @returns {String} Edmx String
   */
  async _readEdmxFromUrl (url) {
    const response = await fetch(url)
    return response.text()
  }
}
module.exports = Edmx2CsnConverter
