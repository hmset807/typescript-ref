type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// function overload
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add('Max', ' Seto');
result.split(' ');

const fetchedUserData = {
  id: 'u1',
  name: 'Max',
  job: {
    title: 'CEO',
    description: 'My own company',
  },
};

console.log(fetchedUserData.job && fetchedUserData.job.title); // js way
console.log(fetchedUserData?.job?.title); //ts way

const userInput = '';
const storedData = userInput ?? 'Default'; // this operator(coalescing operator) can keep the input value unless the value is null or undefined

console.log(storedData);
// console.log(add('f', 1));

// // type guards
// type UnknownEmployee = Employee | Admin;

// function printEmployeeInformation(emp: UnknownEmployee) {
//   console.log('Name' + emp.name);
//   if ('privileges' in emp) {
//     console.log('Privileges: ' + emp.privileges);
//   }
//   if ('startDate' in emp) {
//     console.log('Privileges: ' + emp.startDate);
//   }
// }

// printEmployeeInformation(e1);

// class Car {
//   drive() {
//     console.log('Driving...');
//   }
// }
// class Truck {
//   drive() {
//     console.log('Driving truck...');
//   }
//   loadCargo(amount: number) {
//     console.log('loading cargo ' + amount);
//   }
// }

// type Vehicle = Car | Truck;

// const v1 = new Car();
// const v2 = new Truck();

// function useVehicle(vehicle: Vehicle) {
//   vehicle.drive();
//   // only available javascript features
//   if (vehicle instanceof Truck) {
//     vehicle.loadCargo(10);
//   }
// }

// useVehicle(v1);
// useVehicle(v2);

// interface Bird {
//   type: 'bird'; // literal type which is a value
//   flyingSpeed: number;
// }

// interface Horse {
//   type: 'horse'; // literal type which is a value
//   runningSpeed: number;
// }

// type Animal = Bird | Horse;

// function moveAnimal(animal: Animal) {
//   let speed;
//   switch (animal.type) {
//     case 'bird':
//       speed = animal.flyingSpeed;
//       break;
//     case 'horse':
//       speed = animal.runningSpeed;
//   }
//   console.log(`${animal.type} MOVING at speed ${speed}`);
// }

// moveAnimal({ type: 'horse', runningSpeed: 10 });

// // type casting, telling typscript the type of element
// // const paragraph = document.getElementById('output');
// // the ! tell typescript that the expression in front of it will never yeild null
// const userInput = <HTMLInputElement>document.getElementById('user-in')!;
// const paragraph = document.getElementById('output')! as HTMLInputElement;

// userInput.value = 'hello';

// interface ErrorContainer {
//   // {email: "Not a valid email, username:"Must start with a charcter!"}
//   [prop: string]: string;
// }

// const errorBag: ErrorContainer = {
//   email: 'Not a valid email',
//   username: 'Must start with a charcter!',
// };
