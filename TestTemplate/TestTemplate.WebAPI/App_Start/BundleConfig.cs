using System.Web;
using System.Web.Optimization;

namespace TestTemplate.WebAPI
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/thirdparty").Include(
                                        //"~/Scripts/_thirdParty/angular-svg-round-progressbar/module.js",
                        //"~/Scripts/_thirdParty/angular-svg-round-progressbar/roundProgress.js",
                        //"~/Scripts/_thirdParty/angular-svg-round-progressbar/roundProgressConfig.js",
                        //"~/Scripts/_thirdParty/angular-svg-round-progressbar/roundProgressService.js",
                        //"~/Scripts/_thirdParty/angular-svg-round-progressbar/shim.js",
                        "~/Scripts/_thirdParty/jquery/dist/jquery.js",
                        "~/Scripts/_thirdParty/jquery/jquery-ui/jquery-ui.js",
                        "~/Scripts/_thirdParty/jquery/jquery-sortable.js",
                        "~/Scripts/_thirdParty/angular/angular.js",
                        "~/Scripts/_thirdParty/bootstrap/dist/js/bootstrap.js",
                        "~/Scripts/_thirdParty/navgoco/src/jquery.navgoco.js",
                        "~/Scripts/_thirdParty/angular-animate/angular-animate.js",
                        "~/Scripts/_thirdParty/angular-cookies/angular-cookies.js",
                        "~/Scripts/_thirdParty/angular-resource/angular-resource.js",
                        "~/Scripts/_thirdParty/angular-route/angular-route.js",
                        "~/Scripts/_thirdParty/angular-sanitize/angular-sanitize.js",
                        "~/Scripts/_thirdParty/angular-touch/angular-touch.js",
                        "~/Scripts/_thirdParty/angular-ui-router/release/angular-ui-router.js",
                        "~/Scripts/_thirdParty/ngstorage/ngStorage.js",
                        "~/Scripts/_thirdParty/angular-messages/angular-messages.js",
                        "~/Scripts/_thirdParty/angular-loading-bar/build/loading-bar.js",
                        "~/Scripts/_thirdParty/ng-pluralize-filter/ng-pluralize-filter.js",
                        "~/Scripts/_thirdParty/angular-breadcrumb/dist/angular-breadcrumb.js",
                        "~/Scripts/_thirdParty/lodash/lodash.js",
                        "~/Scripts/_thirdParty/sweetalert2/dist/sweetalert2.js",
                        "~/Scripts/_thirdParty/es6-promise/es6-promise.js",
                        "~/Scripts/_thirdParty/kendo/kendo.all.min.js",
                        "~/Scripts/_thirdParty/kendo/kendo.aspnetmvc.min.js",
                        "~/Scripts/_thirdParty/toastr/toastr.js",
                        "~/Scripts/_thirdParty/exportExcel/alasql.min.js",
                        "~/Scripts/_thirdParty/exportExcel/xlsx.core.min.js",
                        "~/Scripts/_thirdParty/exportExcel/FileSaver.js",
                        "~/Scripts/_thirdParty/barcode/jquery-barcode.js",
                        "~/Scripts/_thirdParty/barcode/jquery-barcode.min.js",
                        "~/Scripts/_thirdParty/tagator/fm.tagator.jquery.js",
                        "~/Scripts/_thirdParty/jquery/src/moment.js",
                        "~/Scripts/_thirdParty/jquery/src/datetimepicker.js",
                        "~/Scripts/_thirdParty/jquery/src/date.js",
                        "~/Scripts/_thirdParty/jquery/jquery-confirm.js",
                        "~/Scripts/_thirdParty/dropzone/dropzone.js",

                        //"~/Scripts/_thirdParty/ng-file-upload-bower/ng-file-upload-shim.min.js",
                        //"~/Scripts/_thirdParty/ng-file-upload-bower/ng-file-upload.min.js",
                         //"~/Scripts/_thirdParty/ng-file-upload-bower/angular-file-upload.js",
                         //"~/Scripts/_thirdParty/ng-file-upload-bower/es5-sham.min.js",
                         //"~/Scripts/_thirdParty/ng-file-upload-bower/es5-sham.man.js",
                         //"~/Scripts/_thirdParty/ng-file-upload-bower/console-sham.js",
                        // ng-file-upload-bower

                        //3js scripts
                        "~/Scripts/_thirdParty/build/three.js",
                        "~/Scripts/_thirdParty/renderers/Projector.js",
                        "~/Scripts/_thirdParty/renderers/CanvasRenderer.js",
                        "~/Scripts/_thirdParty/libs/stats.min.js",                      
                        "~/Scripts/_thirdParty/obj/Bird.js",
                        "~/Scripts/_thirdParty/threejs/controls/OrbitControls.js",
                        "~/Scripts/_thirdParty/threejs/Detector.js",
                        "~/Scripts/_thirdParty/threejs/libs/dat.gui.min.js",
                        "~/Scripts/_thirdParty/threejs/geometries/TeapotBufferGeometry.js",
                        "~/Scripts/_thirdParty/threejs/loaders/OBJLoader.js",
                        "~/Scripts/_thirdParty/threejs/loaders/DDSLoader.js"


                        ));

            bundles.Add(new ScriptBundle("~/bundles/application").Include(
                        "~/Scripts/app.module.js",

                        "~/Scripts/core/core.module.js",
                        "~/Scripts/core/constants.js",
                        "~/Scripts/core/config.js",
                        "~/Scripts/core/httpProvider.config.js",
                        "~/Scripts/core/run.js",

                        "~/Scripts/nexusNg/auth.module.js",
                        "~/Scripts/nexusNg/authInterceptorService.js",
                        "~/Scripts/nexusNg/auth.validator.js",
                        "~/Scripts/nexusNg/auth.service.js",

                        "~/Scripts/common/common.module.js",
                        "~/Scripts/common/notification.service.js",
                        "~/Scripts/common/kendoGrid.service.js",
                        "~/Scripts/common/utility.service.js",
                        "~/Scripts/common/validation.service.js",

                        "~/Scripts/dashboard/dashboard.module.js",
                        "~/Scripts/dashboard/dashboard.controller.js",

                        "~/Scripts/layout/layout.module.js",
                        "~/Scripts/layout/forgotpassword.controller.js",
                        "~/Scripts/layout/login.controller.js",
                        "~/Scripts/layout/navbar.controller.js",

                        "~/Scripts/repository/repository.module.js",
                        "~/Scripts/repository/repo.service.js",
                        "~/Scripts/repository/customer.service.js",
                        "~/Scripts/repository/review.service.js",
                        "~/Scripts/repository/tenant.service.js",

                        "~/Scripts/customer/customer.module.js",
                        "~/Scripts/customer/customer.controller.js",
                        "~/Scripts/customer/customer.dashboard.controller.js",
                        "~/Scripts/customer/customer.review.controller.js",

                        "~/Scripts/myCompany/myCompany.module.js",
                        "~/Scripts/myCompany/myCompany.controller.js",
                        "~/Scripts/myCompany/myCompany.roles.controller.js",
                        "~/Scripts/myCompany/myCompany.rolesSiteMap.controller.js",
                        "~/Scripts/myCompany/myCompany.users.controller.js",
                        "~/Scripts/myCompany/myCompany.splitReport.controller.js",

                        "~/Scripts/myCompany/myCompany.masterdatamgmt.service.js",
                        "~/Scripts/myCompany/myCompany.masterdatamgmtdetail.controller.js",
                        "~/Scripts/myCompany/tenant.mytab.directive.js",

                        "~/Scripts/review/review.module.js",
                        "~/Scripts/review/review.controller.js",

                        "~/Scripts/configuration/configuration.module.js",
                        "~/Scripts/configuration/configuration.controller.js",

                        "~/Scripts/report/report.module.js",
                        "~/Scripts/report/report.controller.js",

                        //"~/Scripts/multiple/multiple.module.js",
                        //"~/Scripts/multiple/multiple.controller.js",

                        "~/Scripts/priority/priority.module.js",
                        "~/Scripts/priority/priority.controller.js",

                        "~/Scripts/rework/rework.module.js",
                        "~/Scripts/rework/rework.controller.js",

                        "~/Scripts/split/split.module.js",
                        "~/Scripts/split/split.controller.js",

                        "~/Scripts/dispatch/dispatch.module.js",
                        "~/Scripts/dispatch/dispatch.controller.js",

                        "~/Scripts/trackingReport/trackingReport.module.js",
                        "~/Scripts/trackingReport/trackingReport.controller.js",

                        "~/Scripts/hashPassword/hashPassword.module.js",
                        "~/Scripts/hashPassword/hashPassword.controller.js",

                        "~/Scripts/customisedOperatorReport/customisedOperatorReport.module.js",
                        "~/Scripts/customisedOperatorReport/customisedOperatorReport.controller.js",

                         "~/Scripts/threejs/threejs.module.js",
                        "~/Scripts/threejs/threejs.controller.js",

                        "~/Scripts/wodetail/wodetail.module.js",
                        "~/Scripts/wodetail/wodetail.controller.js",
                        //"~/Scripts/wodetail/upload.php",

                        "~/Scripts/routeDetail/routeDetail.module.js",
                        "~/Scripts/routeDetail/routeDetail.controller.js",

                        "~/Scripts/operatorReport/operatorReport.module.js",
                        "~/Scripts/operatorReport/operatorReport.controller.js",

                        "~/Scripts/splitReport/splitReport.module.js",
                        "~/Scripts/splitReport/splitReport.controller.js",

                        //"~/Scripts/releasedReport/releasedReport.module.js",
                        //"~/Scripts/releasedReport/releasedReport.controller.js",

                        "~/Scripts/reworkReport/reworkReport.module.js",
                        "~/Scripts/reworkReport/reworkReport.controller.js",

                        "~/Scripts/scrapReport/scrapReport.module.js",
                        "~/Scripts/scrapReport/scrapReport.controller.js",


                        "~/Scripts/releasedReport/releasedReport.module.js",
                        "~/Scripts/releasedReport/releasedReport.controller.js",

                        "~/Scripts/backup/backup.module.js",
                        "~/Scripts/backup/backup.controller.js",

                         "~/Scripts/wostatus/wostatus.module.js",
                        "~/Scripts/wostatus/wostatus.controller.js",

                        "~/Scripts/lockReport/lockReport.module.js",
                        "~/Scripts/lockReport/lockReport.controller.js",

                        "~/Scripts/wotracking/wotracking.module.js",
                        "~/Scripts/wotracking/wotracking.controller.js",

                        "~/Scripts/qctracking/qctracking.module.js",
                        "~/Scripts/qctracking/qctracking.controller.js",

                        "~/Scripts/dashboardDemo/dashboardDemo.module.js",
                        "~/Scripts/dashboardDemo/dashboardDemo.controller.js"

                        //"~/Scripts/mctDashboard/mctDashboard.module.js",
                        //"~/Scripts/mctDashboard/mctDashboard.controller.js"



                        ));

            bundles.Add(new StyleBundle("~/Content/thirdparty").Include(
                        "~/Content/bootstrap.min.css",
                        "~/Scripts/_thirdParty/kendo/kendo.common.min.css",
                        "~/Scripts/_thirdParty/kendo/kendo.default.min.css",
                        "~/Scripts/_thirdParty/kendo/kendo.fiori.min.css",
                        "~/Scripts/_thirdParty/animate.css/animate.css",
                        "~/Scripts/_thirdParty/components-font-awesome/css/font-awesome.min.css",
                        "~/Scripts/_thirdParty/neuboard-css/main.css",
                        "~/Scripts/_thirdParty/neuboard-css/simple-line-icons.css",
                        "~/Scripts/_thirdParty/sweetalert2/dist/sweetalert2.css",
                        "~/Scripts/_thirdParty/toastr/toastr.css",
                        "~/Content/css/loading-bar.css",
                        "~/Content/css/site.css",
                        "~/Content/css/custom-font.css",
                        "~/Content/css/customs.css",
                        "~/Scripts/_thirdParty/jquery/jquery-ui/jquery-ui.css",
                        "~/Scripts/_thirdParty/jquery/jquery-ui/jquery-confirm.less",
                        "~/Scripts/_thirdParty/jquery/jquery-ui/jquery-confirm.css",
                        "~/Scripts/_thirdParty/tagator/fm.tagator.jquery.css"
                        
                        //,
                        //"~/Content/img/box.obj"
                        //,
                        // "~/Content/css/style4.css"
                        ));
        }
    }
}
