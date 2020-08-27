// Reference URL: 'https://raw.githubusercontent.com/taivop/joke-dataset/master/stupidstuff.json'
// Find Local File at: 'assets/vendor/stupidstuff.json'

$(document).ready(function () {      
    
    $.ajax({

        url: 'https://raw.githubusercontent.com/taivop/joke-dataset/master/stupidstuff.json', 
         
            type: 'GET',
        
            dataType: 'json',        

            success: function (data) {                                        
            var $loademorebtn = document.createElement("button");
            $loademorebtn.classList.add('loadmorebutton');
            $loademorebtn.innerHTML='Random Joke';
            var $main = $("main");
            $main.append($loademorebtn);
                        
            jokesdetails();
            
            $($loademorebtn).click(function() {

                $($loademorebtn).addClass('hidden').removeClass('loademorebtn');    
                $('.loader').removeClass('hidden loader').addClass('bottomload');
                $('.t_id, .t_category').addClass('hidden');
                $('.t_joke').addClass('joketitlefull').html('Joke loading...😀');                 
                $('.jokedata').addClass('hidden');
                setTimeout(function(){                    
                    jokesdetails();
                    $('.bottomload').addClass('hidden loader').removeClass('bottomload');  
                    $($loademorebtn).addClass('loademorebtn').removeClass('hidden');
                }, 2000);
            });

            function jokesdetails(){                

                const $loader = $(".loader");
                var $loadingstatus = false;

                var $randomnum = data[Math.floor(Math.random()*data.length)];                  
                  
                if($randomnum.body!='')
                {                  
                  var $id = $randomnum.id;
                  var $category = $randomnum.category;
                  var $joke = $randomnum.body;

                  var $datalist = $('#datalist');
                  $datalist.html(`
                  <li class="joketitles">
                      <div class="t_id"><span>ID</span></div>
                      <div class="t_category"><span>CATEGORY</span></div>
                      <div class="t_joke"><p>JOKE</p></div>
                  </li>
                  <li class="jokedata">
                      <div class="j_id"><span>(${$id})</span></div>
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

