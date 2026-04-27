/**
 * Contact Form Module
 * Handles form submission and validation
 */

document.addEventListener('DOMContentLoaded', function() {
  initializeForm();
});

/**
 * Initialize form event listeners
 */
function initializeForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
}

/**
 * Handle form submission
 * @param {Event} event - Form submission event
 */
function handleFormSubmit(event) {
  event.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validate form
  if (!validateForm(name, email, message)) {
    showNotification('Please fill in all fields correctly.', 'error');
    return;
  }

  // Prepare form data
  const formData = {
    name: name,
    email: email,
    message: message,
    timestamp: new Date().toISOString()
  };

  // Submit form (replace with actual backend endpoint if needed)
  submitFormData(formData);
}

/**
 * Validate form inputs
 * @param {string} name - Sender's name
 * @param {string} email - Sender's email
 * @param {string} message - Message content
 * @returns {boolean} - Form validity
 */
function validateForm(name, email, message) {
  // Check for empty fields
  if (!name || !email || !message) {
    return false;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  // Check minimum message length
  if (message.length < 10) {
    return false;
  }

  return true;
}

/**
 * Submit form data
 * @param {Object} formData - Form data object
 */
function submitFormData(formData) {
  // Option 1: Save to localStorage (for demonstration)
  saveFormLocally(formData);
  
  // Option 2: Send to backend (uncomment and configure as needed)
  // sendFormToBackend(formData);

  // Show success message
  showNotification(
    'Thank you for your message! I will get back to you soon.',
    'success'
  );

  // Reset form
  resetForm();
}

/**
 * Save form data to localStorage
 * @param {Object} formData - Form data object
 */
function saveFormLocally(formData) {
  try {
    // Get existing messages
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    
    // Add new message
    messages.push(formData);
    
    // Save updated messages
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    console.log('Message saved locally:', formData);
  } catch (error) {
    console.error('Error saving message to localStorage:', error);
  }
}

/**
 * Send form data to backend (template)
 * @param {Object} formData - Form data object
 * 
 * Configuration:
 * 1. Replace 'YOUR_BACKEND_URL' with your actual endpoint
 * 2. Update content-type header if needed
 * 3. Uncomment the fetch call in submitFormData()
 */
function sendFormToBackend(formData) {
  const backendUrl = 'YOUR_BACKEND_URL'; // Replace with your backend endpoint

  fetch(backendUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Form submitted successfully:', data);
  })
  .catch(error => {
    console.error('Error submitting form:', error);
    showNotification('Error sending message. Please try again.', 'error');
  });
}

/**
 * Reset form fields
 */
function resetForm() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.reset();
  }
}

/**
 * Show notification message
 * @param {string} message - Notification message
 * @param {string} type - Notification type ('success' or 'error')
 * @param {number} duration - Display duration in milliseconds (default: 4000)
 */
function showNotification(message, type = 'info', duration = 4000) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 8px;
    font-weight: 600;
    z-index: 1000;
    animation: slideIn 0.3s ease;
    max-width: 400px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `;

  // Set background color based on type
  if (type === 'success') {
    notification.style.background = 'linear-gradient(135deg, #00e6d0 0%, #00b8a9 100%)';
    notification.style.color = '#1a1a2e';
  } else if (type === 'error') {
    notification.style.background = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
    notification.style.color = '#ffffff';
  } else {
    notification.style.background = 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)';
    notification.style.color = '#ffffff';
  }

  // Add to page
  document.body.appendChild(notification);

  // Remove after duration
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, duration);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
