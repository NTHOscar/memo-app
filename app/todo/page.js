import CreateTODO from './CreateTODO';
import styles from './TODO.module.css';

async function getTODOList() {
    // const db = new PocketBase('http://127.0.0.1:8090');
    // const result = await db.records.getList('notes');
    const res = await fetch('http://127.0.0.1:8090/api/collections/todo/records?page=1&perPage=30', { cache: 'no-store' });
    const data = await res.json();
    // console.log(data);
    return data?.items;
  }

export default async function TODOList() {
    const todoList = await getTODOList();
    console.log(todoList);
    return(
        <div>
            <h1>To-Do List</h1>
            <CreateTODO />
            <br />
            <div className={styles.itemListContainer}>
                <div className={styles.itemListHeader}>
                    <div className={styles.itemElement}>Title</div>
                    <div className={styles.itemElement}>Date</div>
                    <div className={styles.itemElement}>Completed?</div>
                    <div className={styles.itemElement}></div>
                </div>
                {todoList?.map((item) => {
                return <TODO key={item.id} item={item} />;
                })}
            </div>
        </div>
    );
}

function TODO({ item }) {
    const { id, title, date, completed } = item;
  
    return (

        <div className={styles.itemRow}>
          <div className={styles.itemElement}>{title}</div>
          <div className={styles.itemElement}>{date}</div>
          <div className={styles.itemElement}>{completed?"Yes":"No"}</div>
          <div className={styles.itemElement}>
            <button>
                Delete
            </button>
          </div>
        </div>
    );
  }