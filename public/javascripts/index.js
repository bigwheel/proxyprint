$(document).ready(function(){
    var search_dialog = $("#search_dialog");
    var select_dialog = $("#select_dialog");

    $("#card_search_button").click(function() {
        select_dialog.dialog({width: 800, height: 550});
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
    add_card_input_form_button.click(function() {
        card_list_for_print.append(_.template($("#card_print_form").html(), { index: card_list_for_print.data("count") }));
        card_list_for_print.data("count", card_list_for_print.data("count") + 1);
    });
    add_card_input_form_button.click();

    $(".card_search_button").live("click", function(event) {
        search_dialog.dialog({width: 800, height: 550});
        search_dialog.data('index', $(this).attr('index'));
    });

    $(".card_image").live("click", function(event) {
        select_dialog.dialog("close");
        search_dialog.dialog("close");
        $("#mid_input_" + String(search_dialog.data('index'))).val($(event.target).attr("multiverseid"));
    });
});
