require('dotenv').config()
const axios = require('axios')
const qs = require('qs')
const fs = require('fs')
const util = require('util')
const parser = require('xml2json')
const difference = require('lodash.difference')
const js2xmlparser = require('js2xmlparser')

const { DEEPL_API_KEY } = process.env

/**
 * =========
 * CONSTANTS
 * =========
 */
const TRANSLATIONS_PATH = './src/locales'
const DEEPL_API_VERSION = 2
const OUTPUT_LANGS = [
  'RU',
  'ZH',
  'JA',
  // 'KO' // Korean is not available on DEEPL
]

/**
 * =======
 * RUNTIME
 * =======
 */
;(async () => {
  try {
    console.info('\n=====[TRANSLATOR]=====')
    if (!DEEPL_API_KEY) {
      throw new Error('DEEPL_API_KEY env variable is not provided')
    }
    await translateFiles()
    console.info('======================\n')

    // process.exit(0)
  } catch (e) {
    console.error('ERROR:', e)
    console.info('======================\n')
    process.exit(1)
  }
})()

/**
 * =========
 * FUNCTIONS
 * =========
 */
/**
 * Call DL api
 * @param {String} xml
 * @param {String} source language
 * @param {String} target language
 * @return {String} translated text
 */
function translateXml(xml, source_lang, target_lang) {
  const params = {
    source_lang,
    tag_handling: 'xml',
    outline_detection: 0,
    target_lang,
    auth_key: DEEPL_API_KEY,
    preserve_formatting: true,
    text: xml,
  }

  //build request params
  const url = `https://api.deepl.com/v${DEEPL_API_VERSION}/translate`

  return axios.post(url, qs.stringify(params), {
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  })
}

//
// generate object comparing en.json and backup.json
//

async function compareWithBackup(mainInput, backupInput) {
  const mainKeys = Object.keys(mainInput)
  const backupKeys = Object.keys(backupInput)
  const mainValues = Object.values(mainInput)
  const backupValues = Object.values(backupInput)

  const arrValues = difference(mainValues, backupValues) // get values that were changed in en.json

  const arrKeys = difference(mainKeys, backupKeys) // get new keys from en.json

  const filteredObj = {}

  if (arrKeys.length !== 0) {
    console.log(`${arrKeys.length} new keys need to translate`)
    arrKeys.forEach((key) => {
      filteredObj[key] = mainInput[key]
    })
  }

  if (arrValues.length !== 0) {
    console.log(`${arrValues.length} changed values need to translate`)
    arrValues.forEach((value) => {
      const keyForValue = mainKeys.find((key) => mainInput[key] === value)
      filteredObj[keyForValue] = mainInput[keyForValue]
    })
  }

  return filteredObj
}

/**
 * generate translation files
 * @return {Promise<void>}
 */

function removeUnusableKeys(mainInput, currentContent, lang) {
  const mainKeys = Object.keys(mainInput)
  const needToRemove = difference(Object.keys(currentContent), mainKeys)

  const filteredRemovedKeys = {}
  if (needToRemove.length > 0) {
    console.log(`${needToRemove.length} keys need to remove from ${lang} file`)
  }

  mainKeys.forEach((key) => {
    filteredRemovedKeys[key] = currentContent[key]
  })

  return filteredRemovedKeys
}

async function getTranslatedData(obj, lang) {
  console.log(`Translating to ${lang}...`)
  //generate XML to traslate at DL
  const input_xml = js2xmlparser.parse('root', obj, {
    declaration: { include: false },
  })

  const res = await translateXml(input_xml, 'en', lang)
  const res_xml = res.data.translations[0].text

  // convert xml back to json
  let data = parser.toJson(res_xml)
  data = JSON.parse(data).root

  return data
}

async function saveToFile(obj, lang, mainInput, currentContent) {
  if (Object.keys(obj).length === 0) {
    return console.log(`Nothing to update for ${lang.toLowerCase()}.json`)
  }
  const data = await getTranslatedData(obj, lang)

  const filteredObj = await removeUnusableKeys(mainInput, currentContent, lang)
  const newObjKeys = difference(
    Object.keys(currentContent),
    Object.keys(filteredObj)
  )

  const mergedObj = { ...filteredObj, ...data }

  if (newObjKeys.length > 0 || Object.keys(obj).length > 0) {
    console.log(`Saving data to ${lang.toLowerCase()}.json`)
    await util.promisify(fs.writeFile)(
      `${TRANSLATIONS_PATH}/${lang.toLowerCase()}.json`,
      JSON.stringify(mergedObj, null, 2)
    )
  } else {
    console.log(`Nothing to update for ${lang.toLowerCase()}.json`)
  }
}

async function translateFiles() {
  const mainInputPath = `${TRANSLATIONS_PATH}/en.json`
  const mainInputJson = require(mainInputPath)
  const backupPath = `${TRANSLATIONS_PATH}/backup.json`
  const backupJson = require(backupPath)

  if (fs.existsSync(backupPath)) {
    const compareObj = await compareWithBackup(mainInputJson, backupJson)

    if (Object.keys(compareObj).length === 0) {
      console.log('Nothing new to translate')
    }

    //for each output language - generate translation files
    for (const lang of OUTPUT_LANGS) {
      const currentContent = require(`${TRANSLATIONS_PATH}/${lang.toLowerCase()}.json`)
      await saveToFile(compareObj, lang, mainInputJson, currentContent)
    }
  } else {
    for (const lang of OUTPUT_LANGS) {
      const currentContent = require(`${TRANSLATIONS_PATH}/${lang.toLowerCase()}.json`)
      await saveToFile(mainInputJson, lang, mainInputJson, currentContent)
    }
  }
  // Create backup file
  await util.promisify(fs.writeFile)(
    backupPath,
    JSON.stringify(mainInputJson, null, 2)
  )
}
