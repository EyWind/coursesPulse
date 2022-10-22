$(document).ready(function(){

   $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
   });
   
   function toggleActive(item) { 
            $(item).each(function(i) {
               $(this).on('click', function(e) {
                  e.preventDefault();
                  $('.catalog-item__frontside').eq(i).toggleClass('catalog-item__frontside_active');
                  $('.catalog-item__backside').eq(i).toggleClass('catalog-item__backside_active');
               });
            });
   };

   toggleActive('.catalog-item__link');
   toggleActive('.catalog-item__back');

   // prevent default
   
   function prvntDflt(item) { 
            $(item).each(function() {
            $(this).on('mousedown', function(e) {
               e.preventDefault();
            });
            });
   };

   prvntDflt('.catalog__tab div');

   // Modal
   
   $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
   });
   $('.modal__close').on('click', function() {
      $('.overlay, #consultationm, #order, #thanks').fadeOut('slow');
   });

   $('.button_small').each(function(i){
      $(this).on('click', function(){
         $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
         $('.overlay, #order').fadeIn('slow');
      });
   });

   // Validation 

   function formValidate (form) {
      $(form).validate ({
         rules: {
            name: {
            required: true,
            minlength: 2
            },
            phone: "required",
            email: {
               required: true,
               email: true
            }
         },
         messages: {
            name: {
               required: "Пожалуйста, введите свое имя!",
               minlength: jQuery.validator.format("Минимум {0} символа!")
               },
            phone: "Пожалуйста, введите свой номер телефона!",
            email: {
               required: "Пожалуйста, введите свой e-mail!",
               email: "Ваш e-mail должен быть такого формата: name@domain.com"
            }
         }
      });
   }

   formValidate('#consultation-form-on-page');
   formValidate('#order form');
   formValidate('#consultation form');

   // phone mask

   $("input[name=phone]").mask("+7 (999) 999-9999");

   // mailer that will let us send date to the mailbox using php script

   $('form').submit(function(e) {      // forms that you want, currently all forms
      e.preventDefault();             // to prevent page reaload

      if (!$(this).valid()) {         // to prevent sending empty letter 
         return;
      }

      $.ajax({
         type: 'POST',
         url: 'mailer/smart.php',
         data: $(this).serialize()       // prepare date before sending it to server
      }).done(function() {
         $(this).find('input').val('');  // clear all inputs after form submit
         $('#consultation, #order').fadeOut();
         $('.overlay, #thanks').fadeIn('slow');

         $('form').trigger('reset');     // reset/clear all forms
      });
      return false;
   });

   // scroll-up, and smooth scrolling

   $(window).scroll(function(){
      if ($(this).scrollTop() > 1600) {
         $('.page-up').fadeIn('slow');
      } else {
         $('.page-up').fadeOut('slow');
      }
   });


   // smooth scroll 

   const uAgent = navigator.userAgent;
   if (uAgent.indexOf('Chrome') != -1) {
      return;
   } else {
      $("a[href='#up']").click(function(){
         const _href = $(this).attr('href');
         $('html, body').animate({scrollTop: $(_href).offset().top+'px'});
         return false;
      });
   }
      

      
      
});

// wow library

new WOW().init();


const slider = tns({
   container: '.carousel__inner',
   items: 1,
   slideBy: 1,
   speed: 1000,
   controls: false,
   navPosition: "bottom",
   responsive: {
      320: {
         nav: true,
      },
      991: {
         nav: false,
      }
   }
});

document.querySelector('.prev').addEventListener ('click', function () {
   slider.goTo('prev');
});

document.querySelector('.next').addEventListener ('click', function () {
   slider.goTo('next');
});


