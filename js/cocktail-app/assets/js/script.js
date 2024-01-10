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
}
const fillCategorySelect = ( properties, selectElement, strFieldName, searchField = '' ) =>
{
    const dynamicHtml = properties.map(property =>
    {
        const field = property[strFieldName];
        return `<option value="${field}" ${field === searchField ? 'selected' : ''}>${field}</option>`;
    }).join('');
    selectElement.innerHTML += dynamicHtml;
}

const getAllDrinks = async () =>
{
    const categoryDrinksUrls = [];
    for ( let category of selectValues.categories)
    {
        let dynamicUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.replaceAll( ' ', '_' )}`;
        categoryDrinksUrls.push(dynamicUrl);
    }

    const allPromises = categoryDrinksUrls.map( (url) =>
    {
        return fetch(url).then( (resp) => resp.json() );
    })
    const allValues = await Promise.all(allPromises);
    allValues.forEach( (drink) =>
    {
        drinksArray.push( ...drink.drinks );
    })
}
const generateDrinksHtml = ( drinks ) =>
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
const openModal = async ( event, drinkId ) =>
{
    event.preventDefault();
    let promise;
    if ( drinkId !== 0 )
    {
        promise = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
    }
    else
    {
        promise = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
    }

    const data = await promise.json();
    const singleDrink = data.drinks[0];

    const ingredients = [];
    const measures = [];
    for (const prop in singleDrink)
    {
        if (prop.startsWith("strIngredient") && singleDrink[prop] !== null) {
            ingredients.push(singleDrink[prop]);
        } else if (prop.startsWith("strMeasure") && singleDrink[prop] !== null) {
            measures.push(singleDrink[prop]);
        }
    }

    const ingredientsWithMeasures = [];

    for (let i = 1; i <= 15; i++)
    {
        const ingredient = ingredients[i];
        const measure = measures[i];

        if (ingredient && measure)
        {
            ingredientsWithMeasures.push([ingredient, measure.trim()]);
        }
    }

    let dynamicHtml = '';
    for (let i = 0; i < ingredientsWithMeasures.length; i++)
    {
        const [ingredient, measure] = ingredientsWithMeasures[i];
        dynamicHtml += `<div class="col-6">
            <p class="fst-italic fw-bold m-0">${ingredient}</p>
        </div>
        <div class="col-6">
            <p class="fst-italic m-0">${measure}</p>
        </div>`;
    }

    document.getElementById('modal-drink-ingredients').innerHTML = dynamicHtml;
    document.getElementById('modal-drink-img').src = singleDrink.strDrinkThumb;
    document.getElementById('modal-drink-img').alt = singleDrink.strDrink;
    document.getElementById('modal-drink-category').innerHTML =
        `${singleDrink.strCategory} / <a href="#" data-show-category="${singleDrink.strCategory}">Show all</a>`;
    document.getElementById('modal-drink-alcoholic').innerHTML =
        `${singleDrink.strAlcoholic} / <a href="#" data-show-alcoholic="${singleDrink.strAlcoholic}">Show all</a>`;
    document.getElementById('modal-drink-glass').innerHTML =
        `${singleDrink.strGlass} / <a href="#" data-show-glass="${singleDrink.strGlass}">Show all</a>`;
    document.getElementById('modal-drink-title').innerHTML = singleDrink.strDrink;
    document.getElementById('modal-drink-instructions').innerHTML = singleDrink.strInstructions;

    drinkModal.show();
    await showDrinksByParameter();
}
const setLocalStorageItem = ( key, value ) =>
{
    try {
        localStorage.setItem(key, JSON.stringify(value));
        console.log(`Item with key '${key}' successfully set in localStorage.`);
    }
    catch (error)
    {
        console.error(`Error setting item with key '${key}' in localStorage:`, error);
    }
}
const getLocalStorageItem = ( key ) =>
{
    try {
        const storedValue = localStorage.getItem(key);
        if (storedValue !== null)
        {
            return JSON.parse(storedValue);
        }
        else
        {
            console.warn(`No item found in localStorage with key '${key}'.`);
            return null;
        }
    } catch (error)
    {
        console.error(`Error getting item from localStorage with key '${key}':`, error);
        return null;
    }
}
const removeLocalStorageItem = ( key ) =>
{
    try {
        localStorage.removeItem(key);
        console.log(`Item with key '${key}' successfully removed from localStorage.`);
    } catch (error)
    {
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
        filteredArray = filteredArray.filter( (value) =>
        {
            return value.strDrink.toLowerCase().includes(searchValue.toLowerCase());
        })
        generateDrinksHtml(filteredArray);
    }
    if ( category !== '0' )
    {
        const promise =
            await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.replaceAll( ' ', '_' )}`)
        const drinksOfCategory = await promise.json();
        filteredArray = filteredArray.filter( (drink) =>
        {
            return drinksOfCategory.drinks.some(
                (drinksOfCategory) => drink.idDrink === drinksOfCategory.idDrink
            )
        })
        setLocalStorageItem('cocktail-search-category', category);
    }
    else if ( category === '0' )
    {
        removeLocalStorageItem( 'cocktail-search-category' );
    }
    if ( glass !== '0' )
    {
        const promise =
            await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass.replaceAll( ' ', '_' )}`)
        const drinksOfGlass = await promise.json();

        filteredArray = filteredArray.filter( (drink) =>
            drinksOfGlass.drinks.some(
                (drinksOfGlass) => drink.idDrink === drinksOfGlass.idDrink
            )
        )
        setLocalStorageItem('cocktail-search-glass', glass);
    }
    else if ( glass === '0' )
    {
        removeLocalStorageItem('cocktail-search-glass');
    }
    if ( ingredient !== '0' )
    {
        const promise =
            await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient.replaceAll( ' ', '_' )}`)
        const drinksOfIngredient = await promise.json();
        filteredArray = filteredArray.filter( (drink) =>
            drinksOfIngredient.drinks.some(
                (drinksOfIngredient) => drink.idDrink === drinksOfIngredient.idDrink
            )
        )
        setLocalStorageItem('cocktail-search-ingredient', ingredient);
    }
    else if ( ingredient === '0' )
    {
        removeLocalStorageItem('cocktail-search-ingredient');
    }
    generateDrinksHtml(filteredArray);
};

const init = async () =>
{
    await fillSelectElements();
    await getAllDrinks();

    const category = categorySelectElement.value;
    const glass = glassTypeSelectElement.value;
    const ingredient = ingredientSelectElement.value;
    if ( category !== '0' || glass !== '0' || ingredient !== '0' )
    {
        buttonSearch.click();
    }
    else
    {
        generateDrinksHtml(drinksArray);
    }
    await generateLetterButtons();
}

buttonSearch.addEventListener('click', filter);

init();
const filterByLetter = async ( letter ) =>
{
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
const requestForGetDrinksByUrl = async ( url ) =>
{
    drinkModal.hide();
    const promise = await fetch(url)
    const drinksOfCategory = await promise.json();
    generateDrinksHtml(drinksOfCategory.drinks);
}

const getDrinksBy = async ( filter, param ) =>
{
    if ( filter === 'alcoholic' )
    {
        await requestForGetDrinksByUrl( `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${param}` );
    }
    else if ( filter === 'category' )
    {
        await requestForGetDrinksByUrl( `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${param}` );
    }
}
const showDrinksByParameter = async () =>
{
    const showCategory = document.querySelector('#modal-drink-category a');
    const showAlco = document.querySelector('#modal-drink-alcoholic a');

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
}




