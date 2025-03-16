import DrinkCard from "../components/DrinkCard";
import { useAppStore } from "../store/useAppStore";

export const IndexPage = () => {
    const drinks = useAppStore((state) => state.drinks);
    const hasDrinks = drinks.drinks?.length > 0;

    return (
        <>
        <h1 className="text-4xl font-bold">Recetas</h1>
        {hasDrinks ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 my-10 gap-10">
            {drinks.drinks.map((drink) => (
                <DrinkCard 
                    key={drink.idDrink} 
                    drink={drink} 
                />
            ))}
        </div>
    ) : (
        <p className="my-10 text-center text-2xl">
            No hay resultados aún, utiliza el formulario para buscar recetas
        </p>
        )}
        </>
    );
};