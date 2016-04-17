import {diff} from '../src/object-diff'
import test from 'ava'

test('should produce difference of added elements between arrays', t => {
    const firstArr = [1, 2];
    const secondArr = [1, 2, 3];

    const result = diff(firstArr, secondArr);

    t.deepEqual(result, [3])
});

test('should produce difference of both added and removed elements between arrays', t => {
    const firstArr = [1, 2];
    const secondArr = [1, 3];

    const result = diff(firstArr, secondArr, {removed: true});

    t.deepEqual(result.added, [3]);
    t.deepEqual(result.removed, [2])
});

test('should produce objects added to array', t => {
    const firstArr = [
        {id: 1, name: 'mike'}
    ]

    const secondArr = [
        {id: 1, name: 'mike'},
        {id: 2, name: 'james'}
    ]

    const result = diff(firstArr, secondArr);

    t.deepEqual(result, [{id: 2, name: 'james'}])
});

test('should produce added and removed of objects', t => {
    const firstArr = [
        {id: 1, name: 'mike'},
        {id: 3, name: 'jimmy'}
    ]

    const secondArr = [
        {id: 1, name: 'mike'},
        {id: 2, name: 'james'}
    ]

    const result = diff(firstArr, secondArr, {removed: true});

    t.deepEqual(result.added, [{id: 2, name: 'james'}])
    t.deepEqual(result.removed, [{id: 3, name: 'jimmy'}])
});

test('should produce empty array if arrays are equal', t => {
    const firstArr = [
        {id: 1, name: 'mike'},
        {id: 3, name: 'jimmy'}
    ];

    const secondArr = [
        {id: 1, name: 'mike'},
        {id: 3, name: 'jimmy'}
    ]

    const result = diff(firstArr, secondArr);

    t.deepEqual(result, [])
});

test('should produce empty array for added and removed if arrays are equal', t => {
    const firstArr = [
        {id: 1, name: 'mike'},
        {id: 3, name: 'jimmy'}
    ];

    const secondArr = [
        {id: 1, name: 'mike'},
        {id: 3, name: 'jimmy'}
    ];

    const result = diff(firstArr, secondArr, {removed: true});

    t.deepEqual(result.added, []);
    t.deepEqual(result.removed, []);
})