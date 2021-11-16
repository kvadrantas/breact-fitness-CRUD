import Item from "./Item";

function List({items, setShowModal, setModalItem, confirmDelete}) {
    return (
        <div className="main-list">
            <div className="tbl-header">
                <div className="main-list-item-stats">
                    <span>vardas</span>
                    <span>pavarde</span>
                    <span>sportoklubas</span>
                    <span>kaina</span>
                    <span>Data</span>
                    <span>abonentas</span>
                    <span>Visi klubai</span>
                    <span>Baseinas</span>
                    <span>Gerimai</span>
                    <button className="form-button" >Edit</button>
                    <button className="form-button" >Delete</button>
    
                </div>
            </div>
            {items.map(item => <Item key={item.id} item={item} setShowModal={setShowModal} setModalItem={setModalItem} confirmDelete={confirmDelete}></Item>)}
        </div>
    )
}

export default List; 