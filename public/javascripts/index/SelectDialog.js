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

