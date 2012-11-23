requirejs.config({ baseUrl: 'assets/javascripts' });
requirejs(["index/SearchDialog", "index/CardsInputForm"],
          function(SearchDialog, CardsInputForm) {
              $(document).ready(function(){
                  var searchDialog = new SearchDialog();
                  var cardsInputForm = new CardsInputForm({searchDialog: searchDialog});
              });
          });
