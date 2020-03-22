export const regex = {
    address: '^[A-Za-z0-9 :&()\\-`.,/\]*$',
    numeric: '[0-9]+',
    alphaNumeric: '[a-zA-Z0-9]+',
    emailId: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]{2,}$',
    mobileNo: '^([+][9][1]|[9][1]|[0]){0,1}([7-9]{1})([0-9]{9})$',
    emailOrUsername: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]{2,}$|[a-zA-Z0-9]+',
    password: new RegExp('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$#%^+=])')
};
