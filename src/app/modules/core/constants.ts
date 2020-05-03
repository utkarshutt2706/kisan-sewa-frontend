export const regex = {
    address: '^[A-Za-z0-9 :&()\\-`.,/\]*$',
    numeric: '[0-9]+',
    alphaNumeric: '[a-zA-Z0-9]+',
    emailId: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]{2,}$',
    mobileNo: '^([+][9][1]|[9][1]|[0]){0,1}([7-9]{1})([0-9]{9})$',
    emailOrUsername: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]{2,}$|[a-zA-Z0-9]+',
    password: new RegExp('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$#%^+=])')
};

const apiURL = 'https://kisan-sewa-api.herokuapp.com/';
// const apiURL = 'http://localhost:3000/';

export const apiEndPoint = {
    newsletter: `${apiURL}newsletter`,
    auth: `${apiURL}auth/`,
    booth: `${apiURL}booth/`,
    seller: `${apiURL}seller/`,
    farmer: `${apiURL}farmer/`
};
