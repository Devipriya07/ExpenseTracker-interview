import { useEffect, useState } from 'react'

export default function ExpenseForm({ expenseList, setExpenseList, setBalance, balance }) {

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        date: '',
    })
    const [editId, setEditId] = useState(0)
    const handleChange = (e) => {
        const name = e.target.name
        setFormData(prev => ({ ...prev, [name]: e.target.value }))
    }

    const handleAdd = (e) => {
        e.preventDefault()
        setBalance(prev => prev - Number(formData.price))

        const lastId = expenseList.length > 0 ? expenseList[0].id : 0
        setExpenseList(prev => [{ ...formData, id: lastId + 1 }, ...prev])

        setFormData({
            title: '',
            category: '',
            price: '',
            date: '',
        })
    }

    const handleEdit = (e) => {
        e.preventDefault()

        const updated = expenseList.map(item => {
            if (item.id == editId) {

                const priceDifference = item.price - Number(formData.price)
                if (priceDifference < 0 && Math.abs(priceDifference) > balance) {
                    return { ...item }
                }
                setBalance(prev => prev + priceDifference)
                return { ...formData, id: editId }
            }
            else {
                return item
            }
        })
        setExpenseList(updated)
    }

    useEffect(() => {

        if (editId) {
            const expenseData = expenseList.find(item => item.id == editId)
            setFormData({
                title: expenseData.title,
                category: expenseData.category,
                price: expenseData.price,
                date: expenseData.date
            })
        }
    }, [editId])

    return (

        <div style={{height:'45vh'
        }}>
            <h2>{editId ? 'Edit Expense' : 'Add Expenses'}</h2>
            <form onSubmit={editId ? handleEdit : handleAdd}>
                <div style={{display:'flex',
                            flexDirection:'row',
                            alignItems:'center'
                }}>    
                    <input type="text" name="title" placeholder='Title'
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <input type="number" name="price" placeholder='Price'
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>    

                <div style={{display:'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-around'
                }}>  
                    <select name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required >
                        <option value='' disabled>Select category</option>
                        <option value='food'>Food</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="travel">Travel</option>
                    </select>

                    <input name="date" type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">{editId ? 'Edit Expense' : 'Add Expense'}</button>
                <button handleClick={() =>setFormData({
                                                        title:'',
                                                        category:'',
                                                        price:'',
                                                        date:''
                            })}>
                    Cancel
                </button>
            </form>
        </div>
    )
}