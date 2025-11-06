/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
  contactName = document.getElementById('contact-name'),
  contactEmail = document.getElementById('contact-email'),
  contactSubject = document.getElementById('contact-subject'),
  contactMessage = document.getElementById('contact-message'),
  message = document.getElementById('message');


function validateForm() {
  let isValid = true;
  const inputs = [contactName, contactEmail, contactSubject, contactMessage];


  inputs.forEach(input => {
    input.style.borderColor = '';
  });


  if (!contactName.value.trim()) {
    contactName.style.borderColor = 'hsl(2, 76%, 53%)';
    isValid = false;
  }

  if (!contactEmail.value.trim()) {
    contactEmail.style.borderColor = 'hsl(2, 76%, 53%)';
    isValid = false;
  } else if (!isValidEmail(contactEmail.value)) {
    contactEmail.style.borderColor = 'hsl(2, 76%, 53%)';
    isValid = false;
  }

  if (!contactSubject.value.trim()) {
    contactSubject.style.borderColor = 'hsl(2, 76%, 53%)';
    isValid = false;
  }

  if (!contactMessage.value.trim()) {
    contactMessage.style.borderColor = 'hsl(2, 76%, 53%)';
    isValid = false;
  }

  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showMessage(text, isSuccess) {
  message.textContent = text;
  message.className = 'contact-message';
  message.classList.add(isSuccess ? 'color-first' : 'color-red');
  message.style.display = 'block';

  setTimeout(() => {
    message.textContent = '';
    message.style.display = 'none';
  }, isSuccess ? 3000 : 5000);
}

const sendEmail = (e) => {
  e.preventDefault();

  if (!validateForm()) {
    showMessage('Please fill in all required fields correctly.', false);
    return;
  }

  const submitButton = contactForm.querySelector('.contact-button');
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> Sending...';
  submitButton.disabled = true;

  emailjs
    .sendForm(
      'service_2fsvxna',       
      'template_8lgejw8',      
      contactForm,      
      '0MjFbxnSpVmbIysbU'     
    )
    .then(
      () => {
        showMessage('Message sent successfully! ✔', true);
        contactForm.reset();
        
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      },
      (error) => {
        console.error('EmailJS Error:', error);
        showMessage('Oops! Something went wrong. Please try again.', false);
        
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }
    );
};

contactName.addEventListener('input', () => {
  if (contactName.value.trim()) {
    contactName.style.borderColor = '';
  }
});

contactEmail.addEventListener('input', () => {
  if (contactEmail.value.trim() && isValidEmail(contactEmail.value)) {
    contactEmail.style.borderColor = '';
  }
});

contactSubject.addEventListener('input', () => {
  if (contactSubject.value.trim()) {
    contactSubject.style.borderColor = '';
  }
});

contactMessage.addEventListener('input', () => {
  if (contactMessage.value.trim()) {
    contactMessage.style.borderColor = '';
  }
});

contactMessage.addEventListener('input', () => {
  const maxLength = 1000;
  const currentLength = contactMessage.value.length;
  
  if (!message.querySelector('.char-counter')) {
    const counter = document.createElement('span');
    counter.className = 'char-counter';
    counter.style.cssText = `
      font-size: 0.75rem;
      color: var(--text-color);
      position: absolute;
      right: 1rem;
      bottom: 0.5rem;
    `;
    message.parentNode.appendChild(counter);
  }
  
  const counter = message.parentNode.querySelector('.char-counter');
  counter.textContent = `${currentLength}/${maxLength}`;
  
  if (currentLength > maxLength * 0.8) {
    counter.style.color = 'hsl(2, 76%, 53%)';
  } else {
    counter.style.color = 'var(--text-color)';
  }
});

contactMessage.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
});


contactForm.addEventListener('submit', sendEmail);

/*=============== ANIMATE SPIN ===============*/
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }
`;
document.head.appendChild(style);

/*=============== CONTACT FORM ENHANCEMENTS ====================*/

const formInputs = contactForm.querySelectorAll('.contact-form-input');
formInputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.classList.remove('focused');
  });
});

const focusStyle = document.createElement('style');
focusStyle.textContent = `
  .contact-form-div.focused .contact-form-label {
    color: var(--first-color);
  }
  .contact-form-div.focused .contact-form-input {
    border-color: var(--first-color);
    box-shadow: 0 0 0 2px rgba(var(--hue), 76%, 53%, 0.1);
  }
`;
document.head.appendChild(focusStyle);

/*=============== SOCIAL MEDIA LINKS ENHANCEMENT ====================*/
document.addEventListener('DOMContentLoaded', () => {
  const socialLinks = document.querySelectorAll('.footer-social-link');
  
  socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      
      link.style.transform = 'scale(0.9)';
      setTimeout(() => {
        link.style.transform = '';
      }, 150);
    });
  });
});

/*=============== COPY EMAIL TO CLIPBOARD ====================*/
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showMessage('Email copied to clipboard!', true);
  }).catch(() => {
    showMessage('Failed to copy email', false);
  });
}

const emailElement = document.querySelector('.contact-data');
if (emailElement && emailElement.textContent.includes('@')) {
  emailElement.style.cursor = 'pointer';
  emailElement.title = 'Click to copy email';
  emailElement.addEventListener('click', () => {
    copyToClipboard(emailElement.textContent.trim());
  });
}