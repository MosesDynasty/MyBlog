document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    fetch('sendWhatsApp.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              alert('Message sent successfully!');
          } else {
              alert('Error sending message.');
          }
      }).catch(error => {
          console.error('Error:', error);
          alert('Error sending message.');
      });
});

