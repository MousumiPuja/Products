var http = require('http');
var express = require('express');
var app = express();
var server = http.Server(app);
var bodyParser = require('body-parser');
var mongo = require('mongodb')

var db_url = "mongodb://localhost:27017"

mongo.MongoClient.connect(db_url, {useNewUrlParser:true},
  function(err,client){
   if(err){
     console.log("Could not connect DB")
   }else{
     db = client.db('node-cw9')
   }
  })

  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented:true}))

  app.get('/' , function(req,res){
    res.sendFile(__dirname+'/index.html')
})

var products = [
    {name: "Wonder Woman Figurine", price: "12", image: "https://s3.amazonaws.com/mernbook/marketplace/wonder-woman-2977918_960_720.jpg"},
    {name: "Darth Vader Figurine", price: "19", image: "https://s3.amazonaws.com/mernbook/marketplace/star-wars-2463926_960_720.png"},
    {name: "Joker Figurine", price: "51", image: "https://s3.amazonaws.com/mernbook/marketplace/joker-1225051_960_720.jpg"},
    {name: "Tardis Figurine", price: "14", image: "https://s3.amazonaws.com/mernbook/marketplace/tardis.png"},
    {name: "Old Ford Car Model", price: "46", image: "https://s3.amazonaws.com/mernbook/marketplace/Ford.jpg"},
    {name: "Storm Trooper Figurine", price: "23", image: "https://s3.amazonaws.com/mernbook/marketplace/stormtrooper-1995015_960_720.jpg"}
  ];
  var cart = {
    items: [],
    total: 0
  };

  $(document).ready(function(){
    console.log(localStorage.getItem('cart'))
    if(localStorage.getItem('cart')){
      //populate the cart view with cart from localstorage
      cart = JSON.parse(localStorage.getItem('cart'))
      for(var i = 0; i < cart.items.length; i++){
        var divCol = $('<div class="col-md-4">')
        var divCard = $('<div class="card">')
        var image = $('<img class="card-img-top" src="'+cart.items[i].image+'" />')
        var divCardBody = $('<div class="card-body">')
        var title = $('<h5 class="card-title">'+cart.items[i].name+'</h5>')
        var text = $('<p class="card-text">$ '+cart.items[i].price+' x <input type="number" min="0"></p>')
        divCard.append(image)
        divCardBody.append(title)
        divCardBody.append(text)
        divCard.append(divCardBody)
        divCol.append(divCard)
        $('#cart .row').append(divCol)
      }
    }
    console.log("Start here");
    
    $('#showCartBtn').click(function(){
      $('#cart').show();
    })
  
    $('#close').click(function(){
      $('#cart').hide();
    })
    
   
    for(var i = 0; i  < products.length; i++){
        var divCol = $('<div class="col-md-4">')
        var divCard = $('<div class="card">')
        var image = $('<img class="card-img-top" src="'+products[i].image+'" />')
        var divCardBody = $('<div class="card-body">')
        var title = $('<h5 class="card-title">'+products[i].name+'</h5>')
        var text = $('<p class="card-text">$ '+products[i].price+'</p>')
        var cartBtn = $('<button class="btn btn-primary cartCSS">Add to Cart</button>')
        cartBtn.attr('id', i)
        divCard.append(image)
        divCardBody.append(title)
        divCardBody.append(text)
        divCardBody.append(cartBtn)
        divCard.append(divCardBody)
        divCol.append(divCard)
        $('#products .row').append(divCol)
    }
  
    
    $('.cartCSS').click(function(event){
      $(this).prop('disabled', true)
      var index = event.target.id
      cart.items.push(products[index]);
      localStorage.setItem('cart', JSON.stringify(cart))
      $('#itemNo').text(cart.items.length); 
  
    
      var divCol = $('<div class="col-md-4">')
        var divCard = $('<div class="card">')
        var image = $('<img class="card-img-top" src="'+products[index].image+'" />')
        var divCardBody = $('<div class="card-body">')
        var title = $('<h5 class="card-title">'+products[index].name+'</h5>')
        var text = $('<p class="card-text">$ '+products[index].price+' x <input type="number" min="0"></p>')
        divCard.append(image)
        divCardBody.append(title)
        divCardBody.append(text)
        divCard.append(divCardBody)
        divCol.append(divCard)
        $('#cart .row').append(divCol)
    })
    
});