const fs = require('fs/promises')
const path = require('path')
const { nanoid } = require('nanoid')

const readData = async () => {
  const data = await fs.readFile(path.join(__dirname, '/contacts.json'), 'utf8')
  return JSON.parse(data)
}

const listContacts = async () => {
  try {
    return await readData()
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async contactId => {
  try {
    const data = await readData()
    const [result] = data.filter(contact => contact.id === contactId)
    return result
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async contactId => {
  try {
    const data = await readData()
    const index = data.findIndex(contact => contact.id === contactId)
    if (index !== -1) {
      const result = data.splice(index, 1)
      await fs.writeFile(path.join(__dirname, '/contacts.json'), JSON.stringify(data))
      return result
    }
    return null
  } catch (error) {
    console.log(error)
  }
}

const addContact = async body => {
  try {
    const id = nanoid()
    const record = { id, ...body }
    const data = await readData()
    data.push(record)
    fs.writeFile(path.join(__dirname, '/contacts.json'), JSON.stringify(data))
    return record
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
