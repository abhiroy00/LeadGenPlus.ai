// Validation utility functions

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check for Indian phone numbers
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    return true;
  }
  
  if (cleaned.length === 10) {
    return true;
  }
  
  return false;
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim().length > 0;
};

export const validateMinLength = (value, minLength) => {
  return value && value.toString().length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return !value || value.toString().length <= maxLength;
};

export const validateNumber = (value) => {
  return !isNaN(value) && isFinite(value);
};

export const validatePositiveNumber = (value) => {
  return validateNumber(value) && parseFloat(value) > 0;
};

export const validateRange = (value, min, max) => {
  const num = parseFloat(value);
  return validateNumber(num) && num >= min && num <= max;
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

export const validateName = (name) => {
  // Only letters, spaces, hyphens, and apostrophes
  const re = /^[a-zA-Z\s\-']+$/;
  return re.test(name) && name.trim().length >= 2;
};

export const validateCompanyName = (name) => {
  // Letters, numbers, spaces, and common business characters
  const re = /^[a-zA-Z0-9\s\-&.,()]+$/;
  return re.test(name) && name.trim().length >= 2;
};

export const validateLeadScore = (score) => {
  return validateRange(score, 0, 100);
};

export const validateCampaignName = (name) => {
  return validateRequired(name) && validateMaxLength(name, 100);
};

export const validateMessageText = (text) => {
  return validateRequired(text) && validateMaxLength(text, 4096);
};

// Form validation helper
export const createValidator = (rules) => {
  return (data) => {
    const errors = {};
    
    for (const [field, fieldRules] of Object.entries(rules)) {
      const value = data[field];
      
      for (const rule of fieldRules) {
        if (rule.validator && !rule.validator(value)) {
          errors[field] = rule.message;
          break; // Stop at first error for this field
        }
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };
};

// Common validation rule sets
export const leadValidationRules = {
  name: [
    { validator: validateRequired, message: 'Name is required' },
    { validator: validateName, message: 'Please enter a valid name' },
  ],
  phone: [
    { validator: validateRequired, message: 'Phone is required' },
    { validator: validatePhone, message: 'Please enter a valid phone number' },
  ],
  email: [
    { validator: (value) => !value || validateEmail(value), message: 'Please enter a valid email' },
  ],
  company: [
    { validator: validateRequired, message: 'Company is required' },
    { validator: validateCompanyName, message: 'Please enter a valid company name' },
  ],
  score: [
    { validator: validateLeadScore, message: 'Score must be between 0 and 100' },
  ],
};

export const campaignValidationRules = {
  name: [
    { validator: validateRequired, message: 'Campaign name is required' },
    { validator: validateCampaignName, message: 'Please enter a valid campaign name' },
  ],
  description: [
    { validator: validateRequired, message: 'Description is required' },
    { validator: (value) => validateMaxLength(value, 500), message: 'Description is too long' },
  ],
};

export const userValidationRules = {
  name: [
    { validator: validateRequired, message: 'Name is required' },
    { validator: validateName, message: 'Please enter a valid name' },
  ],
  email: [
    { validator: validateRequired, message: 'Email is required' },
    { validator: validateEmail, message: 'Please enter a valid email' },
  ],
  password: [
    { validator: validateRequired, message: 'Password is required' },
    { validator: validatePassword, message: 'Password must be at least 8 characters with uppercase, lowercase, and number' },
  ],
};