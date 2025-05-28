// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.innerHTML = mainNav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Initialize Lightbox
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'albumLabel': 'Imagem %1 de %2'
        });
    }

    // Profile card hover effect
    document.querySelectorAll('.profile-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.profile-image img').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.profile-image img').style.transform = 'scale(1)';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize tooltips
    if (typeof tippy !== 'undefined') {
        tippy('[data-tippy-content]', {
            arrow: true,
            animation: 'scale',
            duration: 200,
            theme: 'light'
        });
    }
});

// Dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'btn btn-icon dark-mode-toggle';
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.title = 'Alternar modo escuro';

document.querySelector('.header .container').appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    
    this.innerHTML = document.body.classList.contains('dark-mode') ? 
        '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Check for dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Add dark mode styles
const darkModeStyles = `
    body.dark-mode {
        background-color: #121212;
        color: #f0f0f0;
    }
    
    body.dark-mode .profile-card,
    body.dark-mode .step,
    body.dark-mode .tip-card {
        background-color: #1e1e1e;
        color: #f0f0f0;
    }
    
    body.dark-mode .form-control {
        background-color: #2d2d2d;
        border-color: #444;
        color: #f0f0f0;
    }
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = darkModeStyles;
document.head.appendChild(styleElement);

// Form validation
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        this.querySelectorAll('[required]').forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'var(--danger)';
                isValid = false;
                
                // Add error message
                if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'Este campo é obrigatório';
                    errorMsg.style.color = 'var(--danger)';
                    errorMsg.style.fontSize = '0.875rem';
                    errorMsg.style.marginTop = '0.25rem';
                    input.insertAdjacentElement('afterend', errorMsg);
                }
            } else {
                input.style.borderColor = '';
                if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                    input.nextElementSibling.remove();
                }
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            
            // Scroll to first error
            const firstError = this.querySelector('[required]:invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
});

// Load more profiles
const loadMoreBtn = document.querySelector('.load-more');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        this.disabled = true;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
        
        // Simulate API call
        setTimeout(() => {
            const profileGrid = document.querySelector('.profile-grid');
            
            // Add new profiles
            for (let i = 0; i < 4; i++) {
                const profileCard = document.createElement('div');
                profileCard.className = 'profile-card';
                profileCard.innerHTML = `
                    <div class="profile-image">
                        <img src="https://via.placeholder.com/300x400" alt="Acompanhante">
                        <div class="profile-overlay">
                            <a href="perfil.html" class="btn btn-primary">Ver Perfil</a>
                        </div>
                    </div>
                    <div class="profile-info">
                        <h3>Novo Perfil</h3>
                        <div class="profile-meta">
                            <span><i class="fas fa-map-marker-alt"></i> Cidade</span>
                            <span><i class="fas fa-star"></i> 5.0 (10)</span>
                        </div>
                        <div class="profile-price">R$ 400/h</div>
                    </div>
                `;
                profileGrid.appendChild(profileCard);
            }
            
            this.disabled = false;
            this.textContent = 'Carregar Mais';
        }, 1000);
    });
}