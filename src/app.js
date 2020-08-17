 const path=  require('path')
const express = require('express')
const app = express()
const hbs= require('hbs')
const geocode  =require('./utils/geocode')
const forecast=require('./utils/forecast')

//define paths for Express config
const publicDirectorypath = path.join(__dirname,'../public')
const viewspath= path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app. set('views',viewspath)
hbs.registerPartials(partialspath)


//setup static directory  to serve
app.use(express.static(publicDirectorypath))

app.get('', (req,res)=>{
    res.render('index',{
        title:'index', 
        name:'Sravani'
    })
}) 

app.get('/help',(req,res)=> {
res.render('help',{
    helptext:'This is help text',
    name:'Sravani',
        Age:'27',
        title:'help page'

})
})
app.get('/about',(req,res)=>{

    res.render('about',{
        name:'Sravani',
        title:'about page'
    })

})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error :'you mush provide an address'

        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if (error){
        return res.send({error})
        }

        forecast(latitude,longitude,(error, forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address


            })


        })

    })
    
})
app.get('/products', (req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'you mus provide a search term'
        })
    }
console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        error:'Help Article not found'})
})
app.get('/*',(req,res)=>{
    res.render('404',{
        error:'page not found'})
})
app.listen(3000,() =>{

    console.log('server is up on port 3000')
})