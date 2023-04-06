import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
} from '@thirdweb-dev/react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

const Home: NextPage = () => {
  const myAddress = useAddress();
  const contractAddress = '0x07CF043c0Df353d09789AC0Df0281fe73a857835';
  const { contract, isLoading } = useContract(contractAddress);

  const [counter, setCounter] = useState<string | undefined>(undefined);

  async function getCounter() {
    if (!contract) return;

    const counter = await contract.call('getCounter');
    setCounter(counter.toString());
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ConnectWallet />
        <div className={styles.title}>
          <h3>예준이의 카운터 앱 실습</h3>
        </div>
        <div className={styles.description}>
          Contract address: {contractAddress}
          <br />
          Host address: 0x7f653eDa972E682Df0B0E5d872f188AB28380996
          <br />
          Your address: {myAddress}
          <br />
        </div>
        <h1>Counter Dapp</h1>
        <div className={styles.title}>
          <h3>{counter}</h3>
        </div>
        <div className={styles.grid}>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => {
                contract.call('decrementCounter');
                getCounter();
              }}
            >
              <h3>-</h3>
            </Web3Button>
          </div>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={() => getCounter()}
            >
              <h3>Refresh Counter</h3>
            </Web3Button>
          </div>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => {
                contract.call('incrementCounter');
                getCounter();
              }}
            >
              <h3>+</h3>
            </Web3Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
