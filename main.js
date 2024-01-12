"use strict";

const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () => {
  document.getElementById("modal").classList.remove("active");
  clearFields(); // apaga os dados do input
};

document
  .getElementById("cadastrarCliente")
  .addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);

//  CRUD - Create Read Update Delete

// localStore

const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_client")) ?? []; // pega oque tiver no banco de dados do localStore e transforme em JSON, e armazena na const db_client e no final caso não existir iria dar erro, então "?? se não existir retorne um array [] vazio"const getLocalStorage = () => JSON.parse(local
const setLocalStorage = (dbClient) =>
  localStorage.setItem("db_client", JSON.stringify(dbClient)); // envia o aray para o localStore, passando "key" + "array/clients" convertido em string

// Create

const createClient = (client) => {
  const dbClient = getLocalStorage(); // verifica o localstore
  dbClient.push(client); // Acresenta o client novo no aray, o Client chegou pelo parametro da linha (cliente) e (tempClient (molde))
  setLocalStorage(dbClient); // envia para o local
};

// ReadClient

const readClient = () => getLocalStorage();

// Update table

const UpdateClient = (index, client) => {
  const dbClient = readClient();
  dbClient[index] = client;
  setLocalStorage(dbClient);
};

// update table  / leituara

const createRow = (client, index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `                   
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
        <button type="button" class="button green" id="edit-${index}">editar</button>
        <button type="button" class="button red" id="delete-${index}">excluir</button>
    </td>`;

  document.querySelector("#tableClient>tbody").appendChild(newRow);
};

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
  const dbClient = readClient();
  clearTable();
  dbClient.forEach(createRow);
};

updateTable();

// Delete

const deleteClient = (index) => {
  const dbClient = readClient();
  dbClient.splice(index, 1);
  setLocalStorage(dbClient);
};

/////////////////////////

// Interação com o layout

//validação do cadastrar client
const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};

//functon saveClient, verifica se as validações estão ok e

const saveClient = () => {
  if (isValidFields()) {
    const client = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      celular: document.getElementById("celular").value,
      cidade: document.getElementById("cidade").value,
    };
    const index = document.getElementById('nome').dataset.index 
    if (index == 'new') {
        createClient(client); // envia pro localStore
        updateTable(); // atualiza a tabela
        closeModal(); // fecha o modal
    } else {
        UpdateClient(index, client)
        updateTable()
        closeModal()
    }
  }
};

// botão salvar, no click enviar a função saveClient

document.getElementById("salvar").addEventListener("click", saveClient);

// function de limpar modal, inputs

const clearFields = () => {
  const fields = document.querySelectorAll(".modal-field");
  fields.forEach((fields) => (fields.value = ""));
};

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()
}

// função de deletar
const editDelete = (event) => {
    if(event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')
        
        if (action == 'edit') {
            editClient (index)
        } else {
            const client = readClient()[index]
            const response = confirm (`Deseja realmente Deletar o client ${client.nome}`)
            if (response) {
                deleteClient(index)
                updateTable()
            }
        }
    }
}

// eventos

document.querySelector('#tableClient>tbody')
.addEventListener('click', editDelete)



