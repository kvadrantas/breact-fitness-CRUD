import { useEffect, useState } from "react";
import isValidf from "../js/isValidf";
// import moment from "moment-timezone";


function Modal({edit, confirmDelete, modalItem, showModal, setShowModal, sportoklubass, setShowWarningModal, error, setError}) {

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

    useEffect(() => {
        setInputs({
            vardas: modalItem.vardas,
            pavarde: modalItem.pavarde,
            sportoklubas: modalItem.sportoklubas,
            kaina: modalItem.kaina,
            data: modalItem.data,
            abonentas: modalItem.abonentas,
            visiklubai: modalItem.visiklubai,
            baseinas: modalItem.baseinas,
            gerimai: modalItem.gerimai,
        })
        if(modalItem.abonentas) {
            const radioCopy = [false, false, false, false, false];
            radioCopy[modalItem.abonentas - 1] = true;
            setRadio(radioCopy);
        } else {
            setRadio([false, false, false, false, false]);
        }
    }, [modalItem]);

    const handleEdit = () => {
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
            // console.log(modalItem.data)
            edit({
                vardas: inputs.vardas,
                pavarde: inputs.pavarde,
                sportoklubas: inputs.sportoklubas,
                kaina: inputs.kaina,
                data: inputs.data,
                abonentas: inputs.abonentas,
                visiklubai: inputs.visiklubai,
                baseinas: inputs.baseinas,
                gerimai: inputs.gerimai,
            }, modalItem.id)
        }
        // console.log(
        //     {
        //         vardas: inputs.vardas,
        //         quantity: inputs.quantity,
        //         kaina: inputs.kaina,
        //         instock: inputs.instock,
        //         data: inputs.data
        //     }
        // )
    };

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
        
        setInputs(inputsCopy);
    }


    return (
        <div className="main-modal" style={{
            display: showModal ? 'block' : 'none',
            top: window.scrollY
        }}>
            <div className="main-modal-form">
                <h2>Edit item</h2>
                <label>vardas*</label><input type="text" value={inputs.vardas} onChange={(e) => formControl(e, 'vardas')} />
                <label>pavarde*</label><input type="text" value={inputs.pavarde} onChange={(e) => formControl(e, 'pavarde')} />
                <label>sportoklubas*</label><input type="text" value={inputs.sportoklubas} onChange={(e) => formControl(e, 'sportoklubas')} />
                <label>sportoklubas*</label>
                <select name="" id="" value={inputs.sportoklubas} onChange={(e) => formControl(e, 'sportoklubas')}>
                    {sportoklubass.map((e, i) => <option key={i} value={e.sportoklubas}>{e.sportoklubas}</option>)}
                    
                </select>
                <label>kaina*</label><input type="number" value={inputs.kaina} onChange={(e) => formControl(e, 'kaina')} />
                <label>In Stock</label>

                {/* <label>Last Order</label><input sportoklubas="date" value={moment.tz(inputs.data, "Europe/Vilnius").format('YYYY-MM-DD')} onChange={(e) => formControl(e, 'data')} /> */}
                <label>Last Order</label><input type="date" value={inputs.data} onChange={(e) => formControl(e, 'data')} />
                {/* <label>abonentas</label><input sportoklubas="number" value={inputs.abonentas} onChange={(e) => formControl(e, 'abonentas')} />
                <label>For Sale</label><input sportoklubas="number" value={inputs.visiklubai} onChange={(e) => formControl(e, 'visiklubai')} />
                <label>Description</label><textarea value={inputs.description} onChange={(e) => formControl(e, 'description')} /> */}
                
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
                </div> <br/>
                <div className="for-sale">
                    <label style={{marginTop:'15px'}}>Baseinas?</label>
                    <input onChange={(e) => formControl(e, 'baseinas')} value={inputs.baseinas} checked={inputs.baseinas} type="checkbox" />
                </div> <br/>
                <div className="for-sale">
                    <label style={{marginTop:'15px'}}>Gerimai?</label>
                    <input onChange={(e) => formControl(e, 'gerimai')} value={inputs.gerimai} checked={inputs.gerimai} type="checkbox" />
                </div> <br/>

            </div>
            <button className="form-button" onClick={handleEdit}>Save</button>
            <button className="form-button" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="form-button" onClick={() => confirmDelete(modalItem.id)}>Delete</button>
        </div>
    )

}

export default Modal;