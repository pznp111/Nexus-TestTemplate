using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestTemplate.Domain.Service.Messaging.MessagingService
{
    public class MessagingService : QueryRequestBase
    {
        public string radio { get; set; }
        public string WorkCenter { get; set; }
        public string McID { get; set; }
        public string CustomerList { get; set; }
        public string FGDimension { get; set; }
        public string WOID { get; set; }
        public string PartID { get; set; }
        public string PartNO { get; set; }
        public string SONO { get; set; }
        public string myArr { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string McType { get; set; }
        public string OpSeq { get; set; }
        public string RouteID { get; set; }
        public string RouteName { get; set; }
        public string MacGroup { get; set; }
        public string AttributeGroup { get; set; }
        public string RequestedDeliveryDate { get; set; }
        public string CommittedDeliveryDate { get; set; }
        public string ReleasedProdQty { get; set; }
        public string ActualProdQty { get; set; }
        public string ActualProdDate { get; set; }
        public string CompletedQty { get; set; }
        public string CompletedDate { get; set; }
        public string OutstandingQty { get; set; }
        public string ReleasedProdDate { get; set; }
        public string OutstandingDate { get; set; }
        public string WOStatus { get; set; }
        public string ToolDescription { get; set; }
        public string PlannerRemark { get; set; }
        public string ParentWOID { get; set; }
        public string Remark { get; set; }
        public string PPID { get; set; }
        public string SalesOrderID { get; set; }
        public string OperatorID { get; set; }
        public string OperatorName { get; set; }
        public string ApprovedID { get; set; }
        public string ApprovedName { get; set; }
        public string ReleasedDate { get; set; }
        public string OrderType { get; set; }
        public string ActualRecQty { get; set; }
        public string ActualRecDate { get; set; }
        public string SeqNo { get; set; }

        public string MacCode { get; set; }
        public string CentreID { get; set; }
        public string MacType { get; set; }
        public string QtyUpdated { get; set; }

        public string ChildWOID { get; set; }
        public string Type { get; set; }
        public string CustomerName { get; set; }
        public string ItemID { get; set; }
        public string CustomerID { get; set; }
        public string ParentItemID { get; set; }
        public string Index { get; set; }
        public string MutexFunction { get; set; }

        //  public string ReworkRouteID { get; set; }
        public string ReworkRouteID { get; set; }
        public string ReworkStartWC { get; set; }
        public string ReworkStartOpSeq { get; set; }
        public string ReworkStartProcOpSeq { get; set; }
        public string ReworkQty { get; set; }
        public string ReworkDate { get; set; }
        public string UserID { get; set; }
        public string UserName { get; set; }
        public string ProblemWC { get; set; }
        public string ProblemOpSeq { get; set; }
        public string ProblemProcOpSeq { get; set; }
        public string ProblemOperatorID { get; set; }

        public string ProblemOperatorName { get; set; }


        //Tracking Report
        public string ItemName { get; set; }
        public string IssueDateStart { get; set; }
        public string IssueDateEnd { get; set; }

        public string Remark1 { get; set; }






        public string reason { get; set; }
        public string threshold { get; set; }
        public string releaseThreshold { get; set; }
        public string id { get; set; }
        public string PrioritizedNo { get; set; }
        public string ProcOpSeq { get; set; }

        public string TotalSetupDuration { get; set; }
        public string ProdTotalDuration { get; set; }

        public string startType1 { get; set; }
        public string startType2 { get; set; }



        public string strUserID { get; set; }
        public string strMenuName { get; set; }


        public string Status { get; set; }
        //public string ID { get; set; }
        public string OperatorFirstName { get; set; }
        public string ExStatus { get; set; }
        public string UpdatedDate { get; set; }
        //public string Reason { get; set; }
        public string StartDateTime { get; set; }
        public string StartType { get; set; }
        public string ShiftID { get; set; }
        public string SetupStartDate { get; set; }
        public string endType { get; set; }
        public string StopDateTime { get; set; }
        public string ProdEndDate { get; set; }
        public string PlannedDuration { get; set; }
        public string ReceivedDate { get; set; }
        public string SendOutDate { get; set; }
        public string TrackingRemark { get; set; }
        public string SetupEndDate { get; set; }
        public string ProdStartDate { get; set; }
        public string Directory {get;set;}
        public string Filename { get; set; }
        public string AttachedDate { get; set; }
        public string FileStatus { get; set; }
        public string CheckDate { get; set; }

        public string ScrapQty { get; set; }
        public string ScrapType { get; set; }
        public string ScrapDate { get; set; }
        public string AccumulatedScrapQty { get; set; }
        public string AccumulatedScrapDate { get; set; }
        public string DiscardReason { get; set; }
        public string CurrentTime { get; set; }
        public string ReceivedQty { get; set; }
        public string OperatorStatus { get; set; }

    }
}
