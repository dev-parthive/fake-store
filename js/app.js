const loadAllProducts = async() =>{
    const  res =  await fetch('https://fakestoreapi.com/products')
    const data = await res.json() 
    // console.log(data)
    return data;

}

const setAllMenu = async() =>{
    // console.log(loadAllProducts())

    //first way using then

    // loadAllProducts()
    // .then(data => console.log(data))
    // second method using aync and await 

    const data = await loadAllProducts();

    const menu = document.getElementById('all-menu')

    const uniqueArray = []


    for(const product of data){

        // console.log(product.category)
        //

        if(uniqueArray.indexOf(product.category) === -1){
            uniqueArray.push(product.category)
            const li = document.createElement('li')
            li.innerHTML = `<a> ${product.category}</a>`
            menu.appendChild(li)
        }
    }
    // console.log(uniqueArray)
}

setAllMenu()
// loadAllProducts()

const searchField = document.getElementById('search-field'); 
searchField.addEventListener('keypress',  async (event)=>{
    // console.log(event.key);
    if(event.key === 'Enter'){
        // console.log(searchField.value)
        const searchValue = searchField.value ;
        const allProducts =  await loadAllProducts();
        // console.log(allProducts)
        const foundProducts = allProducts.filter(product => product.category.includes(searchValue))
        // console.log(foundProducts)
        const prodcutsContainer =  document.getElementById('products-container');
        prodcutsContainer.textContent = ''
        const notFound = document.getElementById('not-found');
        notFound.textContent = ''


        // No prodcuts to show message 
        if(foundProducts.length === 0 ){
            notFound.innerHTML = `<h2 class="font-2xl text-orange-500 text-center">Not Found</h2>`
            return;
        }

        
        foundProducts.forEach(product => {
            // console.log(product)
            const {category, image, title , description} = product

            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card card-compact w-full bg-base-100 shadow-xl">
  <figure><img src="${image}" alt="Shoes" class="h-60 w-full" /></figure>
  <div class="card-body">
    <h2 class="card-title">${category}!</h2>
    <p>${title.length > 20 ? title.slice(0,20) + '....': title}</p>
    <div class="card-actions justify-end">
    <label for="my-modal-3" class="btn btn-primary modal-button" onclick="showModal('${description}','${image}')">Show Details</label>
    </div>
  </div>
</div>
            
            `;
            prodcutsContainer.appendChild(div)
        });
    }
})

// modal 
const showModal = (description, image)=>{
    const modalBody = document.getElementById('modal-body');
    modalBody.textContent = ''
    modalBody.innerHTML = `
    <img src="${image}" class="text-lg font-bold">
    <p class="py-4">${description}</p>
    
    `
}