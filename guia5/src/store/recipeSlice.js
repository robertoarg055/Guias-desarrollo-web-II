import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService";

export const createRecipeSlice = (set) => ({
    categories: [],
    drinks: [],
    selectedRecipe: {},
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories()
        set({ categories })
    },
    searchRecipes: async (filters) => {
        const drinks = await getRecipes(filters)
        set({ drinks })
    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeById(id)
        set({
            selectedRecipe,
            modal: true})
    },
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {}
        })
    }
})