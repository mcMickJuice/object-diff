import isEqual from 'lodash/isEqual'
import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'

export function arrayContains(arr, element) {
    //TODO does this iterate all elements or exit after first true?
    return arr.some(item => isEqual(item, element))
}

export function isSameType(firstEntity, secondEntity) {
    if (bothArray(firstEntity, secondEntity)) {
        return true;
    }

    if (bothObject(firstEntity, secondEntity)) {
        return true
    }

    //what about primitives?

    //what about functions? this is a data comparison, not a function comparison

    return false
}

export function bothArray(first, second) {
    return isArray(first) && isArray(second);
}

export function bothObject(first, second) {
    return (isObject(first) && !isArray(first)) && (isObject(second) && !isArray(second))
}