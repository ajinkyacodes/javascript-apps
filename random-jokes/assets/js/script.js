// Reference URL: 'https://raw.githubusercontent.com/taivop/joke-dataset/master/stupidstuff.json'
// Find Local File at: 'assets/vendor/stupidstuff.json'

$(document).ready(function () { 
    
    $.ajax({

        url: 'https://raw.githubusercontent.com/taivop/joke-dataset/master/stupidstuff.json', 
         
            type: 'GET',
        
            dataType: 'json',        

            success: function (data) {                                        
            var $container = $(".btn-container");
            // Creating Load More Jokes Button
            var $loademorebtn = $(`<button id="shuffle" class="loadmorebutton">Shuffle</button>`);
            // Creating Read Joke Button
            var $readBtn = $(`<button id="read" class="read-button">Read</button>`);
            // Creating Stop Voice Button
            var $stopBtn = $(`<button id="stop" class="stop-button">Stop</button>`);
            $container.append($loademorebtn);
            $container.append($readBtn);
            $container.append($stopBtn);
                        
            jokesdetails();
            
            $($loademorebtn).click(function() {
                $($loademorebtn).addClass('hidden').removeClass('loademorebtn');
                $('.loader').removeClass('hidden loader').addClass('bottomload');
                $('.t_category').addClass('hidden');
                $('.t_joke').addClass('joketitlefull').html('Joke loading...😀');                 
                $('.jokedata').addClass('hidden');
                $('.read-button').addClass('hidden');
                $('.stop-button').addClass('hidden');
                setTimeout(function(){                    
                    jokesdetails();
                    $('.bottomload').addClass('hidden loader').removeClass('bottomload');  
                    $($loademorebtn).addClass('loademorebtn').removeClass('hidden');
                    $('.read-button').removeClass('hidden');
                    $('.stop-button').removeClass('hidden');
                }, 2000);
            });

            $("#read").click(function(){
                const jokeText = document.querySelector('.jokedata .j_joke p').innerHTML;
                setTextMessage(jokeText);
                speakText();
            });

            $("#stop").click(cancelVoice);

            function jokesdetails(){                

                const $loader = $(".loader");
                var $loadingstatus = false;

                var $randomnum = data[Math.floor(Math.random()*data.length)];                  
                  
                if($randomnum.body!='')
                {                  
                  var $category = $randomnum.category;
                  var $joke = $randomnum.body;

                  var $datalist = $('#datalist');
                  $datalist.html(`
                  <li class="joketitles">
                      <div class="t_category"><span>CATEGORY</span></div>
                      <div class="t_joke"><p>JOKE</p></div>
                  </li>
                  <li class="jokedata">
                      <div class="j_category"><span>${$category}</span></div>
                      <div class="j_joke"><p>${$joke}</p></div>
                  </li>`);

                  $loadingstatus = true;
                  if ($loadingstatus == true) {
                      $loader.addClass("hidden");
                  }
                } else {
                  jokesdetails();
                }             
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Database');             
        }  
    });  
});  

