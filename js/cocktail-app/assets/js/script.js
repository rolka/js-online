console.clear();
// alert('works');

const cocktailNameFilterElement = document.getElementById('cocktail-name-search');
const categorySelectElement = document.getElementById('category-select');
const glassTypeSelectElement = document.getElementById('glass-type-select');
const ingredientSelectElement = document.getElementById('ingredient-select');

const buttonSearch = document.getElementById('search');
const luckyButton = document.getElementById('im-lucky');

const cocktailAppHtml = document.getElementById('cocktails-app');

// const categoriesArray = [];
const drinksArray = [];

const selectValues = {};

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

    selectValues.categories = allCats.drinks.map(
        ( cat ) => cat.strCategory
    );

    selectValues.glasses = allGlasses.drinks.map( (glass) =>
    {
        return glass.strGlass;
    });

    selectValues.ingredients = allIngredients.drinks.map( (ing) =>
    {
        return ing.strIngredient1
    });

    fillCategorySelect( allCats.drinks, categorySelectElement, 'strCategory' );
    fillCategorySelect( allGlasses.drinks, glassTypeSelectElement, 'strGlass' );
    fillCategorySelect( allIngredients.drinks, ingredientSelectElement, 'strIngredient1' );

    console.log(selectValues);

    // console.log(allCats);
    // console.log(allGlasses);
    // console.log(allIngredients);

    // console.log(allPromises);
    // console.log(allValues);

    // console.time('await');
    // await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    //     .then( (result) => result.json() )
    //     // .then( (result) => console.log(result) )
    //     .then( (result) =>
    //     {
    //         fillCategorySelect( result.drinks, categorySelectElement, 'strCategory' );
    //         categoriesArray.push(
    //             ...result.drinks.map( (val) => val.strCategory )
    //         );
    //     })
    //     .catch( (error) => console.log(error) )
    //     .finally( () => console.log('Request finished 1') )
    //
    // await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list')
    //     .then( (result) => result.json() )
    //     // .then( (result) => console.log(result) )
    //     .then( (result) => fillCategorySelect( result.drinks, glassTypeSelectElement, 'strGlass' ) )
    //     .catch( (error) => console.log(error) )
    //     .finally( () => console.log('Request finished 2') )
    //
    // await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    //     .then( (result) => result.json() )
    //     // .then( (result) => console.log(result) )
    //     .then( (result) => fillCategorySelect( result.drinks, ingredientSelectElement, 'strIngredient1' ) )
    //     .catch( (error) => console.log(error) )
    //     .finally( () => console.log('Request finished 3') )
    // console.timeEnd('await');
}

const fillCategorySelect = ( properties, selectElement, strFieldName ) =>
{
    let dynamicHtml = ``;
    for ( const property of properties)
    {
        // console.log(category.strCategory);
        dynamicHtml += `<option value="${property[strFieldName]}">${property[strFieldName]}</option>`;
    }
    selectElement.innerHTML += dynamicHtml;
    // console.log(categoriesArray);
}

const getAllDrinks = async (  ) =>
{
    const categoryDrinksUrls = [];
    for ( let category of selectValues.categories)
    {
        let dynamicUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.replaceAll( ' ', '_' )}`;
        // const response = await fetch(dynamicUrl);
        // const responseFromServer = await response.json();

        categoryDrinksUrls.push(dynamicUrl);

        // for ( const drink of responseFromServer.drinks )
        // {
        //     drinksArray.push(drink);
        // }

        // drinksArray.push(responseFromServer);
        // console.log( category.replaceAll( ' ', '_' ) );
        // console.log( dynamicUrl );
        // console.log( responseFromServer.drinks );
    }

    const allPromises = categoryDrinksUrls.map( (url) =>
    {
        return fetch(url).then( (resp) => resp.json() );
    })

    const allValues = await Promise.all(allPromises);

    allValues.forEach( (drink) =>
    {
        // console.log(drink.drinks);
        drinksArray.push( ...drink.drinks );
    })

    // console.log(allPromises);
    // console.log(allValues);
    console.log(drinksArray);

}

const generateDrinksHtml = (drinks) =>
{
    let dynamicHtml = '';
    for ( const drink of drinks )
    {
        dynamicHtml += `<div class="col-4 my-3" id="${drink.idDrink}" onclick="openModal( event, ${drink.idDrink} )">
            <div class="card">
                <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
                <div class="card-body placeholder-glow">
                    <h5 class="card-title">${drink.strDrink}</h5>
                </div>
            </div>
        </div>`;
    }
    cocktailAppHtml.innerHTML = dynamicHtml;
}

const openModal = async ( event, drinkId) =>
{
    event.preventDefault();
    // console.log( event );
    console.log( drinkId );
    // console.log( isRandom );
    // return;
    let promise = {};
    if ( drinkId !== 0 )
    {
        promise = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
    }
    else
    {
        promise = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
    }

    const data = await promise.json();

    // console.log(data.drinks[0].strCategory);

    const singleDrink = data.drinks[0];
    console.log( singleDrink );

    const ingredients = [];
    const measures = [];
    for (const prop in singleDrink) {
        if (prop.startsWith("strIngredient") && singleDrink[prop] !== null) {
            ingredients.push(singleDrink[prop]);
        } else if (prop.startsWith("strMeasure") && singleDrink[prop] !== null) {
            measures.push(singleDrink[prop]);
        }
    }
    console.log(ingredients);
    console.log(measures);


    const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    document.getElementById('modal-drink-img').src = singleDrink.strDrinkThumb;
    document.getElementById('modal-drink-img').alt = singleDrink.strDrink;
    document.getElementById('modal-drink-category').innerHTML = singleDrink.strCategory;
    document.getElementById('modal-drink-alcoholic').innerHTML = singleDrink.strAlcoholic;
    document.getElementById('modal-drink-glass').innerHTML = singleDrink.strGlass;
    document.getElementById('modal-drink-title').innerHTML = singleDrink.strDrink;
    document.getElementById('modal-drink-instructions').innerHTML = singleDrink.strInstructions;

    myModal.show();
    // alert(drinkId);
}

const filter = async (event) =>
{
    event.preventDefault();
    const searchValue = cocktailNameFilterElement.value;
    const category = categorySelectElement.value;
    const glass = glassTypeSelectElement.value;
    const ingredient = ingredientSelectElement.value;

    let filteredArray = [...drinksArray];

    if ( searchValue )
    {
        console.log( `Search value: ${searchValue}` );

        filteredArray = filteredArray.filter( (value) =>
        // const found = [...drinksArray].filter( (value) =>
        {
            // return value.strDrink.toLowerCase() === searchValue.toLowerCase();
            return value.strDrink.toLowerCase().includes(searchValue.toLowerCase());
        })
        // generateDrinksHtml(found);
        generateDrinksHtml(filteredArray);
        // console.log(found);
    }

    if ( category !== '0' )
    {
        console.log( `Category search value: ${category}`);
        const promise =
            await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.replaceAll( ' ', '_' )}`)
        const drinksOfCategory = await promise.json();
        console.log(drinksOfCategory);

        filteredArray = filteredArray.filter( (drink) =>
        {
            return drinksOfCategory.drinks.some(
                (drinksOfCategory) => drink.idDrink === drinksOfCategory.idDrink
            )
        })
        console.log(filteredArray);
    }

    if ( glass !== '0' )
    {
        console.log( `Glass search value: ${glass}`);
        const promise =
            await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass.replaceAll( ' ', '_' )}`)

        const drinksOfGlass = await promise.json();
        console.log(drinksOfGlass);

        filteredArray = filteredArray.filter( (drink) =>
            drinksOfGlass.drinks.some(
                (drinksOfGlass) => drink.idDrink === drinksOfGlass.idDrink
            )
        )
        console.log(filteredArray);
    }

    if ( ingredient !== '0' )
    {
        console.log( `Ingredient search value: ${ingredient}`);
        const promise =
            await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient.replaceAll( ' ', '_' )}`)
        const drinksOfIngredient = await promise.json();
        console.log(drinksOfIngredient);

        filteredArray = filteredArray.filter( (drink) =>
            drinksOfIngredient.drinks.some(
                (drinksOfIngredient) => drink.idDrink === drinksOfIngredient.idDrink
            )
        )
        console.log(filteredArray);

    }

    generateDrinksHtml(filteredArray);
    // console.log(filteredArray)

};

const init = async () =>
{
    await fillSelectElements();
    // console.log(categoriesArray);

    console.time('getAllDrinks');
    await getAllDrinks();
    console.timeEnd('getAllDrinks');
    console.log(drinksArray);

    // document.getElementById('cocktails-app').classList.add('added-shit');

    generateDrinksHtml(drinksArray);

    // document.querySelector('.card-title.placeholder').classList.remove('placeholder');

}

buttonSearch.addEventListener('click', filter);
// luckyButton.addEventListener( 'click', openModal(0, true) )
// luckyButton.addEventListener( onclick, openModal( 0, false) )

init();




