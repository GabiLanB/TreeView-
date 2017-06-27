 /****** Google search on CHILD NAME ******/
            var search = this.textContent;
            $('#list a').on('click', function(event){
                $(this).attr("href","https://www.google.ro/?gws_rd=cr&ei=RYodWeb6I8jw6ATuxbeIDA#q="+search);
            });
             $('#list a').on('mouseover', function(event){
                var imgSearch = ("https://www.google.com/search?q="+search+"&tbm=isch");
                var div = $('<div/>') // Create a Div to Hold the Google Search Image
                .addClass("imageChild")
                .appendTo($("#tree"));
                var img = $('<img>')
                .appendTo(div)
                .attr("src",imgSearch); // in loc de imgSeacrc ar trebui sa am 

            });
            $('#list a').on('mouseleave', function(event){
                $(".imageChild").remove();
            });            