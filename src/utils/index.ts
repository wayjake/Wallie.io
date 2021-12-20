const fakeUsers = require('./fakeUsers.json')

export enum IdTypes {
    upper,
    lower,
    numbers,
}

//https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
export const makeId = (length: number = 6, types: IdTypes[] = [0, 1, 2]) => {
    var result = ''
    const typesObject = {
        [IdTypes.upper]: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        [IdTypes.lower]: 'abcdefghijklmnopqrstuvwxyz',
        [IdTypes.numbers]: '0123456789',
    }
    var characters = ''
    types.map((type) => {
        characters += typesObject[type]
    })

    const charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
    }
    return result
}

export const getRandomUsername = () => {
    return fakeUsers[Math.floor(Math.random() * fakeUsers.length)].username
}
