import { useState } from "react";
import isValidf from "../js/isValidf";

function Create({create, handleNewRecord, setShowWarningModal, error, setError}) {

    const [inputs, setInputs] = useState({
        vardas: '',
        pavarde: '',
        sportoklubas: '',
        kaina: '',
        data: '',
        abonentas: '',
        visiklubai: false,
        baseinas: false,
        gerimai: false,
    });

    const [radio, setRadio] = useState([false, false, false, false, false]);
    const radioControl = i => {
        // const radioCopy = radio.slice();
        // radioCopy[i] = !radioCopy[i]
        // setRadio(radioCopy);

        const radioCopy = [false, false, false, false, false];
        radioCopy[i] = true;
        setRadio(radioCopy);

        const inputsCopy = {...inputs};
        inputsCopy.abonentas = i + 1;
        setInputs(inputsCopy);
        // console.log(i)
    }

    const formControl = (e, what) => {
        const inputsCopy = {...inputs};
        inputsCopy[what] = e.target.value;
        
        if(what ==='visiklubai' || what ==='baseinas' || what ==='gerimai') inputsCopy[what] = !inputs[what];

        // console.log('VALUE ', e.target.value)
        setInputs(inputsCopy);
    }

    const handleCreate = () => {
        if(
            !(isValidf('txt', 'required', inputs.vardas, error, setError) &&
            isValidf('txt', 'required', inputs.pavarde, error, setError) &&
            isValidf('txt', 'required', inputs.sportoklubas, error, setError) &&
            isValidf('num', 'required', inputs.kaina, error, setError) &&
            isValidf('txt', 'optional', inputs.data.slice(0, 10), error, setError) &&
            isValidf('num', 'optional', inputs.abonentas, error, setError) &&
            isValidf('boolean', 'optional', inputs.visiklubai, error, setError) &&
            isValidf('boolean', 'optional', inputs.baseinas, error, setError) &&
            isValidf('boolean', 'optional', inputs.gerimai, error, setError))
        ) {
            setShowWarningModal(true);
        } else {
            create(inputs)
            setInputs({
                vardas: '',
                pavarde: '',
                sportoklubas: '',
                kaina: '',
                data: '',
                abonentas: '',
                visiklubai: false,
                baseinas: false,
                gerimai: false,
            });

            setRadio([false, false, false]);
        }
    }

    return (
        <div className="main-form">
            <fieldset>
                <legend>New record</legend>
                <label htmlFor="">vardas*</label>
                <input type="text" value={inputs.vardas} onChange={(e) => formControl(e, 'vardas')} />
                <label htmlFor="">pavarde*</label>
                <input type="text" value={inputs.pavarde} onChange={(e) => formControl(e, 'pavarde')} />
                <label htmlFor="">sportoklubas*</label>
                <input thype="text" value={inputs.sportoklubas} onChange={(e) => formControl(e, 'sportoklubas')} />
                <label htmlFor="">kaina*</label>
                <input type="number" value={inputs.kaina} onChange={(e) => formControl(e, 'kaina')} />              
                <label htmlFor="">Last Order</label>
                <input type="date" value={inputs.data} onChange={(e) => formControl(e, 'data')} />

                <label style={{marginTop:'15px'}}>abonentas:</label>
                <div className="abonentas">
                    <div>
                        <input onChange={(e) => radioControl(0)} type="radio" id="vienkartinis" name="vienkartinis"  checked={radio[0]}/>
                        <label htmlFor="vienkartinis">vienkartinis.</label>
                    </div>

                    <div>
                        <input onChange={(e) => radioControl(1)} type="radio" id="1 men" name="1 men"  checked={radio[1]}/>
                        <label htmlFor="1 men">1 men.</label>
                    </div>

                    <div>
                        <input onChange={(e) => radioControl(2)} type="radio" id="3 men" name="3 men"  checked={radio[2]}/>
                        <label htmlFor="3 men">3 men.</label>
                    </div>

                    <div>
                        <input onChange={(e) => radioControl(3)} type="radio" id="6 men" name="6 men"  checked={radio[3]}/>
                        <label htmlFor="6 men">6 men.</label>
                    </div>

                    <div>
                        <input onChange={(e) => radioControl(4)} type="radio" id="12 men" name="12 men"  checked={radio[4]}/>
                        <label htmlFor="12 men">12 men.</label>
                    </div>
                </div>

                {/* <div className="sq">
                    <input onChange={() => radioControl(0)} sportoklubas="checkbox" checked={radio[0]} />
                    <input onChange={() => radioControl(1)} sportoklubas="checkbox" checked={radio[1]} />
                    <input onChange={() => radioControl(2)} sportoklubas="checkbox" checked={radio[2]} />
                </div> */}

                <div className="for-sale">
                    <label style={{marginTop:'15px'}}>Visi klubai?</label>
                    <input onChange={(e) => formControl(e, 'visiklubai')} value={inputs.visiklubai} checked={inputs.visiklubai} type="checkbox" />
                </div>
                <div className="for-sale">
                    <label style={{marginTop:'15px'}}>Baseinas?</label>
                    <input onChange={(e) => formControl(e, 'baseinas')} value={inputs.baseinas} checked={inputs.baseinas} type="checkbox" />
                </div>
                <div className="for-sale">
                    <label style={{marginTop:'15px'}}>Gerimai?</label>
                    <input onChange={(e) => formControl(e, 'gerimai')} value={inputs.gerimai} checked={inputs.gerimai} type="checkbox" />
                </div>

 


                <button className="form-button" onClick={handleCreate}>Add</button>
                <button className="form-button" onClick={handleNewRecord}>New Record...</button>
            </fieldset>
        </div>
    )

}

export default Create;