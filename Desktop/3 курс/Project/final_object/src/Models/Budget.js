import Income from './Income.js';
import Expense from "./Expense";
import { calculateId, calculateMoney } from "../helper";

 class Budget {
  constructor() {
    this.expenses = [];
    this.incomes = [];
    this.totalExpenses = 0;
    this.totalIncomes = 0;
    this.total = 0;
  }

   addItem(type, description, value) {
    let item;
    if (type === "inc") {
      item = new Income(calculateId(this.incomes), description, value);
      this.incomes.push(item);
    } else if (type === "exp") {
      item = new Expense(calculateId(this.expenses), description, value);
      this.expenses.push(item);
    } else {
      console.log("Wrong type!!!");
    }
    this.calculateBudget();
    return item;
  }

   deleteItem(type, id) {
     console.log("deleted");
    if (type === "inc") {
      this.incomes = this.incomes.filter(item => item.id !== id);
    } else if (type === "exp") {
      this.expenses = this.expenses.filter(item => item.id !== id);
    } else {
      console.log("Wrong type!!!");
    }
    this.calculateBudget();
  }

   calculateBudget() {
    this.totalIncomes = calculateMoney(this.incomes);
    this.totalExpenses = calculateMoney(this.expenses);
    this.total = this.totalIncomes - this.totalExpenses;
  }

   getBudget() {
    return {
      total: this.total,
      totalExpenses: this.totalExpenses,
      totalIncomes: this.totalIncomes,
    };
  }

  
}
export default Budget;