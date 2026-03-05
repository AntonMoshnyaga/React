import Button from '../../atoms/Button/Button';
import Card from '../Card/Card';
import styles from './Post.module.css';

const Post = ({ author, content, date, avatar }) => {
    return (
        <Card>
            <div className={styles.header}>
                <img src={avatar} alt="avatar" className={styles.avatar} />
                <div className={styles.info}>
                    <span className={styles.author}>{author}</span>
                    <span className={styles.date}>{date}</span>
                </div>
            </div>
            <p className={styles.content}>{content}</p>
            <div className={styles.actions}>
                <Button variant="secondary">Лайк</Button>
                <Button variant="primary">Коментувати</Button>
            </div>
        </Card>
    );
};

export default Post;
