// import { pizzaIngrs } from "./utils/Igredients.js" <----- вот из-за этой балды HTML перестает работать с JS , в HTML писал type = "module", вроде бы, верно всё


//ингредиенты
const pizzaIngrs = {
    base: 4,
    cheesy: 8,
    meat: 10,
    sesame: 5,
    chicken:12,
    sausage:12,
    bacon:14,
    ham:13,
    onion:2,
    mozzarella:5,
    herbs:3,
    olives:2,
    tomato:3,
    пarlic:3,
    ketchunez:3,
    branded:4
};

//счетчик для картинки
let counter = 0;
// картинка
const pizzaImg = document.getElementById('order__img');


//кнопка для дизейбла
const button = document.getElementById('order__btn');



// основа для пиццы
const base = document.getElementById('ingr_main');
const baseUl = [...document.getElementById('main_list').children];

//мясные ингредиенты для пиццы
const meat = document.getElementById('ingr_meat');
const meatUl = [...document.getElementById('meat__list').children];

//дополнительные ингредиенты для пиццы
const addition = document.getElementById('ingr_addition');
const additionUl = [...document.getElementById('addition__list').children];

//соус для пиццы
const sause = document.getElementById('ingr_sauce');
const sauseUl = [...document.getElementById('sause__list').children];


//общая цена
let price = document.getElementById('order__price');

// список для заказа
const order = document.getElementById('order__list');


button.disabled = true;
button.addEventListener('click', makeOrder);



// здесь я описывал логику с добавлениями
base.addEventListener('click', function (e) {

    if (e.target.nodeName === 'LI') {
        if (!baseUl.find((item) => item.classList.contains('active'))) {
            e.target.classList.add('active');
            order.append(e.target.cloneNode(true));

            priceMaker();
            
        }
    }
    
});

meat.addEventListener('click', function (e) {
    if (e.target.nodeName === 'LI') {
        
        if (meatUl.filter((item) => item.classList.contains('active')).length < 2) {
            if (!e.target.classList.contains('active')) {
                e.target.classList.add('active');
                order.append(e.target.cloneNode(true));
                priceMaker();
            }
            
        }
    } 
});

addition.addEventListener('click', function (e) {
    if (e.target.nodeName === 'LI') {
        
        if (additionUl.filter((item) => item.classList.contains('active')).length < 2) {
            if (!e.target.classList.contains('active')) {
                e.target.classList.add('active');
                order.append(e.target.cloneNode(true));
                priceMaker();
            }
        }
    } 
});

sause.addEventListener('click', function (e) {

    if (e.target.nodeName === 'LI') {
        if (!sauseUl.find((item) => item.classList.contains('active'))) {
            e.target.classList.add('active');
            order.append(e.target.cloneNode(true));
            priceMaker();
        }
    }
    
});

// удаление элементов из заказа
order.addEventListener('click', function removeIngr(e) {
    if (e.target.nodeName === 'LI') {
        e.target.remove();
        if ([...e.target.classList].includes('base')) {
            baseUl.forEach((item) => {
                if (e.target.id === item.id) {
                    item.classList.remove('active');
                }
            })
        } else if ([...e.target.classList].includes('meat')) {
            meatUl.forEach((item) => {
                if (e.target.id === item.id) {
                    item.classList.remove('active');
                }
            });
        } else if ([...e.target.classList].includes('addition')) {
            additionUl.forEach((item) => {
                if (e.target.id === item.id) {
                    item.classList.remove('active');
                }
            });
        } else {
            sauseUl.forEach((item) => {
                if (e.target.id === item.id) {
                    item.classList.remove('active');
                }
            });
        }
        
        priceMaker();
    }
});

// изменение картинки
function makeImgControl(arr) {
    let counter = 0;
    arr.some(item => item.classList.contains(`base`)) ? ++counter : counter;
    arr.some(item => item.classList.contains(`meat`)) ? ++counter : counter;
    arr.some(item => item.classList.contains(`addition`)) ? ++counter : counter;
    arr.some(item => item.classList.contains(`sause`)) ? ++counter : counter;

    
    button.disabled = counter == 4 ? false : true;
    button.disabled === false ? button.classList.add('order__btn') : button.classList.remove('order__btn');
    
    counter > 0 ? pizzaImg.src = `./image/${counter}.png` : pizzaImg.src = ``;
}

// подсчёт цены, срабатывает каждый раз, когда добавляю или удаляю элемент
function priceMaker() {
    const orderList = [...document.getElementById('order__list').children];
    if (orderList.length) {
        orderList.reduce((acc, item) => {
            for (key in pizzaIngrs) {
                if (item.id === key) {
                    let accCopy = acc + pizzaIngrs[key];
                    price.textContent = `Цена: ${accCopy}$.`;
                    return accCopy;
                }
            }
    },0);
    } else {
        price.textContent = `Цена: 0$.`;
    }
    makeImgControl(orderList);
    
}
// конечный заказ в консоль
function makeOrder() {
    
    let a = [...document.getElementById('order__list').children];
    let obj = {
        Основа: a.filter(item => item.classList.contains('base'))[0].textContent,
        Ингридиенты: a.map(item => {
            if (item.classList.contains('meat')) {
                return item.textContent;
            }
        }).filter(item => item !== undefined),
        Дополнение: a.map(item => {
            if (item.classList.contains('addition')) {
                return item.textContent;
            }
        }).filter(item => item !== undefined),
        Соус: a.filter(item => item.classList.contains('sause'))[0].textContent,
        Итог: document.getElementById('order__price').textContent
    };
    console.log(obj);
    button.disabled = true;
}











