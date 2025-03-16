import { categories } from "../data/categories";
import { useContext } from "react";
import { BudgetDispatchContext } from "../context/BudgetContext";
export const FilterByCategory = () => {
    const dispatch = useContext(BudgetDispatchContext);
    const handleChange = (e) => {
        dispatch({type: "add-filter-category", payload: { categoryId: e.target.value }})
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-10">
            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">Filtrar gastos</label>
                    <select id="category" className="bg-slate-100 p-3 flex-1 rounded">
                        <option value="">--- Todas las categorias ---</option>
                        {categories.map((category) => (
                            <option value={category.id} key={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    )
}