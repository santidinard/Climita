namespace Climita.Models
{
    public class ForecastDayModel
    {
        public string Day { get; set; }
        public string MainCondition { get; set; }
        public string Condition { get; set; }
        public int Temp { get; set; }
        public int TempF { get; set; }
    }
}