// interface do not have an initialize and
// only contains behaviors that a class inplements
// only describe the structure
// interface are restricted to an object type
// interface cannot just be used to define a custom objecyt type.
// but you can use it as a contract on a class

// A class is a blueprint from which we can create objects
// that share the same configuration - properties and methods.
// An interface is a group of related properties and methods
// that describe an object, but neither provides implementation
// nor initialisation for them

//

// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
}
let adding: AddFn;

adding = (n1: number, n2: number) => {
  return +n1 + +n2;
};

interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  readonly name?: string;
  greet(): void;
}

class Person1 implements Greetable {
  name?: string;
  title?: string;
  constructor(n: string, t: string) {
    if (n) {
      this.name = n;
    }
    this.title = t;
  }
  greet() {
    console.log(`Hey, I'm an ${this.title} and you can call me ${this.name}`);
  }
}

let user01: Greetable;
user01 = new Person1('Eric', 'Engineer');

user01.greet();

console.log(user01);

// what the fuck
