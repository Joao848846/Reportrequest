const baseUrl = 'https://whatsapp.smarters.io/api/v1/billing/message-analytics';

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
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    });
}

function filterByYearMonth() {
    const year = document.getElementById('InputYear').value; 
    const month = document.getElementById('inputMonth').value;
    token = document.getElementById('InputToken').value;

    console.log('Ano selecionado:', year);
    console.log('Mês selecionado:', month);

    if (year && month) {
        fetchDataByYearMonth(year, month)
            .then(data => { 
                console.log('Dados recebidos:', data);
                updateView(data);
            })
            .catch(error => {
                console.log('Erro ao filtrar os dados da API:', error);
            });
    } else {
        console.log('Ano e mês são obrigatórios.');
    }
}

function updateView(data) {
    
   // document.getElementById('lastUpdate').innerText = 'Última atualização: ' + data.data.lastUpdate;

    const totalContainer = document.getElementById('TotalSend');
    totalContainer.innerText = 'Total de mensagens por dia:';

    const totalList = document.createElement('ul');
    totalList.classList.add('listStyle');

    const totalData = data.data.messagesPerDay;

    for (const item of totalData) {
        const listItem = document.createElement('li');
        listItem.innerText = `${item.date}: Enviadas: ${item.sent}, Recebidas: ${item.received}`;
        totalList.appendChild(listItem);
    }

    totalContainer.appendChild(totalList);
}
