// class as objeect factories and blueprint
// properties or method are defined as static in class,
// they only can be called directly from a class not an instance
// extends means to inherit all properties, methods from its parent, not include private ones
// It can override some of these and implement new, but the parent stuff is already included.
// implements means The new class can be treated as the same "shape",
// while it is not a child, and you need

abstract class Department {
  static firstYear = 2020;
  //   private id: number;
  //   private name: string;
  protected employees: string[] = [];

  constructor(protected readonly id: number, protected name: string) {}

  static createEmployee(name: string) {
    return { name: name };
  }

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(`Number of ${this.employees.length}`);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("no added report");
    }
    this.addReport(value);
  }

  constructor(id: number, private admins: string[], private reports: string[]) {
    super(id, "IT");
    this.lastReport = reports[0];
  }

  describe() {
    console.log(`${this.name} Department id: ${this.id}`);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
}

class AccountingDepartment extends Department {
  private static instance: AccountingDepartment;
  private constructor(id: number, private reports: string[]) {
    super(id, "Accounting");
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment(134567, ["audit report"]);
    return this.instance;
  }

  describe() {
    console.log(`${this.name} Department id: ${this.id}`);
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  printReports() {
    console.log(this.reports);
  }
}

const it = new ITDepartment(
  1234,
  ["Edmund", "Tom"],
  ["hello I'm IT dog", "first report"]
);

it.describe();

const accounting1 = AccountingDepartment.getInstance();
accounting1.describe();

const employee1 = Department.createEmployee("Vivi");
console.log(employee1.name, `Start at ${Department.firstYear}`);
// const accountantCopy = { name: "Dummy", describe: accountant.describe };

// accountantCopy.describe();
