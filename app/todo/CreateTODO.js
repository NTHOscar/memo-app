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
        // const db = new PocketBase('http://127.0.0.1:8090');
    
        // await db.records.create('notes', {
        //   title,
        //   content,
        // });
        //also use fetch to create a Post request
        await fetch('http://127.0.0.1:8090/api/collections/todo/records', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            date,
            completed
          }),
        });
    
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
                        placeholder="Date"
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