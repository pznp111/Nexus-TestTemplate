using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestTemplate.Repository.EntityFramework.QueryTranslator
{
    public class DefaultQuery
    {
        #region "Sentiment"

        public const string SENTIMENT_CUSTOMERINFO = "SELECT VALUE CustomerModel FROM SentimentDb.CustomerInfoes AS CustomerModel";
        public const string SENTIMENT_AGEGROUP = "SELECT VALUE AgeGroupModel FROM SentimentDb.AgeGroups AS AgeGroupModel";
        public const string SENTIMENT_ALERT = "SELECT VALUE SentimentAlertModel FROM SentimentDb.Alerts AS SentimentAlertModel";
        public const string SENTIMENT_REVIEW = "SELECT VALUE CommentModel FROM SentimentDb.Reviews AS CommentModel";

        #endregion "Sentiment"
    }
}
