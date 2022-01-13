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
        return (characters += typesObject[type])
    })

    const charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
    }
    return result
}

export const getRandomFromArray = (items: any[]) => {
    return items[Math.floor(Math.random() * items.length)]
}

export const getRandomUsername = () => {
    return getRandomFromArray(fakeUsers).username
}

const DEFAULT_INPUT_TYPES = ['input', 'select', 'button', 'textarea']
export const userIsWithinInput = (inputs: String[] = DEFAULT_INPUT_TYPES) => {
    var activeElement = document.activeElement
    if (!activeElement) {
        return false
    }
    return inputs.indexOf(activeElement.tagName.toLowerCase()) > -1
}
