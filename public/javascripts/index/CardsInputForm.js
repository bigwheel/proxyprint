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
                var lines = event.target.result.split(/\r\n/)
                var card_list = _.compact(_.map(lines, function(line) {
                    if (line.match(/^(\d+) (.+)$/)) {
                        return { number_of_cards: RegExp.$1,
                            card_name: RegExp.$2 };
                    } else {
                        return null;
                    }
                }));
                var params_of_cardlist = _.map(card_list, function(card) {
                    return { card_name: card.card_name }
                });
                $.post('http://mtgbase.herokuapp.com/get_card_details',
                       { card_list: params_of_cardlist },
                       null,
                       "json"
                      ).done($.proxy(function(cards) {
                          var i;
                          var card_detail_and_nums = new Array();
                          for (i = 0; i < _.size(card_list); i++) {
                              card_detail_and_nums.push({ number_of_cards: card_list[i].number_of_cards,
                                                        card_property: cards[i] });
                          }
                          _.each(card_detail_and_nums, function(card) {
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
