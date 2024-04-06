let participantes = [
  {
    nome: "Mayk Brito",
    email: "mayk@brito.com",
    dataInscricao: new Date(2024,3,1,10,30),
    dataCheckIn: null
  },
  {
    nome: "Diego Fernandes",
    email: "diego@fernandes.com",
    dataInscricao: new Date(2023,7,2,8,0),
    dataCheckIn: new Date(2024,3,6,12,20)
  },
  {
    nome: "Carla Silva",
    email: "carla@silva.com",
    dataInscricao: new Date(2024,3,3,15,10),
    dataCheckIn: new Date(2024,3,7,9,30)
  },
  {
    nome: "Pedro Souza",
    email: "pedro@souza.com",
    dataInscricao: new Date(2024,3,4,11,20),
    dataCheckIn: new Date(2024,3,8,14,15)
  },
  {
    nome: "Ana Oliveira",
    email: "ana@oliveira.com",
    dataInscricao: new Date(2024,3,5,9,45),
    dataCheckIn: null
  },
  {
    nome: "Luisa Santos",
    email: "luisa@santos.com",
    dataInscricao: new Date(2024,3,6,14,0),
    dataCheckIn: new Date(2024,3,10,16,25)
  },
  {
    nome: "Rafaela Martins",
    email: "rafaela@martins.com",
    dataInscricao: new Date(2024,3,7,10,20),
    dataCheckIn: new Date(2024,3,11,13,10)
  },
  {
    nome: "Lucas Lima",
    email: "lucas@lima.com",
    dataInscricao: new Date(2024,3,8,12,15),
    dataCheckIn: null
  },
  {
    nome: "Mariana Castro",
    email: "mariana@castro.com",
    dataInscricao: new Date(2024,3,9,9,30),
    dataCheckIn: new Date(2024,3,13,15,15)
  },
  {
    nome: "Renato Almeida",
    email: "renato@almeida.com",
    dataInscricao: new Date(2024,3,10,13,50),
    dataCheckIn: null
  }
]

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  // condicional
  if(participante.dataCheckIn == null){
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repetição - loop
  for(let participante of participantes) {
    // faça alguma coisa
    output = output + criarNovoParticipante(participante)
  }
  // substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p) => {
      return p.email == participante.email
    }
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o form
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false){
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lita de participantes
  atualizarLista(participantes)
}