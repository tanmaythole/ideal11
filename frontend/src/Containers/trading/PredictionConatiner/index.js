import React, { useEffect, useState } from 'react'
import SecondaryHeader from '../../../Components/AppHeader/SecondaryHeader';
import Select from 'react-select';
import style from './style.module.css';
import axiosInstance from '../../../axios';
import Button  from '../../../Components/Button';


const PredictionContainer = () => {
    const [formData, setFormData] = useState(
        {
            "team": "",
            "player": "",
            "opposition": "",
            "venue": ""
        }
    )

    const [options, setOptions] = useState(
        {
            "teams": {},
            "players": {},
            "oppositions": {},
            "venues": {}
        }
    );

    const [predictionResult, setPredictionResult] = useState({"status": "not_exectued", "result": {}});

    useEffect(() => {
        axiosInstance
            .get('/api/prediction/teams')
            .then(res => {
                const data = res.data.teams;
                let teams = [];
                data.forEach(ele => {
                    teams.push({value: ele, label:ele})
                })
                setOptions({...options, "teams": teams})
            })
            .catch(err => {
                console.log(err.response);
            })
    }, []);

    const teamOnChange = (e) => {
        setFormData({...formData, "team":e.value});
        axiosInstance
            .get('/api/prediction/players', {params: {team: e.value}})
            .then(res => {
                const data = res.data.players;
                let players = [];
                data.forEach(ele => {
                    players.push({value: ele, label:ele})
                })
                setOptions({...options, "players": players})
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    const playerOnChange = (e) => {
        setFormData({...formData, "player":e.value});
        axiosInstance
            .get('/api/prediction/oppositions', {params: {player: e.value}})
            .then(res => {
                const data = res.data.oppositions;
                let oppositions = [];
                data.forEach(ele => {
                    oppositions.push({value: ele, label:ele})
                })
                setOptions({...options, "oppositions": oppositions})
            })
            .catch(err => {
                console.log(err.response);
            })
    }
    

    const oppositionOnChange = (e) => {
        setFormData({...formData, "opposition":e.value});
        axiosInstance
            .get('/api/prediction/venues', {params: {opposition: e.value, player: formData.player}})
            .then(res => {
                const data = res.data.venues;
                let venues = [];
                data.forEach(ele => {
                    venues.push({value: ele, label:ele})
                })
                setOptions({...options, "venues": venues});
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.response);
            })
    }


    const handleOnSubmit = (e) => {
        e.preventDefault();
        setPredictionResult({...predictionResult, "status": "executing"})
        axiosInstance
            .get('/api/prediction/', {
                params: formData
            })
            .then(res => {
                console.log(res.data)
                setPredictionResult({
                    ...predictionResult,
                    "status": "executed",
                    "result": res.data
                })
            })
            .catch(err => {
                setPredictionResult({...predictionResult, "status": "execution_fail"});
            })
    }

    return (
        <div>
            <SecondaryHeader>Prediction</SecondaryHeader>
            <form className={style.form} onSubmit={handleOnSubmit}>
                <Select 
                    placeholder="Select Team"
                    options={options.teams}
                    onChange={teamOnChange}
                    name="team"
                    className={style.input}
                />
                <Select 
                    placeholder="Select Player"
                    options={options.players}
                    onChange={playerOnChange}
                    name="player"
                    className={style.input}
                />
                <Select 
                    placeholder="Select Opposition"
                    options={options.oppositions}
                    onChange={oppositionOnChange}
                    name="opposition"
                    className={style.input}
                />
                <Select 
                    placeholder="Select Venues"
                    options={options.venues}
                    onChange={e => setFormData({...formData, "venue":e.value})}
                    name="venue"
                    className={style.input}
                />
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button
                        type='submit'
                        bg="green"
                        br="10px"
                        disabled={formData.team===""||formData.player===""||formData.opposition===""||formData.venue===""}
                    >
                        Predict
                    </Button>
                </div>
            </form>

            {predictionResult.status==="executed"?(
                <div className={style.resultContainer}>
                    <h1>Prediction Result</h1>
                    <div>
                        Player Name: {formData.player}
                    </div>
                    {predictionResult.result.bat_prediction?(
                        <div>
                            Batting Score: <span>{predictionResult.result.bat_prediction} Runs</span>
                        </div>
                    ):("")}
                    {predictionResult.result.bowl_prediction?(
                        <div>
                            Bowling Score: <span>{predictionResult.result.bowl_prediction} Wickets</span>
                        </div>
                    ):("")}
                </div>
            ):("")}
        </div>
    )
}

export default PredictionContainer;