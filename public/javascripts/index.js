$(document).ready(function(){
    var search_dialog = $("#search_dialog");
    var select_dialog = $("#select_dialog");

    $("#card_search_button").click(function() {
        select_dialog.dialog({width: 800, height: 550});
        select_dialog.empty();
        $.getJSON(
            'http://mtgbase.herokuapp.com/search',
            { card_name: $("#card_name").val() }
        ).done(function(data) {
            _.each(data, function(card_property) {
                var image_tag = "<img class='card_image' src='<%= src %>' multiverseid='<%= multiverseid %>'>";
                select_dialog.append(_.template(image_tag, {src: card_property.card_image_url, multiverseid: card_property.multiverseid}));
            });
        });
    });

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
        search_dialog.dialog({width: 800, height: 550});
        search_dialog.data('index', $(this).attr('index'));
    });

    $(".card_image").live("click", function(event) {
        select_dialog.dialog("close");
        search_dialog.dialog("close");
        var input_mid = $("#mid_input_" + String(search_dialog.data('index')));
        input_mid.val($(event.target).attr("multiverseid"));
        input_mid.change();
    });
});
