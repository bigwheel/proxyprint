$(document).ready(function(){
    var select_dialog = $("#select_dialog");

    var SelectDialog = Backbone.View.extend({
        el: $("#select_dialog"),
        initialize: function() {
            searchDialog = this.options.searchDialog;
            $(".card_image").live("click", function(event) {
                select_dialog.dialog("close");
                searchDialog.$el.dialog("close");
                var input_mid = $("#mid_input_" + String(searchDialog.$el.data('index')));
                input_mid.val($(event.target).attr("multiverseid"));
                input_mid.change();
            });
        },
        show: function() {
            this.$el.empty();
            this.$el.dialog({width: 800, height: 800, modal: true});
        }
    });

    var SearchDialog = Backbone.View.extend({
        el: $("#search_dialog"),
        initialize: function() {
            this.selectDialog = new SelectDialog({searchDialog: this});
        },
        events: {
            "click #card_search_button": function() {
                this.selectDialog.show();
                var params = function() {
                    var params = {};
                    _.each($("#search_dialog input[name]"), function(param) {
                        params[$(param).attr("name")] = $(param).val();
                    });
                    params['result_filter[0]'] = 'card_image_url';
                    params['result_filter[1]'] = 'multiverseid';
                    return params;
                }();
                $.getJSON(
                    'http://mtgbase.herokuapp.com/search', params
                ).done(function(data) {
                    if (data.length === 0) {
                        select_dialog.append("<div>該当カードなし</div>");
                    } else {
                        _.each(data, function(card_property) {
                            var image_tag = "<img class='card_image' src='<%= src %>' multiverseid='<%= multiverseid %>' style='cursor:pointer;'>";
                            select_dialog.append(_.template(image_tag, {src: card_property.card_image_url, multiverseid: card_property.multiverseid}));
                        });
                    }
                });
            }
        },
        show: function(form_index) {
            this.$el.dialog({width: 800, height: 550, modal: true});
            this.$el.data('index', form_index);
        }
    });

    var searchDialog = new SearchDialog();

    var card_list_for_print = $("#card_list_for_print");
    card_list_for_print.data("count", 0);
    var add_card_input_form_button = $("#add_card_input_form_button");
    function add_card_input_form() {
        card_list_for_print.append(_.template($("#card_print_form").html(), { index: card_list_for_print.data("count") }));
        card_list_for_print.data("count", card_list_for_print.data("count") + 1);
    };
    add_card_input_form_button.click(add_card_input_form);
    add_card_input_form();
    $("#remove_card_input_form_button").click(function(){
        if (card_list_for_print.data("count") > 1) {
            card_list_for_print.children().last().remove();
            card_list_for_print.data("count", card_list_for_print.data("count") - 1);
        }
    });

    $(".input_card_number").live("change", function(event) {
        var input_multiverseid = $(event.target);
        input_multiverseid.closest("fieldset").find("div.div_card_image img").
            attr("src", "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + String(input_multiverseid.val()) + "&type=card");
    });

    $(".card_search_button").live("click", function(event) {
        searchDialog.show($(this).attr('index'));
    });
});
