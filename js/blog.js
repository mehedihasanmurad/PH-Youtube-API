//time pathanor jonno
function getTimeString(time) {
    const hours = parseInt(time / 3600);
    const remainingSecond = time % 3600;
    const minutes = parseInt(remainingSecond / 60);
    const seconds = parseInt(remainingSecond / 60);
    return `${hours}hrs ${minutes}min ${seconds}sec ago`
}

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
        console.log(blog);
        const cart = document.createElement("div");
        cart.classList = "card shadow-lg";
        cart.innerHTML = `
        <figure class="relative">
            <img class="h-50 w-full"
            src=${blog.thumbnail}
            alt="Shoes" />
            ${blog.others.posted_date?.length === 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black text-white rounded p-1">${getTimeString(blog.others.posted_date)}</span>`}
            
        </figure>
        <div class="flex gap-3 px-0 py-10">
            <div>
                <img class="w-10 h-10 rounded-full" src=${blog.authors[0].profile_picture}/>
            </div>
            <div>
                <h2 class="font-bold">${blog.title}</h2>
                <div class="flex items-center gap-3">
                    <p>${blog.authors[0].profile_name}</p>
                    ${blog.authors[0].verified === true ? `<img class="w-5" src="assest/verified.png" alt="">` : ''}
                </div>
            </div>
            <div></div>
        </div>
        `;
        blogsContainer.appendChild(cart);
    })
}

loadCategories();
loadBlogs();