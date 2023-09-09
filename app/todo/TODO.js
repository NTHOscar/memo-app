'use client';
import styles from './TODO.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TODO({ item }) {
    const { id, title, date, completed } = item;
    // console.log(item);
    // console.log(id);
    const router = useRouter();
    const [isCompleted, setIsCompleted] = useState(completed);
    // onclick will not reload whole page by default
    const deleteRecord = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8090/api/collections/todo/records/${id}`, {
            method: 'DELETE',
            });
    
            if (!response.ok) {
            throw new Error('Delete request failed');
            }
            
        } catch (error) {
            console.log(error);
        }
        router.refresh();
    };
    const toggleCompleted = async (id) => {
        try {
          // Make an API call to update the value in the database
          const response = await fetch(`http://127.0.0.1:8090/api/collections/todo/records/${id}`,{
            method: 'PATCH', // or 'PATCH' depending on your API
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({completed: !isCompleted}),
          });
            
          // Update the local state
          setIsCompleted(!isCompleted);
          router.refresh();
        } catch (error) {
          console.error('Error updating completed value:', error);
        }
      };
    const buttonClass = isCompleted ? styles.greenButton : styles.redButton;

    return (
        <div className={styles.itemRow}>
          <div className={styles.itemElement}>{title}</div>
          <div className={styles.itemElement}>{date}</div>
          <div className={styles.itemElement}>
            <button className={buttonClass} onClick={()=>toggleCompleted(id)}>
                {isCompleted ? 'Yes' : 'No'}
            </button>
          </div>
          <div className={styles.itemElement}>
            <button onClick={()=>deleteRecord(id)}>
                Delete
            </button>
          </div>
        </div>
    );
  }