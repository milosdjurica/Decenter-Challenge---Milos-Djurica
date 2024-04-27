### Live demo

https://decenter-challenge-web3-milos-djurica.vercel.app/

### Installation and start project locally ->

Clone repo

```
git clone https://github.com/milosdjurica/Decenter-Challenge-Web3-Milos-Djurica
```

Install packages

```
yarn
```

Start in development mode

```
yarn dev
```

### Notes

- Project is using Metamask injected provider.

- In bonus part for "CDP page" liquidation ratio for USDC-A 101% is mentioned, but liquidation ratio for WSTETH-A is not mentioned. Liquidation rates that i used ->
  - ETH-A - 145%
  - WBTC-A - 145%
  - WSTETH-A 150% (https://maker.defiexplore.com/cdp/31039).
  - For every other collateral type i used 101% (USDC-A ratio). This of course doesn't make a lot of sense, but user is not supposed to search for other types of collateral anyway.

### Potential project improvements

- Write tests
- Improve code readability and reusability
- Improve type support
- Improve UI & UX
- Use real prices
- Use better state management
