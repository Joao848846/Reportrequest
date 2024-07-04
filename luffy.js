// URL base da API
const baseUrl = 'https://whatsapp.smarters.io/api/v1/billing/conversations';

// Função para buscar os dados da API com filtro por ano e mês
function fetchDataByYearMonth(year, month) {
    const filteredUrl = `${baseUrl}?year=${year}&month=${month}`;
    return fetch(filteredUrl, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Dados recebidos:', data);
        return data;
    })
    .catch(error => {
        console.error('Erro ao recuperar os dados:', error);
        throw error;
    });
}

// Função para lidar com o evento de filtragem por ano e mês
function filterByYearMonth() {
    const year = document.getElementById('yearInput').value;
    const month = document.getElementById('monthInput').value;
    token = document.getElementById('tokenInput').value;

    console.log('Ano selecionado:', year);
    console.log('Mês selecionado:', month);

    if (year && month) {
        // Buscar os dados da API com o filtro por ano e mês
        fetchDataByYearMonth(year, month)
            .then(data => {
                console.log('Dados recebidos:', data); // Log dos dados recebidos para depuração
                // Atualizar a exibição com os dados filtrados
                updateView(data);
            })
            .catch(error => {
                // Lidar com erros
                console.error('Erro ao filtrar os dados:', error);
                // Limpar a exibição em caso de erro
                clearView();
            });
    } else {
        // Se o ano ou mês não forem válidos, exibir uma mensagem de erro
        console.error('Ano ou mês inválidos');
    }
}

// Função para atualizar a visualização com os dados recebidos
function updateView(data) {
    // Preencher a última atualização
    // usar quando tiver motivos document.getElementById('lastUpdate').innerText = 'Última Atualização: ' + data.data.lastUpdate;

    // Preencher o total de conversas
    const totalContainer = document.getElementById('totalConversations');
    totalContainer.innerText = 'Total de HSMs utilizadas no mês:';

    // Criar uma lista para exibir os detalhes do total
    const totalList = document.createElement('ul');
    totalList.classList.add('listStyle');

    // Obter apenas os dados do campo "total"
    const totalData = data.data.conversationsSummary.total;

    // Iterar sobre os dados do campo "total" e preencher a lista
    for (const key in totalData) {
        const listItem = document.createElement('li');
        listItem.innerText = `${key}: ${totalData[key]}`;
        totalList.appendChild(listItem);
    }

    // Anexar a lista ao contêiner de total de conversas
    totalContainer.appendChild(totalList);

    // Preencher o status da mensagem
    // Usar em outro momento document.getElementById('statusMessage').innerText = 'Status da Mensagem: ' + data.status;
}

// Função para limpar a visualização em caso de erro
function clearView() {
    document.getElementById('lastUpdate').innerText = '';
    document.getElementById('conversationsSummary').innerText = '';
    document.getElementById('totalConversations').innerText = '';
}

// Função para gerar o PDF
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const lastUpdate = document.getElementById('lastUpdate').innerText;
    const conversationsSummary = document.getElementById('conversationsSummary').innerText;
    const totalConversations = document.getElementById('totalConversations').innerText;

    doc.text("Relatório Smarters", 10, 10);
    doc.text(lastUpdate, 10, 20);
    doc.text(conversationsSummary, 10, 30);
    doc.text(totalConversations, 10, 40);

    doc.save("relatorio_smarters.pdf");
}
