console.clear();
// alert('works');

const cocktailNameFilterElement = document.getElementById('cocktail-name-search');
const categorySelectElement = document.getElementById('category-select');
const glassTypeSelectElement = document.getElementById('glass-type-select');
const ingredientSelectElement = document.getElementById('ingredient-select');

const searchButton = document.getElementById('search');
const luckyButton = document.getElementById('im-lucky');

const cocktailAppHtml = document.getElementById('cocktails-app');

const categoriesArray = [];
const drinksArray = [];
const fillSelectElements = async () =>
{
    const allUrls = [
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list',
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list'
    ];

    const allPromises = allUrls.map( url =>
        fetch(url).then( (resp) => resp.json() )
    );
    const allValues = await Promise.all(allPromises);
    const [ allCats, allGlasses, allIngredients] = allValues;

    console.log(allCats);
    console.log(allPromises);
    console.log(allValues);

    console.time('await');
    await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        .then( (result) => result.json() )
        // .then( (result) => console.log(result) )
        .then( (result) =>
        {
            fillCategorySelect( result.drinks, categorySelectElement, 'strCategory' );
            categoriesArray.push(
                ...result.drinks.map( (val) => val.strCategory )
            );
        })
        .catch( (error) => console.log(error) )
        .finally( () => console.log('Request finished 1') )

    await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list')
        .then( (result) => result.json() )
        // .then( (result) => console.log(result) )
        .then( (result) => fillCategorySelect( result.drinks, glassTypeSelectElement, 'strGlass' ) )
        .catch( (error) => console.log(error) )
        .finally( () => console.log('Request finished 2') )

    await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
        .then( (result) => result.json() )
        // .then( (result) => console.log(result) )
        .then( (result) => fillCategorySelect( result.drinks, ingredientSelectElement, 'strIngredient1' ) )
        .catch( (error) => console.log(error) )
        .finally( () => console.log('Request finished 3') )

    console.timeEnd('await');
}

const fillCategorySelect = ( properties, selectElement, strFieldName ) =>
{
    let dynamicHtml = '';
    for ( const property of properties)
    {
        // console.log(category.strCategory);
        dynamicHtml += `<option value="${property[strFieldName]}">${property[strFieldName]}</option>`;
    }
    selectElement.innerHTML = dynamicHtml;
    // console.log(categoriesArray);
}

const getAllDrinks = async (  ) =>
{
    for ( let category of categoriesArray)
    {
        let dynamicUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.replaceAll( ' ', '_' )}`;
        const response = await fetch(dynamicUrl);
        const responseFromServer = await response.json();

        for ( const drink of responseFromServer.drinks )
        {
            drinksArray.push(drink);
        }
        // drinksArray.push(responseFromServer);
        // console.log( category.replaceAll( ' ', '_' ) );
        // console.log( dynamicUrl );
        // console.log( responseFromServer.drinks );
    }
}

const generateDrinksHtml = (drinks) =>
{
    let dynamicHtml = '';
    for ( const drink of drinks )
    {
        dynamicHtml += `<div class="col-4 my-3">
            <div class="card">
                <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
                <div class="card-body">
                    <h5 class="card-title">${drink.strDrink}</h5>
                </div>
            </div>
        </div>`;

    }
    cocktailAppHtml.innerHTML = dynamicHtml;
}

const init = async () =>
{
    await fillSelectElements();
    // console.log(categoriesArray);

    console.time('getAllDrinks');
    await getAllDrinks();
    console.timeEnd('getAllDrinks');
    console.log(drinksArray);

    generateDrinksHtml(drinksArray);

}

init();




