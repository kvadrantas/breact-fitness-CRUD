import moment from "moment-timezone";

function Item({item, setShowModal, setModalItem, confirmDelete}) {

    const showEdit = () => {
        setShowModal(true);
        setModalItem(item);
    }

    const stock = (a) => {
        if(a === 1) {
            return 'yes';
        } else {
            return 'no';
        }
    }

    const abonentask = (a) => {
        switch (a) {
            case '1':
                return 'vienkartinis'
        
                case '2':
                return '1 men'

                case '3':
                return '3 men'

                case '4':
                return '6 men'

                case '5':
                return '12 men'
        
            default:
        }
    }

    return (
        <div className="main-list-item">
            {/* <i className="fas fa-pencil-alt edit" onClick={showEdit}></i> */}
            {/* <i className="far fa-trash-alt delete" onClick={() => confirmDelete(item.id)}></i> */}
    
            <div className="main-list-item-stats">
                <span className="main-list-item-name">{item.vardas}</span>
                <span className="main-list-item-name">{item.pavarde}</span>
                <span><span className="field-names">sportoklubas: </span>{item.sportoklubas}</span>
                <span><span className="field-names">kaina: </span>{item.kaina}</span>
                <span><span className="field-names">Last Order: </span>{moment.tz(item.data, "Europe/Vilnius").format('YYYY-MM-DD')}  </span>
                <span><span className="field-names">abonentas: </span>{abonentask(item.abonentas)}</span>
                <span><span className="field-names">Visi klubai: </span>{stock(item.visiklubai)}</span>
                <span><span className="field-names">Baseinas: </span>{stock(item.baseinas)}</span>
                <span><span className="field-names">Gerimai: </span>{stock(item.gerimai)}</span>
                <button className="form-button" onClick={showEdit}>Edit</button>
                <button className="form-button" onClick={() => confirmDelete(item.id)}>Delete</button>
            </div>
        </div>
    )
}

export default Item; 