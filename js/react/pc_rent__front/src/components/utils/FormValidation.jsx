const validatePhone = (phoneNumber) => {
    // Check if the phone number is not empty
    if (phoneNumber.trim() !== '') {
        // Perform regex validation only if the phone number is not empty
        const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        return phoneRegex.test(phoneNumber);
    }
    return true; // Return true if the phone number is empty (optional)
};
const validateNumber = (number) => {
    // alert(number);
    // Check if the number is not empty
    if (number.trim() !== '') {
        // Perform validation logic for numbers
        // For example, you can check if it's a valid number
        return !isNaN(number);
    }
    return true; // Return true if the number is empty (optional)
};
const validateText = (text) => {
    // Check if the text is not empty
    return text.trim() !== '';
};
const validateEmail = (email) => {
    // Check if the email is not empty
    if (email.trim() !== '') {
        // Perform regex validation only if the email is not empty
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    return true; // Return true if the email is empty (optional)
};

export { validatePhone, validateNumber, validateText, validateEmail };
