import axios from 'axios';
import React, { useEffect,useState } from 'react'
// import { Pagination } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

var count = 1

// function reducer(state,action) {
//     switch(action.type){
//       case 'increment':
//       return{count: state.count + 1}
//       case 'decrement':
//       return{count: state.count - 1}
//       default:
//         return state
  
//     }
//   }



const Data = () => {


    function increment() {
        count = count + 1
    }
    function decrement() {
if ( count ===1 ){

}
else {
    count = count - 1
}
        
    }


    //////////////////Reducer part/////////////////////////////

    // const [state, dispatch] = useReducer(reducer,{count:1})

    // function increment() {
    //     dispatch({type:'increment'})
    //     console.log(state.count)
       
    // }


    // function decrement() {
    //   if (state.count === 1) {

    //   }
    //   else{
    //     dispatch({type:'decrement'})
    //     console.log(state.count)
       
       
    //   }
      
    // }
    ////////////////////////////////////////////////

    const [data,setData] = useState([]);

    const getData = async () => {
        try {
            const data = await axios.get (
                `https://api.punkapi.com/v2/beers?page=${count}&per_page=10`
            );
            console.log(count)
            console.log(data.data);
            setData(data.data)
        } catch (error) {
            console.log(error); 
        }
    };
    
    const columns = [
        {dataField:"id", 
        text:"Id"},

        {dataField:"name", 
        text:"Name",
        filter:textFilter()},

        {dataField:"tagline", 
        text:"Tag"},

        {dataField:"first_brewed",
        text:"First"},

        {dataField:"description", 
        text:"Description"},

        {dataField:"ph", 
        text:"Ph value"},
    
    ];

    useEffect(() => {
        getData();
    },[]);

   
    
  return (
    <div>
        <h1 className='btn1 btn-primary1 btn-shadow bg-gradient1 text-white text-uppercase'>KaayLabs Frontend Task</h1>
        <BootstrapTable
        keyField='id'
        data={data}
        columns={columns}
        striped
        hover
        condensed
        filter={filterFactory()}
        pagination={paginationFactory()}/>


    <h3>Select Page Number</h3>
    <button onClick={() => {
          decrement();
          getData();
        }}>-</button>
    <span>{count}</span>
    <button onClick={() => {
          increment();
          getData();
        }}>+</button>
    </div>
    
  )
}

export default Data