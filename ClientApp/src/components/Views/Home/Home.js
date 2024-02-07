import React, { Component } from 'react';
import './Home.css';
import dataPaises from "../../Data/paises.json";
import dataCiudades from "../../Data/ciudades.json";
import $ from 'jquery';
import authService from '../../api-authorization/AuthorizeService';
import { FaSun, FaCloudSun, FaCloud, FaCloudShowersHeavy, FaRegSnowflake } from "react-icons/fa";
import { FaCloudBolt } from "react-icons/fa6";
import Spinner from "../../Spinner/Spinner.js";


export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            ciudadesList: [],
            forecast: {},
            idCiudadSelected: 0
        };

        this.buscar = this.buscar.bind(this);
        this.loadCiudades = this.loadCiudades.bind(this);
        this.changeCity = this.changeCity.bind(this);
    }


    loadCiudades(x, ciudades) {
        $("#ciudad").val('');
        this.changeCity();

        if (x.target.value !== '-1') {
            var arr = [];
            for (var i = 0; i < ciudades.length; i++) {
                if (ciudades[i].country === x.target.value) {
                    arr.push(ciudades[i]);
                }
            }

            this.setState({ ciudadesList: arr.sort((a, b) => (a.name > b.name ? 1 : -1)) });
        }
        else {
            this.setState({ ciudadesList: [] });
        }
    }

    changeCity() {
        const val = $("#ciudad").val();

        if (val !== '') {
            const opts = document.getElementById("ciudades").childNodes;

            let flag = false;
            for (let i = 0; i < opts.length; i++) {
                if (opts[i].value === val) {
                    this.setState({ idCiudadSelected: parseInt(opts[i].id) });
                    flag = true;
                    break;
                }
            }

            if (!flag) {
                this.setState({ idCiudadSelected: 0 });
            }
        }
        else {
            this.setState({ idCiudadSelected: 0 });
        }
    }

    async buscar() {
        this.setState({ loading: true });
        const token = await authService.getAccessToken();

        const response = await fetch(`weatherforecast/${this.state.idCiudadSelected}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ forecast: data });
        this.setState({ loading: false });
    }

    renderIconSwitch(param) {
        switch (param.mainCondition) {
            case 'Clear':
                return <FaSun />;
            case 'Clouds':
                if (param.condition === 'pocas nubes') {
                    return <FaCloudSun />;
                }
                else {
                    return <FaCloud />;
                }
            case 'Drizzle':
                return <FaCloudShowersHeavy />;
            case 'Rain':
                return <FaCloudShowersHeavy />;
            case 'Thunderstorm':
                return <FaCloudBolt />;
            case 'Snow':
                return <FaRegSnowflake />;
            default:
                return '';
        }
    }

    renderCountrySwitch(param) {
        switch (param) {
            case 'AR':
                return 'Argentina';
            case 'UY':
                return 'Uruguay';
            default:
                return '';
        }
    }


    render() {
        return (
            <div>
                <h1 className="title">Servicio del Clima</h1>

                <div className="gridBox">
                    <div className="box">
                        <h3>Seleccion&aacute; la zona</h3>

                        <label className="labelsZona" htmlFor="pais">Pa&iacute;s</label>
                        <select
                            id="pais"
                            className="inputsLogin"
                            onChange={(x) => this.loadCiudades(x, dataCiudades)}
                            disabled={this.state.loading}>
                            <option value="-1">Seleccion&aacute; un pa&iacute;s</option>
                            {dataPaises?.map((x, i) =>
                                <option key={i} value={x?.ID}>{x?.Pais}</option>
                            )}
                        </select>
                        <br />
                        <label className="labelsZona" htmlFor="ciudad">Ciudad</label>
                        <input
                            className="inputsLogin"
                            placeholder="Seleccion&aacute; una ciudad"
                            id="ciudad"
                            onChange={() => this.changeCity()}
                            list="ciudades"
                            disabled={this.state.loading} />
                        <datalist id="ciudades">
                            {this.state.ciudadesList?.map((x, i) =>
                                <option key={i} id={x?.id} value={x?.name} />
                            )}
                        </datalist>

                        {this.state.loading ? <Spinner /> : <button type="submit" id="zona" className="buscarButton" onClick={this.buscar} disabled={this.state.idCiudadSelected === 0}>Buscar</button>}
                    </div>
                    <div className="box">
                        <h3>Reporte del clima</h3>

                        {!$.isEmptyObject(this.state.forecast) && <div className="gridBoxReporte">
                            <div>
                                <span className="spanLocPais">{this.renderCountrySwitch(this.state.forecast.country)}</span>
                                <br />
                                <span className="spanLocCiudad">{this.state.forecast.city}</span>
                                <br />
                                <span className="spanDay">{this.state.forecast.day}</span>
                                <br />
                                <span className="spanCondition">{this.state.forecast.condition}</span>
                                <br />
                                <div>
                                    <span className="spanTemp">{this.state.forecast.temp}</span>
                                    <span className="spanTempC">&ordm;C</span>
                                </div>

                                <span className="spanTempF">{this.state.forecast.tempF}&ordm;F</span>
                            </div>
                            <div>
                                <div className="iconSVG">
                                    {this.renderIconSwitch(this.state.forecast)}
                                </div>
                                <div>
                                    <span className="spanInfo">Prob. de precipitaciones: {this.state.forecast.rainfall}%</span>
                                    <br />
                                    <span className="spanInfo">Humedad: {this.state.forecast.humidity}%</span>
                                    <br />
                                    <span className="spanInfo">Viento: {this.state.forecast.windSpeed}km/h</span>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>

                <div className="box calendarBox">
                    <div className="borderRight">
                        <h4>{$.isEmptyObject(this.state.forecast) ? "" : this.state.forecast.fiveDays[0].day}</h4>
                        {!$.isEmptyObject(this.state.forecast) && <div className="iconSVG iconSVGDays">
                            {this.renderIconSwitch(this.state.forecast.fiveDays[0])}
                        </div>}
                        <span className={$.isEmptyObject(this.state.forecast) ? "tryToHide" : "spanTempF"}>{$.isEmptyObject(this.state.forecast) ? "" : this.state.forecast.fiveDays[0].temp}&ordm;C</span>
                        <br />
                        <span className={$.isEmptyObject(this.state.forecast) ? "tryToHide" : "spanTempF"}>{$.isEmptyObject(this.state.forecast) ? "" : this.state.forecast.fiveDays[0].tempF}&ordm;F</span>
                    </div>
                    <div className="borderRight">
                        <h4>{$.isEmptyObject(this.state.forecast) ? "" : this.state.forecast.fiveDays[1].day}</h4>
                        {!$.isEmptyObject(this.state.forecast) && <div className="iconSVG iconSVGDays">
                            {this.renderIconSwitch(this.state.forecast.fiveDays[1])}
                        </div>}
                        <span className={$.isEmptyObject(this.state.forecast) ? "tryToHide" : "spanTempF"}>{$.isEmptyObject(this.state.forecast) ? "" : this.state.forecast.fiveDays[1].temp}&ordm;C</span>
                        <br />
                        <span className={$.isEmptyObject(this.state.forecast) ? "tryToHide" : "spanTempF"}>{$.isEmptyObject(this.state.forecast) ? "" : this.state.forecast.fiveDays[1].tempF}&ordm;F</span>
                    </div>
                    <div className="borderRight">
                        <h4>{$.isEmptyObject(this.state.forecast) ? "" : this.state.forecast.fiveDays[2].day}</h4>
                        {!$.isEmptyObject(this.state.forecast) && <div className="iconSVG iconSVGDays">
                            {this.renderIconSwitch(this.state.forecast.fiveDays[2])}
                        </div>}
                        <span className={$.isEmptyObject(this.state.forecast) ? "tryToHide" : "spanTempF"}>{$.isEmptyObject(this.state.forecast) ? "" : this.state.forecast.fiveDays[2].temp}&ordm;C</span>
                        <br />
                        <span className={$.isEmptyObject(this.state.forecast) ? "tryToHide" : "spanTempF"}>{$.isEmptyObject(this.state.forecast) ? "" : this.state.forecast.fiveDays[2].tempF}&ordm;F</span>
                    </div>
                    <div className="borderRight">
                        <h4>{$.isEmptyObject(this.state.forecast) ? "" : this.state.forecast.fiveDays[3].day}</h4>
                        {!$.isEmptyObject(this.state.forecast) && <div className="iconSVG iconSVGDays">
                            {this.renderIconSwitch(this.state.forecast.fiveDays[3])}
                        </div>}
                        <span className={$.isEmptyObject(this.state.forecast) ? "tryToHide" : "spanTempF"}>{$.isEmptyObject(this.state.forecast) ? "" : this.state.forecast.fiveDays[3].temp}&ordm;C</span>
                        <br />
                        <span className={$.isEmptyObject(this.state.forecast) ? "tryToHide" : "spanTempF"}>{$.isEmptyObject(this.state.forecast) ? "" : this.state.forecast.fiveDays[3].tempF}&ordm;F</span>
                    </div>
                    <div>
                        <h4>{$.isEmptyObject(this.state.forecast) ? "" : this.state.forecast.fiveDays[4].day}</h4>
                        {!$.isEmptyObject(this.state.forecast) && <div className="iconSVG iconSVGDays">
                            {this.renderIconSwitch(this.state.forecast.fiveDays[4])}
                        </div>}
                        <span className={$.isEmptyObject(this.state.forecast) ? "tryToHide" : "spanTempF"}>{$.isEmptyObject(this.state.forecast) ? "" : this.state.forecast.fiveDays[4].temp}&ordm;C</span>
                        <br />
                        <span className={$.isEmptyObject(this.state.forecast) ? "tryToHide" : "spanTempF"}>{$.isEmptyObject(this.state.forecast) ? "" : this.state.forecast.fiveDays[4].tempF}&ordm;F</span>
                    </div>
                </div>
            </div>
        );
    }
}