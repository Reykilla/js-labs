const users = [
    { name: "Анастасія", email: "anastasiialoshkina@college.udhtu.edu.ua", age: 17 },
    { name: "Ангеліна", email: "angelina@college.udhtu.edu.ua", age: 17 },
    { name: "Марія", email: "mariia@college.udhtu.edu.ua", age: 16 }
];

for (const { name, email, age } of users) {
    console.log(`Ім'я: ${name}, Email: ${email}, Вік: ${age}`);
}
