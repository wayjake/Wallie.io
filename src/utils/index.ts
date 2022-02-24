import DOMPurify from 'dompurify'
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

const sanitizeHtml = (data: string) => {
    return DOMPurify.sanitize(data, {
        ALLOWED_TAGS: ['a', 'img', 'h1', 'h2', 'h3', 'p', 'ul', 'li'],
        ADD_ATTR: ['target'],
    })
}

export const linkify = (inputText: string) => {
    //URLs starting with http://, https://, or ftp://
    var replacePattern1 =
        /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim
    var replacedText = inputText.replace(
        replacePattern1,
        '<a href="$1" target="_blank">$1</a>'
    )

    //URLs starting with www. (without // before it, or it'd re-link the ones done above)
    var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim
    var replacedText = replacedText.replace(
        replacePattern2,
        '$1<a href="http://$2" target="_blank">$2</a>'
    )

    //Change email addresses to mailto:: links
    var replacePattern3 =
        /(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim
    var replacedText = replacedText.replace(
        replacePattern3,
        '<a href="mailto:$1">$1</a>'
    )

    return sanitizeHtml(replacedText)
}

export const createMarkup = (__html: string) => {
    return { __html: sanitizeHtml(__html) }
}
