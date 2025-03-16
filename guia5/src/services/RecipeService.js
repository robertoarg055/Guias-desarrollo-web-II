import axios from "axios";

export async function getCategories() {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
    const {data} = await axios(url);
    console.log(data.drinks)
    return data.drinks;
}
export async function getRecipes(filter) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter.category}&i=${filter.ingredient}`;
    const {data} = await axios(url);
    return data;
}
// Función para obtener una receta por su ID
export async function getRecipeById(id) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const { data } = await axios(url);
    return data.drinks ? data.drinks[0] : null;
}