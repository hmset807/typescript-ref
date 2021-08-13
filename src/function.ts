const addNum1 = (n1: number, n2: number) => {
  return n1 + n2;
};

function addNum2(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number) {
  console.log(`Result: ${num}`);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

console.log(printResult(addNum1(1, 2)));

let combineValuesTgt: (a: number, b: number) => number;

combineValuesTgt = addNum1;

console.log(combineValuesTgt(7, 8));

addAndHandle(10, 20, (result) => {
  console.log(result);
});

// let someValue: undefined;
