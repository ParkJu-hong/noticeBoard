import styles from './NavBar.module.css';
import Link from "next/Link";

const NavBar = () => {
    return (
        <>
            <div className={styles.main}>
                <Link href="/">글 목록보기</Link>
                <Link href="/UpdateText">글 수정/삭제</Link>
                <Link href="/WriteText">글 쓰기</Link>
            </div>
        </>

    );
}

export default NavBar;