import { useState } from "react";

export default function AddBalanceForm({balance,setBalance}){

    const[income,setIncome]=useState('');

    function handleSubmit(e){
        e.preventDefault();
        setBalance(prev => prev+ Number(income));
        setIncome('');
    }
    return(
        <div style={{height:'45vh'
        }}>
            <div>
                <h2>Total Balance: {balance}</h2>
                <h2>
                    Add balance
                </h2>
            </div>
            <form onSubmit={handleSubmit} style={{margin:'-15px'}}>
                <div>
                    <input type="number" placeholder="Income Amount" required value={income} onChange={(e)=>setIncome(e.target.value)}></input>
                </div>
                <button type="submit">Add balance</button>
                <button type="button" onClick={(e)=>{
                    setIncome('');
                }}>Cancel</button>
            </form>
        </div>
    )
}