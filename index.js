fetch('https://sendemails-two.vercel.app/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: 'cleilsonalves1011@gmail.com',
      subject: 'Novo email',
      text: 'Segue anexo o orçamento solicitado...'
    })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));