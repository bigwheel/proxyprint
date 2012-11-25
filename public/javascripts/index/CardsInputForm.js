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
                var cpf = CardPrintForm.make(this.card_list, _.size(this.cardPrintForms), this.options.searchDialog);
                this.cardPrintForms.push(cpf);
            },
            "click #remove_card_input_form_button": function() {
                if (_.size(this.cardPrintForms) > 1) {
                    this.cardPrintForms.pop().remove();
                }
            },
            "change #decklist": function(event) {
                this.addCardsFromDeckList(event.target.files[0]);
                return false;
            },
            "drop": function(obj) {
                this.addCardsFromDeckList(obj.originalEvent.dataTransfer.files[0]);
                return false;
            }
        },
        addCardsFromDeckList: function(file) {
            var fr = new FileReader();
            fr.onload = $.proxy(function(event) {
                $.post('http://mtgbase.herokuapp.com/jsonize',
                       { cards_of_deck: event.target.result },
                       null,
                       "json"
                      ).done($.proxy(function(cards) {
                          _.each(cards, function(card) {
                              var cpf = CardPrintForm.make(this.card_list, _.size(this.cardPrintForms), this.options.searchDialog);
                              cpf.$(".input_card_number").val(card.card_property.multiverseid).change();
                              cpf.$("input[name='num[" + _.size(this.cardPrintForms) + "]']").val(card.number_of_cards).change();
                              this.cardPrintForms.push(cpf);
                          }, this);
                      }, this));
            }, this);
            fr.readAsText(file);
        }
    });
});
