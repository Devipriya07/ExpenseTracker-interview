import Card from '@mui/material/Card';
import AddBalanceForm from '../AddBalance';
import ExpenseForm from '../ExpenseForm';
import { useEffect, useState } from 'react';
import TransactionList from '../TransactionList';
import './home.css';

export default function Home(){

    const[balance,setBalance]=useState(5000);
    const[expenseList, setExpenseList]=useState([]);
    
    useEffect(()=>{
        const localBalance=localStorage.getItem('balance');
        if(localBalance){
            setBalance(Number(localBalance))
        }
        else {
            localStorage.setItem('balance', '5000'); // Initialize localStorage
          }
    },[]);

    return(
        <div style={{margin:"-1.5em"}}>
            <h1>Expense tracker</h1>
            <div style={{margin:"-1.5em"}}>
                <div style={{display:'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            gap:"7em",
                            margin:'0em'
                }}>
                    <div>
                        <Card title='Wallet Balance' className='container-one' >
                            <AddBalanceForm balance={balance} setBalance={setBalance}/>
                        </Card>
                    </div>
                    <div>
                        <Card title='Add Expenses' className='container-two'>
                            <ExpenseForm balance={balance} setBalance={setBalance} expenseList={expenseList} setExpenseList={setExpenseList}/>
                        </Card>
                    </div>
                </div>
                <div style={{marginBottom:'50px'}}>
                <Card className='container-three'>
                    <TransactionList expenseList={expenseList} setExpenseList={setExpenseList}/>
                </Card>
                </div>
            </div>
        </div>
    )
}