// Assignment 3 
// Part 1 - Order Summaries
const orders = [
    {
    id: 101, customer: "Alice",
    products: [
    { name: "Laptop", category: "Electronics", price: 1200, quantity: 1 },
    { name: "Mouse", category: "Electronics", price: 25, quantity: 2 },
    { name: "Notebook", category: "Stationery", price: 5, quantity: 5 } ]
    },
    {
    id: 102, customer: "Bob",
    products: [
    { name: "T-shirt", category: "Clothing", price: 20, quantity: 3 },
    { name: "Jeans", category: "Clothing", price: 40, quantity: 1 },
    { name: "Cap", category: "Accessories", price: 15, quantity: 2 } ]
    }];


const summarizeOrders = (orders) => {
    return orders.map((order) => {
      const { id, customer, products } = order;
      const totalAmount = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
      const categories = products.reduce((acc, product) => {
        const { category, quantity } = product;
        acc[category] = (acc[category] || 0) + quantity;
        return acc;
      }, {});
  
      return { orderId: id, customer, totalAmount, categories };
    });
  };


  console.log("summarizedOrders",summarizeOrders(orders));

// Part 2 - Top Performers

function getTopPerformers(employees, criteria) {
    // console.log("GetTopPerformers Executed");
    return employees
      .filter(emp => 
        emp.department === criteria.department
        && emp.performanceRating >= criteria.minPerformance
        && emp.yearsOfExperience >= criteria.minExperience 
        && emp.salary < criteria.maxSalary
      )
      .sort((a, b) => 
        b.performanceRating - a.performanceRating || a.salary - b.salary
      );
}

const employees = [
    { id: 1, name: "Alice", department: "Sales", salary: 65000, yearsOfExperience: 5, performanceRating: 85 },
    { id: 2, name: "Bob", department: "Sales", salary: 60000, yearsOfExperience: 4, performanceRating: 85 },
    { id: 3, name: "Charlie", department: "Sales", salary: 72000, yearsOfExperience: 6, performanceRating: 90 },
    { id: 4, name: "David", department: "HR", salary: 50000, yearsOfExperience: 4, performanceRating: 88 },
    { id: 5, name: "Eve", department: "Sales", salary: 68000, yearsOfExperience: 3, performanceRating: 82 }
];

const criteria = {
    department: "Sales",
    minPerformance: 80,
    minExperience: 3,
    maxSalary: 70000
};

console.log("Top Performers:", getTopPerformers(employees, criteria));

// Part 3 - Grouped Aggregation - Regional Sales Summary 

function regionalSalesSummary(salesRecords) {
    // console.log("regionalSalesSummary Executed");
    return salesRecords.reduce((acc, salesRecord) => {
        const { region, salesperson, salesAmount } = salesRecord;
        acc[region] = acc[region] || { salesperson: {}, totalSales: 0 };
        acc[region].salesperson[salesperson] = (acc[region].salesperson[salesperson] || 0) + salesAmount;
        acc[region].totalSales += salesAmount;
        return acc;
    }, {});
};

const salesRecords = [
    { region: "North", salesperson: "John", salesAmount: 1000, date: "2022-01-15"},
    { region: "South", salesperson: "Alice", salesAmount: 1500, date: "2022-02-20"},
    { region: "North", salesperson: "John", salesAmount: 800, date: "2022-03-10"},
    { region: "South", salesperson: "Doe", salesAmount: 1200, date: "2022-04-05"}
];

console.log("Regional Sales Summary:", regionalSalesSummary(salesRecords));

// Part 4 - Deep Nested Array Flattening and Transformation

function deepFlattenAndExtract(input){
    // console.log("deepFlattenAndExtract Executed");
    return input.reduce((acc, item) => {
        if (Array.isArray(item)) {
            return acc.concat(deepFlattenAndExtract(item));
        } else if (typeof item === "object") {
            return acc.concat(deepFlattenAndExtract(Object.values(item)));
        } else if (typeof item !== "string") {
            return acc.concat(item);
        } else {
            return acc;
        }
    }, []);
}

const input = [
    1, 
    [2,3, {a:4, b: "ignore"}],
    {c:5, d: [6, {e:7}]},
    "text",
    [8, [9,10]]
];
// Expected Output: 
// [1,2,3,4,5,6,7,8,9,10]
console.log("Deep Flattening:", deepFlattenAndExtract(input));

// Part 5 - Complex Data Analysis

function analyzeStudentPerformance(students) {
    // console.log("analyzeStudentPerformance Executed");
    const overallScores = []; // Array to hold all

    const result = students.reduce((acc, student) => {
        const highestScore = Math.max(...student.scores);
        const lowestScore = Math.min(...student.scores);
        const average = student.scores.reduce((sum, score) => sum + score, 0) / student.scores.length;

        acc.highestScore = Math.max(acc.highestScore || 0, highestScore); 
        acc.lowestScore = Math.min(acc.lowestScore || Infinity, lowestScore); 

        overallScores.push(...student.scores); 

        acc.studentAverages.push({ name: student.name, average });

        return acc;
    }, { highestScore: 0, lowestScore: Infinity, studentAverages: [] }); // Initialize acc

    result.overallAverage = overallScores.reduce((sum, score) => sum + score, 0) / overallScores.length;

    
    result.studentAverages.sort((a, b) => b.average - a.average);

    return result;
};

const students = [
    {name: "Alice", scores:[85,92,78]},
    {name: "Bob", scores:[90,88,95]},
    {name: "Charlie", scores:[78,85,92]},
    {name: "David", scores:[95,90,88]},
    {name: "Eve", scores:[88,78,85]}
];

console.log("Student Performance Analysis:", analyzeStudentPerformance(students));