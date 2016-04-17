import test from 'ava'
import {diff} from '../src/object-diff'
import isArray from 'lodash/isArray'

test('should detect addition of property, first obj to second', t => {
    const firstObj = {
        a: 1
    }

    const secondObj = {
        a: 1,
        b: 2
    }

    const result = diff(firstObj, secondObj);
    t.deepEqual({b: 2}, result)
});

test('should detect remove of property, if flag passed', t => {
    const firstObj = {
        a: 1,
        b: 2
    };

    const secondObj = {
        a: 1
    }

    const result = diff(firstObj, secondObj, {removed: true});
    t.deepEqual({b: 2}, result.removed);
    t.deepEqual({}, result.added);
});

test('should detect both added and removed properties', t => {
    const firstObj = {
        a: 1,
        c: 2
    };

    const secondObj = {
        a: 1,
        b: 3
    }

    const result = diff(firstObj, secondObj, {removed: true});
    t.deepEqual({b: 3}, result.added)
    t.deepEqual({c: 2}, result.removed);
});

test('should return empty object if no changes', t => {
    const firstObj = {
        a:1
    };

    const secondObj = {
        a:1
    };

    const result = diff(firstObj, secondObj);
    t.deepEqual({}, result)
});

test('should return entire object if not same type', t => {
    const firstObj = {a: 1};
    const secondObj = [1];

    const result = diff(firstObj, secondObj);
    t.deepEqual(secondObj, result)
    t.true(isArray(result))
});

test('should return entire first object for removed if types are not the same', t => {
    const firstObj = {a: 1};
    const secondObj = [1];

    const result = diff(firstObj, secondObj, {removed: true});
    t.deepEqual(secondObj, result.added)
    t.deepEqual(firstObj, result.removed)
});
