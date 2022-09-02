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
        console.log(foundProducts)
        const prodcutsContainer =  document.getElementById('products-container');
        prodcutsContainer.textContent = ''


        // No prodcuts to show message 
        if(foundProducts.length === 0 ){
            prodcutsContainer.innerHTML = `
            
            <h3 class="text-center" style="font-size: 40px; "> No products to show </h3>
            
            `
        }

        
        foundProducts.forEach(product => {
            console.log(product)
            const {category, image, title} = product

            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card card-compact w-full bg-base-100 shadow-xl">
  <figure><img src="${image}" alt="Shoes" class="h-60 w-full" /></figure>
  <div class="card-body">
    <h2 class="card-title">${category}!</h2>
    <p>${title.length > 20 ? title.slice(0,20) + '....': title}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Show Details</button>
    </div>
  </div>
</div>
            
            `;
            prodcutsContainer.appendChild(div)
        });
    }
})