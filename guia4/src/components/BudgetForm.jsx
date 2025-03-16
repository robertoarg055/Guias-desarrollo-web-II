import { useState } from "react"
import { BudgetDispatchContext } from "../context/BudgetContext"
import { useContext } from "react"
export const BudgetForm = () => {
    const [budget, setBudget] = useState(0)
    const isInvalid = isNaN(budget) || budget <= 0 // si no es un número > 0 es inválido

    const handleChange = (e) => { setBudget(e.target.valueAsNumber) }
    const dispatch = useContext(BudgetDispatchContext)
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch({ 
            type: "add-budget", 
            payload: {budget} 
        })
    }
    return (
        <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label
                    htmlFor="budget"
                    className="text-4xl text-blue-600 font-bold text-center"
                >
                    Definir presupuesto
                </label>
            </div>
            <input
                type="number"
                id="budget"
                name="budget"
                placeholder="Define tu presupuesto"
                className="w-full bg-white border border-gray-200 p-2"
                value={budget || ""}
                onChange={handleChange}
            />
            <input
                type="submit"
                value="Definir presupuesto"
                disabled={isInvalid}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white
                                font-black uppercase disabled:opacity-40"
            />
        </form>
    )
}
