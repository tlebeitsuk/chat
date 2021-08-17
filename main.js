import { initializeApp } from 'firebase/app'
import { getFirestore, query, collection, onSnapshot, orderBy, addDoc, Timestamp } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBbDU32lktkVABGzKt6bsOJ2znXSfmbses",
    authDomain: "fir-chat-2c444.firebaseapp.com",
    projectId: "fir-chat-2c444",
    storageBucket: "fir-chat-2c444.appspot.com",
    messagingSenderId: "689081908114",
    appId: "1:689081908114:web:9c6fdef587223f8abd9f4b"
}

const firebaseApp = initializeApp(firebaseConfig)

// Auth
// ==========================
const auth = getAuth()
let userName

// Auth observer
onAuthStateChanged(auth, (user) => {
    const modal = document.querySelector('#modal')

    if (user) { // User is signed in
        userName = user.email
        modal.classList.add('invisible')
    } else { // User is logged out
        modal.classList.remove('invisible')
    }
})

// Register
const register = async e => {
    e.preventDefault()  // don't reload page on submit

    const email = 'tobiass@iterlabs.fi'
    const password = 'testing1234'

    try {
        await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
    }
}

document.querySelector('#register').addEventListener('submit', register)

// Login
const login = async e => {
    e.preventDefault()  // don't reload page on submit

    const email = 'tobias@iterlabs.fi'
    const password = 'testing1234'

    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
    }
}

document.querySelector('#login').addEventListener('submit', login)

// Database
// ==========================
const db = getFirestore()

// Subscribe to messages
const q = query(collection(db, "messages"), orderBy("timestamp"))

const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        const data = change.doc.data()
        const date = new Date(data.timestamp.toDate()).toLocaleTimeString()

        const li = document.createElement('li')

        li.innerHTML = `<p><span class="text-gray-700 text-sm font-normal">${date}</span> <span class="text-gray-100 font-bold">${data.user}:</span> ${data.msg}</p>`

        document.querySelector('#messages').appendChild(li)
    })
});

// New message
const chatForm = document.querySelector('#new-message')
const chatInput = document.querySelector('#input')

const handleSubmit = async e => {
    e.preventDefault()

    if (!chatInput.value) {
        return
    }

    await addDoc(collection(db, "messages"), {
        user: userName,
        timestamp: Timestamp.fromDate(new Date()),
        msg: chatInput.value
    });

    chatInput.value = ''
}

chatForm.addEventListener('submit', handleSubmit)