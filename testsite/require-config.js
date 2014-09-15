var require = {
    baseUrl: "./",
    paths: {
        "text": "lib/requirejs-text/text",
        "Fayde": "lib/Fayde/Fayde",
        "moment": "lib/moment/moment"
    },
    deps: ["text", "Fayde", "moment"],
    callback: function (text, Fayde, moment) {
        Fayde.LoadConfigJson(function (config, err) {
            if (err)
                console.warn('Could not load fayde configuration file.', err);
            Fayde.Run();
        });
    },
    shim: {
        "Fayde": {
            exports: "Fayde",
            deps: ["text"]
        }
    }
};