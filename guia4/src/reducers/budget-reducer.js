const initialBudget = () => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? parseFloat(localStorageBudget) :0
};
const localStorageExpenses = () => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) :[]
};  
export const initialState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingld: "",
    currenctCategory: ""
};

export const budgetReducer = (state, action) => {
    switch (action.type) {
    
    case "add-budget":
        return { ...state, budget: action.payload.budget }
    case "show-modal":
        return { ...state, modal: true }
    case "close-modal":
        return { ...state, modal: false, editingld: "" }
    case "add-expense":
        const totalExpenses = state.expenses.reduce((acc, expense) => acc + expense.amount, 0);
        const newTotalExpenses = totalExpenses + action.payload.expense.amount;
        if (newTotalExpenses > state.budget) {
            alert("Error, no puedes agregar otro gasto, ya que excede tu presupuesto");
            return state;
        }
        return {
            ...state, 
            expenses: [
                ...state.expenses, 
                { ...action.payload.expense, id: new Date().getTime() }
            ],
            modal: false
        }
        case "reset-app":
            localStorage.clear(); 
            return {
                ...initialState,
            };
    case "remove-expense":
        return {
            ...state, 
            expenses: state.expenses.filter(expense => expense.id != action.payload.id)
        }
    case "get-expense-by-id":
        return {
            ...state, 
            editingld: action.payload.id,
            modal: true
        }
    case "update-expense":
        return {
            ...state, 
            expenses: state.expenses.map(expense => expense.id === action.payload.id.expense.id ?
                action.payload.expense : 
                expense),
            modal: false,
            editingld: ""
        }
    case "add-filter-by-category":
        return {...state, currentCategory:action.payload.categoryId}
    default:
        return state;
    }
};

