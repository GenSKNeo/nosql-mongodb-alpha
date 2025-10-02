// Database: School
//    Collection: Students
//       Document: { name: "Alice", grade: "A" }
//       Document: { name: "Bob", age: 12, grade: "B" }

// JSON (JavaScript Object Notation) → human-friendly data format.
// BSON (Binary JSON) → MongoDB’s internal storage format (faster, smaller).

// A "collection" can be an array in our example
let students = [];

// InsertOne: Add a new student
students.push({
  name: "Alice",
  grade: "A"
});

students.push({
  name: "Bob",
  grade: "B",
  age: 12
});

// Find: Show all students
console.log(students);

// MongoDB would also add an _id field automatically, like this:
console.log({
  _id: "64ad8f4a...", // Unique ID generated
  name: "Alice",
  grade: "A"
});