import express from 'express'
import history from 'connect-history-api-fallback'
import morgan from 'morgan'

import firebase from 'firebase-admin'

import dotenv from 'dotenv'

// Init firebase app and Cloud firestore instance
import serviceAccount from './serviceAccount.json'
dotenv.config()
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
})
const db = firebase.firestore()

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(history())
app.use(express.static('dist'))

app.post('/create', async (req, res) => {
  const doc = await db.collection('contact').add(req.body.doc)
  res.send({
    status: doc.id ? 'success' : 'error',
  })
})

app.post('/read', async (req, res) => {
  let contactsArr = {}
  const snapshot = await db.collection('contact').get()
  snapshot.forEach(doc => contactsArr[doc.id] = doc.data())
  res.send({
    status: 'success',
    contactsArr: contactsArr,
  })
})

app.post('/update', async (req, res) => {
  const docRef = db.collection('contact').doc(req.body.docId)
  await docRef.update(req.body.newValue)
  res.end()
})

app.post('/delete', async (req, res) => {
  const docRef = db.collection('contact').doc(req.body.docId)
  await docRef.delete()
  res.end()
})

app.post('/delete_field', async (req, res) => {
  const docRef = db.collection('contact').doc(req.body.docId)
  await docRef.update({ [req.body.field]: firebase.firestore.FieldValue.delete() })
  res.end()
})

app.use((req, res) => {
  res.status(404).end()
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})

module.exports = app
