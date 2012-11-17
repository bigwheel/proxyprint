$(document).ready(function(){
    var SelectDialog = Backbone.View.extend({
        el: $("#select_dialog"),
        events: {
            "click .card_image": function(event) {
                this.$el.dialog("close");
                this.options.searchDialog.$el.dialog("close");
                var input_mid = $("#mid_input_" + this.form_index);
                input_mid.val($(event.target).attr("multiverseid"));
                input_mid.change();
            }
        },
        show: function(searchParameters, form_index) {
            this.form_index = form_index;
            this.$el.empty();
            this.$el.dialog({width: 800, height: 800, modal: true});

            $.getJSON(
                'http://mtgbase.herokuapp.com/search', searchParameters
            ).done($.proxy(function(data) {
                if (data.length === 0) {
                    this.$el.append("<div>該当カードなし</div>");
                } else {
                    _.each(data, function(card_property) {
                        var image_tag = "<img class='card_image' src='<%= src %>' multiverseid='<%= multiverseid %>' style='cursor:pointer;'>";
                        this.$el.append(_.template(image_tag, {src: card_property.card_image_url, multiverseid: card_property.multiverseid}));
                    }, this);
                }
            }, this));
        }
    });

    var SearchDialog = Backbone.View.extend({
        el: $("#search_dialog"),
        initialize: function() {
            this.selectDialog = new SelectDialog({searchDialog: this});
        },
        events: {
            "click #card_search_button": function() {
                var params = function() {
                    var params = {};
                    _.each($("#search_dialog input[name]"), function(param) {
                        params[$(param).attr("name")] = $(param).val();
                    });
                    params['result_filter[0]'] = 'card_image_url';
                    params['result_filter[1]'] = 'multiverseid';
                    return params;
                }();
                this.selectDialog.show(params, this.form_index);
            }
        },
        show: function(form_index) {
            this.form_index = form_index;
            this.$el.dialog({width: 800, height: 550, modal: true});
        }
    });

    var searchDialog = new SearchDialog();

    var CardPrintForm = Backbone.View.extend({
    });

    var CardsInputForm = Backbone.View.extend({
        el: $("#cards_input_form"),
        cardPrintForms: new Array(),
        initialize: function() {
            $.proxy(this.events["click #add_card_input_form_button"], this)();
        },
        events: {
            "click #add_card_input_form_button": function() {
                this.$el.find("#card_list_for_print").append(_.template($("#card_print_form").html(), { index: _.size(this.cardPrintForms) }));
                this.cardPrintForms.push(new CardPrintForm());
            },
            "click #remove_card_input_form_button": function() {
                if (_.size(this.cardPrintForms) > 1) {
                    this.$el.find("#card_list_for_print").children().last().remove();
                    this.cardPrintForms.pop();
                }
            }
        }
    });

    var cardsInputForm = new CardsInputForm();

    $(".input_card_number").live("change", function(event) {
        var input_multiverseid = $(event.target);
        input_multiverseid.closest("fieldset").find("div.div_card_image img").
            attr("src", "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + String(input_multiverseid.val()) + "&type=card");
    });

    $(".card_search_button").live("click", function(event) {
        searchDialog.show($(this).attr('index'));
    });
});
