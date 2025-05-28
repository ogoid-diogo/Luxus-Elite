document.addEventListener('DOMContentLoaded', function() {
    // Login form
    const loginForm = document.querySelector('.auth-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (!email || !password) {
                showAuthError('Por favor, preencha todos os campos.');
                return;
            }
            
            // Simulate login
            showAuthLoading();
            
            setTimeout(() => {
                // Check credentials (simulated)
                if (email === 'admin@luxuselite.com' && password === 'senha123') {
                    window.location.href = 'area-membro.html';
                } else {
                    showAuthError('E-mail ou senha incorretos.');
                }
            }, 1500);
        });
    }

    // Social login buttons
    document.querySelectorAll('.social-btn').forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.querySelector('i').className.includes('google') ? 'Google' : 'Facebook';
            showAuthLoading(`Entrando com ${provider}...`);
            
            // Simulate social login
            setTimeout(() => {
                showAuthError(`Falha ao conectar com ${provider}. Tente novamente.`);
            }, 2000);
        });
    });

    // Forgot password link
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            showPasswordRecoveryModal();
        });
    }

    function showAuthError(message) {
        const existingError = document.querySelector('.auth-error');
        if (existingError) {
            existingError.remove();
        }
        
        const errorElement = document.createElement('div');
        errorElement.className = 'auth-error';
        errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        const form = document.querySelector('.auth-form');
        form.insertBefore(errorElement, form.firstChild);
        
        // Remove loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Entrar';
    }

    function showAuthLoading(message = 'Autenticando...') {
        const submitBtn = document.querySelector('.auth-form button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${message}`;
        
        // Remove any existing error
        const existingError = document.querySelector('.auth-error');
        if (existingError) {
            existingError.remove();
        }
    }

    function showPasswordRecoveryModal() {
        const modal = document.createElement('div');
        modal.className = 'auth-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Recuperar Senha</h3>
                <p>Digite seu e-mail para receber um link de recuperação</p>
                <input type="email" placeholder="Seu e-mail cadastrado">
                <div class="modal-actions">
                    <button class="btn btn-outline cancel-btn">Cancelar</button>
                    <button class="btn btn-primary recover-btn">Enviar Link</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Cancel button
        modal.querySelector('.cancel-btn').addEventListener('click', function() {
            modal.remove();
        });
        
        // Recover button
        modal.querySelector('.recover-btn').addEventListener('click', function() {
            const email = modal.querySelector('input').value;
            
            if (!email) {
                alert('Por favor, digite seu e-mail.');
                return;
            }
            
            // Simulate recovery
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            setTimeout(() => {
                modal.remove();
                showAuthError(`Um link de recuperação foi enviado para ${email}`);
            }, 1500);
        });
    }
});