document.addEventListener('DOMContentLoaded', () => {
    carregarDadosPerfil();
});

function carregarDadosPerfil() {
    // Puxa os dados salvos no localStorage no momento do login
    const userData = localStorage.getItem('marejar_user');

    if (!userData) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'painel_acesso.html';
        return;
    }

    try {
        const user = JSON.parse(userData);

        // Preenche os elementos da tela com os dados reais
        const primeiraLetra = user.name ? user.name.charAt(0).toUpperCase() : 'U';
        
        document.getElementById('userAvatar').textContent = primeiraLetra;
        document.getElementById('userName').textContent = user.name || 'Usuário';
        document.getElementById('userEmail').textContent = user.email || 'Não informado';
        
        // Formata a role/tipo de conta de forma amigável
        let roleTexto = 'Turista / Visitante';
        if (user.role === 'guia') {
            roleTexto = 'Guia Credenciado (Cadastur)';
        }
        document.getElementById('userRole').textContent = roleTexto;

        document.getElementById('userCpf').textContent = user.cpf || 'Não informado';
        document.getElementById('userPhone').textContent = user.phone || 'Não informado';
        document.getElementById('userBirth').textContent = user.birthDate || 'Não informado';
        document.getElementById('userCity').textContent = user.city || 'Não informada';

    } catch (error) {
        console.error('Erro ao processar os dados do usuário:', error);
    }
}

function fazerLogout() {
    localStorage.removeItem('marejar_token');
    localStorage.removeItem('marejar_user');
    window.location.href = 'index.html';
}