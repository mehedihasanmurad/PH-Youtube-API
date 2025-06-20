//data load korbo eikhane
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
}

//user ba UI te dekhabo
const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("categories");
    categories.forEach((category) => {
        const button = document.createElement("button");
        button.classList = "btn";
        button.innerText = category.category;
        categoriesContainer.appendChild(button);
    });
}

loadCategories();