function onButtonClick() {
    $.ajax({
        url: 'http://mtgbase.herokuapp.com/search',
        data: { card_name: $("#card_name").val() },
        dataType: 'json'
    }).success(function(data) {
        var select_dialog = $("#select_dialog");

        _.each(data, function(card_property) {
            var image_tag = "<img class='card_image' src='<%= src %>' multiverseid='<%= multiverseid %>'>";
            select_dialog.append(_.template(image_tag, {src: card_property.card_image_url, multiverseid: card_property.multiverseid}));
            $("#select_dialog").dialog({width: 800, height: 550});
        });
    });
    return false;
}

$(document).ready(function(){
    $("#search_dialog").dialog({width: 800, height: 550});
    $(".card_image").live("click", function(event) {
        $("#select_dialog").dialog("close");
        $("#search_dialog").dialog("close");
        $("#mid_input_0").val($(event.target).attr("multiverseid"));
    });
});
