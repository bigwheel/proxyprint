define(["./CardPrintForm"], function(CardPrintForm) {
    return Backbone.View.extend({
        el: $("#cards_input_form"),
        cardPrintForms: new Array(),
        initialize: function() {
            this.card_list = this.$("#card_list_for_print");
            $.proxy(this.events["click #add_card_input_form_button"], this)();
        },
        events: {
            "click #add_card_input_form_button": function() {
                this.cardPrintForms.push(CardPrintForm.make(this.card_list, _.size(this.cardPrintForms), this.options.searchDialog));
            },
            "click #remove_card_input_form_button": function() {
                if (_.size(this.cardPrintForms) > 1) {
                    this.cardPrintForms.pop().remove();
                }
            }
        }
    });
});
