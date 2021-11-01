export const storageService = {
    load,
    save,
    clearUser
}

function save(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function load(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

function clearUser(key) {
    localStorage.removeItem(key)
}