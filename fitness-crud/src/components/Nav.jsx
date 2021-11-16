// import { useState } from "react";

function Nav({ filterBy, setFilterBy, filterBy2, setFilterBy2, reset, searchBy, setSearchBy, sortConditions, handleSort, sportoklubass, abonentass}) {

// ----------------- FILTER -----------------


    const selectFilter = e => {
        setFilterBy(e.target.value)
        setFilterBy2('')
    }

    const selectFilter2 = e => {
        setFilterBy2(e.target.value)
        setFilterBy('')
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

// ----------------- SORT -----------------
    const selectSort = e => {
        sortConditions.current = e.target.value;
        handleSort(e.target.value);
    }
    
    // SORT1 & FILTER MIX (SORT1)   
    // const selectSort = e => {
    //     setSortConditions(e.target.value);
    // }

// ----------------- SEARCH -----------------
    const handleSearchValue = e => {
        // console.log(e)
        if(!e.target.value) reset();
        setSearchBy(e.target.value)
    }

// ----------------- RESET -----------------
    const resetHandler = () => {
        reset();
        setFilterBy('');
        setFilterBy2('');
        setSearchBy('');
        sortConditions.current = '';
        handleSort('');
    }

    return (
        <div className="main-nav">
            <fieldset>
                <fieldset>
    {/* <option value="in-stock">In Stock</option>
    <option value="out-stock">Out of stock</option> */}
                    <legend>Filter</legend>
                    <div className="filter">
                        <label>Pagal sporto klubą</label><br></br>
                        <select onChange={selectFilter} value={filterBy} >
                            <option value="default" hidden>Select filter...</option>
                            {/* <option value="">Select animal</option> */}
                            {
                                sportoklubass.map(t => <option key={t.sportoklubas} value={t.sportoklubas}>{t.sportoklubas}</option>)
                            }
                        </select>
                    </div>
                    <div className="filter">
                        <label>Pagal abonentą</label><br></br>
                        <select onChange={selectFilter2} value={filterBy2} >
                            <option value="default" hidden>Select filter...</option>
                            {/* <option value="">Select animal</option> */}
                            {
                                abonentass.map(t => <option key={t.abonentas} value={t.abonentas}>{abonentask(t.abonentas)}</option>)
                            }
                        </select>
                    </div>
                </fieldset>
                {/* <fieldset>
                    <legend>Filter</legend>
                    <div className="filter">
                        <label>By sportoklubas</label><br></br>
                        <select onChange={selectFilter} value={filterBy} >
                            <option value="default"  hidden>Select item...</option>
                            {
                                sportoklubass.map(t => <option key={t.sportoklubas} value={t.sportoklubas}>{t.sportoklubas}</option>)
                            }
                        </select>
                    </div>
                </fieldset> */}
                <fieldset>
                    <legend>Sorting</legend>
                    <div className="sort">
                        <label>Select sort criteria</label><br></br>
                        <select onChange={selectSort} value={sortConditions.current} >
                            <option value="default"  hidden>Select sorting...</option>
                            <option value="text-asc,vardas">vardas &#8593;</option>
                            <option value="text-desc,vardas">vardas &#8595;</option>
                            <option value="text-asc,pavarde">pavarde &#8593;</option>
                            <option value="text-desc,pavarde">pavarde &#8595;</option>
                            <option value="text-asc,sportoklubas">sportoklubas &#8593;</option>
                            <option value="text-desc,sportoklubas">sportoklubas &#8595;</option>
                            <option value="number-asc,kaina">kaina &#8593;</option>
                            <option value="number-desc,kaina">kaina &#8595;</option>
                            <option value="date-asc,data">Data &#8593;</option>
                            <option value="date-desc,data">Data &#8595;</option>
                            <option value="number-asc,abonentas">abonentas &#8593;</option>
                            <option value="number-desc,abonentas">abonentas &#8595;</option>
                            <option value="number-asc,visiklubai">Visi klubai &#8593;</option>
                            <option value="number-desc,visiklubai">Visi klubai &#8595;</option>
                            <option value="number-asc,baseinas">Baseinas &#8593;</option>
                            <option value="number-desc,baseinas">Baseinas &#8595;</option>
                            <option value="number-asc,gerimai">Gerimai &#8593;</option>
                            <option value="number-desc,gerimai">Gerimai &#8595;</option>
                            
                        </select>
                    </div>
                    {/* SORT & FILTER MIX (SORT1)- */}
                    {/* <div className="sort">
                        <label>Select sort criteria</label><br></br>
                        <select onChange={selectSort} value={sortConditions} >
                            <option value="default"  hidden>Select sorting...</option>
                            <option value="in-stock">In Stock</option>
                            <option value="out-stock">Out of stock</option>
                            <option value="number-asc">kaina low to high</option>
                            <option value="number-desc">kaina hight to low</option>
                        </select>
                    </div> */}
                </fieldset>
                <button className="form-button" onClick={resetHandler}>Reset</button>
            </fieldset>
            <fieldset>
                <legend>Search</legend>
                <div className="search">
                    <label>sportoklubas search text</label>
                    <input onChange={handleSearchValue} value={searchBy}></input>
                </div>
            </fieldset>
        </div>
    )
}

export default Nav;