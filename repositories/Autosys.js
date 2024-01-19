import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js"
import axios from "axios"
import querystring from "querystring"
import { autosys_api_key } from "../config.js"
import CustomError from "../interfaces/custom_error_class.js"
import { INTERNAL_SERVER } from "../constants/status_codes.js"

class AutosysRepository{
    static getPlateInformation(plate){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                try{
                    const apiUrl = `https://www.vegvesen.no/ws/no/vegvesen/kjoretoy/felles/datautlevering/enkeltoppslag/kjoretoydata?kjennemerke=${plate}`
                    let response = await axios.get(apiUrl, {
                        headers:{
                            'SVV-Authorization': `Apikey ${autosys_api_key}`
                        }
                    })
    
                    let data = response.data

                    if(response.status != 200){
                        let status_error = new CustomError('Autosys server error', response.status)
                        return reject(status_error)
                    }
                    
                    return resolve({
                        type: data?.kjoretoydataListe[0]?.kjennemerke[0]?.kjennemerkekategori,
                        plate: data?.kjoretoydataListe[0]?.kjoretoyId?.kjennemerke,
                        year: data?.kjoretoydataListe[0]?.godkjenning?.tekniskGodkjenning?.kjoretoyklassifisering?.nasjonalGodkjenning?.nasjonaltGodkjenningsAr,
                        description: data?.kjoretoydataListe[0]?.godkjenning?.tekniskGodkjenning?.kjoretoyklassifisering?.beskrivelse,
                        brand: data?.kjoretoydataListe[0]?.godkjenning?.tekniskGodkjenning?.tekniskeData?.generelt?.merke[0]?.merke,
                        color: data?.kjoretoydataListe[0]?.godkjenning?.tekniskGodkjenning?.tekniskeData?.karosseriOgLasteplan?.rFarge[0]?.kodeNavn
                    })
                }catch(error){
                    let autosys_server_error = new CustomError(error.message, INTERNAL_SERVER)
                    return reject(autosys_server_error)
                }
            }
        ))
    }
}

export default AutosysRepository