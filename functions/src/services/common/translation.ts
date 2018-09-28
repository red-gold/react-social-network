import * as functions from 'firebase-functions'
// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate')

// Creates a client
const translate = new Translate()

export const languages = functions.https.onCall(async (data, context) => {
    // Lists available translation language with their names in English (the default).
    const languages = await translate
        .getLanguages()
        console.log(languages)
    return { languages }
})