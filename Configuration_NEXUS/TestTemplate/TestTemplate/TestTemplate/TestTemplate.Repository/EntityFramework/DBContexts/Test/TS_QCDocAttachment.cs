//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TestTemplate.Repository.EntityFramework.DBContexts.Test
{
    using System;
    using System.Collections.Generic;
    
    public partial class TS_QCDocAttachment
    {
        public int WOID { get; set; }
        public string Directory { get; set; }
        public string Filename { get; set; }
        public string FileStatus { get; set; }
        public Nullable<System.DateTime> CheckDate { get; set; }
        public System.DateTime AttachedDate { get; set; }
        public string OperatorID { get; set; }
        public string OperatorName { get; set; }
        public string ApprovedID { get; set; }
        public string ApprovedName { get; set; }
    }
}