document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const cpf = document.getElementById('cpf').value;
    const role = document.getElementById('role').value;
    const city = document.getElementById('city').value;
    const birthDate = document.getElementById('birthDate').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    // Prepara dados adicionais se for guia
    let registration = '';
    let attributes = [];
    if (role === 'guia') {
        registration = document.getElementById('registration').value;
        const attrText = document.getElementById('attributesInput').value;
        attributes = attrText ? attrText.split(',').map(item => item.trim()) : [];
    }

    try {
        const response = await fetch('http://localhost:3001/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                role, name, cpf, birthDate, email, phone, password, city, registration, attributes
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Em vez de usar alert(), redireciona imediatamente
            window.location.href = 'login.html';
            return;
        } else {
            alert(data.message || 'Erro ao realizar cadastro.');
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
        alert('Não foi possível conectar ao servidor.');
    }
});