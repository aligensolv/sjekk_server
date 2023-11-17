import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js"
import axios from "axios"
import querystring from "querystring"
import { autosys_api_key } from "../config.js"

class AutosysRepository{
    static getPlateInformation(plate){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                const apiUrl = `https://www.vegvesen.no/ws/no/vegvesen/kjoretoy/felles/datautlevering/enkeltoppslag/kjoretoydata?kjennemerke=${plate}`
                let response = await axios.get(apiUrl, {
                    headers:{
                        'SVV-Authorization': `Apikey ${autosys_api_key}`
                    }
                })

                let data = response.data
                
                return resolve({
                    type: data.kjoretoydataListe[0].kjennemerke[0].kjennemerkekategori,
                    plate: data.kjoretoydataListe[0].kjoretoyId.kjennemerke,
                    year: data.kjoretoydataListe[0].godkjenning.tekniskGodkjenning.kjoretoyklassifisering.nasjonalGodkjenning.nasjonaltGodkjenningsAr,
                    description: data.kjoretoydataListe[0].godkjenning.tekniskGodkjenning.kjoretoyklassifisering.beskrivelse,
                    brand: data.kjoretoydataListe[0].godkjenning.tekniskGodkjenning.tekniskeData.generelt.merke[0].merke,
                })
            }
        ))
    }
}

export default AutosysRepository