import {arrayContains, isSameType, bothArray, isPrimitive} from './utils'

export function diff(firstObj, nextObj, options) {
    const isAddedOnly = !options || !options.removed;
    const added = addedDiff(firstObj, nextObj);
    if (isAddedOnly) return added;
    const result = {
        added,
        removed: removedDiff(firstObj, nextObj)
    }

    return result;
}

function addedDiff(firstObj, nextObj) {
    //dont care about functions. Compare object vs array vs primitive
    if (!isSameType(firstObj, nextObj)) {
        return nextObj;
    }

    if (bothArray(firstObj, nextObj)) {
        return arrayDiff(firstObj, nextObj);
    }

    return objectDiff(firstObj, nextObj)
}

function objectDiff(firstObj, nextObj) {
    const objDiff = Object.keys(nextObj).reduce((acc, nextKey) => {
        if (typeof(firstObj[nextKey]) === 'undefined') {
            acc[nextKey] = nextObj[nextKey];
        }
        return acc;
    }, {});

    return objDiff;
}

function arrayDiff(firstArray, nextArray) {
    const diff = nextArray.filter(val => {
        //check by ref, not structure
        return !arrayContains(firstArray, val)
    })

    return diff;
}

function removedDiff(firstObj, nextObj) {
    return addedDiff(nextObj, firstObj);
}

