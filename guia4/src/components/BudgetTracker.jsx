import { useContext } from 'react'
import { BudgetDispatchContext } from '../context/BudgetContext'
import { AmountDisplay } from './AmountDisplay'
import { BudgetStateContext } from '../context/BudgetContext'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
export const BudgetTracker = () => {
    const state = useContext(BudgetStateContext)
    const totalExpenses = state.expenses.reduce((total,expense)=>expense.amount+total,0)
    const remainingBudget = state.budget - totalExpenses
    const percentage = ((totalExpenses / state.budget) * 100).toFixed(2);
    const dispatch = useContext(BudgetDispatchContext)
    const handleResetApp = () => {
        dispatch({ type: 'reset-app' });
    };
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar
                    value={percentage} // Valor del progreso (0 - 100)
                    text={`${percentage}%`} // Texto que se muestra dentro del círculo
                    styles={buildStyles({
                        pathColor: (percentage < 100) ? '#3b82f6' : '#dc2626', // Azul si es menor a 100%, rojo si es 100%
                        trailColor: '#F5F5F5' // Color del fondo de la barra
                    })}
            />
            </div>
            <div className="flex flex-col justify-center items-center gap-8">
                <button 
                    className='bg-pink-600 w-full p-2 text-white uppercase font-bold'
                    onClick={handleResetApp}
                >
                    Resetear app
                </button>
                <AmountDisplay amount={state.budget} label="Presupuesto" />
                <AmountDisplay amount={remainingBudget} label="Disponible" />
                <AmountDisplay amount={totalExpenses} label="Gastado" />
            </div>
        </div>
    )
}