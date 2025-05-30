import { useEffect, useState } from 'react'
import ContactList from './ContactList';
import './App.css'
import ContactForm from './ContactForm';

function App() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})
  // const [contacts, setContacts] = useState([{
  //   "firstName": "Jack",
  //   "lastName": "Black",
  //   "email": "shit",
  //   id: 1
  // }])

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts")
    const data = await response.json()
    setContacts(data.contacts)
    console.log(data.contacts)
  }

  const closeModal = () => {  // to make it possible to close the form
    setIsModalOpen(false)
    setCurrentContact({})  // set it as an empty object
  }

 const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (contact) => {  // for updating
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  return (
  <>
    <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
    <button onClick={openCreateModal}>Create New Contact</button>  
    { isModalOpen && <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={closeModal}>&times;</span>
        <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
      </div>
    </div>
    }
  </>  // rendering
  )
  
}

export default App
