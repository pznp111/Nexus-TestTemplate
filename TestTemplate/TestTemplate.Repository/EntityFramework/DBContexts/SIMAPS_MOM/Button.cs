//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TestTemplate.Repository.EntityFramework.DBContexts.SIMAPS_MOM
{
    using System;
    using System.Collections.Generic;
    
    public partial class Button
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Button()
        {
            this.Tasks = new HashSet<Task>();
        }
    
        public int ButtonId { get; set; }
        public string ButtonName { get; set; }
        public string Type { get; set; }
        public string DisplayText { get; set; }
        public string ImageFileName { get; set; }
        public byte[] Image { get; set; }
        public string Description { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public System.DateTime ModifiedOn { get; set; }
        public byte[] VersionStamp { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Task> Tasks { get; set; }
    }
}
