# Decenter R&D challenge

Zadatak podrazumeva izradu malog **React** frontend alata koji prikazuje informacije o postojećim pozicijama na MakerDAO protokolu. Svaka pozicija ima ID koji je redni broj, kolateral u određenom crypto assetu, i dug u DAI - stabilnom kripto assetu fiksiranom na USD. Zato se svaka pozicija i zove collateralized debt position, odnosno CDP. Pozicije održavaju collateralization ratio, odnosno odnos kolaterala i duga. Ako taj odnos padne ispod određenog broja, pozicija se likvidira i korisnik trpi liquidation fee. Kandidatu se prepuštaju odluke oko detalja i arhitekture koda.

## Početna strana

Korisnik ima select input u kom bira collateral type (recimo da su izbori ETH-A, WBTC-A, WSTETH-A), kao i input u koji unosi broj, nazvaćemo ga roughCdpId. Input je potrebno debounceovati.

Na MakerDAO protokolu, svaki CDP (pozicija koja ima dug) ima redni broj - ID. Funkcionalnost strane je da prikaže 20 CDP-ova najbližih po ID-ju sa roughCdpId, koji su unetog coll. tipa. Na primer, ako je unesen broj 11015 i tip ETH-A, interfejs bi izlistao 11015, 11016, 11017, 11013, 11012, 11019, 11010, 11020, 11009, 11012, 11006, 11024, 11005, ...

Ograničenje je da ne sme da se izvršava više od 5 RPC zahteva istovremeno. Poželjno je vizuelno prikazati napredak pretrage.

**Napomena:** Ukoliko bude problema u vezi CDPova sa ilk-om tipa `UNIV2DAIUSDC-A`, slobodno se mogu ignorisati - podaci za njih se čuvaju i formatiraju drugačije.

**Saveti:**

- Contracti služe kao izvor informacija. Za povlačenje podataka o CDP-u koristiti contract koji je dostupan na https://etherscan.io/address/0x68C61AF097b834c68eA6EA5e46aF6c04E8945B2d#readContract
- Koristiti Web3.js biblioteku za komunikaciju sa contractima. Instancirati koristeći Metamask injected provider (window.ethereum) ili besplatni RPC sa [infura.io](http://infura.io/). Metamask je browser ekstenzija koja služi za menadžment Ethereum walleta.
- U vraćenim podacima na prethodnom contractu `ilk` se odnosi na collateral type, ali je enkodovan u bytes. Možeš koristiti bytesToString/stringToBytes iz @defisaver/tokens paketa.
- Možeš koristiti [defiexplore.com](http://defiexplore.com/) da proveriš podatke koje prikazuješ. Ako slučajno tu naletiš na probleme, možeš da koristiš i Summer.fi → [https://summer.fi/ethereum/maker/12345](https://summer.fi/ethereum/maker/12345#overview)
- Ako primetiš da se dug koji contract vraća razlikuje od duga prikazanog na defiexplore, to je zato što contract vraća dug bez uračunate kamate. Svaki collateral type (ilk) ima `rate` sa kojim se množi dug da se dobije aktuelna vrednost. Možeš dohvatiti rate za određen ilk koristeći `ilks` metodu na https://etherscan.io/address/0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b#readContract

## Bonus: CDP View contract

Napisati Solidity pametni ugovor po uzoru na [VaultInfo](https://etherscan.io/address/0x68C61AF097b834c68eA6EA5e46aF6c04E8945B2d#readContract) sa metodom koja prima ID CDPa, a vraća strukturu koja uključuje i dug sa uračunatom kamatom. Za testiranje ugovora možeš koristiti Tenderly ili Hardhat.

## Bonus: CDP strana

Svaki CDP ima svoju stranu gde su prikazani detaljni podaci, uključujući collateralization ratio, liquidation ratio, maksimalni iznos kolaterala koji može da se izvuče iz CDPa bez likvidacije, kao i maksimalni dug koji može da se napravi bez likvidacije.

Pošto je proces vađenja MakerDAO sistemskih cena malo komplikovan a dosadan, možeš da ih hardkoduješ na trenutne cene. Isto za liq. ratio: likvidacija se dešava na ratio-u od 145% za ETH-A i WBTC-A, a na 101% za USDC-A.

Ako je korisnik povezan kroz Metamask, dopustiti da potpiše poruku "Ovo je moj CDP" i ispisati potpis na strani. Potpis se radi koristeći `web3.eth.personal.sign`. Imaj u vidu da je ovo moguće samo kada je web3 instanciran pomoću injectovanog providera (window.ethereum) koji je prethodno enablovan.
