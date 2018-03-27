(function () {
    'use strict';

    angular.module('erp.configuration').controller('ConfigurationCtrl', ConfigurationCtrl);

    ConfigurationCtrl.$inject = ['$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function ConfigurationCtrl($scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable
        var xml = [];
        var defalutPassword = "";
        var defalutData = [];

        $scope.tenant = tenant;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'configuration-3' });
        

        $scope.subMenus = _.reduce(authService.currentUser.siteMap, function (memo, siteMap) {
            if (siteMap.siteMapParentId === subscriptionSiteMap.id) {
                if (typeof siteMap.tag === 'string') {
                    siteMap.tag = JSON.parse(siteMap.tag);
                }
                memo.push(siteMap);
            }
            return memo;
        }, []);

        $('canvas').remove();
        $("#toolbar_rework").hide();
        $("#toolbar_wodetail").hide();
        $("#main-container-page").css('margin-top', 0)

        $scope.tenant = tenant;

        $http.get(config.baseUrlApi + 'HMLVTS/GenerateUnitCodeList')
            .then(function (response) {

                var data = response.data;
                console.log("unitcode",data.result.length);
                createSelect(data, "unitCode");
            });

        $http.get(config.baseUrlApi + 'HMLVTS/GenerateUserIDList')
    .then(function (response) {

        var data = response.data;
        console.log("userid", data.result.length);
        createSelect(data, "userId");
    });

        var empty = [];


        //createSelect(empty, "noOfCopues");



        $scope.clickUnitCode = function clickUnitCode() {
            var value = $("#unitCode").val();
            if (value != "") {
                alert(value);
            $("#employee-name").barcode(
                //alert("ffafa");
                     value, // Value barcode (dependent on the type of barcode)
                    "ean13" // type (string)

                 );
            }
        }

        $scope.overwritePassword = function overwritePassword() {

            var valuePWD = $("#tag-password").val();
            //var valuePWD = $("input:text").val();
            //alert("test111",valuePWD);
            console.log("test",document.getElementById("tag-password"));
            console.log($scope);
            //alert("valu1e", document.getElementById("tag-password").value);
            if (valuePWD != "") {
                defalutPassword = valuePWD;
                //alert(defalutData[0].login_id+" fafa:"+defalutPassword);
                                        $("#employee-id").barcode(
                                defalutData[0].login_id, // Value barcode (dependent on the type of barcode)
                                "code39", // type (string)
                                {
                                    barWidth: 1,
                                    barHeight: 40,
                                    moduleSize: 5,
                                    showHRI: false,
                                    addQuietZone: false,
                                    marginHRI: 2,
                                    bgColor: "#FFFFFF",
                                    color: "#000000",
                                    fontSize: 0,
                                    output: "css",
                                    posX: 0,
                                    posY: 0
                                }

                             );

                        $("#password").barcode(
                                    "PWD"+defalutPassword, // Value barcode (dependent on the type of barcode)
                                    "code39", // type (string)
                                    {
                                        barWidth: 1,
                                        barHeight: 40,
                                        moduleSize: 5,
                                        showHRI: false,
                                        addQuietZone: false,
                                        marginHRI: 0,
                                        bgColor: "#FFFFFF",
                                        color: "#000000",
                                        fontSize: 0,
                                        output: "css",
                                        posX: 0,
                                        posY: 0
                                    }
                                 );


            }

        }

        $scope.clickUserId = function clickUserId() {
            var value = $("#select_userId").val();
            
            if (value != "") {
                alert(value);
                $("#employee-id").barcode(
                   
                         value, // Value barcode (dependent on the type of barcode)
                        "ean13" // type (string)

                     );
            }
        }

        $("#select_userId").change(
            function () {
                var value = $("#select_userId").val();
                $http.post(config.baseUrlApi + 'HMLVTS/fnGenerateLabel',
                {
                    "id": value
                }
                )
            .then(function (response) {
                
                defalutPassword = response.data.result[0].login_id;
                defalutData = response.data.result;
                makeBarCodeTable(response.data.result);
                //studentData = response.data.result;
                //console.log(response.data.result);
                console.log("#scrap-remark-table",response.data);
            
            })
            




               

                
            }
            )




        function createSelect(rawData, itemName) {
            var myDiv = document.getElementById("select_" + itemName);
            var array = [];
            array.push("");

            if (itemName == "unitCode") {
                console.log(rawData);
                for (var i = 0; i < rawData.result.length; i++) {
                    array.push(rawData.result[i].LocationName);
                }
            }


            if (itemName == "userId") {
                console.log(rawData);
                for (var i = 0; i < rawData.result.length; i++) {
                    array.push(rawData.result[i].login_id);
                }
            }

            //if (itemName == "noOfCopues") {
            //    array.push("1"); array.push("2"); array.push("3"); array.push("4"); array.push("5"); array.push("6"); array.push("7"); array.push("8"); array.push("9");
           // }

            //array = removeDuplicate(array);
            for (var i = 0; i < array.length; i++) {
                var option = document.createElement("option");
                option.value = array[i];
                option.text = array[i];
                myDiv.appendChild(option);
            }
        }



        function printDiv1() {
           // alert("print");
            var divToPrint = document.getElementById('print-user-tag-table');

            var newWin = window.open('', 'Print-Window');

            newWin.document.open();

            newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');

            
            console.log("newWin",newWin);
            newWin.document.close();

            //document.getElementById("copies").value = 2;

            setTimeout(function () { newWin.close(); }, 10);

            

        }

        $scope.printDiv = function printDiv() {
            var mywindow = window.open('', 'PRINT', 'height=400,width=600');

            mywindow.document.write('<html><head><title>' + document.title + '</title>');
          
            mywindow.document.write('</head><body >');
           // mywindow.document.write('<h1>' + document.title + '</h1>');
            mywindow.document.write(document.getElementById('print-user-tag-table').innerHTML);
            mywindow.document.write('</body></html>');

            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10*/

            mywindow.print();
            mywindow.close();

            return true;
        }

        

        function makeBarCodeTable(data) {
            //alert("here");
            var value1 = $("#tag-password").val();
            //alert(value1);
            // var input = document.createElement("input");
            //s input.type = data[0].user_name;
            var div = document.getElementById("employee-name");
            div.innerHTML = div.innerHTML + data[0].user_name;
            //data[0].login_id
            //data[0].user_name
            var value = data[0].login_id;
            //defalutPassword = value;
            console.log("value", value);
            //alert(value + " " + defalutPassword);
            $("#employee-id").barcode(
                    value, // Value barcode (dependent on the type of barcode)
                    "code39", // type (string)
                    {
                        barWidth: 1,
                        barHeight: 40,
                        moduleSize: 5,
                        showHRI: false,
                        addQuietZone: false,
                        marginHRI: 0,
                        bgColor: "#FFFFFF",
                        color: "#000000",
                        fontSize: 0,
                        output: "css",
                        posX: 0,
                        posY: 0
                    }

                 );

            $("#password").barcode(
                        "PWD" + value, // Value barcode (dependent on the type of barcode)
                        "code39", // type (string)
                        {
                            barWidth: 1,
                            barHeight: 40,
                            moduleSize: 5,
                            showHRI: false,
                            addQuietZone: false,
                            marginHRI: 0,
                            bgColor: "#FFFFFF",
                            color: "#000000",
                            fontSize: 0,
                            output: "css",
                            posX: 0,
                            posY: 0
                        }
                     );


        }





        



    }



})();







