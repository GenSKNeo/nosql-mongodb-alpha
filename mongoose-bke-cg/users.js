// Imagine a SQL Table for "Users"
// Every row must have the same columns: id, name, age

// In NoSQL (MongoDB), each "document" can look different

// Example of two MongoDB documents:
const user1 = {
  name: "Alice",
  age: 25,
  hobbies: ["reading", "cycling"]
};

const user2 = {
  username: "bob123",
  email: "bob@example.com",
  isAdmin: true
};

const user3 = {
    name: "Charlie",
    age: 30,
    city: "New York"
};

const user4 = {
    username: "diana_coder",
    email: "diana@example.com",
    skills: ["javaScript", "MongoDB", "Node.js"]
};

// Notice: user1 and user2 don’t follow the exact same structure
// This is the power of NoSQL: flexibility!
console.log(user1);
console.log(user2);
console.log(user3);
console.log(user4);
// Output
// { name: 'Alice', age: 25, hobbies: [ 'reading', 'cycling' ] }
// { username: 'bob123', email: 'bob@example.com', isAdmin: true }