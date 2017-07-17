'use strict';

(function (app) {

    var GameController = ["$scope", "$log", "$filter", "Models",

        function ($scope, $log, $filter, Models) {

            var vm = this;

            vm.animals = [];
            vm.facts = [];
            vm.selectedAnimal = undefined;

            vm.currentFact = {};
            vm.hasFact = null;

            vm.possibleAnimals = [];

            vm.gameStarted = false;
            vm.showDebug = false;

            vm.animalFound = false;

            // -----------------------------
            // Name: init
            // Description: Initializes the game. Facts and Animals are populated.
            // -----------------------------
            function init() {                
                vm.facts = getFacts();
                $log.info("Facts created");

                vm.animals = createAnimals(vm.facts);
                $log.info("Animals created");
            }

            // -----------------------------
            // Name: startGame
            // Description: Starts the game
            // -----------------------------
            vm.startGame = function () {
                vm.gameStarted = true;
                vm.possibleAnimals = vm.animals;

                vm.hasFact = null;
                vm.animalFound = false;

                askQuestion();
            };


            // -----------------------------
            // Name: askQuestion
            // Description: Computer finds a question to asks
            // -----------------------------
            function askQuestion()
            {
                var factFound = false;

                // get a fact
                angular.forEach(vm.possibleAnimals, function (animal) {
                    angular.forEach(animal.facts, function (fact) {
                        if ((fact.asked == undefined) && factFound != true )
                        {
                            vm.currentFact = fact;
                            factFound = true;
                        }
                    });
                });

            }

            // -----------------------------
            // Name: nextQuestion
            // Description: Have the computer ask the next question
            // -----------------------------
            vm.nextQuestion = function () {
                vm.hasFact = null;
                askQuestion();
            };


            // -----------------------------
            // Name: checkFact
            // Description: Checks if the fact exists for the selected animal
            // -----------------------------
            vm.checkFact = function () {
                // check if the fact exists for this animal
                vm.hasFact = false;
                angular.forEach(vm.selectedAnimal.facts, function (fact) {

                    if (vm.currentFact.id == fact.id)
                        vm.hasFact = true;
                });

                vm.userAnswer(vm.hasFact);
                

            };

            // -----------------------------
            // Name: userAnswer
            // Description: Filters and removes animals based on the facts
            // -----------------------------
            vm.userAnswer = function (answer) {

                var possibleAnimals = angular.copy(vm.possibleAnimals);

                // if answer = yes. get all animals with this fact
                if (answer) {

                    var animalsWithFact = [];

                    angular.forEach(possibleAnimals, function (animal) {

                        var hasFact = false;
                        var clonedAnimal = angular.copy(animal);
                        angular.forEach(clonedAnimal.facts, function (fact) {
                            console.log(fact);

                            // fact found
                            if (vm.currentFact.id == fact.id) {
                                hasFact = true;
                                fact.asked = true;
                            }
                        });

                        if (hasFact)
                            animalsWithFact.push(clonedAnimal);


                    });

                    possibleAnimals = animalsWithFact;

                }
                else { // remove animals that have this fact

                    var animalsToRemove = [];

                    // find animals to remove
                    angular.forEach(possibleAnimals, function (animal) {
                        var hasFact = false;
                        angular.forEach(animal.facts, function (fact) {
                            console.log(fact);

                            // fact found
                            if (vm.currentFact.id == fact.id) {
                                hasFact = true;
                            }
                        });

                        if (hasFact)
                            animalsToRemove.push(animal);

                    });

                    // remove the animals
                    angular.forEach(animalsToRemove, function (animal) {
                        var index = possibleAnimals.indexOf(animal);
                        possibleAnimals.splice(index, 1);
                    });

                    
                }

                console.log(possibleAnimals);

                vm.possibleAnimals = possibleAnimals;

                // found the animal
                if (vm.possibleAnimals.length == 1)
                {
                    vm.animalFound = true;
                }
            };


            // -----------------------------
            // Name: createAnimals
            // Description: Creates animals and relates facts against them
            // -----------------------------
            function createAnimals(facts)
            {
                var animals = [];

                animals.push(new Models.animal("Elephant", [facts[0], facts[5], facts[8]]));
                animals.push(new Models.animal("Frog", [facts[1], facts[8]]));
                animals.push(new Models.animal("Lion", [facts[2], facts[8], facts[11], facts[13]]));
                animals.push(new Models.animal("Sheep", [facts[3], facts[10]]));
                animals.push(new Models.animal("Giraffe", [facts[4], facts[10]]));
                animals.push(new Models.animal("Dolphin", [facts[0], facts[7], facts[9]]));
                animals.push(new Models.animal("Shark", [facts[0], facts[7], facts[9], facts[12]]));
                animals.push(new Models.animal("Chicken", [facts[14], facts[10], facts[3]]));

                return animals;
            }


            // -----------------------------
            // Name: getFacts
            // Description: All the available facts
            // -----------------------------
            function getFacts()
            {
                var facts = [];

                // Colours
                facts.push(new Models.fact(0, "Colour is Grey")); 
                facts.push(new Models.fact(1, "Colour is Green"));
                facts.push(new Models.fact(2, "Colour is Brown"));
                facts.push(new Models.fact(3, "Colour is White"));
                facts.push(new Models.fact(4, "Is Spotted"));

                
                // Unique Characteristics
                facts.push(new Models.fact(5, "Has a Trunk"));
                facts.push(new Models.fact(6, "Has a very long neck"));

                // Land or Sea
                facts.push(new Models.fact(7, "Lives in Water"));
                facts.push(new Models.fact(8, "Lives on Land"));

                // Food
                facts.push(new Models.fact(9, "Eats Meat (Carnivorous)"));
                facts.push(new Models.fact(10, "Eats Vegetation (Herbivore)"));

                facts.push(new Models.fact(11, "Is a Mammal"));
                facts.push(new Models.fact(12, "Is a Fish"));

                facts.push(new Models.fact(13, "Is known as the King of the Jungle"));

                facts.push(new Models.fact(14, "Has feathers"));


                return facts;
            }

            // -----------------------------
            // Name: toggleDebug
            // Description: Displays json debug info in the UI
            // -----------------------------
            vm.toggleDebug = function () {
                vm.showDebug = !vm.showDebug;
            };


 
            // Initialize
            init();


        }];


    app.controller("GameController", GameController);

}(angular.module(clientHtmlAppName)));