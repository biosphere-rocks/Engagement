// Direccion del contrato DAO en la red de prueba (ajusta esto con la dirección de tu contrato desplegado)
const contractAddress = '0x1234567890ABCDEF1234567890ABCDEF12345678';

// Abre una conexión con la red blockchain
const web3 = new Web3(window.ethereum);

// Carga el contrato DAO
const daoContract = new web3.eth.Contract(abi, contractAddress);

// Función para registrar un nuevo proyecto en el contrato DAO
async function registerProject() {
  const projectName = prompt('Ingresa el nombre del proyecto:');
  const commitment = prompt('Ingresa el compromiso del proyecto:');
  const date = Date.now();

  try {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const sender = accounts[0];

    await daoContract.methods.registerProject(projectName, commitment, date).send({ from: sender });
    alert('Proyecto registrado exitosamente!');
  } catch (error) {
    console.error(error);
    alert('Hubo un error al registrar el proyecto.');
  }
}

// Función para obtener información de un proyecto por su ID
async function getProject() {
  const projectId = prompt('Ingresa el ID del proyecto:');
  try {
    const projectInfo = await daoContract.methods.getProject(projectId).call();
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `
      <p>Nombre del proyecto: ${projectInfo[0]}</p>
      <p>Compromiso: ${projectInfo[1]}</p>
      <p>Fecha: ${new Date(parseInt(projectInfo[2]))}</p>
    `;
  } catch (error) {
    console.error(error);
    alert('Hubo un error al obtener el proyecto.');
  }
}
