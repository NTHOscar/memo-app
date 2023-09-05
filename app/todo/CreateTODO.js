'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTODO() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [completed, setCompleted] = useState(false);
  
    const router = useRouter();
    const create = async() => {
        // Check if date is in the format "DD/MM"
        const dateRegex = /^(0?[1-9]|[1-2][0-9]|3[01])\/(0?[1-9]|1[0-2])$/;
        if (!dateRegex.test(date)) {
            window.alert('Invalid date or format. Please use the format "DD/MM".');
        }
        // const db = new PocketBase('http://127.0.0.1:8090');
    
        // await db.records.create('notes', {
        //   title,
        //   content,
        // });
        //also use fetch to create a Post request
        else{
            //format the date first before storing e.g 03/04 -> 3/4
            const [day, month] = date.split('/');
            const formattedDay = parseInt(day, 10).toString();
            const formattedMonth = parseInt(month, 10).toString();

            try {
                await fetch('http://127.0.0.1:8090/api/collections/todo/records', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    date: `${formattedDay}/${formattedMonth}`,
                    completed
                    }),
                });
            } catch (e) {
                console.log('Error occurred during fetch:', error);
                window.alert('Error occurred during fetch:', error);
            }
        }
    
        setDate('');
        setTitle('');
        setCompleted(false);
        router.refresh();
    }

    return(
        <div>
            <form onSubmit={create}>
                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Deadline: DD/MM"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <button
                        type="submit"
                    >
                        Create Item
                    </button>
                </div>
            </form>
        </div>
    );
}