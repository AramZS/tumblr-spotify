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
});