requirejs.config({ baseUrl: 'assets/javascripts' });
require(["index/SelectDialog", "index/SearchDialog",
        "index/CardPrintForm", "index/CardsInputForm"],
        function() {
            $(document).ready(function(){
                var searchDialog = new SearchDialog();
                var cardsInputForm = new CardsInputForm({searchDialog: searchDialog});
            });
        });
