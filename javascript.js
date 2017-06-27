
var data = {
    title: "root - not displayed",
    children: [{
        title: "Strumfi",
        children: [{
            title: "Albastrei",
            children: [{ title: "Alexandru Condurache" }, { title: "Asurdoaei Silviu"}, { title: "Andreea Anti"}, { title: "BraescuAna Maria"}, { title: "Ceornea Fivi"}
            , { title: "Cojocaru Claudiu"}, { title: "Cristian Ionut"}, { title: "Cuciureanu Alexandra"}, { title: "Emilian Bulgariu"}, { title: "Iulian Redinciuc"}
            , { title: "Madalin Bartos"}, { title: "Pisticiuc Cosmin"}, { title: "Valeria Cospormac"}, { title: "Giurgiuveanu Cristian"}, { title: "Daniel AC"}]
        }, {
            title: "Roze",
            children: [{title: "Daniel AC"}, {title: "Bill Gates"}, {title: "Jeff Bezos "}, {title: "Warren Buffett"}, {title: "Amancio Ortega"}
            , {title: "Mark Zuckerberg"}, {title: "Carlos Slim Helu"}, {title: "Yvon Chouinard"}, {title: "Torstein Hagen"}, {title: "Cliff Asness"}
            , {title: "Patrick Collison"}, {title: "John Collison"}, {title: "Evan Spiegel"}, {title: "Manny Stul"}, {title: "Steve Jobs"}]
        }]  
    }, {
        title: "Gargarite",
        children: [{
            title: "Cornite",
            children: [{title: "Steve Jobs"}, {title: "Natalie Portman"}, {title: "Charlize Theron"}, {title: "Sharon Stone"}, {title: "Scarlett Johansson"}
            , {title: "Juliette Lewis"}, {title: "Monica Bellucci"}, {title: "Angelina Jolie"}, {title: "Nicole Kidman"}, {title: "Penélope Cruz"}
            , {title: "Rachel McAdams"}, {title: "Michelle Pfeiffer"}, {title: "Demi Moore"}, {title: "Amanda Seyfried"}, {title: "Emily Ratajkowski"}]
        }, {
            title: "Buline",
            children: [{title: "Emily Ratajkowski"}, {title: "Jack Nicholson"}, {title: "Robert De Niro"}, {title: "Al Pacino"}, {title: "Tom Hanks"}
            , {title: "Brad Pitt"}, {title: "Anthony Hopkins"}, {title: "Denzel Washington"}, {title: "Leonardo DiCaprio"}, {title: "Mel Gibson"}
            , {title: "Samuel L. Jackson"}, {title: "Nicolas Cage"}, {title: "Morgan Freeman"}, {title: "Ashton Kutcher"}, {title: "Justin Timberlake"}]
        }]
    }, {
        title: "Stelute",
        children: [{
            title: "Cavaleri",
            children: [{title: "Justin Timberlake"}, {title: "Isaac Newton"}, {title: "Archimedes"}, {title:"Euclid" }, {title: "Pythagoras"}
            , {title: "Blaise Pascal"}, {title: "Albert Einstein"}, {title: "Aristotle"}, {title: "Thales"}, {title: "John von Neumann"}
            , {title: "David Hilbert"}, {title: "Pierre de Fermat"}, {title: "Évariste Galois"}, {title: "Srinivasa Ramanujan"}, {title: "Aurel Vlaicu"}]
        }, {
            title: "Domnite",
            children: [{title: "Aurel Vlaicu"}, {title: "Archimedes"}, {title: "Leonardo Da Vinci"}, {title: "Galileo"}, {title: "Benjamin Franklin"}
            , {title: "William Cullen"}, {title: "James Watt"}, {title: "Alessandro Volta"}, {title: "Samuel Morse"}, {title: "Karl Benz"}
            , {title: "Nikola Tesla"}, {title: "Rudolf Diesel"}, {title: "Alexander Fleming"}, {title: "James Dyson"}, {title: "Aidecapumeu"}]
        }]
    }]
};	

$(document).ready(function() {
    /******** Create TREE DOM from JSON ********/
    function addItem(parentUL, obj) {
        for (var key in obj.children) {
            var item = obj.children[key];
            $item = $('<li>');  // create LI
            $item.append($('<span>', { //Adding a span to make the DOTTS :)
                text: "....."
            }));
            $item.append($('<i>', { //Create i child of LI for awsome icon
                class: "fa fa-folder fa-lg",
                "aria-hidden" : "true"
            }));
            $item.append($('<input>', { //Create input child of LI
                type: "checkbox",
                name: item.title
            }));
            $item.append($('<label>', { //create label child of LI
                for: item.title,
                    text: item.title
            }));
            parentUL.append($item); 
            if (item.children) {
                var $ul = $('<ul>', {
                    //style: 'display: none' // check AFTER
                }).appendTo($item);
                $item.append();
                addItem($ul, item);
            } 

        }
    }

    $(function () {
        addItem($('#root'), data);
    lastI = $('li:not(:has(ul))'); //Working with the last LI from the tree
    lastI.addClass("last");
    $('.last i').removeClass('fa-folder'); //adding and removeing class from the last icon child list
    $('.last i').addClass('fa-user-circle');

    /******* if input CHECHED/UNCHECKED do things ********/
    $('li :checkbox').on('click', function checkbox(chk){ 
            chk = $(this); // creating the variables
            var $li = chk.closest('li'),
            $ul, $parent;
            if ($li.has('ul')) {
                $li.find(':checkbox').not(this).prop('checked', this.checked);
            }
            do {
                $ul = $li.parent();
                $parent = $ul.siblings(':checkbox');
                if (chk.is(':checked')) { 
                    $parent.prop('checked', $ul.has(':checkbox:not(:checked)').length === 0);
                // z $parent.css("opacity", "1");// PARTIAL CHECKED - I have to review this
            } else {
                $parent.prop('checked', false);
            //  $parent.css("opacity", "0.5");// PARTIAL CHECKED - I have to review this
        }
        chk = $parent;
        $li = chk.closest('li');
    } while ($ul.is(':not(.someclass)'));
});

    /****** SLIDE UL GROUPS *********/
    $('i').click(function(){ 
        $(this).closest('li').children('ul').slideToggle();
    });

    /**** Change icon FOLDER when UL display SHOW/HIDDEN  ****/
    function changeIcon(x){
                if( x.hasClass('fa-folder')){ //if is PLUS do things
                    x.addClass('fa-folder-open');
                    x.removeClass('fa-folder');
                }
                else if(x.hasClass('fa-folder-open')){ //if is MINUS do things
                    x.addClass('fa-folder');
                    x.removeClass('fa-folder-open');
                }
            }
        $('i').on('click', function(){ // Working with font awesome
            var x = $(event.target);
            changeIcon(x);
        });

        /****** Create NEW LIST with Checked Elements  *****/
        $("input[type='checkbox']").on('change', function(event) { //on last tree input child do things
            var checkedValues = $('.last input:checkbox:checked').map(function() { // Look for all the checked elements
            return this.name; // return an array with the name of checked input
        }).get();
            
            /***** Eliminate Duplicates from Array *****/
            var uniqueNames = []; 
            $.each(checkedValues, function(i, el){
                if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
            });

            $('#list').empty(); // empty List before adding new items in it
            var cList = $('#list');

            var showTotal = $("<label>") // Count Selected children
            .html("You have <span>"+ uniqueNames.length + "</span> clidren's selected : ") // ADDDDDDDDDDDDD
            .addClass("totalSelected")
            .appendTo(cList);

            /******** write the DOM with array values *******/
            $.each(uniqueNames, function(i){   
                var li = $('<li/>')
                .appendTo(cList);
                var i2 = $('<i>')
                .addClass('fa fa-trash-o')
                .appendTo(li);
                var a = $('<a>')
                .attr("target","_blank")
                .text(uniqueNames[i])
                .appendTo(li);
            });

            /****** On Remove icon Click UNCHECK end DELETE the element ********/
            $('#list i').on('click', function(event){ 
                var name = this.closest('li').children[1].textContent; //get the label text on click,   children[0] is 'i'         
                var itemUnk = $("input[name='"+ name +"']");
                itemUnk.trigger( "click" );
                this.closest('li').remove();
            });
            /****** Google search on CHILD NAME ******/
            $('#list a').on('click', function(event){
                search = this.textContent;
                $(this).attr("href","https://www.google.ro/?gws_rd=cr&ei=u-gMWeObE-bA6QSN4IbIDg#q="+search);
            });           
        });// END LIST story

        /***** Open icon FOLDER on UL Display BLOCK *****/
        $("#show").click( function(){
            $('ul').show();
            var icon = $('i.fa-folder');
            icon.removeClass('fa-folder');
            icon.addClass('fa-folder-open');
        });
        /******* Close icon FOLDER on UL Display NONE *******/
        $("#hide").click( function(){
            $('ul ul').hide();
            var icon = $('i.fa-folder-open');
            icon.removeClass('fa-folder-open');
            icon.addClass('fa-folder');
        });
    });  
});


// Give me a ten :)