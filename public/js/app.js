console.log('client side javascript file is loaded')

fetch('http://localhost:3000/weather?address=!').then((response)=>{

    response.json().then((data)=>{
   
         if(data.error){
        console.log(data.error)
} else{
            console.log(data.location)
            console.log(data.forecast)
}
})
})

const weatherForm = document.querySelector('form')
const Search = document.querySelecter('input')

weatherForm.addEventListner('submit',(e)=>{
    e.preventDefault()
    const location =search.value
    console.log(location)
})