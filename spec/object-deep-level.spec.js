import {diff} from '../src/object-diff'
import test from 'ava'


//TODO i hesitate to include this feature of deep diff. This is assuming that values
//are existing object properties are mutable. i.e. not just {a:''} -> {a:'',b:''} where 
//b is the delta but {a: '', b: {name:'mike'}} -> {a:'', b: {name: 'mitch'} where the delta
//is {b:{name:'mitch'}}
test('nested object differences should be detected', t => {
    const obj1 = {
        a: 1,
        b: {
            age: 31,
            name: 'mike'
        }
    };

    const obj2 = {
        a: 1,
        b: {
            age: 31,
            name: 'jim'
        }
    }

    const result = diff(obj1, obj2);
    t.deepEqual(result, {
        b: {
            name: 'jim'
        }
    })
});