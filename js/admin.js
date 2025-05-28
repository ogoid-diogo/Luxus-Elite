            <div class="notification-item">
                <div class="notification-icon">
                    <i class="fas fa-comment"></i>
                </div>
                <div class="notification-content">
                    <p>Nova mensagem de suporte</p>
                    <small>5 horas atrás</small>
                </div>
            </div>
        </div>
        <div class="dropdown-footer">
            <a href="#">Ver todas as notificações</a>
        </div>
    `;
    
    notificationBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const existingDropdown = document.querySelector('.notification-dropdown');
        
        if (existingDropdown) {
            existingDropdown.remove();
        } else {
            this.parentNode.appendChild(notificationDropdown);
            
            // Mark notifications as read when dropdown is opened
            const unreadItems = notificationDropdown.querySelectorAll('.unread');
            unreadItems.forEach(item => {
                item.classList.remove('unread');
            });
            
            // Update badge count
            const badge = this.querySelector('.badge');
            if (badge) {
                badge.remove();
            }
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        const dropdown = document.querySelector('.notification-dropdown');
        if (dropdown) {
            dropdown.remove();
        }
    });

    // Mark all as read functionality
    notificationDropdown.addEventListener('click', function(e) {
        if (e.target.classList.contains('mark-all-read')) {
            const unreadItems = this.querySelectorAll('.unread');
            unreadItems.forEach(item => {
                item.classList.remove('unread');
            });
            
            const badge = notificationBtn.querySelector('.badge');
            if (badge) {
                badge.remove();
            }
        }
    });

    // Profile approval functionality
    document.querySelectorAll('.pending-actions .btn-success').forEach(button => {
        button.addEventListener('click', function() {
            const pendingItem = this.closest('.pending-item');
            pendingItem.classList.add('approved');
            
            // Simulate API call
            setTimeout(() => {
                pendingItem.remove();
                showNotification('Perfil aprovado com sucesso!', 'success');
            }, 500);
        });
    });

    // Profile rejection functionality
    document.querySelectorAll('.pending-actions .btn-danger').forEach(button => {
        button.addEventListener('click', function() {
            const pendingItem = this.closest('.pending-item');
            
            // Show rejection modal
            const modal = document.createElement('div');
            modal.className = 'admin-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <h3>Motivo da Rejeição</h3>
                    <textarea placeholder="Digite o motivo da rejeição..." rows="4"></textarea>
                    <div class="modal-actions">
                        <button class="btn btn-outline cancel-btn">Cancelar</button>
                        <button class="btn btn-danger confirm-reject">Confirmar Rejeição</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Cancel button
            modal.querySelector('.cancel-btn').addEventListener('click', function() {
                modal.remove();
            });
            
            // Confirm rejection
            modal.querySelector('.confirm-reject').addEventListener('click', function() {
                const reason = modal.querySelector('textarea').value;
                if (!reason) {
                    alert('Por favor, informe o motivo da rejeição.');
                    return;
                }
                
                pendingItem.classList.add('rejected');
                
                // Simulate API call
                setTimeout(() => {
                    pendingItem.remove();
                    modal.remove();
                    showNotification('Perfil rejeitado com sucesso!', 'success');
                }, 500);
            });
        });
    });

    // Activity item actions
    document.querySelectorAll('.activity-action .btn').forEach(button => {
        button.addEventListener('click', function() {
            const activityItem = this.closest('.activity-item');
            activityItem.classList.add('completed');
            
            // Simulate processing
            setTimeout(() => {
                activityItem.remove();
                showNotification('Ação realizada com sucesso!', 'success');
            }, 500);
        });
    });

    // Show notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `admin-notification ${type}`;
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

    // Search functionality
    const searchInput = document.querySelector('.admin-search input');
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            if (searchTerm) {
                // Simulate search
                showNotification(`Buscando por: ${searchTerm}`, 'info');
            }
        }
    });

    // Responsive sidebar
    function handleResponsive() {
        if (window.innerWidth < 992) {
            sidebar.classList.remove('active');
            menuToggle.style.display = 'block';
        } else {
            sidebar.classList.add('active');
            menuToggle.style.display = 'none';
        }
    }

    window.addEventListener('resize', handleResponsive);
    handleResponsive();
});