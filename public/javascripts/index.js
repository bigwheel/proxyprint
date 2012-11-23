requirejs.config({ baseUrl: 'assets/javascripts' });
requirejs(["index/SearchDialog", "index/CardsInputForm"],
          function(SearchDialog, CardsInputForm) {
              $(document).ready(function(){
                  new CardsInputForm({searchDialog: new SearchDialog()});
              });
          });
