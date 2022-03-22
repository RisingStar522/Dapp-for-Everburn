import React from 'react';

const BannerDash = (props) => {
  return (
    <section id="bannerdash">

      <div className="inner">

        <h2>DASHBOARD</h2>
        {props.metaMaskPresent && !props.metaMaskConnected && (
        <button className="button small" onClick={props.connectMetaMask}>{props.publicKey==="Connect Wallet"?`CONNECT WALLET`: `${props.publicKey.slice(0, 6)}...${props.publicKey.slice(
          props.publicKey.length - 4,
          props.publicKey.length
        )}`}</button>
        )}
        <br/>

      </div>

    </section>
  );
}

export default BannerDash;
