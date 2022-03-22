import React, { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider'


const Container = (props) => {
  
    const [circulatingSupply, setCirculatingSupply] = useState(0); 
    const [burnedToken, setBurnedToken] = useState(0); 
    const [totalDistributed, setTotalDistributed] = useState(0);

    const addToMM = async () => {
        const tokenAddress = '0xc7198437980c041c805A1EDcbA50c1Ce5db95118';
        const tokenSymbol = 'USDT.e';
        const tokenDecimals = 6;
        const tokenImage = 'https://everburn.io/tether.png';
    
        const provider = await detectEthereumProvider();
        provider.sendAsync({
          method: 'metamask_watchAsset',
          params: {
            "type": "ERC20",
            "options": {
              "address": tokenAddress,
              "symbol": tokenSymbol,
              "decimals": tokenDecimals,
              "image": tokenImage,
            },
          },
          id: Math.round(Math.random() * 100000),
        }, (err, added) => {
          console.log('provider returned', err, added)
          if (err || 'error' in added) {
            console.log('ERROR : There was a problem adding the token.')
            return
          }
          console.log('Token Added.');
        })
    }


    
    const claim = async () => {
        console.log('claim');
        props.dividend.methods.claimDividend().send({from: props.publicKey}).then(function (result) {
            console.log(result);
        });;
    }

    const getCirculatingSupply = () => {
        let FormatedResult = 0;
        console.log('getCirculatingSupply');
        props.evb.methods.getCirculatingSupply().call().then(function (result) {
            FormatedResult = result/1000000;
            FormatedResult = FormatedResult.toLocaleString();
            console.log(FormatedResult);
            setCirculatingSupply(FormatedResult);
        });
    }

    const getBurnedToken = () => {
        let FormatedResult = 0;
        console.log('getBurnedToken');
        const DEAD = '0x000000000000000000000000000000000000dEaD';
        props.evb.methods.balanceOf(DEAD).call().then(function (result) {
            FormatedResult = result/1000000;
            FormatedResult = FormatedResult.toLocaleString();
            console.log(FormatedResult);
            setBurnedToken(FormatedResult);
        });
    }

    const getTotalDistributed = () => {
        let FormatedResult = 0;
        console.log('totalDistributed');
        props.dividend.methods.totalDistributed().call().then(function (result) {
            FormatedResult = result/1000000;
            FormatedResult = FormatedResult.toLocaleString();
            console.log(FormatedResult);
            setTotalDistributed(FormatedResult);
        });  //, [] after curly
    }

    useEffect(() => {
        getCirculatingSupply();
        getBurnedToken();
        getTotalDistributed();
    })

    return (
        <section id="two" className="wrapper style3">

            <div className="container">

                <div className="row uniform">

                    <div className="4u 6u(2) 12u$(3)">

                        <section className="feature fa-money">

                            <hr/>

                            <h1>Your balance:</h1>
                            <p> {props.currentBalance} EVB</p>

                        </section>

                    </div>

                    <div className="4u 6u$(2) 12u$(3)">

                        <section className="feature  fa-usd">

                            <hr/>

                            <h1>Current Reward Token</h1>

                            <p>Token : USDT.e (AVAX) </p>
                            <p> 
                                <button className="button small" onClick={addToMM}>Add to MM</button>
                            </p>

                        </section>

                    </div>

                    <div className="4u$ 6u(2) 12u$(3)">

                        <section className="feature fa-money">

                            <hr/>

                            <h1>Pending Rewards</h1>

                            <p>USDT: ${props.UnpaidEarnings}  </p><p><button className="button small" onClick={claim}>Claim</button></p>

                        </section>

                    </div>

                        <div className="4u 6u(2) 12u$(3)">

                        <section className="feature fa-fire">

                            <hr/>

                            <h1>Burned Tokens:</h1>

                            <p>{burnedToken} EVB</p>
                            

                        </section>

                    </div>

                    <div className="4u 6u$(2) 12u$(3)">

                        <section className="feature fa-circle">

                            <hr/>

                            <h1>Circulating Supply</h1>

                            <p>{circulatingSupply} EVB</p>

                        </section>

                    </div>

                    <div className="4u$ 6u(2) 12u$(3)">

                        <section className="feature fa-bitbucket-square">

                            <hr/>

                            <h1>Total Distributed</h1>

                            <p>${totalDistributed} USD</p>

                        </section>

                    </div>

                    <div className="4u 6u(2) 12u$(3)">

                        <section className="feature fa-fire">

                            <hr/>

                            <h1>Burned Per Hour:</h1>

                            <p>Coming Soon</p>

                        </section>

                    </div>

                    <div className="4u 6u$(2) 12u$(3)">

                        <section className="feature fa-print">

                            <hr/>

                            <h1>Reward % by Holdings</h1>

                            <p>{props.rewardPercentByHoldings} %</p>

                        </section>

                    </div>

                    <div className="4u$ 6u(2) 12u$(3)">

                        <section className="feature fa-ticket">

                            <hr/>

                            <h1>Next Token Vote</h1>

                            <p>TBD</p>

                        </section>

                    </div>

                    <div className="4u 6u(2) 12u$(3)">

                        <section className="feature fa-chain">

                            <hr/>

                            <h1>Total Tax Rate: 20%</h1>

                            <p>Buy Tax : 3%</p>

                            <p>Only Burn</p>

                            <p>Sell Tax : 20%</p>

                            <p>Burn + Print + Market + Liq</p>

                            </section>

                    </div>

                    <div className="4u 6u$(2) 12u$(3)">

                        <section className="feature fa-fire">

                            <hr/>

                            <h1>Tax Breakdown:</h1>

                            <p>Buy Burn rate: 3%</p>

                            <p>Sell Burn rate: 5%</p>

                            <p>Marketing Rate: 3%</p>

                            <p>Liquidity Tax: 2%</p>

                        </section>

                    </div>

                    <div className="4u$ 6u(2) 12u$(3)">

                        <section className="feature fa-print">

                            <hr/>

                            <h1>Reward Rate</h1>

                            <p>Sell Reflection USDT: 10% </p>

                        

                        </section>

                    </div>

                </div>

            </div>

        </section>	
    );
}

export default Container;
