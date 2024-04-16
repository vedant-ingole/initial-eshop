// Set a Cookie
export function setCookie(cName, cValue, expDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}


// Get cookie
export function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded .split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
}


// Splitter
export const splitter = (string, symbol) => {
    const arr = string.split(symbol)
    return arr
}


// push 
// export const push = (array, string ) => {
//     let arr2 = []
//     arr2 = array.push(string)
//     return arr2
// }
