document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const steps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const submitButton = document.querySelector('.submit-btn');
    let currentStep = 0;

    // Initialize form
    showStep(currentStep);

    // Next button click handler
    nextButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate current step before proceeding
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    // Previous button click handler
    prevButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            currentStep--;
            showStep(currentStep);
        });
    });

    // Photo upload functionality
    const photoUpload = document.getElementById('photoUpload');
    const photoPreview = document.getElementById('photoPreview');

    photoUpload.addEventListener('change', function() {
        photoPreview.innerHTML = '';
        
        if (this.files) {
            const files = Array.from(this.files);
            
            // Limit to 10 photos
            if (files.length > 10) {
                alert('Você pode enviar no máximo 10 fotos.');
                return;
            }
            
            files.forEach(file => {
                if (!file.type.match('image.*')) {
                    return;
                }
                
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const imgContainer = document.createElement('div');
                    imgContainer.className = 'preview-thumb';
                    
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    
                    const removeBtn = document.createElement('button');
                    removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                    removeBtn.className = 'remove-btn';
                    removeBtn.addEventListener('click', function() {
                        imgContainer.remove();
                    });
                    
                    imgContainer.appendChild(img);
                    imgContainer.appendChild(removeBtn);
                    photoPreview.appendChild(imgContainer);
                }
                
                reader.readAsDataURL(file);
            });
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulate form submission
            alert('Cadastro enviado com sucesso!');
            form.reset();
            currentStep = 0;
            showStep(currentStep);
        }
    });

    // Show current step
    function showStep(step) {
        steps.forEach((stepElement, index) => {
            stepElement.classList.toggle('active', index === step);
        });
        
        // Update button visibility
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (step === 0) {
            prevBtn.disabled = true;
            nextBtn.style.display = 'block';
            submitButton.style.display = 'none';
        } else if (step === steps.length - 1) {
            prevBtn.disabled = false;
            nextBtn.style.display = 'none';
            submitButton.style.display = 'block';
        } else {
            prevBtn.disabled = false;
            nextBtn.style.display = 'block';
            submitButton.style.display = 'none';
        }
    }

    // Validate current step
    function validateStep(step) {
        const currentStepElement = steps[step];
        const inputs = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'var(--danger)';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
            
            // Special validation for password match
            if (input.id === 'confirmPassword' && input.value !== document.getElementById('password').value) {
                input.style.borderColor = 'var(--danger)';
                isValid = false;
                alert('As senhas não coincidem!');
            }
        });
        
        return isValid;
    }

    // Validate entire form before submission
    function validateForm() {
        let isValid = true;
        
        // Check if terms are accepted
        if (!document.getElementById('acceptTerms').checked) {
            alert('Você deve aceitar os Termos de Uso e Política de Privacidade');
            isValid = false;
        }
        
        // Check if at least 3 photos were uploaded
        if (photoPreview.children.length < 3) {
            alert('Você deve enviar pelo menos 3 fotos');
            isValid = false;
        }
        
        return isValid;
    }
});