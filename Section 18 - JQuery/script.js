// $ = jQuery
$(document).ready(function () {
  // jQuery('h1').css('color', 'green');
  $('h1').css('color', '#bbbbbb');
  //^ this works kinda like querySelector & querySelectorAll combined with some improvements

  // 2 properties == setting the value
  // $('h1').css('color', 'red');
  // 1 property == getting the value
  // console.log($('h1').css('color'));

  $('h1').addClass('big-title margin-50');
  console.log($('h1').hasClass('margin-50'));

  $('h1').text('Hi');
  $('button').text('<em>Yo</em>');
  $('button').html('<em>yo</em>');

  console.log($('img').attr('src'));
  $('a').attr('href', 'https://www.yahoo.com');

  $('button').click(function () {
    // NOTICE $(this)
    $(this).css('color', 'white');
  });

  // FIRST WAY
  $('input').keypress(function (event) {
    console.log(event.key);
    $('h1').eq(0).text(event.key);

    $('input').attr('value', $('input').attr('value') + event.key);
    $('h1').eq(1).text($('input').attr('value'));
  });

  // SECOND WAY
  $('h1').on('click', function () {
    $(this).css('color', 'white');
  });

  // CREATING ELEMENTS

  $('input').before('<p>TestingONE</p>');
  $('input').after('<p>TestingTWO</p>');
  $('button').eq(2).append('<span>TestingTHREE</span>');
  $('button').eq(3).prepend('<span>TestingFOUR</span>');

  // $('span').remove();

  // ANIMATIONS
  $('button').eq(4).text('ANIMATION');
  $('button')
    .eq(4)
    .on('click', function () {
      // // $('h1').hide();
      // // $('h1').show();
      // $('h1').toggle();

      // //$('h1').fadeIn();
      // // $('h1').fadeOut();
      // $('h1').fadeToggle();

      // // $('h1').slideUp();
      // // $('h1').slideDown();
      // $('h1').slideToggle();

      $('h1').animate({ opacity: 0.5 });

      $('h1').slideUp().slideDown().animate({ opacity: 1 });
    });
});
