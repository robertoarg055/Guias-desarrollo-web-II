import { useContext } from "react";
import { BudgetStateContext } from "../context/BudgetContext";
import { ExpenseDetails } from "./ExpenseDetails";

export const ExpenseList = () => {
    const { expenses, currentCategory } = useContext(BudgetStateContext);
    const isEmpty = expenses.length === 0;
    const filteredExpenses = currentCategory ? expenses.filter(expense => expense.category == currentCategory) : expenses
    return (
        <div className="mt-10">
            {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay gastos</p> : (
            <>
                <p className="text-gray-600 text-2xl font-bold my-5">Listado de gastos.</p>
                {filteredExpenses.map((expense, index) => <ExpenseDetails key={index} expense={expense} />)}
            </>
            )}
        </div>
    );
};
