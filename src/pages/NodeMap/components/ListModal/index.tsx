import { useState, useEffect } from 'react';
import PostTable from '../PostTable';
import Modal from 'react-modal';
import styles from './ListModal.module.scss';
import { ListModalProps } from 'utils/types';
import { getPostData } from 'api/PostData';

function ListModal({ listModalOpen, onListRequestClose }: ListModalProps) {
  const [isSelectedTable, setIsSelectedTable] = useState(null);

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPostData();
      setName(res.name);
      setTitle(res.title);
      setContent(res.title);
      setDate(res.date);
      setTime(res.time);
    };
    fetchData();
  }, [isSelectedTable]);

  const handleSelecteBoard = (id: number) => {
    setIsSelectedTable(id);
  };

  return (
    <Modal
      isOpen={listModalOpen}
      onRequestClose={onListRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(166, 166, 200, 0.2)',
        },
        content: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(166, 166, 200, 0.6)',
          borderRadius: '1rem',
          border: 'none',
          width: '50rem',
          height: '38rem',
        },
      }}
    >
      {!isSelectedTable ? (
        <>
          <button
            className={styles.header__button}
            onClick={onListRequestClose}
          >
            <span className={styles.header__span}>x</span>
          </button>
          <PostTable OnClickedId={handleSelecteBoard} />
        </>
      ) : (
        <>
          <button
            className={styles.header__button}
            onClick={() => {
              setIsSelectedTable(null);
            }}
          >
            <span className={styles.post__button}>Back</span>
          </button>
          <div className={styles.post__text__wapper}>
            <span className={styles.post__title}>{title}</span>
            <span className={styles.post__content}>{content}</span>
          </div>
        </>
      )}
    </Modal>
  );
}

export default ListModal;
