import { createContext, useReducer } from "react"
import { budgetReducer, initialState } from "../reducers/budget-reducer"

export const BudgetStateContext = createContext()
export const BudgetDispatchContext = createContext()

export const BudgetProvider = ({ children }) => {
const [state, dispatch] = useReducer(budgetReducer, initialState)

    return (
        <BudgetStateContext.Provider value={state}>
            <BudgetDispatchContext.Provider value={dispatch}>
                {children}
            </BudgetDispatchContext.Provider>
        </BudgetStateContext.Provider>
    )
}
