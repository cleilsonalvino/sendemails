fetch('http://localhost:3000/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: 'cleiussonalves1011@gmail.com',
      subject: 'Novo Orçamento',
      text: 'Segue anexo o orçamento solicitado...'
    })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));