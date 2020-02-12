import Budget from "./Models/Budget.js";
import View, { DOM_ELEMENTS } from "./View";

class Application {
  constructor() {
    this.budget = new Budget();
    globalThis = this;
  }

  init() {
    // setup month

    // setup initial budget
    View.displayBudget();

    // add listeners
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.querySelector(DOM_ELEMENTS.submitBtn).addEventListener("click", () => { this.addItem(); });
   
  }

  addItem() {
    
    // get data from inputs
    const inputData = View.getInputData();
    const isValid = this.validateUserData(inputData);

    if (isValid) {
      // add item
      const { type, description, value } = inputData;
      const item = this.budget.addItem(type, description, value);
      
      // display item
      View.addListItem(item, type);

      
      let bnts = document.querySelectorAll(DOM_ELEMENTS.btnDelete);
      for(let i=0;i<bnts.length;i++){
        bnts[i].onclick = this.removeItem;
      }

      // clear inputs
      View.clearInputs();

      // get and display budget
      View.displayBudget({
        totalExpenses: this.budget.totalExpenses,
        totalIncomes: this.budget.totalIncomes,
        total: this.budget.total
      });
      View.percent({
        totalExpenses: this.budget.totalExpenses,
        totalIncomes: this.budget.totalIncomes,
        total: this.budget.total
    });

    }
  }

  removeItem(event) {
    
    const buttonParent = event.target.parentNode.parentNode;
    const iconParent = buttonParent.parentNode;
    const id = buttonParent.dataset.id || iconParent.dataset.id;
    console.log(id);
    if (id) {
      const type = buttonParent.dataset.type || iconParent.dataset.type;
      
      

      console.log(type);
      globalThis.budget.deleteItem(type,Number(id));
      View.removeListItem(id, type);

      View.displayBudget({
        totalExpenses: globalThis.budget.totalExpenses,
        totalIncomes: globalThis.budget.totalIncomes,
        total: globalThis.budget.total
      });
      View.percent({
        totalExpenses: globalThis.budget.totalExpenses,
        totalIncomes: globalThis.budget.totalIncomes,
        total: globalThis.budget.total
      });
    }
  }

  validateUserData(inputData) {
    const { type, description, value } = inputData;

    if (value.match(/^[-\+]?\d+?/) === null) { View.errorMessage(1); }
    if (description.match(/\S+/) === null) { View.errorMessage(2); }

    if ((value.match(/^[-\+]?\d+/) === null) || (description.match(/\S+/) === null)) {
      return false;
    }
    return true; // remove this line after you version is ready
  }
}

const app1 = new Application();
export default app1