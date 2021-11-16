function Statistics ({stats}) {
// console.log('STATISTIKA AAA', stats)

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

    return(
        <>
            <div className="statistics">
                <fieldset className="sub-statistics">
                    <legend>General Statistics</legend>
                    <div>
                            <span><p>Viso klientų: <i>{stats.visoKlientu}</i></p></span>
                            <span><p>Viso pinigų: <i>{parseFloat(stats.visoPinigu).toFixed(0)}</i></p></span>
                            {/* <span><p>Unique vardass <i>{stats.uniquevardass}</i></p></span> */}
                    </div>
                    {/* <div>
                        <span><p>Average kaina: <i>{parseFloat(stats.avgkaina).toFixed(2)}</i></p></span>
                        <span><p>Items in stock: <i>{stats.itmInStock}</i></p></span>
                        <span><p>Items out of stock: <i>{stats.itmOutStock}</i></p></span>
                    </div> */}
                </fieldset>
                <fieldset className="sub-statistics">
                    <legend>Statistika pagal grupes</legend>
                    <fieldset>
                        <legend>Pagal abonentą</legend>
                        <div className="group-statistics">
                            {stats.groupStats1.map((e, i) => <span key={i}><p>{abonentask(e.abonentas)} : <i>{e.quantity}</i></p></span>)}
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Pagal sporto klubą</legend>
                        <div className="group-statistics">
                            {stats.groupStats2.map((e, i) => <span key={i}><p>{e.sportoklubas} : <i>{e.quantity}</i></p></span>)}
                        </div>
                    </fieldset>
                    
                    {/* <div>
                        <span><p>Items in stock</p></span>
                        <span><p>Items out of stock:</p></span>
                        <span><p>Item average kaina:</p></span>
                    </div> */}
                </fieldset>
            </div>
            <div className="gradient-bar"></div>
        </>
    )

}

export default Statistics;