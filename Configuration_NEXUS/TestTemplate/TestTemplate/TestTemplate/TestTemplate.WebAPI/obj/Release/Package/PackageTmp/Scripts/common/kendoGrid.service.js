(function () {
    'use strict';

    angular.module('erp.common').service('kendoGridService', kendoGridService);

    kendoGridService.$inject = ['config', '$filter', '$http', 'validationService', 'notificationService', '$localStorage'];

    function kendoGridService(config, $filter, $http, validationService, notificationService, $localStorage) {

        // this filter is used for our endpoint generator
        var pluralize = $filter('pluralize');

        var serviceBaseUrl = config.baseUrlApi;

        var service = {
            getGridSettings: getGridSettings,
            validations: validationService,
            filters: {
                dropDown: dropDownFilter,
                multiSelect: multiSelectFilter
            },
            editors: {
                dropDown: dropDownEditor,
                multiSelect: multiSelectEditor,
                maskedTextBox: maskedTextBoxEditor,
                dateRange: dateRangeEditor,
                numeric: numericTextBox,
                textArea: textAreaEditor,
                htmlEditor: htmlEditor
            },
            commands: {
                map: getMap // can't think of better name
            },
            helpers: {
                gridReload: gridReload,
                startChange: startChange, // date helpers
                endChange: endChange, // date helpers
                digitize: digitize
            }
        };

        function dropDownFilter(data) {
            var dropDownOptions = processParentOptions(data);
            var dropDown = function (element) {
                element.kendoDropDownList(dropDownOptions);
            };
            return dropDown;
        }

        function multiSelectFilter(data) {
            var multiSelectOptions = processParentOptions(data);
            var multiSelect = function (element) {
                element.kendoMultiSelect(multiSelectOptions);
            };
            return multiSelect;
        }

        function dropDownEditor(data) {
            var dropDownOptions = processParentOptions(data);
            var dropDown = function (container, options) {
                var input = '<input data-bind="value:' + options.field + '"/>';
                if (dropDownOptions.required) {
                    input = '<input required data-bind="value:' + options.field + '"/>';
                }
                $(input)
                    .appendTo(container)
                    .kendoDropDownList(dropDownOptions);
            };
            return dropDown;
        }


        // no spinner
        function numericTextBox(data) {
            var numeric = function (container, options) {
                var input = '<input class="k-input k-textbox" data-bind="value:' + options.field + '"/>';
                if (data.required) {
                    input = '<input class="k-input k-textbox" required data-bind="value:' + options.field + '"/>';
                }
                service.helpers.digitize(input).appendTo(container);
            };
            return numeric;
        }

        function textAreaEditor(data) {
            var textArea = function (container, options) {
                var input = '<textarea data-bind="value: ' + options.field + '" class="k-input k-textbox" rows="4"></textarea>';
                if (data.required) {
                    input = '<textarea data-bind="value: ' + options.field + '" class="k-input k-textbox" rows="4" required></textarea>';
                }
                $(input).appendTo(container);
            };
            return textArea;
        }

        function htmlEditor(data) {
            var textArea = function (container, options) {
                var input = '<textarea kendo-editor data-bind="value: ' + options.field + '" class="k-input k-textbox" rows="4"></textarea>';
                if (data.required) {
                    input = '<textarea kendo-editor data-bind="value: ' + options.field + '" class="k-input k-textbox" rows="4" required></textarea>';
                }
                $(input).appendTo(container);
            };
            return textArea;
        }

        function digitize(input) {
            return $(input).keydown(function (e) {
                // Allow: backspace, delete, tab, escape, enter and .
                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                    // Allow: Ctrl+A, Command+A
                    (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                    // Allow: home, end, left, right, down, up
                    (e.keyCode >= 35 && e.keyCode <= 40)) {
                    // let it happen, don't do anything
                    return;
                }
                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            });
        }

        function maskedTextBoxEditor(data) {
            var masked = function (container, options) {
                var input = '<input data-bind="value:' + options.field + '"/>';
                if (data.required) {
                    input = '<input required data-bind="value:' + options.field + '"/>';
                }
                $(input)
                    .appendTo(container)
                    .kendoMaskedTextBox({
                        mask: data.mask
                    });
            };
            return masked;
        }

        function dateRangeEditor(data) {
            var dateRange = function (container, options) {
                var today = kendo.date.today();
                var input = '<input data-bind="value:' + options.field + '" name="' + options.field + '"/>';
                if (data.required) {
                    input = '<input required data-bind="value:' + options.field + '" name="' + options.field + '"/>';
                }
                $(input)
                    .appendTo(container)
                    .kendoDatePicker({
                        value: today,
                        change: service.helpers[data.type + 'Change']('input[name="' + options.field + '"]', 'input[name="' + data.link + '"]'),
                        parseFormats: ['dd-MM-yyyy'],
                        format: 'dd-MM-yyyy'
                    });
            };
            return dateRange;
        }

        function startChange(startV, endV) {
            return function () {
                var start = $(startV).data('kendoDatePicker');
                var end = $(endV).data('kendoDatePicker');
                var startDate = start.value();
                var endDate = end.value();

                if (startDate) {
                    startDate = new Date(startDate);
                    startDate.setDate(startDate.getDate());
                    end.min(startDate);
                } else if (endDate) {
                    start.max(new Date(endDate));
                } else {
                    endDate = new Date();
                    start.max(endDate);
                    end.min(endDate);
                }
            };
        }

        function endChange(endV, startV) {
            return function () {
                var start = $(startV).data('kendoDatePicker');
                var end = $(endV).data('kendoDatePicker');
                var endDate = end.value();
                var startDate = start.value();

                if (endDate) {
                    endDate = new Date(endDate);
                    endDate.setDate(endDate.getDate());
                    start.max(endDate);
                } else if (startDate) {
                    end.min(new Date(startDate));
                } else {
                    endDate = new Date();
                    start.max(endDate);
                    end.min(endDate);
                }
            };
        }


        function multiSelectEditor(data) {
            var multiSelectOptions = processParentOptions(data);
            multiSelectOptions.placeholder = 'Select Roles...';
            var multiSelect = function (container, options) {
                var input = '<select multiple="multiple" name="' + options.field + '" data-bind="value:' + options.field + '"/>';
                if (multiSelectOptions.required) {
                    input = '<select required multiple="multiple" name="' + options.field + '" data-bind="value:' + options.field + '"/>';
                }
                $(input)
                    .appendTo(container)
                    .kendoMultiSelect(multiSelectOptions);
            };
            return multiSelect;
        }

        function getMap(options, isCollection) {

            var buttonMap = {
                add: { class: 'btn-default', loading: 'Mapping...', message: 'Successfully added ' },
                remove: { class: 'btn-danger', loading: 'Removing...', message: 'Successfully removed ' }
            };
            var button = { command: {}, width: 90 };

            var map = function (e) {
                e.preventDefault();
                var currentButton = $(e.currentTarget);
                var fromDataItem = this.dataItem(currentButton.closest('tr'));
                currentButton.button({ loadingText: buttonMap[options.map.type].loading }).button('loading');

                var inputParams = processParameters(options.map.input, fromDataItem);
                var outPutParams = {};

                $http.post(serviceBaseUrl + options.map.url, inputParams).then(function (results) {

                    if (options.map.type === 'remove') {
                        outPutParams = processParameters(options.map.output, fromDataItem);
                    } else {
                        var outputResult = results.data;
                        if (isCollection != undefined && isCollection === true) {
                            outputResult = results.data[0];
                        }
                        outPutParams = processParameters(options.map.output, outputResult);
                    }

                    $('[options=' + options.gridName + ']').data('kendoGrid').dataSource.remove(fromDataItem);
                    if (options.map.refresh && options.map.refresh === true) {
                        gridReload(options.map.gridName);
                    } else {
                        $('[options=' + options.map.gridName + ']').data('kendoGrid').dataSource.insert(outPutParams);
                    }
                    notificationService.success(buttonMap[options.map.type].message + fromDataItem[options.map.fieldName] + '.');
                    currentButton.button('reset');
                }, function (results) {
                    notificationService.showError(results.data);
                    currentButton.button('reset');
                });
            };

            button.command.text = _.upperFirst(options.map.type);
            button.command.className = buttonMap[options.map.type].class;
            button.command.click = map;

            return button;
        }

        function processParameters(options, dataItem) {
            var processedOptions = _.cloneDeep(options);
            _.forOwn(processedOptions, function (optionV, optionK) {
                if (optionV.constructor === Array) {
                    _.forEach(optionV, function (arrayV, arrayK) {
                        optionV[arrayK] = _.get(dataItem, _.replace(arrayV, '$', ''));

                    });
                }
                if (typeof optionV === 'string') {
                    if (optionV.indexOf('$') > -1) {
                        processedOptions[optionK] = _.get(dataItem, _.replace(optionV, '$', ''));
                    }
                }
            });
            return processedOptions;
        }

        function gridReload(grid) {
            $('[options=' + grid + ']').data('kendoGrid').dataSource.read();
        }

        function processParentOptions(data) {
            var dropDownOptions = {
                dataSource: {},
                dataValueField: data.valueField,
                dataTextField: data.textField,
                optionLabel: data.label,
                required: data.required
            };

            if (_.has(data, 'dataSource')) {
                if (typeof data.dataSource === 'object') {
                    dropDownOptions.dataSource.data = data.dataSource;
                } else if (typeof data.dataSource === 'function') {
                    dropDownOptions.dataSource.transport = {
                        read: data.dataSource
                    };
                } else {
                    dropDownOptions.dataSource.transport = {
                        read: function (options) {
                            $http.get(serviceBaseUrl + data.dataSource).then(function (results) {
                                return options.success(results.data);
                            }, function (results) {
                                return options.error(results.data);
                            });
                        }
                    };
                }
            }
            return dropDownOptions;
        }

        function getData(e) {
            var tr = $(e.target).closest('tr'); //get the row for deletion
            var data = this.dataItem(tr); //get the row data so it can be referred later
            return data;
        }

        // just turns helloWorld into Hello World
        function wordCase(str) {
            // can use _.chain _.words _.map _.upperFirst _.join _.value
            str = str.replace(/([A-Z]+)/g, ' $1')
                .replace(/([A-Z][a-z])/g, ' $1')
                .replace(/(^|\s)[a-z]/g, function upperCase(str) {
                    return str.toUpperCase();
                });
            return str;
        }

        var kendoGrid = function (meta) {
            var $this = this;
            this.meta = meta;
            this.gridSettings = {
                dataSource: {
                    transport: {},
                    error: function (e) {
                        if ($localStorage.currentUser) {
                            if (_.has(e.xhr, 'error.message')) {
                                notificationService.showError(e.xhr.error.message);
                            } else if (_.has(e.xhr, 'data.error.message')) {
                                notificationService.showError(e.xhr.data.error.message);
                            } else {
                                notificationService.showError('');
                            }
                        }
                        if (!e.xhr.retainParentView) {
                            e.sender.cancelChanges();
                        }
                        $('.k-process')
                            .button('reset')
                            .addClass('k-grid-update')
                            .removeClass('k-state-disabled')
                            .removeClass('k-process');
                    },
                    pageSize: 10,
                    schema: {
                        model: {}
                    }
                },
                sortable: true,
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
                filterable: {
                    extra: false
                },
                toolbar: ['create'],
                editable: { mode: 'popup' },
                columns: []
            };
            this.parameterMapping = [];
            this.validationRules = [];

            // This will automatically guess endpoints based on module name
            this.generateEndPoints = function (name, controller, serviceEndPoints) {
                var endpoints = {};
                if (!controller) {
                    controller = name;
                }
                if (name) {
                    endpoints = {
                        read: controller + '/ReadAll' + pluralize(name),
                        update: controller + '/Update' + name,
                        destroy: controller + '/Delete' + name,
                        create: controller + '/Add' + name
                    };
                }
                serviceEndPoints = _.assign(endpoints, serviceEndPoints);
                return serviceEndPoints;
            };

            // this will generate appropriate editors, filters for the particular field
            this.processControl = function (column, field) {
                // needs improvement here
                // parent is only required for dropdowns
                if (_.has(field, 'control.parent')) {
                    // check model if required and pass this property to custom editor
                    if (_.has(field.model, 'validation.required')) {
                        _.assign(field.control.parent, { required: field.model.validation.required });
                    }
                    if (_.has(field, 'editor')) {
                        // will pass the parent properties to our dropdown editor
                        var options = _.cloneDeep(field.control.parent);
                        options.required = false;
                        if (_.has(column, 'model.validation.required')) {
                            options.required = column.model.validation.required;
                        }
                        column.editor = field.editor(field.control.parent);

                        if (_.has(field.control, 'bindValue')) {
                            var source = field.field + '.' + field.control.parent.valueField;
                            var dest = field.control.bindValue;
                            this.parameterMapping.push({ source: source, dest: dest });
                        }
                    }

                    if (_.has(field, 'filterable.ui')) {
                        // will pass the parent properties to our dropdown filter
                        column.filterable.ui = field.filterable.ui(field.control.parent);
                    }
                } else {
                    if (_.has(field, 'editor')) {
                        // will pass the parent properties to our dropdown editor
                        var editorOptions = {};
                        if (_.has(field, 'control.options')) {
                            editorOptions = _.cloneDeep(field.control.options);
                        }
                        editorOptions.required = false;
                        if (_.has(column, 'model.validation.required')) {
                            editorOptions.required = column.model.validation.required;
                        }
                        column.editor = field.editor(editorOptions);
                    }
                }
            };

            this.processValidator = function (column) {
                var rules = ['maxLength'];
                var $this = this;
                if (_.has(column, 'model.validation')) {
                    // iterate through the validation properties
                    // if the property is a function, this is a custom validator
                    _.forOwn(column.model.validation, function (value, key) {
                        if (typeof value === 'function') {
                            // this will pass the name of the field to our custom validator
                            column.model.validation[key] = value(column.field);
                        } else {
                            if (_.findIndex(rules, key)) {
                                // these are html5 validation that should be added unto the element as attributes
                                $this.validationRules.push({ name: column.field, rule: key, value: value });
                            }
                        }
                    });
                }
            };

            this.eventOverrides = function (event, value) {
                switch (event) {
                    case 'edit':
                        this.gridSettings.edit = function (e) {
                            if (value !== undefined) {
                                // execute user edit override
                                value.apply(this, arguments);
                            }

                            // execute our default edit override
                            _.forEach($this.validationRules, function (field) {
                                e.container.find('input[name=' + field.name + ']').attr(_.lowerCase(field.rule), field.value);
                            });

                            // add asterisk to required fields
                            _.forEach(e.container.find('input[required]'), function (field) {
                                e.container.find('label[for=\'' + $(field).attr('name') + '\']').addClass('k-required');
                            });
                            _.forEach(e.container.find('select[required]'), function (field) {
                                e.container.find('label[for=\'' + $(field).attr('name') + '\']').addClass('k-required');
                            });

                            var validatorTemplate =
                                '<span class = "k-widget k-tooltip k-tooltip-validation k-invalid-msg kg-validation" > ' +
                                    '<i class="glyphicon glyphicon-exclamation-sign" ></i>' +
                                    '<div class="kg-error-message" style="display:none;">#=message#</div>' +
                                '</span>';

                            if (_.has(e.sender, 'editable')) {
                                e.sender.editable.validatable._errorTemplate = kendo.template(validatorTemplate);
                            } else {
                                e.sender.editor.editable.validatable._errorTemplate = kendo.template(validatorTemplate);
                            }

                            $('.k-window').on('mouseenter', '.kg-validation .glyphicon-exclamation-sign', function () {
                                $(this).parent('.kg-validation').find('.kg-error-message').show();
                            });

                            $('.k-window').on('mouseleave', '.kg-validation .glyphicon-exclamation-sign', function () {
                                $(this).parent('.kg-validation').find('.kg-error-message').hide();
                            });


                        };
                        break;
                    case 'save':
                        this.gridSettings.save = function (e) {
                            if (value !== undefined) {
                                // execute user save override
                                value.apply(this, arguments);
                            }

                            e.container.find('.k-grid-update')
                                .button({ loadingText: "<i class='fa fa-spinner fa-spin '></i> Update" })
                                .button('loading')
                                .addClass('k-state-disabled')
                                .addClass('k-process')
                                .removeClass('k-grid-update')
                                .on('click', function (e) { e.preventDefault(); });
                        }
                        break;
                    default:
                        if (value) {
                            this.gridSettings[event] = value;
                        }
                }
            };

            this.mapParameters = function (options) {
                _.forEach(this.parameterMapping, function (map, key) {
                    if (_.has(options, map.source)) {
                        var source = _.get(options, map.source);
                        options[map.dest] = source;
                    }
                });
                return JSON.parse(JSON.stringify(options));
            };

            this.paramTypes = { STRING: 0, FUNCTION: 1, OBJECT: 2, MIXED: 3 };

            this.checkTypes = function (serviceEndpoints) {
                var types = [];
                var $this = this;
                // had to do this variable assignment, else angular will cry
                var endpoints = serviceEndpoints;
                _.forOwn(endpoints, function (endpoint, key) {
                    var typeOf = typeof endpoint;
                    types.push($this.paramTypes[_.toUpper(typeOf)]);
                });
                types = _.uniq(types);
                if (types.length > 1) {
                    return this.paramTypes.MIXED;
                }
                return types[0];
            };

            this.processTransport = function (serviceEndpoints, transport) {
                // kendo grid does not support mix of url and functions on transports
                // this routine will support objects, functions and strings or mixed
                var $this = this;
                var type = this.checkTypes(serviceEndpoints);
                // had to do this variable assignment, else angular will cry
                var endpoints = serviceEndpoints;
                _.forOwn(endpoints, function (endpoint, key) {
                    var typeOf = typeof endpoint;
                    $this['processTransport' + _.upperFirst(typeOf)](endpoint, key, transport, type);
                });
                return transport;
            };

            this.processTransportFunction = function (endpoint, key, transport, type) {
                transport[key] = endpoint;
            };

            this.processTransportObject = function (endpoint, key, transport, type) {
                // always force kendo grid to use angular
                transport[key] = this.getTransportFunction(key, endpoint.url);
            };

            this.processTransportString = function (endpoint, key, transport, type) {
                // always force kendo grid to use angular
                transport[key] = this.getTransportFunction(key, endpoint);
            };

            this.getTransportFunction = function (key, endpoint) {
                var $this = this;
                var functions = {
                    read: function (options) {
                        $http.get(serviceBaseUrl + endpoint).then(function (results) {
                            return options.success(results.data);
                        }, function (results) {
                            return options.error(results.data);
                        });
                    },
                    create: function (options) {
                        var params = options.data;
                        // TODO: This is for bindValue on editor level, later do appropriate value binding for create and update on grid level option
                        params = $this.mapParameters(params);
                        $http.post(serviceBaseUrl + endpoint, params).then(function (results) {
                            return options.success(results.data);
                        }, function (results) {
                            return options.error(results.data);
                        });
                    },
                    update: function (options) {
                        var params = options.data;
                        params = $this.mapParameters(params);
                        $http.post(serviceBaseUrl + endpoint, params).then(function (results) {
                            return options.success(results.data);
                        }, function (results) {
                            return options.error(results.data);
                        });
                    },
                    destroy: function (options) {
                        $http.delete(serviceBaseUrl + endpoint + '/' + options.data[$this.meta.id]).then(function (results) {
                            return options.success(results.data);
                        }, function (results) {
                            return options.error(results.data);
                        });
                    }
                }
                return functions[key];
            };

            // TODO: fix to work on multiple grid on single page
            this.getGrid = function (e) {
                var type = 'Grid';
                if (_.has(this.meta, 'type')) {
                    type = this.meta.type;
                }
                var grid = $(e.target).closest('[data-role=\'' + _.toLower(type) + '\']')[0];
                return $(grid).data('kendo' + type);
            };

            return this;
        };

        // This will generate the transport parameters
        kendoGrid.prototype.generateTransport = function () {
            var serviceEndPoints = {};
            if (_.has(this.meta, 'endPoints')) {
                serviceEndPoints = this.meta.endPoints;
            }
            // user service endpoints defined by user combined with the endpoints generated by the service
            // prioritizing the user defined enpoints
            serviceEndPoints = this.generateEndPoints(this.meta.name, this.meta.controller, serviceEndPoints);
            var transport = {
                read: {},
                update: { type: 'post' },
                destroy: { type: 'delete' },
                create: { type: 'post' }
            };
            transport = this.processTransport(serviceEndPoints, transport);
            this.gridSettings.dataSource.transport = _.assign(this.gridSettings.dataSource.transport, transport);
            return this;
        };

        // this will generate column and models based on the properties set
        kendoGrid.prototype.generateMeta = function () {
            var columns = [];
            var fields = {};
            var $this = this;
            _.forEach(this.meta.fields, function (obj) {
                // this will generate columns
                var columnData = _.cloneDeep(obj);

                // automatically generate a title out of the field name
                // else use the one provided
                if (_.has(obj, 'field')) {
                    columnData.title = obj.title || wordCase(obj.field);
                }

                $this.processControl(columnData, obj);
                $this.processValidator(columnData);

                columns.push(columnData);

                if (_.has(obj, 'field')) {
                    fields[obj.field] = columnData.model;
                }

                // our custom property should not be included
                delete columnData.control;
                delete columnData.model;
            });
            if (!(_.has(this.meta, 'isEditable') && this.meta.isEditable === false)) {
                columns.push({
                    command: [
                        {
                            name: 'Edit', className: 'btn-primary',
                            imageClass: 'fa fa-pencil-square-o',
                            template: '<a class="k-button k-button-icontext btn-primary k-grid-edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</a>',
                        },
                        {
                            name: 'Delete',
                            className: 'btn-danger',
                            text: 'Delete',
                            imageClass: 'fa fa-trash-o',
                            template: '<a class="k-button k-button-icontext btn-danger k-grid-Delete"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a>',
                            click: function (e) {  //add a click event listener on the delete button
                                e.preventDefault();
                                var data = getData.apply(this, arguments);
                                var grid = $this.getGrid(e);
                                notificationService.showConfirm(data, grid);
                            }
                        }
                    ],
                    width: 180
                });
            }

            this.gridSettings.columns = columns;
            fields[this.meta.id] = { editable: false, nullable: true };
            var shcemaModel = { id: this.meta.id, fields: fields };
            if (this.meta.parentId) {
                shcemaModel.parentId = this.meta.parentId;
            }
            this.gridSettings.dataSource.schema.model = shcemaModel;
            if (_.has(this.meta, 'pageable')) {
                this.gridSettings.pageable = this.meta.pageable;
            }
            if (_.has(this.meta, 'serverPaging')) {
                this.gridSettings.dataSource.serverPaging = this.meta.serverPaging;
            }
            if (_.has(this.meta, 'totalRowCount')) {
                this.gridSettings.dataSource.schema.total = this.meta.totalRowCount;
            }
            return this;
        };


        kendoGrid.prototype.generateEditorTemplate = function () {
            if (_.has(this.meta, 'editable')) {
                if (_.has(this.meta, 'editable.template')) {
                    // just have to pass the id
                    this.meta.editable.template = kendo.template($(this.meta.editable.template).html());
                }
                this.gridSettings.editable = _.assign(this.gridSettings.editable, this.meta.editable);
            } else {
                this.gridSettings.editable = { mode: 'popup' };
            }
            return this;
        }

        kendoGrid.prototype.generateCustomEvents = function () {
            var events = ['save', 'edit', 'change', 'dataBound', 'dataBinding'];
            var $this = this;
            _.forEach(events, function (value) {
                if (_.has($this.meta, value)) {
                    $this.eventOverrides(value, $this.meta[value]);
                } else {
                    $this.eventOverrides(value, undefined);
                }
            });
            return this;
        };

        kendoGrid.prototype.generateParameterMap = function () {
            var $this = this;
            if (_.has(this.meta, 'parameterMap')) {
                this.gridSettings.dataSource.transport.parameterMap = this.meta.parameterMap;
            } else {
                var parameterMap = function (options, operation) {
                    if ((operation === 'update' || operation === 'create') && options) {
                        $this.mapParameters(options);
                        return JSON.parse(JSON.stringify(options));
                    }
                }
                this.gridSettings.dataSource.transport.parameterMap = parameterMap;
            }
            return this;
        };

        kendoGrid.prototype.checkIsEditable = function () {
            if (_.has(this.meta, 'isEditable') && this.meta.isEditable === false) {
                if (this.meta.showToolbar !== true) {
                    delete this.gridSettings.toolbar;
                }
                if (!_.has(this.meta, 'editable')) {
                    delete this.gridSettings.editable;
                }
            }
            return this;
        };

        kendoGrid.prototype.checkToolbar = function () {
            if (_.has(this.meta, 'toolbar')) {
                this.gridSettings.toolbar = this.meta.toolbar;
            }
            return this;
        };



        function getGridSettings(meta) {
            // intial refactor to gradually transition into method chaining on the controller
            var grid = new kendoGrid(meta)
                .generateTransport()
                .generateMeta()
                .generateEditorTemplate()
                .generateCustomEvents()
                .generateParameterMap()
                .checkIsEditable()
                .checkToolbar();
            return grid.gridSettings;
        }


        return service;
    }
})();