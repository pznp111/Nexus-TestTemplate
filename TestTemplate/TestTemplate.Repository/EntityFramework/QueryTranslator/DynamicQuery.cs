//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace TestTemplate.Repository.EntityFramework.QueryTranslator
//{
//    public class DynamicQuery
//    {
//        private void GenerateDynamicWOStatusList()
//        {
//            this.Cursor = Cursors.WaitCursor;

//            SqlCommand WOSQLCommand = null;
//            ArrayList rowList = new ArrayList();
//            SqlDataAdapter SQLAdapter = null;
//            DataTable dt = null;
//            string WOStatusSQL = null;
//            string WOStatus = null;
//            string WOStatusSQL1 = null;



//            this.fpSpreadWOInfo.ActiveSheet.ClearRange(0, 0,
//                this.fpSpreadWOInfo.ActiveSheet.RowCount, this.fpSpreadWOInfo.ActiveSheet.ColumnCount, true);
//            this.fpSpreadWOInfo.ActiveSheet.RowCount = 0;

//            fpSpreadWOInfo.ActiveSheet.DataSource = null;

//            fpSpreadWOInfo.SuspendLayout();

//            WOStatusSQL1 =
//                     "Select Distinct wo.WOID, wo.PartID, wo.ToolDescription, wo.ReleasedDate, wo.RequestedDeliveryDate, "
//                    + "wo.CommittedDeliveryDate, wo.StartDate, wo.EndDate, wo.PlannerRemark, wo.WOStatus "
//                    + ",wo.ActualProdQty, wo.CompletedQty "
//                    + ", (select ActualRecQty from TS_WorkOrderexecution t "
//                    + "where t.woid = wo.woid "
//                    + "and t.procopseq = 1 ) AS ActualRecQty " //gh 2016Feb28
//                                                               //+ ",wo.ActualRecQty " //gh 2016Feb28
//                                                               //+ ",woe.Remark "
//                    + ",(SELECT t.Remark "
//                    + "FROM TS_WorkOrderexecution t "
//                    + "CROSS APPLY (SELECT MAX(ProcOpSeq) AS MaxProcOpSeq "
//                    + "FROM TS_WorkOrderexecution "
//                    + "WHERE woid = t.woid "
//                    + "and ( Remark is not null and Remark <> '' ) "
//                    + "and woid =wo.woid ) t1 "
//                    + "WHERE t1.MaxProcOpSeq = t.ProcOpSeq ) as Remark "
//                    + ",(SELECT t.workcenter "
//                    + "FROM TS_WorkOrderexecution t "
//                    + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//                    + "FROM TS_WorkOrderexecution "
//                    + "WHERE woid = t.woid "
//                    + "and wostatus not like 'completed%' "
//                    + "and woid =wo.woid ) t1 "
//                    + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as workcenter "
//                    + ",(SELECT t.ProcOpSeq "
//                    + "FROM TS_WorkOrderexecution t "
//                    + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//                    + "FROM TS_WorkOrderexecution "
//                    + "WHERE woid = t.woid "
//                    + "and wostatus not like 'completed%' "
//                    + "and woid =wo.woid ) t1 "
//                    + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as ProcOpSeq "
//                    + ",(SELECT t.wostatus "
//                    + "FROM TS_WorkOrderexecution t "
//                    + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//                    + "FROM TS_WorkOrderexecution "
//                    + "WHERE woid = t.woid "
//                    + "and wostatus not like 'completed%' "
//                    + "and woid =wo.woid ) t1 "
//                    + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as ProcessStatus "
//                    + ",(SELECT t.McID "
//                    + "FROM TS_WorkOrderexecution t "
//                    + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//                    + "FROM TS_WorkOrderexecution "
//                    + "WHERE woid = t.woid "
//                    + "and wostatus not like 'completed%' "
//                    + "and woid =wo.woid ) t1 "
//                    + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as McID "
//                    + ",(SELECT t.CompletedQty "
//                    + "FROM TS_WorkOrderexecution t "
//                    + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//                    + "FROM TS_WorkOrderexecution "
//                    + "WHERE woid = t.woid "
//                    + "and wostatus not like 'completed%' "
//                    + "and woid =wo.woid ) t1 "
//                    + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as ProcessCompletedQty "
//                    + ",b.Customer "
//                    //+ ",(select Customer "
//                    //+ "from " + GlobalVar.WOGlobalPSDatabase + "WorkOrderMaster "
//                    //+ "where ID = wo.SalesOrderID )as Customer "
//                    //////gh 2014Mar24 use other column
//                    //////+ ", (select FGDimension1 from " + GlobalVar.WOGlobalPSDatabase + "WorkOrderMaster "
//                    //////+ "where ID = wo.WOID) as FGDimension "
//                    //////+ ", PONumber = (stuff ((select', ' + rtrim(PONum) "
//                    //////+ "from " + GlobalVar.WOGlobalPSDatabase + "SalesOrderMaster "
//                    //////+ "where ID  in (Select SODetID from " + GlobalVar.WOGlobalPSDatabase + "WorkOrderDetail "
//                    //////+ "where woid = wo.WOID) "
//                    //////+ "FOR XML PATH('')), 1, 2, '') ) "
//                    //////gh 2014Aug08
//                    + ",a.Description "
//                    + ",a.FGDimension "
//                    + ",case WHEN 0 = CHARINDEX('.', a.WOID) "
//                    + "then a.PONumber "
//                    + "else (select PONumber "
//                    + "FROM " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo "
//                    + "where WOID = left (a.WOID, charindex('.', a.WOID + '.') - 1)) "
//                    + "end as PONumber "
//                    + ",case WHEN 0 = CHARINDEX('.', a.WOID) "
//                    + "then a.LineNumber "
//                    + "else (select LineNumber "
//                    + "FROM " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo "
//                    + "where WOID = left (a.WOID, charindex('.', a.WOID + '.') - 1)) "
//                    + "end as LineNumber "
//                    + ",a.Remark as SORemark "
//                    //+ ",a.CreatedBy as IssuedBy ";
//                    + ",(select user_name FROM " + GlobalVar.WOGlobalPSDatabase + "user_det "
//                    + "where login_id = a.CreatedBy ) as IssuedBy ";
//            //gh 2014Aug08
//            //+ ", (select Description from " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo "
//            //+ "where WOID = wo.WOID) as Description "
//            //+ ", (select Remark from " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo "
//            //+ "where WOID = wo.WOID) as SORemark "
//            //+ ", (select LineNumber from " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo "
//            //+ "where WOID = wo.WOID) as SOLineNumber "

//            //+ ", (select FGDimension from " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo "
//            //+ "where WOID = wo.WOID) as FGDimension "

//            //+ ", (select PONumber from " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo "
//            //+ "where WOID = wo.WOID) as PONumber "

//            //+ ", (select CreatedBy from " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo "
//            //+ "where WOID = wo.WOID) as IssuedBy ";
//            //+ ",(select UserID "
//            //+ "from " + GlobalVar.WOGlobalPSDatabase + "WorkOrderMaster "
//            //+ "where ID = wo.SalesOrderID )as IssuedBy ";
//            //+ ",(Select cust_id "
//            //+ "from " + GlobalVar.WOGlobalPSDatabase + "customer "
//            //+ "where cust_id =  ( select Customer "
//            //+ "from " + GlobalVar.WOGlobalPSDatabase + "WorkOrderMaster "
//            //+ "where ID = wo.SalesOrderID ) )as CustomerID ";

//            if (optQueuing.Checked)
//            {
//                WOStatus = "Queuing";
//            }
//            else if (optProcessing.Checked)
//            {
//                WOStatus = "Processing";
//            }
//            else if (optCompleted.Checked)
//            {
//                WOStatus = "Completed";
//            }
//            else if (optNotCompleted.Checked)
//            {
//                //check not like WOStatus
//                WOStatus = "Completed";
//            }

//            if (comboWOlist.Text.Trim() != "")
//            {
//                WOStatusSQL = WOStatusSQL1
//                + "From TS_WorkOrder wo "
//                + "inner join TS_WorkOrderExecution woe "
//                + "on wo.WOID = woe.WOID "
//                + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo a " //gh 2015Jul13
//                + "on a.WOID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderMaster b " //gh 2015Jul13
//                + "on b.ID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//                + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//                + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//                + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//                //+ "And wo.WOStatus like '" + WOStatus + "%' "
//                + "And ( PONumber like '" + comboPONo.Text.Trim() + "%' "
//                + " or PONumber is Null ) "
//                + "And ( LineNumber like '" + comboSOLineNo.Text.Trim() + "%' "
//                + " or LineNumber is Null ) "
//                + "And ( a.Remark like '" + comboSORemark.Text.Trim() + "%' "
//                + " or a.Remark is Null ) "
//                + "And ( a.FGDimension like '" + comboFGDimension.Text.Trim() + "%' "
//                + " or a.FGDimension is Null ) "
//                + "And b.Customer like '" + comboCustomerID.Text.Trim() + "%' "
//                //+ "And wo.ReleasedDate Between '" + this.dateTimePickerStart.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                //+ "And  '" + this.dateTimePickerEnd.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                //+ "AND wo.WOID not in " //gh 2015Jul13
//                //+ "( Select distinct ParentWOID " //gh 2015Jul13
//                //+ "from TS_WorkOrder  " //gh 2015Jul13
//                //+ "where ParentWOID is not null )  " //gh 2015Jul13
//                + "Order by wo.WOID ASC ";
//            }
//            else if (comboPONo.Text.Trim() != "")
//            {
//                WOStatusSQL = WOStatusSQL1
//                + "From TS_WorkOrder wo "
//                + "inner join TS_WorkOrderExecution woe "
//                + "on wo.WOID = woe.WOID "
//                + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo a " //gh 2015Jul13
//                + "on a.WOID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderMaster b " //gh 2015Jul13
//                + "on b.ID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//                + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//                + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//                + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//                //+ "And wo.WOStatus like '" + WOStatus + "%' "
//                + "And PONumber like '" + comboPONo.Text.Trim() + "%' "
//                + "And ( LineNumber like '" + comboSOLineNo.Text.Trim() + "%' "
//                + " or LineNumber is Null ) "
//                + "And ( a.Remark like '" + comboSORemark.Text.Trim() + "%' "
//                + " or a.Remark is Null ) "
//                + "And ( a.FGDimension like '" + comboFGDimension.Text.Trim() + "%' "
//                + " or a.FGDimension is Null ) "
//                + "And b.Customer like '" + comboCustomerID.Text.Trim() + "%' "
//                //+ "And wo.ReleasedDate Between '" + this.dateTimePickerStart.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                //+ "And  '" + this.dateTimePickerEnd.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                //+ "AND wo.WOID not in " //gh 2015Jul13
//                //+ "( Select distinct ParentWOID " //gh 2015Jul13
//                //+ "from TS_WorkOrder  " //gh 2015Jul13
//                //+ "where ParentWOID is not null )  " //gh 2015Jul13
//                + "Order by wo.WOID ASC ";
//            }
//            else if (comboSOLineNo.Text.Trim() != "")
//            {
//                if (optNotCompleted.Checked)
//                {
//                    WOStatusSQL = WOStatusSQL1
//                    + "From TS_WorkOrder wo "
//                    + "inner join TS_WorkOrderExecution woe "
//                    + "on wo.WOID = woe.WOID "
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo a " //gh 2015Jul13
//                    + "on a.WOID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderMaster b " //gh 2015Jul13
//                    + "on b.ID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//                    + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//                    + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//                    + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//                    + "And wo.WOStatus not like '" + WOStatus + "%' "
//                    + "And ( PONumber like '" + comboPONo.Text.Trim() + "%' "
//                    + " or PONumber is Null ) "
//                    + "And LineNumber like '" + comboSOLineNo.Text.Trim() + "%' "
//                    + "And ( a.Remark like '" + comboSORemark.Text.Trim() + "%' "
//                    + " or a.Remark is Null ) "
//                    + "And ( a.FGDimension like '" + comboFGDimension.Text.Trim() + "%' "
//                    + " or a.FGDimension is Null ) "
//                    + "And b.Customer like '" + comboCustomerID.Text.Trim() + "%' "
//                    + "And wo.ReleasedDate Between '" + this.dateTimePickerStart.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    + "And  '" + this.dateTimePickerEnd.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    //+ "AND wo.WOID not in " //gh 2015Jul13
//                    //+ "( Select distinct ParentWOID " //gh 2015Jul13
//                    //+ "from TS_WorkOrder  " //gh 2015Jul13
//                    //+ "where ParentWOID is not null )  " //gh 2015Jul13
//                    + "Order by wo.WOID ASC ";
//                }
//                else if (optAll.Checked)
//                {
//                    WOStatusSQL = WOStatusSQL1
//                    + "From TS_WorkOrder wo "
//                    + "inner join TS_WorkOrderExecution woe "
//                    + "on wo.WOID = woe.WOID "
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo a " //gh 2015Jul13
//                    + "on a.WOID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderMaster b " //gh 2015Jul13
//                    + "on b.ID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//                    + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//                    + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//                    + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//                    //+ "And wo.WOStatus like '" + WOStatus + "%' "
//                    + "And ( PONumber like '" + comboPONo.Text.Trim() + "%' "
//                    + " or PONumber is Null ) "
//                    + "And ( LineNumber like '" + comboSOLineNo.Text.Trim() + "%' "
//                    + " or LineNumber is Null ) "
//                    + "And ( a.Remark like '" + comboSORemark.Text.Trim() + "%' "
//                    + " or a.Remark is Null ) "
//                    + "And ( a.FGDimension like '" + comboFGDimension.Text.Trim() + "%' "
//                    + " or a.FGDimension is Null ) "
//                    + "And b.Customer like '" + comboCustomerID.Text.Trim() + "%' "
//                    + "And wo.ReleasedDate Between '" + this.dateTimePickerStart.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    + "And  '" + this.dateTimePickerEnd.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    //+ "AND wo.WOID not in " //gh 2015Jul13
//                    //+ "( Select distinct ParentWOID " //gh 2015Jul13
//                    //+ "from TS_WorkOrder  " //gh 2015Jul13
//                    //+ "where ParentWOID is not null )  " //gh 2015Jul13
//                    + "Order by wo.WOID ASC ";
//                }
//                else
//                {
//                    WOStatusSQL = WOStatusSQL1
//                    + "From TS_WorkOrder wo "
//                    + "inner join TS_WorkOrderExecution woe "
//                    + "on wo.WOID = woe.WOID "
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo a " //gh 2015Jul13
//                    + "on a.WOID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderMaster b " //gh 2015Jul13
//                    + "on b.ID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//                    + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//                    + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//                    + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//                    + "And wo.WOStatus like '" + WOStatus + "%' "
//                    + "And ( PONumber like '" + comboPONo.Text.Trim() + "%' "
//                    + " or PONumber is Null ) "
//                    + "And ( LineNumber like '" + comboSOLineNo.Text.Trim() + "%' "
//                    + " or LineNumber is Null ) "
//                    + "And ( a.Remark like '" + comboSORemark.Text.Trim() + "%' "
//                    + " or a.Remark is Null ) "
//                    + "And ( a.FGDimension like '" + comboFGDimension.Text.Trim() + "%' "
//                    + " or a.FGDimension is Null ) "
//                    + "And b.Customer like '" + comboCustomerID.Text.Trim() + "%' "
//                    + "And wo.ReleasedDate Between '" + this.dateTimePickerStart.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    + "And  '" + this.dateTimePickerEnd.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    //+ "AND wo.WOID not in " //gh 2015Jul13
//                    //+ "( Select distinct ParentWOID " //gh 2015Jul13
//                    //+ "from TS_WorkOrder  " //gh 2015Jul13
//                    //+ "where ParentWOID is not null )  " //gh 2015Jul13
//                    + "Order by wo.WOID ASC ";

//                }
//            }
//            else if (comboSORemark.Text.Trim() != "")
//            {
//                if (optNotCompleted.Checked)
//                {
//                    WOStatusSQL = WOStatusSQL1
//                    + "From TS_WorkOrder wo "
//                    + "inner join TS_WorkOrderExecution woe "
//                    + "on wo.WOID = woe.WOID "
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo a " //gh 2015Jul13
//                    + "on a.WOID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderMaster b " //gh 2015Jul13
//                    + "on b.ID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//                    + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//                    + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//                    + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//                    + "And wo.WOStatus not like '" + WOStatus + "%' "
//                    + "And ( PONumber like '" + comboPONo.Text.Trim() + "%' "
//                    + " or PONumber is Null ) "
//                    + "And ( LineNumber like '" + comboSOLineNo.Text.Trim() + "%' "
//                    + " or LineNumber is Null ) "
//                    + "And a.Remark like '" + comboSORemark.Text.Trim() + "%' "
//                    + "And ( a.FGDimension like '" + comboFGDimension.Text.Trim() + "%' "
//                    + " or a.FGDimension is Null ) "
//                    + "And b.Customer like '" + comboCustomerID.Text.Trim() + "%' "
//                    + "And wo.ReleasedDate Between '" + this.dateTimePickerStart.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    + "And  '" + this.dateTimePickerEnd.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    //+ "AND wo.WOID not in " //gh 2015Jul13
//                    //+ "( Select distinct ParentWOID " //gh 2015Jul13
//                    //+ "from TS_WorkOrder  " //gh 2015Jul13
//                    //+ "where ParentWOID is not null )  " //gh 2015Jul13
//                    + "Order by wo.WOID ASC ";
//                }
//                else if (optAll.Checked)
//                {
//                    WOStatusSQL = WOStatusSQL1
//                    + "From TS_WorkOrder wo "
//                    + "inner join TS_WorkOrderExecution woe "
//                    + "on wo.WOID = woe.WOID "
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo a " //gh 2015Jul13
//                    + "on a.WOID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderMaster b " //gh 2015Jul13
//                    + "on b.ID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//                    + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//                    + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//                    + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//                    //+ "And wo.WOStatus like '" + WOStatus + "%' "
//                    + "And ( PONumber like '" + comboPONo.Text.Trim() + "%' "
//                    + " or PONumber is Null ) "
//                    + "And ( LineNumber like '" + comboSOLineNo.Text.Trim() + "%' "
//                    + " or LineNumber is Null ) "
//                    + "And a.Remark like '" + comboSORemark.Text.Trim() + "%' "
//                    + "And ( a.FGDimension like '" + comboFGDimension.Text.Trim() + "%' "
//                    + " or a.FGDimension is Null ) "
//                    + "And b.Customer like '" + comboCustomerID.Text.Trim() + "%' "
//                    + "And wo.ReleasedDate Between '" + this.dateTimePickerStart.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    + "And  '" + this.dateTimePickerEnd.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    //+ "AND wo.WOID not in " //gh 2015Jul13
//                    //+ "( Select distinct ParentWOID " //gh 2015Jul13
//                    //+ "from TS_WorkOrder  " //gh 2015Jul13
//                    //+ "where ParentWOID is not null )  " //gh 2015Jul13
//                    + "Order by wo.WOID ASC ";
//                }
//                else
//                {
//                    WOStatusSQL = WOStatusSQL1
//                    + "From TS_WorkOrder wo "
//                    + "inner join TS_WorkOrderExecution woe "
//                    + "on wo.WOID = woe.WOID "
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo a " //gh 2015Jul13
//                    + "on a.WOID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderMaster b " //gh 2015Jul13
//                    + "on b.ID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//                    + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//                    + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//                    + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//                    + "And wo.WOStatus like '" + WOStatus + "%' "
//                    + "And ( PONumber like '" + comboPONo.Text.Trim() + "%' "
//                    + " or PONumber is Null ) "
//                    + "And ( LineNumber like '" + comboSOLineNo.Text.Trim() + "%' "
//                    + " or LineNumber is Null ) "
//                    + "And a.Remark like '" + comboSORemark.Text.Trim() + "%' "
//                    + "And ( a.FGDimension like '" + comboFGDimension.Text.Trim() + "%' "
//                    + " or a.FGDimension is Null ) "
//                    + "And b.Customer like '" + comboCustomerID.Text.Trim() + "%' "
//                    + "And wo.ReleasedDate Between '" + this.dateTimePickerStart.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    + "And  '" + this.dateTimePickerEnd.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    //+ "AND wo.WOID not in " //gh 2015Jul13
//                    //+ "( Select distinct ParentWOID " //gh 2015Jul13
//                    //+ "from TS_WorkOrder  " //gh 2015Jul13
//                    //+ "where ParentWOID is not null )  " //gh 2015Jul13
//                    + "Order by wo.WOID ASC ";

//                }
//            }
//            else if (comboFGDimension.Text.Trim() != "")
//            {
//                if (optNotCompleted.Checked)
//                {
//                    WOStatusSQL = WOStatusSQL1
//                    + "From TS_WorkOrder wo "
//                    + "inner join TS_WorkOrderExecution woe "
//                    + "on wo.WOID = woe.WOID "
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo a " //gh 2015Jul13
//                    + "on a.WOID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderMaster b " //gh 2015Jul13
//                    + "on b.ID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//                    + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//                    + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//                    + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//                    + "And wo.WOStatus not like '" + WOStatus + "%' "
//                    + "And ( PONumber like '" + comboPONo.Text.Trim() + "%' "
//                    + " or PONumber is Null ) "
//                    + "And ( LineNumber like '" + comboSOLineNo.Text.Trim() + "%' "
//                    + " or LineNumber is Null ) "
//                    + "And ( a.Remark like '" + comboSORemark.Text.Trim() + "%' "
//                    + " or a.Remark is Null ) "
//                    + "And a.FGDimension like '" + comboFGDimension.Text.Trim() + "%' "
//                    + "And b.Customer like '" + comboCustomerID.Text.Trim() + "%' "
//                    + "And wo.ReleasedDate Between '" + this.dateTimePickerStart.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    + "And  '" + this.dateTimePickerEnd.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    //+ "AND wo.WOID not in " //gh 2015Jul13
//                    //+ "( Select distinct ParentWOID " //gh 2015Jul13
//                    //+ "from TS_WorkOrder  " //gh 2015Jul13
//                    //+ "where ParentWOID is not null )  " //gh 2015Jul13
//                    + "Order by wo.WOID ASC ";
//                }
//                else if (optAll.Checked)
//                {
//                    WOStatusSQL = WOStatusSQL1
//                    + "From TS_WorkOrder wo "
//                    + "inner join TS_WorkOrderExecution woe "
//                    + "on wo.WOID = woe.WOID "
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo a " //gh 2015Jul13
//                    + "on a.WOID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderMaster b " //gh 2015Jul13
//                    + "on b.ID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//                    + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//                    + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//                    + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//                    //+ "And wo.WOStatus like '" + WOStatus + "%' "
//                    + "And ( PONumber like '" + comboPONo.Text.Trim() + "%' "
//                    + " or PONumber is Null ) "
//                    + "And ( LineNumber like '" + comboSOLineNo.Text.Trim() + "%' "
//                    + " or LineNumber is Null ) "
//                    + "And ( a.Remark like '" + comboSORemark.Text.Trim() + "%' "
//                    + " or a.Remark is Null ) "
//                    + "And a.FGDimension like '" + comboFGDimension.Text.Trim() + "%' "
//                    + "And b.Customer like '" + comboCustomerID.Text.Trim() + "%' "
//                    + "And wo.ReleasedDate Between '" + this.dateTimePickerStart.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    + "And  '" + this.dateTimePickerEnd.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    //+ "AND wo.WOID not in " //gh 2015Jul13
//                    //+ "( Select distinct ParentWOID " //gh 2015Jul13
//                    //+ "from TS_WorkOrder  " //gh 2015Jul13
//                    //+ "where ParentWOID is not null )  " //gh 2015Jul13
//                    + "Order by wo.WOID ASC ";
//                }
//                else
//                {
//                    WOStatusSQL = WOStatusSQL1
//                    + "From TS_WorkOrder wo "
//                    + "inner join TS_WorkOrderExecution woe "
//                    + "on wo.WOID = woe.WOID "
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo a " //gh 2015Jul13
//                    + "on a.WOID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderMaster b " //gh 2015Jul13
//                    + "on b.ID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//                    + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//                    + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//                    + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//                    + "And wo.WOStatus like '" + WOStatus + "%' "
//                    + "And ( PONumber like '" + comboPONo.Text.Trim() + "%' "
//                    + " or PONumber is Null ) "
//                    + "And ( LineNumber like '" + comboSOLineNo.Text.Trim() + "%' "
//                    + " or LineNumber is Null ) "
//                    + "And ( a.Remark like '" + comboSORemark.Text.Trim() + "%' "
//                    + " or a.Remark is Null ) "
//                    + "And a.FGDimension like '" + comboFGDimension.Text.Trim() + "%' "
//                    + "And b.Customer like '" + comboCustomerID.Text.Trim() + "%' "
//                    + "And wo.ReleasedDate Between '" + this.dateTimePickerStart.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    + "And  '" + this.dateTimePickerEnd.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    //+ "AND wo.WOID not in " //gh 2015Jul13
//                    //+ "( Select distinct ParentWOID " //gh 2015Jul13
//                    //+ "from TS_WorkOrder  " //gh 2015Jul13
//                    //+ "where ParentWOID is not null )  " //gh 2015Jul13
//                    + "Order by wo.WOID ASC ";
//                }
//            }
//            else
//            {
//                if (optNotCompleted.Checked)
//                {
//                    WOStatusSQL = WOStatusSQL1
//                    + "From TS_WorkOrder wo "
//                    + "inner join TS_WorkOrderExecution woe "
//                    + "on wo.WOID = woe.WOID "
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo a " //gh 2015Jul13
//                    + "on a.WOID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderMaster b " //gh 2015Jul13
//                    + "on b.ID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//                    + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//                    + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//                    + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//                    + "And wo.WOStatus not like '" + WOStatus + "%' "
//                    + "And ( PONumber like '" + comboPONo.Text.Trim() + "%' "
//                    + " or PONumber is Null ) "
//                    + "And ( LineNumber like '" + comboSOLineNo.Text.Trim() + "%' "
//                    + " or LineNumber is Null ) "
//                    + "And ( a.Remark like '" + comboSORemark.Text.Trim() + "%' "
//                    + " or a.Remark is Null ) "
//                    + "And ( a.FGDimension like '" + comboFGDimension.Text.Trim() + "%' "
//                    + " or a.FGDimension is Null ) "
//                    + "And b.Customer like '" + comboCustomerID.Text.Trim() + "%' "
//                    + "And wo.ReleasedDate Between '" + this.dateTimePickerStart.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    + "And  '" + this.dateTimePickerEnd.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    //+ "AND wo.WOID not in " //gh 2015Jul13
//                    //+ "( Select distinct ParentWOID " //gh 2015Jul13
//                    //+ "from TS_WorkOrder  " //gh 2015Jul13
//                    //+ "where ParentWOID is not null )  " //gh 2015Jul13
//                    + "Order by wo.WOID ASC ";
//                }
//                else if (optAll.Checked)
//                {
//                    WOStatusSQL = WOStatusSQL1
//                    + "From TS_WorkOrder wo "
//                    + "inner join TS_WorkOrderExecution woe "
//                    + "on wo.WOID = woe.WOID "
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo a " //gh 2015Jul13
//                    + "on a.WOID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderMaster b " //gh 2015Jul13
//                    + "on b.ID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//                    + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//                    + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//                    + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//                    //+ "And wo.WOStatus like '" + WOStatus + "%' "
//                    + "And ( PONumber like '" + comboPONo.Text.Trim() + "%' "
//                    + " or PONumber is Null ) "
//                    + "And ( LineNumber like '" + comboSOLineNo.Text.Trim() + "%' "
//                    + " or LineNumber is Null ) "
//                    + "And ( a.Remark like '" + comboSORemark.Text.Trim() + "%' "
//                    + " or a.Remark is Null ) "
//                    + "And ( a.FGDimension like '" + comboFGDimension.Text.Trim() + "%' "
//                    + " or a.FGDimension is Null ) "
//                    + "And b.Customer like '" + comboCustomerID.Text.Trim() + "%' "
//                    + "And wo.ReleasedDate Between '" + this.dateTimePickerStart.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    + "And  '" + this.dateTimePickerEnd.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    //+ "AND wo.WOID not in " //gh 2015Jul13
//                    //+ "( Select distinct ParentWOID " //gh 2015Jul13
//                    //+ "from TS_WorkOrder  " //gh 2015Jul13
//                    //+ "where ParentWOID is not null )  " //gh 2015Jul13
//                    + "Order by wo.WOID ASC ";
//                }
//                else
//                {
//                    WOStatusSQL = WOStatusSQL1
//                    + "From TS_WorkOrder wo "
//                    + "inner join TS_WorkOrderExecution woe "
//                    + "on wo.WOID = woe.WOID "
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo a " //gh 2015Jul13
//                    + "on a.WOID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "left join " + GlobalVar.WOGlobalPSDatabase + "WorkOrderMaster b " //gh 2015Jul13
//                    + "on b.ID = left (wo.WOID, charindex('-', wo.WOID + '-') - 1) " //gh 2015Jul13
//                    + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//                    + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//                    + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//                    + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//                    + "And wo.WOStatus like '" + WOStatus + "%' "
//                    + "And ( PONumber like '" + comboPONo.Text.Trim() + "%' "
//                    + " or PONumber is Null ) "
//                    + "And ( LineNumber like '" + comboSOLineNo.Text.Trim() + "%' "
//                    + " or LineNumber is Null ) "
//                    + "And ( a.Remark like '" + comboSORemark.Text.Trim() + "%' "
//                    + " or a.Remark is Null ) "
//                    + "And ( a.FGDimension like '" + comboFGDimension.Text.Trim() + "%' "
//                    + " or a.FGDimension is Null ) "
//                    + "And b.Customer like '" + comboCustomerID.Text.Trim() + "%' "
//                    + "And wo.ReleasedDate Between '" + this.dateTimePickerStart.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    + "And  '" + this.dateTimePickerEnd.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//                    //+ "AND wo.WOID not in " //gh 2015Jul13
//                    //+ "( Select distinct ParentWOID " //gh 2015Jul13
//                    //+ "from TS_WorkOrder  " //gh 2015Jul13
//                    //+ "where ParentWOID is not null )  " //gh 2015Jul13
//                    + "Order by wo.WOID ASC ";
//                }
//            }

//            #region "maskoff"
//            //if (optQueuing.Checked)
//            //{
//            //    WOStatus = "Queuing";
//            //    if (comboWOlist.Text.Trim() != "")
//            //    {
//            //        WOStatusSQL =
//            //        "Select Distinct wo.WOID, wo.PartID, wo.ToolDescription, wo.ReleasedDate, wo.RequestedDeliveryDate, "
//            //        + "wo.CommittedDeliveryDate, wo.StartDate, wo.EndDate, wo.PlannerRemark, wo.WOStatus "
//            //        + ",wo.ActualProdQty, wo.CompletedQty "
//            //        + ",(SELECT t.workcenter "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as workcenter "
//            //        + ",(SELECT t.ProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as ProcOpSeq "
//            //        + ",(SELECT t.wostatus "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as ProcessStatus "
//            //        + ",(SELECT t.McID "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as McID "
//            //        + "From TS_WorkOrder wo, TS_WorkOrderExecution woe "
//            //        + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//            //        + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//            //        + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//            //        + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//            //        + "And wo.WOStatus like '" + WOStatus + "%' "
//            //        + "And wo.WOID = woe.WOID "
//            //        + "AND wo.WOID not in "
//            //        + "( Select distinct ParentWOID "
//            //        + "from TS_WorkOrder  "
//            //        + "where ParentWOID is not null )  "
//            //        + "Order by wo.WOID ASC ";
//            //    }
//            //    else
//            //    {
//            //        WOStatusSQL =
//            //       "Select Distinct wo.WOID, wo.PartID, wo.ToolDescription, wo.ReleasedDate, wo.RequestedDeliveryDate, "
//            //       + "wo.CommittedDeliveryDate, wo.StartDate, wo.EndDate, wo.PlannerRemark, wo.WOStatus "
//            //       + ",wo.ActualProdQty, wo.CompletedQty "
//            //        + ",(SELECT t.workcenter "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as workcenter "
//            //        + ",(SELECT t.ProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as ProcOpSeq "
//            //        + ",(SELECT t.wostatus "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as ProcessStatus "
//            //        + ",(SELECT t.McID "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as McID " 
//            //        + "From TS_WorkOrder wo, TS_WorkOrderExecution woe "
//            //       + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//            //       + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//            //       + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//            //       + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//            //       + "And wo.WOStatus like '" + WOStatus + "%' "
//            //       + "And wo.WOID = woe.WOID "
//            //       + "And wo.ReleasedDate Between '" + this.dateTimePickerStart.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//            //       + "And  '" + this.dateTimePickerEnd.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//            //        + "AND wo.WOID not in "
//            //       + "( Select distinct ParentWOID "
//            //       + "from TS_WorkOrder  "
//            //       + "where ParentWOID is not null )  "
//            //      + "Order by wo.WOID ASC ";
//            //    }
//            //}
//            //else if (optProcessing.Checked)
//            //{
//            //    WOStatus = "Processing";
//            //    if (comboWOlist.Text.Trim() != "")
//            //    {
//            //        WOStatusSQL =
//            //       "Select Distinct wo.WOID, wo.PartID, wo.ToolDescription, wo.ReleasedDate, wo.RequestedDeliveryDate, "
//            //       + "wo.CommittedDeliveryDate, wo.StartDate, wo.EndDate, wo.PlannerRemark, wo.WOStatus "
//            //       + ",wo.ActualProdQty, wo.CompletedQty "
//            //        + ",(SELECT t.workcenter "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as workcenter "
//            //        + ",(SELECT t.ProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as ProcOpSeq "
//            //        + ",(SELECT t.wostatus "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as ProcessStatus "
//            //        + ",(SELECT t.McID "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as McID " 
//            //        + "From TS_WorkOrder wo, TS_WorkOrderExecution woe "
//            //       + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//            //       + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//            //       + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//            //       + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//            //       + "And wo.WOStatus like '" + WOStatus + "%' "
//            //       + "And wo.WOID = woe.WOID "
//            //        + "AND wo.WOID not in "
//            //       + "( Select distinct ParentWOID "
//            //       + "from TS_WorkOrder  "
//            //       + "where ParentWOID is not null )  "
//            //      + "Order by wo.WOID ASC ";
//            //    }
//            //    else
//            //    {
//            //        WOStatusSQL =
//            //       "Select Distinct wo.WOID, wo.PartID, wo.ToolDescription, wo.ReleasedDate, wo.RequestedDeliveryDate, "
//            //       + "wo.CommittedDeliveryDate, wo.StartDate, wo.EndDate, wo.PlannerRemark, wo.WOStatus "
//            //       + ",wo.ActualProdQty, wo.CompletedQty "
//            //        + ",(SELECT t.workcenter "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as workcenter "
//            //        + ",(SELECT t.ProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as ProcOpSeq "
//            //        + ",(SELECT t.wostatus "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as ProcessStatus "
//            //        + ",(SELECT t.McID "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as McID " 
//            //        + "From TS_WorkOrder wo, TS_WorkOrderExecution woe "
//            //       + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//            //       + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//            //       + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//            //       + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//            //       + "And wo.WOStatus like '" + WOStatus + "%' "
//            //       + "And wo.WOID = woe.WOID "
//            //       + "And wo.ReleasedDate Between '" + this.dateTimePickerStart.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//            //       + "And  '" + this.dateTimePickerEnd.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//            //        + "AND wo.WOID not in "
//            //       + "( Select distinct ParentWOID "
//            //       + "from TS_WorkOrder  "
//            //       + "where ParentWOID is not null )  "
//            //      + "Order by wo.WOID ASC ";
//            //    }
//            //}
//            //else if (optCompleted.Checked)
//            //{
//            //    WOStatus = "Completed";
//            //    if (comboWOlist.Text.Trim() != "")
//            //    {
//            //        WOStatusSQL =
//            //        "Select Distinct wo.WOID, wo.PartID, wo.ToolDescription,  wo.ReleasedDate,wo.RequestedDeliveryDate, "
//            //        + "wo.CommittedDeliveryDate, wo.StartDate, wo.EndDate, wo.PlannerRemark, wo.WOStatus "
//            //        + ",wo.ActualProdQty, wo.CompletedQty "
//            //        + ",(SELECT t.workcenter "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as workcenter "
//            //        + ",(SELECT t.ProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as ProcOpSeq "
//            //        + ",(SELECT t.wostatus "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as ProcessStatus "
//            //        + ",(SELECT t.McID "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as McID " 
//            //        + "From TS_WorkOrder wo, TS_WorkOrderExecution woe "
//            //        + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//            //        + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//            //        + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//            //        + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//            //        + "And wo.WOStatus like '" + WOStatus + "%' "
//            //        + "And wo.WOID = woe.WOID "
//            //       + "AND wo.WOID not in "
//            //       + "( Select distinct ParentWOID "
//            //       + "from TS_WorkOrder  "
//            //       + "where ParentWOID is not null )  "
//            //        + "Order by wo.WOID ASC ";
//            //    }
//            //    else
//            //    {
//            //        WOStatusSQL =
//            //        "Select Distinct wo.WOID, wo.PartID, wo.ToolDescription,  wo.ReleasedDate,wo.RequestedDeliveryDate, "
//            //        + "wo.CommittedDeliveryDate, wo.StartDate, wo.EndDate, wo.PlannerRemark, wo.WOStatus "
//            //        + ",wo.ActualProdQty, wo.CompletedQty "
//            //        + ",(SELECT t.workcenter "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as workcenter "
//            //        + ",(SELECT t.ProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as ProcOpSeq "
//            //        + ",(SELECT t.wostatus "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as ProcessStatus "
//            //        + ",(SELECT t.McID "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as McID " 
//            //        + "From TS_WorkOrder wo, TS_WorkOrderExecution woe "
//            //        + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//            //        + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//            //        + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//            //        + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//            //        + "And wo.WOStatus like '" + WOStatus + "%' "
//            //        + "And wo.WOID = woe.WOID "
//            //        + "And wo.ReleasedDate Between '" + this.dateTimePickerStart.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//            //        + "And  '" + this.dateTimePickerEnd.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//            //       + "AND wo.WOID not in "
//            //       + "( Select distinct ParentWOID "
//            //       + "from TS_WorkOrder  "
//            //       + "where ParentWOID is not null )  "
//            //        + "Order by wo.WOID ASC ";
//            //    }
//            //}
//            //else
//            //{
//            //    if (comboWOlist.Text.Trim() != "")
//            //    {
//            //        WOStatusSQL =
//            //        "Select Distinct wo.WOID, wo.PartID, wo.ToolDescription,  wo.ReleasedDate,wo.RequestedDeliveryDate, "
//            //        + "wo.CommittedDeliveryDate, wo.StartDate, wo.EndDate, wo.PlannerRemark, wo.WOStatus "
//            //        + ",wo.ActualProdQty, wo.CompletedQty "
//            //        + ",(SELECT t.workcenter "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as workcenter "
//            //        + ",(SELECT t.ProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as ProcOpSeq "
//            //        + ",(SELECT t.wostatus "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as ProcessStatus "
//            //        + ",(SELECT t.McID "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as McID " 
//            //        + "From TS_WorkOrder wo, TS_WorkOrderExecution woe "
//            //        + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//            //        + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//            //        + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//            //        + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//            //        + "And wo.WOID = woe.WOID "
//            //        + "AND wo.WOID not in "
//            //       + "( Select distinct ParentWOID "
//            //       + "from TS_WorkOrder  "
//            //       + "where ParentWOID is not null )  "
//            //       + "Order by wo.WOID ASC ";
//            //    }
//            //    else
//            //    {
//            //        WOStatusSQL =
//            //        "Select Distinct wo.WOID, wo.PartID, wo.ToolDescription,  wo.ReleasedDate,wo.RequestedDeliveryDate, "
//            //        + "wo.CommittedDeliveryDate, wo.StartDate, wo.EndDate, wo.PlannerRemark, wo.WOStatus "
//            //        + ",wo.ActualProdQty, wo.CompletedQty "
//            //        + ",(SELECT t.workcenter "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as workcenter "
//            //        + ",(SELECT t.ProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as ProcOpSeq "
//            //        + ",(SELECT t.wostatus "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as ProcessStatus "
//            //        + ",(SELECT t.McID "
//            //        + "FROM TS_WorkOrderexecution t "
//            //        + "CROSS APPLY (SELECT MIN(ProcOpSeq) AS MinProcOpSeq "
//            //        + "FROM TS_WorkOrderexecution "
//            //        + "WHERE woid = t.woid "
//            //        + "and wostatus not like 'completed%' "
//            //        + "and woid =wo.woid ) t1 "
//            //        + "WHERE t1.MinProcOpSeq = t.ProcOpSeq ) as McID " 
//            //        + "From TS_WorkOrder wo, TS_WorkOrderExecution woe "
//            //        + "Where woe.WorkCenter like '" + comboWCList.Text.Trim() + "%' "
//            //        + "And woe.McID like '" + comboMCList.Text.Trim() + "%' "
//            //        + "And wo.WOID like '" + comboWOlist.Text.Trim() + "%' "
//            //        + "And wo.PartID like '" + comboPartIDlist.Text.Trim() + "%' "
//            //        + "And wo.WOID = woe.WOID "
//            //        + "And wo.ReleasedDate Between '" + this.dateTimePickerStart.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//            //        + "And  '" + this.dateTimePickerEnd.Value.ToString("yyyy-MM-dd HH:mm:ss") + "' "
//            //        + "AND wo.WOID not in "
//            //       + "( Select distinct ParentWOID "
//            //       + "from TS_WorkOrder  "
//            //       + "where ParentWOID is not null )  "
//            //       + "Order by wo.WOID ASC ";
//            //    }
//            //}
//            #endregion

//            DBOperation.DBOperation dbop;
//            dbop = new DBOperation.DBOperation();
//            SqlConnection TSConn;

//            TSConn = dbop.getcon("connectstringTS");
//            TSConn.Open();

//            WOSQLCommand = new SqlCommand();
//            WOSQLCommand.Connection = TSConn;
//            WOSQLCommand.CommandType = CommandType.Text;
//            WOSQLCommand.CommandText = WOStatusSQL;
//            SQLAdapter = new SqlDataAdapter();
//            dt = new DataTable();
//            SQLAdapter.SelectCommand = WOSQLCommand;
//            SQLAdapter.SelectCommand.CommandTimeout = 0;
//            SQLAdapter.Fill(dt);

//            //fpSpreadWOInfo.ActiveSheet.DataSource = dt;

//            fpSpreadWOInfo.Font = new Font("Arial", 10, FontStyle.Bold);
//            fpSpreadWOInfo.ActiveSheet.DataSource = dt;
//            fpSpreadWOInfo.ActiveSheet.ColumnCount = 26; //25;

//            fpSpreadWOInfo.ActiveSheet.AutoGenerateColumns = false;

//            fpSpreadWOInfo.ActiveSheet.Columns[0].DataField = "WOID";
//            fpSpreadWOInfo.ActiveSheet.Columns[1].DataField = strCol1; // "IssuedBy";
//            fpSpreadWOInfo.ActiveSheet.Columns[2].DataField = strCol2; //"FGDimension";
//            fpSpreadWOInfo.ActiveSheet.Columns[3].DataField = strCol3; //"PONumber";
//            fpSpreadWOInfo.ActiveSheet.Columns[4].DataField = strCol4; //"LineNumber";
//            fpSpreadWOInfo.ActiveSheet.Columns[5].DataField = strCol5; //"Description";
//            fpSpreadWOInfo.ActiveSheet.Columns[6].DataField = strCol6; //"SORemark";
//            fpSpreadWOInfo.ActiveSheet.Columns[7].DataField = strCol7; //"Customer";
//            fpSpreadWOInfo.ActiveSheet.Columns[8].DataField = strCol8; //"PartID";
//            fpSpreadWOInfo.ActiveSheet.Columns[9].DataField = strCol9; //"ToolDescription";
//            fpSpreadWOInfo.ActiveSheet.Columns[10].DataField = strCol10; //"ActualProdQty";
//            fpSpreadWOInfo.ActiveSheet.Columns[11].DataField = strCol11; //"ActualRecQty"; //gh 2016Feb28
//            fpSpreadWOInfo.ActiveSheet.Columns[12].DataField = strCol12; //"CompletedQty";
//            fpSpreadWOInfo.ActiveSheet.Columns[13].DataField = strCol13; //"ReleasedDate";
//            fpSpreadWOInfo.ActiveSheet.Columns[14].DataField = strCol14; //"RequestedDeliveryDate";
//            fpSpreadWOInfo.ActiveSheet.Columns[15].DataField = strCol15; //"CommittedDeliveryDate";
//            fpSpreadWOInfo.ActiveSheet.Columns[16].DataField = strCol16; //"StartDate";
//            fpSpreadWOInfo.ActiveSheet.Columns[17].DataField = strCol17; //"EndDate";
//            fpSpreadWOInfo.ActiveSheet.Columns[18].DataField = strCol18; //"WOStatus";
//            fpSpreadWOInfo.ActiveSheet.Columns[19].DataField = strCol19; //"WorkCenter";
//            fpSpreadWOInfo.ActiveSheet.Columns[20].DataField = strCol20; //"ProcOpSeq";
//            fpSpreadWOInfo.ActiveSheet.Columns[21].DataField = strCol21; //"McID";
//            fpSpreadWOInfo.ActiveSheet.Columns[22].DataField = strCol22; //"ProcessCompletedQty";
//            fpSpreadWOInfo.ActiveSheet.Columns[23].DataField = strCol23; //"ProcessStatus";
//            fpSpreadWOInfo.ActiveSheet.Columns[24].DataField = strCol24; //"Remark";
//            fpSpreadWOInfo.ActiveSheet.Columns[25].DataField = strCol25; //"PlannerRemark";

//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[0].Label = "Work Order";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[1].Label = strHeaderCol1; //"Issued By";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[2].Label = strHeaderCol2; //"FG Dimension";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[3].Label = strHeaderCol3; //"PONumber";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[4].Label = strHeaderCol4; //"SO Line No.";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[5].Label = strHeaderCol5; //"Description";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[6].Label = strHeaderCol6; //"SO Remarks";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[7].Label = strHeaderCol7; //"Customer Name";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[8].Label = strHeaderCol8; //"Part No.";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[9].Label = strHeaderCol9; //"Part Family";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[10].Label = strHeaderCol10; //"Actual Prod Qty";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[11].Label = strHeaderCol11; //"Actual Rec Qty";//gh 2016Feb28
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[12].Label = strHeaderCol12; //"Completed Qty";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[13].Label = strHeaderCol13; //"Released Date";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[14].Label = strHeaderCol14; //"Requested Delivery Date";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[15].Label = strHeaderCol15; //"Committed Delivery Date";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[16].Label = strHeaderCol16; //"Production Start Time";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[17].Label = strHeaderCol17; //"Production End Time";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[18].Label = strHeaderCol18; //"WO Status";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[19].Label = strHeaderCol19; //"Work Center";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[20].Label = strHeaderCol20; //"Proc OpSeq";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[21].Label = strHeaderCol21; //"Machine ID";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[22].Label = strHeaderCol22; //"Process Completed Qty";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[23].Label = strHeaderCol23; // "Process Status";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[24].Label = strHeaderCol24; //"Remark";
//            fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[25].Label = strHeaderCol25; //"Planner Remark";

//            FarPoint.Win.Spread.CellType.DateTimeCellType DBcell = new FarPoint.Win.Spread.CellType.DateTimeCellType();
//            DBcell.DateTimeFormat = FarPoint.Win.Spread.CellType.DateTimeFormat.UserDefined;
//            DBcell.UserDefinedFormat = "dd/MM/yyyy";
//            fpSpreadWOInfo.ActiveSheet.Columns[int.Parse(strReleasedDateCol)].CellType = DBcell;
//            fpSpreadWOInfo.ActiveSheet.Columns[int.Parse(strReqDelDateCol)].CellType = DBcell;
//            fpSpreadWOInfo.ActiveSheet.Columns[int.Parse(strComDelDateCol)].CellType = DBcell;
//            FarPoint.Win.Spread.CellType.DateTimeCellType DBcelltime = new FarPoint.Win.Spread.CellType.DateTimeCellType();
//            DBcelltime.DateTimeFormat = FarPoint.Win.Spread.CellType.DateTimeFormat.UserDefined;
//            DBcelltime.UserDefinedFormat = "dd/MM/yyyy hh:mm:ss tt";
//            fpSpreadWOInfo.ActiveSheet.Columns[int.Parse(strStartDateCol)].CellType = DBcelltime;
//            fpSpreadWOInfo.ActiveSheet.Columns[int.Parse(strEndDateCol)].CellType = DBcelltime;

//            strHideCol[0] = "false";
//            strHideCol[25] = "true";

//            for (int intC = 0; intC < fpSpreadWOInfo.ActiveSheet.ColumnCount; intC++)
//            {
//                if (strHideCol[intC] == "true")
//                {
//                    fpSpreadWOInfo.ActiveSheet.Columns[intC].Visible = false;
//                }
//                else
//                {
//                    fpSpreadWOInfo.ActiveSheet.Columns[intC].Visible = true;
//                }
//            }


//            ////gh 2014Aug05 - display SO detail
//            //if (GlobalVar.WOGlobalDisplaySalesDetail.IndexOf("True", 0,
//            //    StringComparison.CurrentCultureIgnoreCase) != -1)
//            //{
//            //    fpSpreadWOInfo.ActiveSheet.Columns[2].Visible = true; //gh 2015Nov27 Wangi MOM request to hide
//            //    fpSpreadWOInfo.ActiveSheet.Columns[4].Visible = true;
//            //    fpSpreadWOInfo.ActiveSheet.Columns[5].Visible = true;
//            //    fpSpreadWOInfo.ActiveSheet.Columns[6].Visible = true;

//            //}
//            //else
//            //{
//            //    fpSpreadWOInfo.ActiveSheet.Columns[2].Visible = false; //gh 2015Nov27 Wangi MOM request to hide
//            //    fpSpreadWOInfo.ActiveSheet.Columns[4].Visible = false;
//            //    fpSpreadWOInfo.ActiveSheet.Columns[5].Visible = false;
//            //    fpSpreadWOInfo.ActiveSheet.Columns[6].Visible = false;
//            //}

//            //fpSpreadWOInfo.ActiveSheet.ColumnHeader.Columns[25].Visible = false;

//            if (fpSpreadWOInfo.ActiveSheet.RowCount == 0)
//            {
//                MessageBox.Show("No Work Order found with the current selected parameters!", "WO Status",
//                    MessageBoxButtons.OK, MessageBoxIcon.Information);
//            }
//            else
//            {
//                for (int intI = 0; intI < fpSpreadWOInfo.ActiveSheet.RowCount; intI++)
//                {
//                    fpSpreadWOInfo.ActiveSheet.Rows[intI].Locked = true;
//                }
//            }

//            for (int intC = 0; intC < fpSpreadWOInfo.ActiveSheet.ColumnCount; intC++)
//            {
//                fpSpreadWOInfo.ActiveSheet.Columns[intC].SortIndicator = FarPoint.Win.Spread.Model.SortIndicator.Descending;
//                fpSpreadWOInfo.ActiveSheet.Columns[intC].ShowSortIndicator = true;
//                fpSpreadWOInfo.ActiveSheet.Columns[intC].AllowAutoSort = true;
//            }

//            //fpSpreadWOInfo.ActiveSheet.Columns[0].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Left;
//            //fpSpreadWOInfo.ActiveSheet.Columns[0].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[0].Width = 120;
//            //fpSpreadWOInfo.ActiveSheet.Columns[1].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Left;
//            //fpSpreadWOInfo.ActiveSheet.Columns[1].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[1].Width = 150;
//            //fpSpreadWOInfo.ActiveSheet.Columns[2].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Left;
//            //fpSpreadWOInfo.ActiveSheet.Columns[2].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[2].Width = 150;
//            //fpSpreadWOInfo.ActiveSheet.Columns[3].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Left;
//            //fpSpreadWOInfo.ActiveSheet.Columns[3].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[3].Width = 100;
//            //fpSpreadWOInfo.ActiveSheet.Columns[4].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Center;
//            //fpSpreadWOInfo.ActiveSheet.Columns[4].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[4].Width = 60;
//            //fpSpreadWOInfo.ActiveSheet.Columns[5].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Left;
//            //fpSpreadWOInfo.ActiveSheet.Columns[5].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[5].Width = 200;
//            //fpSpreadWOInfo.ActiveSheet.Columns[6].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Left;
//            //fpSpreadWOInfo.ActiveSheet.Columns[6].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[6].Width = 150;
//            //fpSpreadWOInfo.ActiveSheet.Columns[7].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Left;
//            //fpSpreadWOInfo.ActiveSheet.Columns[7].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[7].Width = 100;
//            //fpSpreadWOInfo.ActiveSheet.Columns[8].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Left;
//            //fpSpreadWOInfo.ActiveSheet.Columns[8].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[8].Width = 150;
//            //fpSpreadWOInfo.ActiveSheet.Columns[9].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Left;
//            //fpSpreadWOInfo.ActiveSheet.Columns[9].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[9].Width = 150;
//            //fpSpreadWOInfo.ActiveSheet.Columns[10].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Right;
//            //fpSpreadWOInfo.ActiveSheet.Columns[10].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[10].Width = 80;
//            //fpSpreadWOInfo.ActiveSheet.Columns[11].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Right;
//            //fpSpreadWOInfo.ActiveSheet.Columns[11].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[11].Width = 80;
//            //fpSpreadWOInfo.ActiveSheet.Columns[12].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Right;
//            //fpSpreadWOInfo.ActiveSheet.Columns[12].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[12].Width = 100;
//            //fpSpreadWOInfo.ActiveSheet.Columns[13].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Left;
//            //fpSpreadWOInfo.ActiveSheet.Columns[13].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[13].Width = 90;
//            //fpSpreadWOInfo.ActiveSheet.Columns[14].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Left;
//            //fpSpreadWOInfo.ActiveSheet.Columns[14].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[14].Width = 90;
//            //fpSpreadWOInfo.ActiveSheet.Columns[15].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Left;
//            //fpSpreadWOInfo.ActiveSheet.Columns[15].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[15].Width = 100;
//            //fpSpreadWOInfo.ActiveSheet.Columns[16].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Left;
//            //fpSpreadWOInfo.ActiveSheet.Columns[16].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[16].Width = 160;
//            //fpSpreadWOInfo.ActiveSheet.Columns[17].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Left;
//            //fpSpreadWOInfo.ActiveSheet.Columns[17].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[17].Width = 160;
//            //fpSpreadWOInfo.ActiveSheet.Columns[18].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Left;
//            //fpSpreadWOInfo.ActiveSheet.Columns[18].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[18].Width = 100;
//            //fpSpreadWOInfo.ActiveSheet.Columns[19].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Left;
//            //fpSpreadWOInfo.ActiveSheet.Columns[19].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[19].Width = 120;
//            //fpSpreadWOInfo.ActiveSheet.Columns[20].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Center;
//            //fpSpreadWOInfo.ActiveSheet.Columns[20].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[20].Width = 80;
//            //fpSpreadWOInfo.ActiveSheet.Columns[21].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Left;
//            //fpSpreadWOInfo.ActiveSheet.Columns[21].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[21].Width = 150;
//            //fpSpreadWOInfo.ActiveSheet.Columns[22].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Right;
//            //fpSpreadWOInfo.ActiveSheet.Columns[22].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[22].Width = 100;
//            //fpSpreadWOInfo.ActiveSheet.Columns[23].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Left;
//            //fpSpreadWOInfo.ActiveSheet.Columns[23].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[23].Width = 110;
//            //fpSpreadWOInfo.ActiveSheet.Columns[24].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Left;
//            //fpSpreadWOInfo.ActiveSheet.Columns[24].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[24].Width = 120;
//            //fpSpreadWOInfo.ActiveSheet.Columns[25].HorizontalAlignment = FarPoint.Win.Spread.CellHorizontalAlignment.Left;
//            //fpSpreadWOInfo.ActiveSheet.Columns[25].VerticalAlignment = FarPoint.Win.Spread.CellVerticalAlignment.Top;
//            //fpSpreadWOInfo.ActiveSheet.Columns[25].Width = 80;

//            fpSpreadWOInfo.ActiveSheet.LockBackColor = Color.Empty;
//            ChkDateHighlight();

//            fpSpreadWOInfo.AllowColumnMove = true;

//            this.Cursor = Cursors.Default;

//            fpSpreadWOInfo.ResumeLayout();


//        }
//    }
//}
