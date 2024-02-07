using Climita.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;


namespace Project1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IConfiguration _cfg;
        private readonly Dictionary<string, string> WeatherConditions;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _cfg = configuration;

            WeatherConditions = new Dictionary<string, string>
            {
                { "thunderstorm with light rain", "tormenta con lluvia ligera" },
                { "thunderstorm with rain", "tormenta con lluvia" },
                { "thunderstorm with heavy rain", "tormenta con fuertes lluvias" },
                { "light thunderstorm", "tormenta ligera" },
                { "thunderstorm", "tormenta" },
                { "heavy thunderstorm", "tormenta fuerte" },
                { "ragged thunderstorm", "tormenta irregular" },
                { "thunderstorm with light drizzle", "tormenta con llovizna ligera" },
                { "thunderstorm with drizzle", "tormenta con llovizna" },
                { "thunderstorm with heavy drizzle", "tormenta con llovizna intensa" },
                { "light intensity drizzle", "llovizna de intensidad ligera" },
                { "drizzle", "llovizna" },
                { "heavy intensity drizzle", "llovizna intensa" },
                { "light intensity drizzle rain", "llovizna de intensidad ligera" },
                { "drizzle rain", "llovizna" },
                { "heavy intensity drizzle rain", "llovizna de gran intensidad" },
                { "shower rain and drizzle", "lluvia y llovizna" },
                { "heavy shower rain and drizzle", "fuertes lluvias y lloviznas" },
                { "shower drizzle", "llovizna fuerte" },
                { "light rain", "lluvia ligera" },
                { "moderate rain", "lluvia moderada" },
                { "heavy intensity rain", "lluvia de gran intensidad" },
                { "very heavy rain", "lluvias muy intensas" },
                { "extreme rain", "lluvia extrema" },
                { "freezing rain", "lluvia helada" },
                { "light intensity shower rain", "lluvia de intensidad baja" },
                { "shower rain", "aguacero" },
                { "heavy intensity shower rain", "Lluvia intensa" },
                { "ragged shower rain", "lluvia irregular" },
                { "light snow", "nevada ligera" },
                { "snow", "nevada" },
                { "heavy snow", "nevada intensa" },
                { "sleet", "aguanieve" },
                { "light shower sleet", "aguanieve ligera" },
                { "shower sleet", "aguanieve intensa" },
                { "light rain and snow", "lluvia ligera y nieve" },
                { "rain and snow", "lluvia y nieve" },
                { "light shower snow", "ligera nevada" },
                { "shower snow", "nevada intensa" },
                { "heavy shower snow", "nevada muy intensa" },
                { "clear sky", "Soleado" },
                { "few clouds", "pocas nubes" },
                { "scattered clouds", "nubes dispersas" },
                { "broken clouds", "ligeramente nublado" },
                { "overcast clouds", "nublado" }
            };
        }

        [HttpGet("{idCiudad:int}")]
        public ForecastModel Get(int idCiudad)
        {
            try
            {
                var urlBase = _cfg.GetSection("OW").GetSection("Url").Value;
                var OWAppId = _cfg.GetSection("OW").GetSection("AppId").Value;

                var url = urlBase + "?id=" + idCiudad + "&units=metric&appid=" + OWAppId;

                var response = new HttpClient().GetAsync(url);

                var content = response.Result.Content.ReadAsStringAsync().Result;

                ForecastModel info = new();

                if (response.Result.IsSuccessStatusCode && !string.IsNullOrEmpty(content))
                {
                    var data = JsonConvert.DeserializeObject<dynamic>(content);

                    var today = DateTime.Parse(data.list[0].dt_txt.ToString().Substring(0, 10));

                    info.Country = data.city.country;
                    info.City = data.city.name;
                    info.Day = today.ToString("dddd");
                    info.MainCondition = data.list[0].weather[0].main;
                    info.Condition = WeatherConditions[data.list[0].weather[0].description.ToString()];
                    info.Temp = data.list[0].main.temp;
                    info.TempF = (info.Temp * 9 / 5) + 32;
                    info.Humidity = data.list[0].main.humidity;
                    info.WindSpeed = data.list[0].wind.speed;
                    info.Rainfall = data.list[0].clouds.all;

                    var forecastList = new List<ForecastDayModel>();

                    for(var i = 0; i < data.list.Count; i++)
                    {
                        if(DateTime.Parse(data.list[i].dt_txt.ToString()) == today.AddDays(1))
                        {
                            forecastList.Add(new ForecastDayModel() { 
                                Day = DateTime.Parse(data.list[i].dt_txt.ToString()).ToString("dddd"),
                                MainCondition = data.list[i].weather[0].main,
                                Condition = data.list[i].weather[0].description,
                                Temp = data.list[i].main.temp,
                                TempF = (data.list[i].main.temp * 9 / 5) + 32
                            });
                        }
                        if (DateTime.Parse(data.list[i].dt_txt.ToString()) == today.AddDays(2))
                        {
                            forecastList.Add(new ForecastDayModel()
                            {
                                Day = DateTime.Parse(data.list[i].dt_txt.ToString()).ToString("dddd"),
                                MainCondition = data.list[i].weather[0].main,
                                Condition = data.list[i].weather[0].description,
                                Temp = data.list[i].main.temp,
                                TempF = (data.list[i].main.temp * 9 / 5) + 32
                            });
                        }
                        if (DateTime.Parse(data.list[i].dt_txt.ToString()) == today.AddDays(3))
                        {
                            forecastList.Add(new ForecastDayModel()
                            {
                                Day = DateTime.Parse(data.list[i].dt_txt.ToString()).ToString("dddd"),
                                MainCondition = data.list[i].weather[0].main,
                                Condition = data.list[i].weather[0].description,
                                Temp = data.list[i].main.temp,
                                TempF = (data.list[i].main.temp * 9 / 5) + 32
                            });
                        }
                        if (DateTime.Parse(data.list[i].dt_txt.ToString()) == today.AddDays(4))
                        {
                            forecastList.Add(new ForecastDayModel()
                            {
                                Day = DateTime.Parse(data.list[i].dt_txt.ToString()).ToString("dddd"),
                                MainCondition = data.list[i].weather[0].main,
                                Condition = data.list[i].weather[0].description,
                                Temp = data.list[i].main.temp,
                                TempF = (data.list[i].main.temp * 9 / 5) + 32
                            });
                        }
                        if (DateTime.Parse(data.list[i].dt_txt.ToString()) == today.AddDays(5))
                        {
                            forecastList.Add(new ForecastDayModel()
                            {
                                Day = DateTime.Parse(data.list[i].dt_txt.ToString()).ToString("dddd"),
                                MainCondition = data.list[i].weather[0].main,
                                Condition = data.list[i].weather[0].description,
                                Temp = data.list[i].main.temp,
                                TempF = (data.list[i].main.temp * 9 / 5) + 32
                            });
                        }
                    }

                    info.FiveDays = forecastList.ToArray();
                }

                return info;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}