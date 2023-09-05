'use client';
import styles from './TODO.module.css';
import { useRouter } from 'next/navigation';



export default function TODO({ item }) {
    const { id, title, date, completed } = item;
    console.log(id);
    const router = useRouter();
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


    return (

        <div className={styles.itemRow}>
          <div className={styles.itemElement}>{title}</div>
          <div className={styles.itemElement}>{date}</div>
          <div className={styles.itemElement}>{completed?"Yes":"No"}</div>
          <div className={styles.itemElement}>
            <button onClick={()=>deleteRecord(id)}>
                Delete
            </button>
          </div>
        </div>
    );
  }