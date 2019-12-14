function Person (name) {
    this.name = name;
}

const per1 = new Person('John');
const per2 = Person('John');

console.log(per1, per2);