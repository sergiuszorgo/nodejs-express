const Contact = require('../model/contactSchema')

const addContact = async (userId, body) => {
  try {
    const newContact = await Contact.create({ owner: userId, ...body })
    return newContact
  } catch (error) {
    console.log(error)
  }
}

const getAllContacts = async userId => {
  try {
    const allContacts = await Contact.find(userId).populate('owner', '_id email')
    return allContacts
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (userId, contactId) => {
  try {
    const findedContact = await Contact.findById({ _id: contactId, owner: userId }).populate(
      'owner',
      '_id email',
    )
    return findedContact
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (userId, contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: contactId, owner: userId },
      { ...body },
      { new: true },
    ).populate('owner', '_id email subscription')
    return updatedContact
  } catch (error) {
    console.log(error)
  }
}

const updateStatusContact = async (contactId, body) => {
  try {
    const updatedStatus = await Contact.findByIdAndUpdate(contactId, { ...body }, { new: true })
    return updatedStatus
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async contactId => {
  try {
    const deletedContact = await Contact.findByIdAndRemove(contactId)
    return deletedContact
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  addContact,
  getAllContacts,
  getContactById,
  updateContact,
  updateStatusContact,
  removeContact,
}
