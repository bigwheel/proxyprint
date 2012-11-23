define(["./SelectDialog"], function(SelectDialog) {
    return Backbone.View.extend({
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
});
