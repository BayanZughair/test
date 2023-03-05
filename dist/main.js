
let allRecipes = []

const filterchoice = {
    dairyClicked: false,
    glutenClicked: false
}
let limit = parseInt($(this).data('limit'))
let page = parseInt($(this).data('page'))
const renderer = new Renderer()
// $(".search-btn").click(function () {
//     let ingredient = $(this).closest("div").find("input").val()
//     $.getJSON(`/recipes?filterByIngredient=${ingredient}`)
//         .then(data => {
//             return data._recipes
//         }).then(fetchedRecipes => {
//             allRecipes = fetchedRecipes
//             renderer.renderRecipes(allRecipes)
//         })
// })

$(".search-btn").click(function () {
    let ingredient = $(this).closest("div").find("input").val()
    let page = parseInt($(this).closest("div").find("#page-input").val())
    // let page = 1
    let limit = 2
    $.getJSON(`/recipes?filterByIngredient=${ingredient}&page=${page}&limit=${limit}`)
        .then(data => {
            allRecipes = data.recipes._recipes
            renderer.renderRecipes(allRecipes)
            renderer.renderPagination(data.pagination)
        })
})
// $('.pagination').on("click", ".page-item", function () {
//     let ingredient = $(".search-btn").closest("div").find("input").val()
//     // let page = parseInt($(this).data('page'))+2
//     // let page = parseInt($(this).closest("div").find("#page-input").val())
//     // let limit = parseInt($(this).data('limit'))+2
//     let page =2 
//     let limit = 1 
//     $.getJSON(`/recipes?filterByIngredient=${ingredient}&page=${page}&limit=${limit}`)
//         .then(data => {
//             allRecipes = data.recipes._recipes
//             renderer.renderPagination(data.pagination)
//             renderer.renderRecipes(allRecipes)
//         })
// })
$('.pagination').on("click", ".page-item", function () {
    let ingredient = $(".search-btn").closest("div").find("input").val()
    // let page = parseInt($(this).data('page'))
    // let page = parseInt($(".search-btn").closest("div").find("#page-input").val())
    // let page = 2
    // let limit =  parseInt($(this).data('limit'))
    // let limit = parseInt($(this).data('limit'))
    // let page =2 
    let page = $(".pagination .page-item").index() - 1
    let limit =2 
    $.getJSON(`/recipes?filterByIngredient=${ingredient}&page=${page}&limit=${limit}`)
        .then(data => {
            allRecipes = data.recipes._recipes
            renderer.renderRecipes(allRecipes)
            renderer.renderPagination(data.pagination)
            // renderer.renderRecipes(allRecipes)
        })
})




function filteredRecipes() {
//     const filteredRecipes = allRecipes.filter(recipe => {

// //         if (filterchoice.dairyClicked && recipe.isDairy) {
// //             return false
// //         }

// //         if (filterchoice.glutenClicked && recipe.isGluten) {
// //             return false
// //         }
// //         return true
//     })
    renderer.renderRecipes(filteredRecipes.slice(0, limit))
    renderer.renderPagination({
        currentPage: page,
        limit,
        totalResults: allRecipes.length,
        totalPages: Math.ceil(allRecipes.length / limit)
    })
}

// function filteredRecipes() {
//     const filteredRecipes = allRecipes.filter(recipe => {

//         if (filterchoice.dairyClicked && recipe.isDairy) {
//             return false
//         }

//         if (filterchoice.glutenClicked && recipe.isGluten) {
//             return false
//         }
//         return true
//     })
//     renderer.renderRecipes(filteredRecipes.slice(0, limit))
//     renderer.renderPagination({
//         currentPage: page,
//         limit,
//         totalResults: filteredRecipes.length,
//         totalPages: Math.ceil(filteredRecipes.length / limit)
//     })
// }


function filteredRecipes() {
    const filteredRecipes = allRecipes.filter(recipe => {

        if (filterchoice.dairyClicked && recipe.isDairy) {
            return false
        }

        if (filterchoice.glutenClicked && recipe.isGluten) {
            return false
        }
        return true
    })
    renderer.renderRecipes(filteredRecipes)
}

function filterDairy(event) {
    const isChecked = event.target.checked
    isChecked ? filterchoice.dairyClicked = true : filterchoice.dairyClicked = false
    filteredRecipes()
}

function filterGluten(event) {
    const isChecked = event.target.checked
    isChecked ? filterchoice.glutenClicked = true : filterchoice.glutenClicked = false
    filteredRecipes()
}

$('.recipes').on("click", ".recipe img", function () {
    const firstIngredient = $(this).closest('div').siblings('.ingredients').find('li:first-child')
    alert(firstIngredient.text())
})
