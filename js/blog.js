//data load korbo eikhane
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
}

//user ba UI te dekhabo
const displayCategories = (categories) => {
    console.log(categories);
}

loadCategories();