$(document).ready(function () {

    $("#name").on('keyup', function () {
        $("#name").removeClass('is-invalid');
    });

    $("#npwp").on('keyup', function () {
        $("#npwp").removeClass('is-invalid');
    });

    $("#monthlyIncome").on('keyup', function () {
        $("#monthlyIncome").removeClass('is-invalid');
        var temp2 = $(this).val().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        $(this).val(temp2);
    });


    // allowence checkbox
    $("#allowence").click(function () {
        $("#allowence").toggleClass("check");
        if ($("#allowence").hasClass("check")) {
            $("#status").removeAttr("disabled");
            $("#status").val("single").change();
            $("#dependent").val("tk0").change();
            $("#status option[value='unset']").remove();
        } else {
            $("#status").attr("disabled", "disabled");
            $("#dependent").attr("disabled", "disabled");
        }
    });

    $("#dependent").click(function () {
        if ($("#dependent").val() == "unset") {
            $("#dependent").removeClass('is-invalid');
        }
    });

    $("#status").change(function () {
        if ($("#status").val() == "married") {
            $("#dependent").removeAttr("disabled");
            $("#dependent option[value='tk0']").remove();
        } else if ($("#status").val() == "single") {
            $("#dependent").append(new Option("TK0 - Single with no dependent", "tk0"));
            $("#dependent").attr("disabled", "disabled");
            $("#dependent").val("tk0").change();
        } else {
            $("#dependent").attr("disabled", "disabled");
            $("#dependent").val("unset").change();
        }
    });

    // count percentage
    function getPercentage(value, percentValue) {
        return (value * percentValue) / 100;
    }
        $("#reset").click(function () {
            location.reload();
        });
});