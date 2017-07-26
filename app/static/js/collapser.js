$(function() {
  $('.collapsible button').on('click', function(){
    $(this).parent('dt').next('dd').toggleClass('hidden');
    if ($(this).attr('aria-expanded') != 'true'){
      $(this).attr('aria-expanded','true');
    } else {
            $(this).attr('aria-expanded','false');
    }
  });
});