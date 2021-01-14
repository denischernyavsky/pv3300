var profilesKey = 'profiles';

(function($) {
    'use strict';

    var themes = {
        "Standard" : "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css",
        "Cosmo" : "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cosmo/bootstrap.min.css",
        "Cyborg" : "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cyborg/bootstrap.min.css",
        "Darkly" : "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/darkly/bootstrap.min.css",
        "Flatly" : "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/flatly/bootstrap.min.css",
        "Journal" : "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/journal/bootstrap.min.css",
        "Lumen" : "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/lumen/bootstrap.min.css",
        "Paper" : "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/paper/bootstrap.min.css",
        "Readable" : "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/readable/bootstrap.min.css",
        "Sandstone" : "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/sandstone/bootstrap.min.css",
        "Simplex" : "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/simplex/bootstrap.min.css",
        "Slate" : "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/slate/bootstrap.min.css",
        "Spacelab" : "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/spacelab/bootstrap.min.css",
        "Superhero" : "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/superhero/bootstrap.min.css",
        "United" : "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/united/bootstrap.min.css",
        "Yeti" : "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/yeti/bootstrap.min.css"
	};

	var profiles = $.jStorage.get(profilesKey, {});

	if (!('current' in profiles)) profiles.current = 'Default Profile';
    if (!(profilesKey in profiles)) profiles[profilesKey] = {};
    initializeProfile(profiles.current);

    jQuery(document).ready(function($) {
        themeSetup(buildThemeSelection());

        $('#themes').change(function(event) {
            var stylesheet = $('#themes').val();
            themeSetup(stylesheet);
            $.jStorage.set("style", stylesheet);
        });
    });

    function initializeProfile(profile_name) {
        if (!(profile_name in profiles[profilesKey])) profiles[profilesKey][profile_name] = {};
    }

    function themeSetup(stylesheet) {
        if(stylesheet === null || stylesheet === undefined) {
            stylesheet = $.jStorage.get("style") || "Standard";
        }
        $("#bootstrap").attr("href", themes[stylesheet]);
    }

    function buildThemeSelection() {
        var style = $.jStorage.get("style") || "Standard";
        var themeSelect = $("#themes");
        $.each(themes, function(key, value){
            themeSelect.append(
                $('<option></option>').val(key).html(key + " Theme")
            );
        });
        themeSelect.val(style);
        return style;
    }

    function dataLoadCallback(arg){
      var jsonProfileData = JSON.parse(arg.currentTarget.result);
      profiles = jsonProfileData;
      $.jStorage.set(profilesKey, profiles);
      populateProfiles();
      populateChecklists();
      $('#profiles').trigger("change");
      location.reload();
    }
})( jQuery );