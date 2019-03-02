$(document).ready(function () {

    // count percentage
    function getPercentage(value, percentValue) {
        return (value * percentValue) / 100;
    }

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


    $("#monthlyIncome").on('keyup', function () {
        $("#monthlyIncome").removeClass('is-invalid');
        var temp2 = $(this).val().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        $(this).val(temp2);
    });

    $("#name").on('keyup', function () {
        $("#name").removeClass('is-invalid');
    });

    $("#npwp").on('keyup', function () {
        $("#npwp").removeClass('is-invalid');
    });

    $.getJSON("data.json", function (data) {
        $("#calculate").click(function () {
            if ($("#name").val() == '') {
                $("#name").addClass('is-invalid');
                // return
            } else if ($("#npwp").val() == '') {
                $("#npwp").addClass('is-invalid');
                return
            } else if ($("#monthlyIncome").val() == '') {
                $("#monthlyIncome").addClass('is-invalid');
                return
            }

            // variable declaration
            var taxRate1 = data.personal_income_taxs[0].lv1;
            var taxRate2 = data.personal_income_taxs[1].lv2;
            var taxRate3 = data.personal_income_taxs[2].lv3;
            var taxRate4 = data.personal_income_taxs[3].lv4;

            var salary1 = data.salary[0].lv1;
            var salary2 = data.salary[1].lv2;
            var salary3 = data.salary[2].lv3;

            var monthlyIncome = $("#monthlyIncome").val().replace(/,/g, "");
            var annualIncome = monthlyIncome * 12;
            var status = $("#status").val();
            var dependent = $("#dependent").val();

            var jkk = $("#jkk").val();
            var jkm = $("#jkm").val();

            // convert to integer
            var taxRate1Num = parseInt(taxRate1);
            var taxRate2Num = parseInt(taxRate2);
            var taxRate3Num = parseInt(taxRate3);
            var taxRate4Num = parseInt(taxRate4);

            var salary1Num = parseInt(salary1);
            var salary2Num = parseInt(salary2);
            var salary3Num = parseInt(salary3);

            var monthlyIncomeNum = parseInt(monthlyIncome);
            var annualIncomeNum = parseInt(annualIncome);

            var jkkNum = parseInt(jkk);
            var jkmNum = parseInt(jkm);
            var getJkk = getPercentage(monthlyIncomeNum, 0.50);
            var getJkm = getPercentage(monthlyIncomeNum, 0.30);
            var getJkkNum = parseInt(getJkk);
            var getJkmNum = parseInt(getJkm);

            var iuranPensiun = data.iuran_pensiun;
            var iuranJaminanHariTua = data.iuran_jaminan_hari_tua;

            var iuranPensiunNum = parseInt(iuranPensiun);
            var iuranJaminanHariTuaNum = parseInt(iuranJaminanHariTua);

            var grossMonthly = monthlyIncomeNum + getJkkNum + getJkmNum;
            var grossMonthlyNum = parseInt(grossMonthly);
            

            var biayaJabatan = getPercentage(grossMonthlyNum, data.biaya_jabatan);
            var biayaJabatanNum = parseInt(biayaJabatan);

            var reduction = (biayaJabatanNum + iuranPensiunNum + iuranJaminanHariTuaNum);
            var netAnnualIncome = (grossMonthlyNum - reduction)*12;
            var netAnnualIncomeNum = parseInt(netAnnualIncome);

            // get result without allowence
            function getResult(value) {
                var step1 = annualIncomeNum / 2;
                var step2 = (annualIncomeNum / 2) / 2;

                var result1 = getPercentage(step1, taxRate2Num);
                var result2 = getPercentage(step2, taxRate1Num);
                var result3 = getPercentage(step2, taxRate3Num);
                return result1 + result2 + result3;
            }

            function getDependent(value) {
                if (value == 'single' || value == 'tk0') {
                    var tk0 = parseInt(data.tax_reliefs[0].tk0);
                    return tk0;
                } else if (value == 'k0') {
                    var k0 = parseInt(data.tax_reliefs[1].k0);
                    return k0;
                } else if (value == 'k1') {
                    var k1 = parseInt(data.tax_reliefs[2].k1);
                    return k1;
                } else if (value == 'k2') {
                    var k2 = parseInt(data.tax_reliefs[3].k2);
                    return k2;
                } else if (value == 'k3') {
                    var k3 = parseInt(data.tax_reliefs[4].k3);
                    return k3;
                }
            }

            if ($("#allowence").hasClass("check")) {
                if ($("#dependent").val() == "unset") {
                    $("#dependent").addClass("is-invalid");
                    return
                }

                var selectedDependent = getDependent(dependent);
                var annualDependent = annualIncomeNum - selectedDependent;

                if (annualDependent >= 0 && annualDependent <= salary1Num) {
                    var stepDependent1 = annualIncomeNum - selectedDependent;
                    var stepDependent2 = getPercentage(stepDependent1, taxRate1Num);
                    var finalResult = stepDependent2;

                } else if (annualDependent > salary1Num && annualDependent <= salary2Num) {
                    var stepDependent1 = getPercentage(salary1Num, taxRate1Num);

                    if ((annualDependent - salary1Num) > 0) {
                        var stepDependent2 = annualDependent - salary1Num;
                        var stepDependent3 = getPercentage(stepDependent2, taxRate2Num);
                        var finalResult = stepDependent1 + stepDependent3;
                    }
                } else if (annualDependent > salary2Num && annualDependent <= salary3Num) {
                    var stepDependent1 = getPercentage(salary1Num, taxRate1Num);
                    var stepDependent2 = salary2Num - salary1Num;
                    var stepDependent3 = getPercentage(stepDependent2, taxRate2Num);

                    if ((annualDependent - (salary1Num + stepDependent2)) > 0) {
                        var stepDependent4 = annualDependent - (salary1Num + stepDependent2);
                        var stepDependent5 = getPercentage(stepDependent4, taxRate3Num);
                        var finalResult = stepDependent1 + stepDependent3 + stepDependent5;
                    }
                } else if (annualDependent > salary3Num) {
                    var stepDependent1 = getPercentage(salary1Num, taxRate1Num);
                    var stepDependent2 = salary2Num - salary1Num;
                    var stepDependent3 = getPercentage(stepDependent2, taxRate2Num);
                    var stepDependent4 = salary3Num - stepDependent2;
                    var stepDependent5 = getPercentage(stepDependent4, taxRate3Num);

                    if ((annualDependent - (salary1Num + stepDependent2 + stepDependent4)) > 0) {
                        var stepDependent6 = annualDependent - (salary1Num + stepDependent2 + stepDependent4);
                        var stepDependent7 = getPercentage(stepDependent6, taxRate4Num);
                        var finalResult = stepDependent1 + stepDependent3 + stepDependent5 + stepDependent7;
                    }
                }

                $("#grossMonthly").val(monthlyIncomeNum.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                $("#annualTaxable").val(annualDependent.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                $("#grossAnnual").val(annualIncomeNum.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                $("#annualTax").val(finalResult.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

            } else {

                if (netAnnualIncomeNum >= 0 && netAnnualIncomeNum <= salary1Num) {
                    var stepNoDependent1 = getPercentage(netAnnualIncomeNum, taxRate1Num);
                    var finalResult = stepNoDependent1;

                } else if (netAnnualIncomeNum > salary1Num && netAnnualIncomeNum <= salary2Num) {
                    var stepNoDependent1 = getPercentage(salary1Num, taxRate1Num);

                    if ((netAnnualIncomeNum - salary1Num) > 0) {
                        var stepNoDependent2 = netAnnualIncomeNum - salary1Num;
                        var stepNoDependent3 = getPercentage(stepNoDependent2, taxRate2Num);
                        var finalResult = stepNoDependent1 + stepNoDependent3;
                    }

                } else if (netAnnualIncomeNum > salary2Num && netAnnualIncomeNum <= salary3Num) {
                    var stepNoDependent1 = getPercentage(salary1Num, taxRate1Num);
                    var stepNoDependent2 = salary2Num - salary1Num;
                    var stepNoDependent3 = getPercentage(stepNoDependent2, taxRate2Num);

                    if ((netAnnualIncomeNum - (salary1Num + stepNoDependent2)) > 0) {
                        var stepNoDependent4 = netAnnualIncomeNum - (salary1Num + stepNoDependent2);
                        var stepNoDependent5 = getPercentage(stepNoDependent4, taxRate3Num);
                        var finalResult = stepNoDependent1 + stepNoDependent3 + stepNoDependent5;
                    }

                } else if (netAnnualIncomeNum > salary3Num) {
                    var stepNoDependent1 = getPercentage(salary1Num, taxRate1Num);
                    var stepNoDependent2 = salary2Num - salary1Num;
                    var stepNoDependent3 = getPercentage(stepNoDependent2, taxRate2Num);
                    var stepNoDependent4 = salary3Num - stepNoDependent2;
                    var stepNoDependent5 = getPercentage(stepNoDependent4, taxRate3Num);

                    if ((netAnnualIncomeNum - (salary1Num + stepNoDependent2 + stepNoDependent4)) > 0) {
                        var stepNoDependent6 = netAnnualIncomeNum - (salary1Num + stepNoDependent2 + stepNoDependent4);
                        var stepNoDependent7 = getPercentage(stepNoDependent6, taxRate4Num);
                        var finalResult = stepNoDependent1 + stepNoDependent3 + stepNoDependent5 + stepNoDependent7;
                    }

                }

                $("#grossMonthly").val(grossMonthlyNum.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                $("#grossAnnual").val((grossMonthlyNum*12).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                $("#netMonthly").val((grossMonthlyNum - reduction).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                $("#netAnnual").val(((grossMonthlyNum - reduction)*12).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                $("#annualTax").val(finalResult.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                $("#jkk").val(getJkkNum.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                $("#jkm").val(getJkmNum.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                $("#biayaJabatan").val(biayaJabatanNum.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));


                
                console.log(iuranPensiunNum + iuranJaminanHariTuaNum + biayaJabatanNum)
                
            }
        });

        $("#reset").click(function () {
            location.reload();
        });
    });
});