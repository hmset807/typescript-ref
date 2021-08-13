// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person = {
  //can put {} or object after : to tell the type of the variable
  name: 'seto',
  age: 28,
  hobbies: ['sex', 'smoke'],
  role: Role.ADMIN,
};

let activities: any[]; // don't use any often, it lose the benefit of typescript
activities = ['having sex', 'smoking weed', 123];

if (person.role === Role.ADMIN) {
  console.log('is admin');
}

console.log(person);
