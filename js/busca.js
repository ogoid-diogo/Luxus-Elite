document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterForm = document.querySelector('.search-filters');
    const applyFiltersBtn = filterForm.querySelector('button');
    
    applyFiltersBtn.addEventListener('click', function(e) {
        e.preventDefault();
        applyFilters();
    });

    // Range sliders
    const priceSlider = document.querySelector('.price-range .slider');
    const ageSlider = document.querySelector('.age-range .slider');
    
    priceSlider.addEventListener('input', function() {
        updatePriceRange(this.value);
    });
    
    ageSlider.addEventListener('input', function() {
        updateAgeRange(this.value);
    });

    // Sort functionality
    const sortSelect = document.getElementById('sortBy');
    sortSelect.addEventListener('change', function() {
        sortProfiles(this.value);
    });

    // Pagination
    document.querySelectorAll('.pagination .page-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (!this.classList.contains('active')) {
                document.querySelector('.pagination .page-link.active').classList.remove('active');
                this.classList.add('active');
                
                // Simulate page load
                const profileGrid = document.querySelector('.profile-grid');
                profileGrid.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i></div>';
                
                setTimeout(() => {
                    loadProfiles();
                }, 800);
            }
        });
    });

    // Initial load
    loadProfiles();

    function loadProfiles() {
        const profileGrid = document.querySelector('.profile-grid');
        profileGrid.innerHTML = '';
        
        // Simulate API call
        setTimeout(() => {
            for (let i = 0; i < 12; i++) {
                const profileCard = document.createElement('div');
                profileCard.className = 'profile-card';
                
                const isOnline = Math.random() > 0.3;
                const isVerified = Math.random() > 0.5;
                const price = Math.floor(Math.random() * 900) + 100;
                const rating = (Math.random() * 1 + 4).toFixed(1);
                const reviews = Math.floor(Math.random() * 50);
                
                profileCard.innerHTML = `
                    ${isOnline ? '<div class="profile-badge online">Online</div>' : ''}
                    ${isVerified ? '<div class="profile-badge verified"><i class="fas fa-check-circle"></i></div>' : ''}
                    <div class="profile-image">
                        <img src="https://via.placeholder.com/300x400?text=Profile+${i+1}" alt="Acompanhante">
                        <div class="profile-overlay">
                            <a href="perfil.html" class="btn btn-primary">Ver Perfil</a>
                        </div>
                    </div>
                    <div class="profile-info">
                        <h3>${getRandomName()}</h3>
                        <div class="profile-meta">
                            <span><i class="fas fa-map-marker-alt"></i> ${getRandomCity()}</span>
                            <span><i class="fas fa-star"></i> ${rating} (${reviews})</span>
                        </div>
                        <div class="profile-price">R$ ${price}/h</div>
                    </div>
                `;
                
                profileGrid.appendChild(profileCard);
            }
        }, 500);
    }

    function applyFilters() {
        const city = document.getElementById('searchCity').value;
        const state = document.getElementById('searchState').value;
        const price = priceSlider.value;
        const age = ageSlider.value;
        const services = [];
        const status = [];
        
        document.querySelectorAll('.checkbox-group input:checked').forEach(checkbox => {
            if (checkbox.id.startsWith('service')) {
                services.push(checkbox.nextElementSibling.textContent);
            } else if (checkbox.id.startsWith('status')) {
                status.push(checkbox.nextElementSibling.textContent);
            }
        });
        
        // Show loading
        const profileGrid = document.querySelector('.profile-grid');
        profileGrid.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i></div>';
        
        // Simulate API call with filters
        setTimeout(() => {
            loadProfiles();
            showNotification('Filtros aplicados com sucesso!', 'success');
        }, 800);
    }

    function updatePriceRange(value) {
        const priceValues = document.querySelector('.price-range .range-values');
        priceValues.firstElementChild.textContent = `R$ ${value}`;
    }

    function updateAgeRange(value) {
        const ageValues = document.querySelector('.age-range .range-values');
        ageValues.firstElementChild.textContent = `${value} anos`;
    }

    function sortProfiles(criteria) {
        const profileGrid = document.querySelector('.profile-grid');
        const profiles = Array.from(profileGrid.children);
        
        profiles.sort((a, b) => {
            const aPrice = parseInt(a.querySelector('.profile-price').textContent.replace(/\D/g, ''));
            const bPrice = parseInt(b.querySelector('.profile-price').textContent.replace(/\D/g, ''));
            const aRating = parseFloat(a.querySelector('.profile-meta span:nth-child(2)').textContent.split(' ')[0]);
            const bRating = parseFloat(b.querySelector('.profile-meta span:nth-child(2)').textContent.split(' ')[0]);
            
            switch(criteria) {
                case 'price_asc':
                    return aPrice - bPrice;
                case 'price_desc':
                    return bPrice - aPrice;
                case 'rating':
                    return bRating - aRating;
                default:
                    return 0;
            }
        });
        
        profileGrid.innerHTML = '';
        profiles.forEach(profile => profileGrid.appendChild(profile));
    }

    // Helper functions
    function getRandomName() {
        const names = ['Sophia', 'Isabella', 'Valentina', 'Alice', 'Laura', 'Manuela', 'Júlia', 'Helena', 'Luiza', 'Lara'];
        return names[Math.floor(Math.random() * names.length)];
    }

    function getRandomCity() {
        const cities = ['Rio de Janeiro', 'São Paulo', 'Belo Horizonte', 'Brasília', 'Salvador', 'Curitiba', 'Fortaleza', 'Recife', 'Porto Alegre'];
        return cities[Math.floor(Math.random() * cities.length)];
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `search-notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});