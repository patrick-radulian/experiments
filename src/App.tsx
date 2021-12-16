import logo from './logo.svg';
import styles from './App.module.css';
import MultiSelect from './components/MultiSelect/MultiSelect';

function App() {
    return (
        <div className={styles.app}>
            <header className={styles['app-header']}>
                <img src={logo} className={styles['app-logo']} alt="logo" />
            </header>

            <hr className={styles.separator}/>

            <main>
                <MultiSelect/>
            </main>
        </div>
    );
}

export default App;
