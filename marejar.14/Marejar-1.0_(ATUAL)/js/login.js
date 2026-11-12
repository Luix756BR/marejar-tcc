const loginForm = document.getElementById('loginForm');
const loginMessage = document.createElement('p');

loginMessage.id = 'loginMessage';
loginForm.appendChild(loginMessage);

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const cpf = document.getElementById('login-cpf').value.trim();
    const password = document.getElementById('login-password').value;

    // Se na sua tela de login houver um select de role, use-o. Se não, mantém 'usuario'
    const roleSelect = document.getElementById('login-role');
    const role = roleSelect ? roleSelect.value : 'usuario';

    loginMessage.textContent = 'Entrando...';

    try {
        const response = await fetch(
            'http://localhost:3001/api/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cpf,
                    password,
                    role
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            loginMessage.textContent =
                data.message || 'Erro ao realizar login.';
            return;
        }

        // Salva os dados de autenticação
        localStorage.setItem('marejar_token', data.token);
        localStorage.setItem(
            'marejar_user',
            JSON.stringify(data.user)
        );

        loginMessage.textContent = 'Login realizado com sucesso! Redirecionando...';

        console.log('Usuário conectado:', data.user);

        // Redireciona de volta para o site principal após 1 segundo
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);

    } catch (error) {
        console.error(error);

        loginMessage.textContent =
            'Não foi possível conectar ao servidor.';
    }
});