namespace Climita.Models
{
    public class ForecastModel
    {
        public string Country { get; set; }
        public string City { get; set; }
        public string Day { get; set; }
        public string MainCondition { get; set; }
        public string Condition { get; set; }
        public int Temp { get; set; }
        public int TempF { get; set; }
        public int Humidity { get; set; }
        public int WindSpeed { get; set; }
        public int Rainfall { get; set; }
        public ForecastDayModel[] FiveDays { get; set; }
    }
}