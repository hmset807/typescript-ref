// decorators is just a function(all about classes)
// just a function you apply to sth
// @ is a special identifier typescript sees or recingnizes, and @ point at a function, not execute it
// general are all about classes, as a whole
// decorator receive arguments,how many arguments depends on where you use the decorator
// all decorators execute when your class is defined, not when it is instantiated(create new).*************
// no decorators run at runtime when you call a method or when you work with a property
// no need to instantiate your class to get decorator output
// decorator runs when JS finds your class definition, your constructor function definition
// you can use the decorator to do some behind the scenes work(to set some metadata before instantiated)
// factory function which can pass in values which will be used by that inner returned decorator function

// decorator factory
// you have to execute the outer function to get the return value
// not directly execute the decorator function, but we're executing
// the advantage is that we now can pass in values which will be used by the inner returned decorator function
// a function that will return such a decorator function
// running the bottom decorator(inner) first, but the decorator factory(outlet) run from top to bottom
// all decorators execute when you defined the class

// we can add decorator to classes and much more other places
// not necessary to add decorator directly to class
// we can add decorator to setter, getter, property and method
// decorator have to receive 2 arguments for property, the decorator basically run
// with the class definition is registered by JS
// decorator have to receive 3 arguments for accessor (setter and getter)
// decorator have to receive 3 arguments for method
// decorator have to receive 3 arguments for parameter

///////////////////////////////////////////////////////////////////////////////////

// function Logger(logString: string) {
//   // set the constructor fucntion as a parameter
//   console.log('LOGGER FACTORY');
//   // passing the added class constructor function as an argument
//   return function (constructor: Function) {
//     console.log(logString);
//     console.log(constructor);
//   };
// }

// _ which tell typescript that we are not interested
// a return value inside of the decorator function

// class and method decorator are capable to return something
// in this below example, the decorator function return a new class(constructor function)
// the below decorator only be executed when ppl instantiate it
function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY');
  return function <T extends { new (...args: any[]): { name: string } }>(
    orginalConstructor: T
  ) {
    return class extends orginalConstructor {
      constructor(..._: any[]) {
        super();
        console.log('Rendering ');
        console.log(orginalConstructor);
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  };
}

// @Logger('LOGGING-OUT') // add as a decorator(function) to the below class
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Max';
  constructor() {
    console.log('Creating person object ....');
  }
}

// const person1 = new Person();

// console.log(person1);

// ---

function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator!');
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  // PropertyDescriptor = the type built into typescript
  console.log('Accessor Decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Method Decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter Decorator');
  console.log(target);
  console.log(name); // name of the method we use this parameter
  console.log(position); // the index of that arguemnt
}

// class Product {
//   @Log
//   title: string;
//   private _price: number;

//   @Log2
//   set price(val: number) {
//     if (val > 0) {
//       this._price = val;
//     } else {
//       throw new Error('invalid price- should be positive');
//     }
//   }

//   constructor(t: string, p: number) {
//     this.title = t;
//     this._price = p;
//   }

//   @Log3
//   getPriceWithTax(@Log4 tax: number) {
//     return this.price * (1 + tax);
//   }
// }

// const p1 = new Product('Book', 19);
// const p2 = new Product('Book2', 29);

// function AutoBind(_: any, _2: string, descriptor: PropertyDecorator) {
//   const originalMethod = descriptor!.value;
//   const adjDescriptor: PropertyDescriptor = {
//     configurable: true,
//     enumerable: false,
//     get() {
//       const boundFn = originalMethod.bind(this);
//       return boundFn;
//     },
//   };
//   return adjDescriptor;
// }

class Printer {
  message = 'this works';

  // @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);

// ----

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; //['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  console.log('Req');
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['required'],
  };
}

function PositiveNumber(target: any, propName: string) {
  console.log('Num');
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive'],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  console.log(objValidatorConfig);
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop]; // !! can convert real boolean value
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert('Invalid input');
    return;
  }
  console.log(createdCourse);
});
