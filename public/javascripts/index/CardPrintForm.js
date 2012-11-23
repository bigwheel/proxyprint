define(function() {
    var CardPrintForm = Backbone.View.extend({
        events: {
            "change .input_card_number": function(event) {
                var input_multiverseid = $(event.target);
                input_multiverseid.closest("fieldset").find("div.div_card_image img").
                    attr("src", "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + String(input_multiverseid.val()) + "&type=card");
            },
            "click .card_search_button": function(event) {
                this.options.searchDialog.show(this.options.index);
            }
        }
    });
    CardPrintForm.make = function(parent, index, searchDialog) {
        var form =  $(_.template($("#card_print_form").html(), { index: index }));
        parent.append(form);
        return new CardPrintForm({el: form, index: index, searchDialog: searchDialog});
    };

    return CardPrintForm;
});
