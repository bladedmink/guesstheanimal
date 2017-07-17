(function (app) {

    var Models = [

        function () {

            var animal = function (name, facts) {
                this.name = name;
                this.facts = facts;

            };

            var fact = function (id, title) {
                this.id = id;
                this.title = title;
            };

            return {
                animal: animal,
                fact: fact
            };

        }

    ];

    app.factory("Models", Models);

}(angular.module(clientHtmlAppName)));