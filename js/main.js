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

    // count percentage
    function getPercentage(value, percentValue) {
        return (value * percentValue) / 100;
    }
        $("#reset").click(function () {
            location.reload();
        });
});