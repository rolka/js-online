console.clear();

const cocktailNameFilterElement = document.getElementById('cocktail-name-search');
const categorySelectElement = document.getElementById('category-select');
const glassTypeSelectElement = document.getElementById('glass-type-select');
const ingredientSelectElement = document.getElementById('ingredient-select');
const buttonSearch = document.getElementById('search');
const cocktailApp = document.getElementById('cocktails-app');

const drinksArray = [];
const selectValues = {};
const drinkModal = new bootstrap.Modal(document.getElementById('drinkModal'));

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

    fillCategorySelect(
        allCats.drinks,
        categorySelectElement,
        'strCategory',
        getLocalStorageItem('cocktail-search-category')
    );
    fillCategorySelect(
        allGlasses.drinks,
        glassTypeSelectElement,
        'strGlass',
        getLocalStorageItem('cocktail-search-glass')
    );
    fillCategorySelect(
        allIngredients.drinks,
        ingredientSelectElement,
        'strIngredient1',
        getLocalStorageItem('cocktail-search-ingredient')
    );
    console.log(selectValues);
}
const fillCategorySelect = ( properties, selectElement, strFieldName, searchField = '' ) =>
{
    console.log( 'ss: ' + searchField);
    // console.log( 'local cat: ' + getLocalStorageItem('cocktail-search-category'));

    let dynamicHtml = ``;
    for ( const property of properties )
    {
        // console.log(category.strCategory);
        let field = property[strFieldName];
        dynamicHtml +=
            `<option value="${field}" ${field === searchField ? 'selected' : ''}>${field}</option>`;
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
    
    if ( drinks !== null )
    {
        for ( const drink of drinks )
        {
            dynamicHtml += `<div class="col-4 my-3" id="${drink.idDrink}" onclick="openModal( event, ${drink.idDrink} )">
            <div class="card shadow">
                <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
                <div class="card-body placeholder-glow">
                    <h5 class="card-title">${drink.strDrink}</h5>
                </div>
            </div>
        </div>`;
        }
    }
    else
    {
        dynamicHtml = `<p class="text-center mt-5 fs-5">Sorry, no cocktails found :(</p>`;
    }
    
    cocktailApp.innerHTML = dynamicHtml;
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

    const ingredientsWithMeasures = [
        ['Peach Vodka', '2 oz'],
        ['Cola', '5 oz'],
    ];

    const maped = ingredientsWithMeasures.map( (value, index) =>
    {
        return value[index] + '---';
    });

    const ingredients = [];
    const measures = [];

    const ingsMes = [];
    const another = [];

    for (const prop in singleDrink)
    {
        if ( prop.startsWith("strIngredient") && singleDrink[prop] !== null
            || prop.startsWith("strMeasure") && singleDrink[prop] !== null )
        {
            another.push([singleDrink[prop]]);
        }

        if (prop.startsWith("strIngredient") && singleDrink[prop] !== null) {
            ingredients.push(singleDrink[prop]);
            ingsMes.push(singleDrink[prop]);
        } else if (prop.startsWith("strMeasure") && singleDrink[prop] !== null) {
            measures.push(singleDrink[prop]);
            ingsMes.push(singleDrink[prop]);
        }
    }

    const ingredientsWithMeasures2 = [];

    for (let i = 1; i <= 15; i++) {
        // const ingredient = singleDrink[`strIngredient${i}`];
        const ingredient = ingredients[i];
        // const measure = singleDrink[`strMeasure${i}`];
        const measure = measures[i];

        if (ingredient && measure) {
            ingredientsWithMeasures2.push([ingredient, measure.trim()]);
        }
    }

    console.log(ingredientsWithMeasures2);

    let dynamicHtml = '';
    for (let i = 0; i < ingredientsWithMeasures2.length; i++)
    {
        const [ingredient, measure] = ingredientsWithMeasures2[i];
        dynamicHtml += `<div class="col-6">
            <p class="fst-italic fw-bold m-0">${ingredient}</p>
        </div>
        <div class="col-6">
            <p class="fst-italic m-0">${measure}</p>
        </div>`;
        // console.log(`Ingredient: ${ingredient}, Measure: ${measure}`);
    }

    document.getElementById('modal-drink-ingredients').innerHTML = dynamicHtml;

    console.log(dynamicHtml);
    // console.log(maped);
    // console.log(ingredientsWithMeasures);


    // console.log(another);
    // console.log(ingsMes);
    console.log(ingredients);
    console.log(measures);

    for ( let i = 0; i < 15; i++ )
    {
        const ingredient = ingredients[i];
        const measure = measures[i];

        if ( ingredient && measure )
        {
            // console.log( ingredient );
            // console.log( measure );
        }
    }

    // const linkElement = document.createElement('a');
    // const pElement = document.createElement('p');
    // pElement.innerHTML = `${singleDrink.strCategory} / <a href="#">Show all</a>`;
    // linkElement.href = '#';

    /*
    * todo: create new function
    *  add eventListener for id modal-drink-category > a, get it's data-showcategory
    * on click: close modal and get show drink by selected category
    * */

    // const drinkModal = new bootstrap.Modal(document.getElementById('drinkModal'));
    document.getElementById('modal-drink-img').src = singleDrink.strDrinkThumb;
    document.getElementById('modal-drink-img').alt = singleDrink.strDrink;
    // document.getElementById('modal-drink-category').innerHTML = singleDrink.strCategory;
    // document.getElementById('modal-drink-category').innerHTML = linkElement;
    // document.getElementById('modal-drink-category').appendChild(pElement);
    document.getElementById('modal-drink-category').innerHTML =
        `${singleDrink.strCategory} / <a href="#" data-show-category="${singleDrink.strCategory}">Show all</a>`;

    // document.getElementById('modal-drink-alcoholic').innerHTML = singleDrink.strAlcoholic;
    document.getElementById('modal-drink-alcoholic').innerHTML =
        `${singleDrink.strAlcoholic} / <a href="#" data-show-alcoholic="${singleDrink.strAlcoholic}">Show all</a>`;
    // document.getElementById('modal-drink-glass').innerHTML = singleDrink.strGlass;
    document.getElementById('modal-drink-glass').innerHTML =
        `${singleDrink.strGlass} / <a href="#" data-show-glass="${singleDrink.strGlass}">Show all</a>`;
    document.getElementById('modal-drink-title').innerHTML = singleDrink.strDrink;
    document.getElementById('modal-drink-instructions').innerHTML = singleDrink.strInstructions;

    drinkModal.show();

    showDrinksByParameter();

    // alert(drinkId);
}

// Set an item in localStorage
// const setLocalStorageItem = (key, value) => {
//     try {
//         localStorage.setItem(key, JSON.stringify(value));
//         console.log(`Item with key '${key}' successfully set in localStorage.`);
//     } catch (error) {
//         console.error(`Error setting item with key '${key}' in localStorage:`, error);
//     }
// };

const setLocalStorageItem = (key, value) =>
{
    try {
        localStorage.setItem(key, JSON.stringify(value));
        console.log(`Item with key '${key}' successfully set in localStorage.`);
    } catch (error) {
        console.error(`Error setting item with key '${key}' in localStorage:`, error);
    }
}

const getLocalStorageItem = (key) => {
    try {
        const storedValue = localStorage.getItem(key);
        if (storedValue !== null) {
            // Parse the JSON string to convert it back to its original form
            return JSON.parse(storedValue);
        } else {
            console.warn(`No item found in localStorage with key '${key}'.`);
            return null;
        }
    } catch (error) {
        console.error(`Error getting item from localStorage with key '${key}':`, error);
        return null;
    }
}

const removeLocalStorageItem = (key) => {
    try {
        localStorage.removeItem(key);
        console.log(`Item with key '${key}' successfully removed from localStorage.`);
    } catch (error) {
        console.error(`Error removing item with key '${key}' from localStorage:`, error);
    }
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

        setLocalStorageItem('cocktail-search-category', category);

    }
    else if ( category === '0' )
    {
        removeLocalStorageItem( 'cocktail-search-category' );
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

        setLocalStorageItem('cocktail-search-glass', glass);

    }
    else if ( glass === '0' )
    {
        removeLocalStorageItem('cocktail-search-glass');
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

        setLocalStorageItem('cocktail-search-ingredient', ingredient);
    }
    else if ( ingredient === '0' )
    {
        removeLocalStorageItem('cocktail-search-ingredient');
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

    const category = categorySelectElement.value;
    const glass = glassTypeSelectElement.value;
    const ingredient = ingredientSelectElement.value;
    if ( category !== '0' || glass !== '0' || ingredient !== '0' )
    {
        // alert(category);
        buttonSearch.click();
    }
    else
    {
        // alert('it is clear');
        generateDrinksHtml(drinksArray);
    }

    // generateDrinksHtml(drinksArray);

    await generateLetterButtons();
    // document.querySelector('.card-title.placeholder').classList.remove('placeholder');

    // await showDrinksByParameter();

}

buttonSearch.addEventListener('click', filter);
// luckyButton.addEventListener( 'click', openModal(0, true) )
// luckyButton.addEventListener( onclick, openModal( 0, false) )

init();


const filterByLetter = async ( letter ) =>
{
    // console.log( letter );
    const promise =
        await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
    const drinksByLetter = await promise.json();
    console.log(drinksByLetter.drinks);
    generateDrinksHtml(drinksByLetter.drinks);
}
const generateLetterButtons = async () =>
{
    const drinksCloud = document.getElementById('drinks-cloud');

    let dynamicHtml = '';
    for ( let i = 65 ; i <= 90; i++ )
    {
        dynamicHtml +=
            `<a class="btn btn-secondary btn-sm me-1 mt-1" href="#" role="button" data-letter="${String.fromCharCode(i)}">${String.fromCharCode(i)}</a>`
    }
    drinksCloud.innerHTML = dynamicHtml;

    drinksCloud.addEventListener('click', function (event)
    {
        // link clicked (a element)
        const target = event.target;
        const activeButtonClass = 'btn-primary';
        const buttonClass = 'btn-secondary';

        const allLinks = drinksCloud.getElementsByTagName('a');
        for ( const link of allLinks )
        {
            if (link !== target)
            {
                link.classList.remove(activeButtonClass);
                link.classList.add(buttonClass);
            }
        }

        if (target.tagName === 'A')
        {
            event.preventDefault();
            target.classList.add(activeButtonClass);
            target.classList.remove(buttonClass);
            filterByLetter(target.getAttribute('data-letter'));
        }
    });

    document.getElementById('clearLetterFilter').addEventListener( 'click', ( event ) =>
    {
        event.preventDefault();
        const activeButtonClass = 'btn-primary';
        const buttonClass = 'btn-secondary';
        const allLinks = drinksCloud.getElementsByTagName('a');
        for ( const link of allLinks )
        {
            link.classList.remove(activeButtonClass);
            link.classList.add(buttonClass);
        }
        generateDrinksHtml(drinksArray);
    })

}

const requestForGetDrinksBy = async ( url ) =>
{
    drinkModal.hide();
    const promise = await fetch(url)
    const drinksOfCategory = await promise.json();
    console.log(drinksOfCategory.drinks);
    generateDrinksHtml(drinksOfCategory.drinks);
    console.log(`getDrinksBy DONE`);
}

const getDrinksBy = async ( filter, param ) =>
{
    if ( filter === 'alcoholic' )
    {
        await requestForGetDrinksBy( `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${param}` );
    }
    else if ( filter === 'category' )
    {
        await requestForGetDrinksBy( `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${param}` );
    }
}

const showDrinksByParameter = async () =>
{
    const showCategory = document.querySelector('#modal-drink-category a');
    const showAlco = document.querySelector('#modal-drink-alcoholic a');
    // const showCategory = document.querySelector('#data-show-alcoholic a');
    const showAllLink = document.querySelector('#drinkModal a');

    showCategory.addEventListener( 'click', ( event ) =>
    {
        const categoryToShow = event.target.dataset.showCategory;
        getDrinksBy( 'category', categoryToShow.replaceAll( ' ', '_' ));

        alert(categoryToShow.replaceAll( ' ', '_' ));
    });

    showAlco.addEventListener( 'click', ( event ) =>
    {
        const categoryToShow = event.target.dataset.showAlcoholic;
        getDrinksBy( 'alcoholic', categoryToShow.replaceAll( ' ', '_' ));

        alert(categoryToShow.replaceAll( ' ', '_' ));
    });


    // showCategory.addEventListener('click', function(event)
    showAllLink.addEventListener('click', function(event)
    {
        event.preventDefault();

        console.log(showAllLink);

        const attributes = showAllLink.attributes;

        for (let i = 0; i < attributes.length; i++)
        {
            const attributeName = attributes[i].name;

            if (attributeName.startsWith('data-'))
            {
                console.log('Data attribute name:', attributeName);

                if ( attributeName === 'data-show-category' )
                {
                    const categoryToShow = event.target.dataset.showCategory;
                    alert(categoryToShow);
                    getDrinksBy(categoryToShow.replaceAll( ' ', '_' ));
                }
                else if ( attributeName === 'data-show-alcoholic' )
                {
                    const categoryToShow = event.target.dataset.showAlcoholic;
                    alert(categoryToShow);
                    getDrinksBy(categoryToShow.replaceAll( ' ', '_' ));
                }

            }
        }


        // const categoryToShow = showCategory.dataset.showCategory;
        // console.log(categoryToShow);
        // getDrinksBy(categoryToShow.replaceAll( ' ', '_' ));

    });




}




