import type { NextPage } from 'next'
import NavBar from '../components/NavBar'
import ReadText from '../components/ReadText';
import styles from './index.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.main}>
      <ReadText />
    </div>
  )
}

export default Home
