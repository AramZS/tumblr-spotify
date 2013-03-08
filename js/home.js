jQuery(document).ready(function() {        
		var sp = getSpotifyApi();
        var models = sp.require('sp://import/scripts/api/models');

        tabs();
        models.application.observe(models.EVENT.ARGUMENTSCHANGED, tabs);

        function tabs() {
            var args = models.application.arguments;
            var current = document.getElementById(args);
            var sections = document.getElementsByClassName('section');
			
			jQuery(sections).each(function(key,value){
				if (value != current){
					value.style.display ='none';
				}
			});
			
            current.style.display = 'block';
        }
		
       var search = new models.Search('Rihanna');
        search.localResults = models.LOCALSEARCHRESULTS.APPEND;

        var searchHTML = document.getElementById('results');

        search.observe(models.EVENT.CHANGE, function() {
            var results = search.tracks;
            var fragment = document.createDocumentFragment();
			var pop = 0;
			var mostpop = 0;
            for (var i=0; i<results.length; i++){
				if (results[i].name == 'Diamonds'){
				var link = document.createElement('li');
                var a = document.createElement('a');
                a.href = results[i].uri;
                link.appendChild(a);
                a.innerHTML = results[i].name + ' where name == Diamonds';
                fragment.appendChild(link);
				}
            }
            for (var i=0; i<results.length; i++){
				if (results[i].popularity > pop){ pop = results[i].popularity; mostpop = results[i]; }
            }
				var link = document.createElement('li');
                var a = document.createElement('a');
                a.href = mostpop.uri;
                link.appendChild(a);
                a.innerHTML = mostpop.name + ' where Popularity is highest, equal to ' + pop;
                fragment.appendChild(link);

            searchHTML.appendChild(fragment);
        });

        search.appendNext();		
});