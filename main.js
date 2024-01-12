'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
    clearFields() // apaga os dados do input
}

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

//  CRUD - Create Read Update Delete

// Template Client

const tempClient = { // molde de client, e também parametro para o createClient
    nome: "Fernando",
    email: "fernandoleonid@gmail.com",
    celular: "11123456789",
    cidade: "são roque"
}

// localStore

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []; // pega oque tiver no banco de dados do localStore e transforme em JSON, e armazena na const db_client e no final caso não existir iria dar erro, então "?? se não existir retorne um array [] vazio"const getLocalStorage = () => JSON.parse(local
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient)) // envia o aray para o localStore, passando "key" + "array/clients" convertido em string

// Create

const createClient = (client) => {
    const dbClient = getLocalStorage() // verifica o localstore
    dbClient.push (client) // Acresenta o client novo no aray, o Client chegou pelo parametro da linha (cliente) e (tempClient (molde))
    setLocalStorage(dbClient) // envia para o local
}

// ReadClient

const readClient = () => getLocalStorage()

// Update

const UpdateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

// Delete

const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

/////////////////////////


// Interação com o layout


//validação do cadastrar client
const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//functon saveClient, verifica se as validações estão ok e 

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        createClient(client) // envia pro localStore
        closeModal() // fecha o modal
    }
}

// botão salvar, no click enviar a função saveClient

document.getElementById('salvar')
.addEventListener('click' , saveClient)

// function de limpar modal, inputs

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(fields => fields.value = "")
}

updateTable()