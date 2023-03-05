const express = require('express')
const axios = require('axios')
const { Recipe, Recipes } = require('./recipes.js')

const router = express.Router()
function fetch(url) {
    return axios.get(url)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.error(error)
        })
}

// router.get('/recipes', function (req, res) {
//     const ingredient = req.query?.filterByIngredient

//     fetch(`https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`).then(data => {
//         const recipes = new Recipes()
//         data.results.forEach(fetchedRecipe => {
//             const recipe = new Recipe(fetchedRecipe.idMeal, fetchedRecipe.title, fetchedRecipe.ingredients, fetchedRecipe.thumbnail, fetchedRecipe.href)
//             recipes.addRecipe(recipe)
//         });

//         res.send(JSON.stringify(recipes))
//     })
// })


// router.get('/recipes?limit', function (req, res) {
//     const limit = req.query?.filterBylimit
//     fetch(`https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}/${limit}`).then(data => {
//         const recipes = new Recipes()
//         data.results.forEach(fetchedRecipe => {
//             const recipe = new Recipe(fetchedRecipe.idMeal, fetchedRecipe.title, fetchedRecipe.ingredients, fetchedRecipe.thumbnail, fetchedRecipe.href)
//             recipes.addRecipe(recipe)
//         });

//         res.send(JSON.stringify(recipes))
//     })
// })


// router.get('/recipes?limit=5', function (req, res) {
//     const recipes = new Recipes()
//     const pageRecipes = recipes.getpageRecipes()
//     res.send(JSON.stringify(favoriteRecipes))
// })
router.get('/recipes', function (req, res) {
    const ingredient = req.query?.filterByIngredient
    // const page = 1
    const page = parseInt(req.query?.page) || 1 
    const limit = parseInt(req.query?.limit) || 2
    // const limit = 1
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    fetch(`https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`).then(data => {
        const totalResults = data.results.length
        const recipes = new Recipes()
        data.results.slice(startIndex, endIndex).forEach(fetchedRecipe => {
            const recipe = new Recipe(fetchedRecipe.idMeal, fetchedRecipe.title, fetchedRecipe.ingredients, fetchedRecipe.thumbnail, fetchedRecipe.href)
            recipes.addRecipe(recipe)
        });

        const pagination = {
            currentPage: page,
            limit,
            totalResults,
            totalPages: Math.ceil(totalResults / limit)
        }

        res.send({
            recipes,
            pagination
        })
    })
})





module.exports = router
