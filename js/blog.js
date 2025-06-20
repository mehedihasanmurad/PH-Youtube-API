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

//blogs data load korbe eikhane
const loadBlogs = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => displayBlogs(data.videos))
        .catch(error => console.log(error))
}
//blogs UI a dekhabo
const displayBlogs = (blogs) => {
    const blogsContainer = document.getElementById("blogs");
    blogs.forEach((blog) => {
        const cart = document.createElement("div");
        cart.classList = "card shadow-lg";
        cart.innerHTML = `
        <figure>
            <img class="h-50 w-full"
            src=${blog.thumbnail}
            alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">Card Title</h2>
            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;
        blogsContainer.appendChild(cart);
    })
}

loadCategories();
loadBlogs();