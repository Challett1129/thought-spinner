const validateEmail = require('../utils/email-validator');

test('validates an email', () => {
    const email = 'collin@email.com';
    const email2 = 'fhjlkghjakldhjlk'

    expect(validateEmail(email)).toEqual(true);
    expect(validateEmail(email2)).toEqual(false);
})