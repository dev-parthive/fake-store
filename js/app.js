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
searchField.addEventListener('keypress',  async(event)=>{
    // console.log(event.key);
    if(event.key === 'Enter'){
        console.log(searchField.value)
    }
})