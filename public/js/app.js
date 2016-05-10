(function(){

    var app = angular.module('app', []);

   
    app.controller('ListController',['$http', function($http){
        var vm = this;
        vm.programmes = [];
        vm.count = 0;
        vm.page = 1;
        vm.totalPage = 0;
        vm.letter = 'a';
        vm.pages = [];
        vm.letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

        this.getProgram = function(letter,page){
            vm.letter = letter;
            vm.page = page;
             $http.get('https://ibl.api.bbci.co.uk/ibl/v1/atoz/'+vm.letter+'/programmes?page='+vm.page).success(function(data){
                vm.count = data.atoz_programmes.count;
                vm.page = data.atoz_programmes.page;
                vm.totalPage =  Math.ceil(parseInt(data.atoz_programmes.count) / parseInt(data.atoz_programmes.per_page));
                vm.pages = [];
                for(i=1;i<=vm.totalPage;i++){
                    vm.pages.push(i);
                }
                vm.programmes = data.atoz_programmes.elements;
                console.log(data);
             });
        };


        this.active = function(page){
            if(vm.page == page){
                return 'disabled';
            }
        };

        this.activeLetter = function(letter){
            if(vm.letter == letter){
                return 'active';
            }
        }

        this.prev = function(page){
            if(vm.page == '1'){
                return 'disabled';
            }
        }
        this.prevPage = function(){
             if(vm.page > '1'){
                vm.page--;
                this.getProgram(vm.letter, vm.page);
            }
        }
        this.next = function(page){
            var last =  vm.pages[vm.pages.length-1];
            if(vm.page == last){
                return 'disabled';
            }
        }
         this.nextPage = function(){
             var last =  vm.pages[vm.pages.length-1];
                if(vm.page < last){
                    vm.page++;
                    this.getProgram(vm.letter, vm.page);
                }
        }


        this.image = function(image){
           var tmp = image.replace("{recipe}", "406x228");
           return tmp;
        }



       
       

        
    }]);

})();