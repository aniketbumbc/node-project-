const express= require('express'); // express impl
const hbs=require('hbs'); //hbs is a express.js wrapper for the handlebars.js javascript template engine. 
const fs=require('fs');
const port=process.env.PORT || 3000; // for heroku code need port 

var app= express ();

hbs.registerPartials(__dirname+ '/views/partials') // create partials which implemented in about and home as footer 

//adding middleware 
app.set('view engine','hbs');

app.use((req,res,next) => {
    var now = new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`;
    console.log(log); // request method and url of page in console 
    fs.appendFile('server.log',log +'\n',(err)=>{
if(err)
{
    Console.log('Unable to handle error');
}
   })
next();
});



// app.use((req,res,next)=> {
// res.render('mantainces.hbs');
// });

app.use(express.static(__dirname + '/public')); // setup outside directory by using middleware


hbs.registerHelper('getFullYear',()=>{   // implemented helper 
return new Date().getFullYear() 
});

hbs.registerHelper('scremIt',(text)=>{

return text.toUpperCase();
});





app.get('/',(req,res)=>{
   // res.send('<h1>Hello Aniker From Express </h1>');   
   //res.send({
//name:'Aniket', 
//number:343434,     // make JOSON object 
//city:'Baltimore',
//hobies:
//[  'Biking',
  //  'Swimming']
  //})
  res.render('home.hbs',{
       Meassage:'Welcome Home Page ',
      
    });
});


app.get('/about',(req,res)=>{
    res.render('about.hbs',{
       pagetTitle:'About Page',   
    });
});

app.get('/project',(req,res)=>{
    res.render('project.hbs',{
       pagetTitle:'Welcome to Projects page',
    
    });
});




//bad route json data error meassage 

app.get('/bad',(req,res)=>{
res.send({
Meassage:'This is bad Data'
});
});


app.listen(port,()=>{

    console.log(`Hello console Serverup ${port}` );
});