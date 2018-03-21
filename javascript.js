$(document).ready( function() {
    console.log("Kasia dasz rade!");
    $("#tablesection") .hide();
    
    $("#numbers").keypress(function(event) {
    if (event.keyCode === 13) {
        $("#btnadd").click();
    }
});
    
   $("#btnadd").click( function() {
        var InputVal = $("#numbers").val();
  
       if ( InputVal.length !== 0) 
         {
            if ( $("#toSort li").length === 0) 
            {
               $("#toSort").append( '<li>'+ InputVal + '</li>' ); 
            } else {
                $("#toSort").append( ',  ' + '<li>'+ InputVal + '</li>' );
            }
            enableBtn() ;
         } 
   });
   
     $("#btnclear").click( function() {
         if (confirm("Are you sure?")) {
         $("#toSort").empty();
         $("#numbers").val(""); 
     }
//         $("#tresults") .empty();
//         $("#tablesection") .hide();
     });
     
    $('#btnsort').click(function() {

        var option = (($('#selectMethod option:selected').val()));
        
        var numbers = [];
        var prenumbers =[];
        
            $("#toSort li").each(function() {
             numbers.push($(this).html());
             prenumbers.push($(this).html());
        });
        
        var time;
        var t0 = performance.now();

        switch (option) {
           case  "1" :
                 numbers = bubbleSort(numbers);
                break;
            case  "2" :
                numbers = quickSort(numbers);
                    break;
            case  "3" :
                numbers = selectSort(numbers);
                break;
            case  "4" :
                numbers = insertionSort(numbers);
                    break;
            case  "5" :
                numbers = stupidBubbleSort(numbers);
                    break;
                case "6":
                    numbers = crazySort(numbers);
                    //numbers = crazySortAlt(numbers);
        } 
        
        var t1 = performance.now();
        console.log("t0 = " + t0);
        console.log("t1 = " + t1);
        console.log(($('#selectMethod option:selected').html()) + " took: " + (t1 - t0) + " milliseconds.");
        
       if  (t1 - t0 < 1)  {
           time = "0 miliseconds";
           
       } else {
           time = (t1 - t0) + " miliseconds";
       }
       
          if ($('#selectOrder option:selected').val() === "Desc") {
         numbers.reverse();
         }

        $("#tablesection").show();
        $('#results tbody').append('<tr scope="row" class="' +($('#selectMethod option:selected').html()) + '"><td>' + ($('#selectMethod option:selected').html()) + '  (' +(($('#selectOrder option:selected').html()) + ') </td><td>' + prenumbers + '</td> <td>' + numbers + '</td><td>' +time+ '</td></tr>'));
    });
     
function bubbleSort(numbers) {
    var help;
    var wasChanged = true;
    
       while(wasChanged){
           wasChanged = false;

            for (i = 0; i <= numbers.length -1; i++) {
                if (parseInt(numbers[i]) > parseInt(numbers[i+1])) {
                    
                    help = numbers[i+1];
                    numbers[i+1] = numbers[i];
                    numbers[i] = help;
                    wasChanged = true;
                } 
            }
            return numbers;
        }
   }

    function selectSort(numbers) {
        var min;
        
        for (i = 0; i <= numbers.length -1; i++) {
            min = parseInt(numbers[i]);
             for ( j = i;  j <= numbers.length -1; j++) {
                  if (parseInt(numbers[ j ]) <  parseInt(min)) {
                      
                        min = parseInt(numbers[ j ]);
                        numbers[ j ] = parseInt(numbers[ i]);
                        numbers[i] = min;
                 }  
             }
        }
        return numbers;
    }
    
    function quickSort(numbers) {

    }
    
     function insertionSort(numbers) {
         var help; 
         for (i = numbers.length -1; i >= 0; i--)
         {
             help = numbers[i];
             for(j = i; j < numbers.length -1; j++)
             {
                 if(parseInt(help) > parseInt(numbers[j]))
                 {
                    numbers[j-1] = numbers[j];
                    numbers[j] = help;
                    help = numbers[j];
                 }
             }
         }
          return numbers;
     }
     
        function stupidBubbleSort(numbers) {
            var help;
                for (i=0;  i <= numbers.length -1; i++) { 
                    if (parseInt(numbers[i]) > parseInt(numbers[i+1]))  {
                        help = numbers[i];
                        numbers[i] = numbers[i+1];
                        numbers[i+1] = help;   
                        i=-1;
                      } 
                  }
            return numbers;
        }
    
    //start
    function crazySortAlt(numbers)
    {
        while(!ifSorted(numbers))
        {
            numbers = sort(numbers);
        }
        return numbers;
    }
    
    function ifSorted(numbers)
    {
         for (j = 0; j <= numbers.length -1; j++) {
                 for (i = j+1; i <= numbers.length -1; i++) {
                    if (parseInt(numbers[j]) > parseInt(numbers[i])) {
                       return false;
                    }       
                }
        }
        return true;
    }
    
    function sort(numbers)
    {
        for (i =0; i <= 3*numbers.length; i++) {
            var x = Math.floor(Math.random() * numbers.length);
            var y = Math.floor(Math.random() * numbers.length);
            help = numbers[x];
            numbers[x] = numbers[y];
            numbers[y] = help;
        }
        return numbers;
    }
    
    //end
    function crazySort(numbers) {
        var help;
        var Posortowane = false;
        
        while(!Posortowane) {
             for (j = 0; j <= numbers.length -1; j++) {
                 Posortowane = true;
                 for (i = j+1; i <= numbers.length -1; i++) {
                    if (parseInt(numbers[j]) > parseInt(numbers[i])) {
                        Posortowane = false;
                        break;
                    }       
                }
                if(!Posortowane)
                {
                    break;
                }
            }
            if (!Posortowane) {
                for (i =0; i <= 3*numbers.length; i++) {
                    var x = Math.floor(Math.random() * numbers.length);
                    var y = Math.floor(Math.random() * numbers.length);
                    help = numbers[x];
                    numbers[x] = numbers[y];
                    numbers[y] = help;
                }
            }
         }
         return numbers;
     }
     
//exportowanie tabeli     
 $("#btnsave").click(function(e) {
    e.preventDefault();

    //getting data from our table
    var data_type = 'data:application/vnd.ms-excel';
    var table_div = document.getElementById('tablewrapper');
    var table_html = table_div.outerHTML.replace(/ /g, '%20');

    var a = document.createElement('a');
    a.href = data_type + ', ' + table_html;
    a.download = 'exported_table_' + Math.floor((Math.random() * 9999999) + 1000000) + '.xls';
    a.click();
  });
  
 

  
});

function enableBtn() {
    if (($('#selectOrder option:selected').val() !== "0") && ( $("#toSort li").length >= 2) && ($('#selectMethod option:selected').val() !== "0")) {
        $('#btnsort').prop('disabled', false);
    };
}

    function filtr() {
        
        switch ($('#filter option:selected').val()) {
            case "0" :
                $('#results tr').show();
                    break;
            case  "1" :
                $('#results tr').hide();
                $('#results').find('.Bubble').show();
                            break;
            case  "2" :
                 $('#results tr').hide();
                $('#results').find('.Quick').show();
                        break;
            case  "3" :
                $('#results tr').hide();
                $('#results').find('.Select').show();
                        break;
            case  "4" :
                $('#results tr').hide();
                $('#results').find('.Insertion').show();
                    break;
            case  "5" :
                $('#results tr').hide();
                $('#results').find('.StupidBubble').show();
                    break;
                case "6":
                $('#results tr').hide();
                $('#results').find('.Crazy').show();
            } 
        }    




//        chwytanie poszczególnych elementów tabeli
//        ($("#results tr").length);
//        console.log($('#results td:nth-child(1)').html()); 
//        console.log(document.getElementById("results").rows[1].cells[0].innerHTML);
         