// Infinite Currying
function addFive(a) {
    return a + 5;
}

function subtractTwo(a) {
    return a - 2 ;
}

function multiplyFour(a) {
    return a * 4;
}

const composeCurry = (...functions) => {
    
    return (args) => {
        return functions.reduceRight((arg, fn) => {
           
            return fn(arg);
        }, args);
    }
}
const pipe = (...functions) => {
    return (args) => {
        return functions.reduce((arg, fn) => fn(arg), args)
    }
}



const evaluate = composeCurry(addFive, subtractTwo, multiplyFour);
const evaluate2 = pipe(addFive, subtractTwo, multiplyFour);
// console.log(evaluate(5));
// console.log(evaluate2(5));

// ANOTHER INFINITE CURRYING



function add(a) {
    return function(b) {
        if (b) return add( a + b );
        return a;
    };
}

console.log(add(5)(2)(3)(8)(10)());



/* Memoize */

function myMemoize(fn) {
    const cache = {};
    return function(...args) {
        var argsCache = JSON.stringify(args);
        console.log('argsCache', argsCache);

        if(!cache[argsCache]) {
            console.log(this);
            cache[argsCache] = fn.call(this, ...args);
        }
        return cache[argsCache];
    }
}


const clumsyProduct = (num1, num2) => {
    for(let i = 1; i <= 1000000000; i++) {

    }
    return num1 * num2;
};

const memoizedClumsyProduct = myMemoize(clumsyProduct);
// console.time("First Call");
// console.log(memoizedClumsyProduct(9467, 7649));
// console.timeEnd("First Call");