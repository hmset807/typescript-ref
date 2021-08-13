// generic type example: Array<T>, which is kind of connected with some other type
// reusable components
// able to create a component that can work over a variety of types rather than a single one
// and is really flexible regarding
// a type connected with other type
// Pormise type
// <T> normally refer to Type, but you still can use other name

// generics function and class
// constraints
// special typescript types

// const names: Array<string> = []; // string[]
// const nameArray: string[] = ['Eric', 'Tommy'];

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('This is done ');
//   }, 2000);
// });

// this function return intersection of T & U
// generic tell typescript that these 2 type can and often will be of different types
// constraints can be any type, not necessary to constraint all generic types
function merge<T extends object, U extends object>(obj1: T, obj2: U) {
  return Object.assign(obj1, obj2);
}

console.log(merge({ name: "Eric" }, { age: 25 }));

// const mergeObj = merge({ name: 'Max' }, { age: 30 }) as {
//   name: string;
//   age: number;
// };

const mergeObj = merge({ name: "Max" }, { age: 30 });
console.log(mergeObj.age);

interface Lengthy {
  length: number;
}
function countAndPrint<T extends Lengthy>(element: T): [T, string] {
  let print = "What the fuck";
  if (element.length === 1) {
    print = `Got 1`;
  } else if (element.length > 1) {
    print = `Got ${element.length}`;
  }
  return [element, print];
}

console.log(countAndPrint(["A", "B", "C"]));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return `Value: ${obj[key]}`;
}

console.log(extractAndConvert({ name: "Max" }, "name"));

// generic class
// only for this class, because object is reference type
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item, 1));
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();

textStorage.addItem("Eric");
textStorage.addItem("Manu");
textStorage.addItem("Max");
textStorage.removeItem("Max");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(3);

console.log(numberStorage.getItems());

// utility

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  // return { title: title, description: description, completeUntil: date };
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ["Max", "Sports"];
