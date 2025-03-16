import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../store/useAppStore"
export const FavoritesPage = () => {
    //Recuperando el arreglo de favoritos desde el store
    const favorites = useAppStore((state) => state.favorites)
    const hasFavorites = favorites.length > 0
    return (
        <>
            <h1 className="text-4xl font-extrabold">Favoritos</h1>
            {hasFavorites ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
my-10 gap-10">
                    {favorites.map((drink) => (
                        <DrinkCard
                            key={drink.idDrink}
                            drink={drink}
                        />
                    ))}
                </div>
            ) : (
                <p className="my-10 text-center text-2xl">
                    Los favoritos se mostrarán aqui
                </p>
            )
        }
        </>
    )
}