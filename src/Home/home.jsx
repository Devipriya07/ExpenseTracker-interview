import Card from '@mui/material/Card';
import AddBalanceForm from '../AddBalance';
import ExpenseForm from '../ExpenseForm';
import { useEffect, useState } from 'react';
import TransactionList from '../TransactionList';
import './home.css';

export default function Home(){

    const[balance,setBalance]=useState(0);
    const[expenseList, setExpenseList]=useState([]);
    
    useEffect(()=>{
        const localBalance=localStorage.getItem('balance');
        if(localBalance){
            setBalance(Number(localBalance))
        }
    },[]);

    return(
        <div style={{margin:"0em"}}>
            <h1>Expense tracker</h1>
            <div>
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
                <Card className='container-three'>
                    <TransactionList expenseList={expenseList} setExpenseList={setExpenseList}/>
                </Card>
            </div>
        </div>
    )
}