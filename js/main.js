$(function(){

    //첫페이지 슬라이드
    if($('.main_slide_wrap').length > 0){

        const swiper = new Swiper('.swiper-container', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
          
            // If we need pagination
            pagination: {
              el: '.swiper-pagination',
              clickable:true
            }          
          });
    }
    if($('.sign_in_slide').length > 0){

        const swiper = new Swiper('.sign_in_slide', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
          
            // If we need pagination
            pagination: {
              el: '.swiper-pagination',
              clickable:true
            }          
          });
    }
    
    if($('.front-slide').length > 0){
      var swiper = new Swiper(".front-slide", {
        slidesPerView: 1,
        spaceBetween: 5,
        centeredSlides: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    }
    if($('.products').length > 0){
      $('.category').slick({
        arrows:false,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: false,
        variableWidth: true
      });
    }

    var asideCategory = $('.aside_category > li');
    var asideSubCategory = asideCategory.find('ul');

    /*
    asideCategory클릭하면 
    모든 asideSubCategory닫고 slideUp()
    클릭한 그 요소의 자식요소 ul이 slideDown()

    다시 클릭하면 서브카테고리가 닫혀야 한다.
    */
    asideCategory.click(function(){
      $(this).find('ul').slideToggle();
      $(this).siblings('li').find('ul').slideUp();
    });


    /*
    menubar.mouseover(function(){

    })
    .mouseout(function(){

    });
   
    menubar.hover(function(){
      function(){}, //mousehover
      function(){} //mouseout
    });
 */
    var asideToggleBtn = $('header > .aside_toggle_btn');
    var body = $('body');

    asideToggleBtn.click(function(){
      body.addClass('active');
    });

    $('.aside_menu button').click(function(){
      body.removeClass('active');
    });



    //search form
    $('header .search').click(function(e){
      e.preventDefault();
      $(this).hide();      
      $('.search-form').css({display:'flex', height:0, overflow:'hidden'});
      $('.search-form').stop().animate({height:'30px'});
    });

   $('.rating').each(function(){
     var $this = $(this)
      var score = $this.attr('data-rate');

      for(var i = 0; i<score; i++){
        $this.find('i').eq(i).css({color:'#F05522'});
      } 
   });

   if($('.cart-form').length > 0){     
     var cartTarget = $('.result .count');
     var cartItem;

    function calcCartItem(){
      cartItem = $('.cart_list > li');
      var cartCount = cartItem.length;
      cartTarget.text(cartCount);
    }
   
    calcCartItem();
    
    var cartItemDel = $('.cart_list > li .circle-close');
 
   cartItemDel.click(function(){
    $(this).parent().remove();
    calcCartItem();
    calcTotalPrice();
   });

    function calcTotalPrice(){
      cartItem = $('.cart_list > li');
      var itemTotal = 0;

      cartItem.each(function(){
        var itemPrice = $(this).find('.unit_price').attr('data-price') * $(this).find('input').val();
        itemTotal += itemPrice;
      });
      $('.price_total').text(convertUSD(itemTotal));

      var shippingCost = parseInt($('.shipping_cost').attr('data-price'));

      var totalPrice = convertUSD(shippingCost + itemTotal);   

      $('.total_price').text(totalPrice);
    }
    calcTotalPrice();

    cartItem.find('input').change(function(){
      calcTotalPrice();
    });

    // div[class^="test"]
    $('.cart-form [data-price]').each(function(){
      console.log($(this).attr('data-price'));

      var price = convertUSD(parseInt($(this).attr('data-price')));

      $(this).text(price);
    });

    function convertUSD(num){
      var result = num.toLocaleString('en-IN', {style: 'currency', currency: 'USD' , minimumFractionDigits: 2, maximumFractionDigits: 2});
      return result; 
    }

   }//cart-form


   $('header .backward').click(function(e){
      e.preventDefault();
      //history.back(); 
      history.go(-1);
   });



});//document ready function