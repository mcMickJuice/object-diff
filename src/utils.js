import isEqual from 'lodash/isEqual'
import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'
import isNumber from 'lodash/isNumber'
import isDate from 'lodash/isDate'
import isString from 'lodash/isString'
import isBoolean from 'lodash/isBoolean'

const primitiveTypes = [isNumber,isDate,isString,isBoolean];

export function arrayContains(arr, element) {
    //TODO does this iterate all elements or exit after first true?
    return arr.some(item => isEqual(item, element))
}

export function isPrimitive(entity) {
    return primitiveTypes.some(func => {
        return func(entity);
    })
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