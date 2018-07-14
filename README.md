aeroscore
==============================================================================

[![Build Status](https://travis-ci.org/Turbo87/aeroscore.svg?branch=master)](https://travis-ci.org/Turbo87/aeroscore)

Gliding Competition Scoring


Content
------------------------------------------------------------------------------

The current status of the project is: **work in progress**

This project contains code and algorithms to score gliding competition
flights using the [TypeScript](https://www.typescriptlang.org/) programming
language. The reason for using TypeScript is being able to compile to
JavaScript and run the code in the browser to ultimately allow live scoring
using either [SkyLines](https://skylines.aero) or
[OGN](http://wiki.glidernet.org/) live tracking data.

The `examples` folder contains some basic scripts to demonstrate what the
library is currently capable of. It is recommended to run them using
[ts-node](https://github.com/TypeStrong/ts-node). For example:

```bash
ts-node examples/calc-ranking.ts fixtures/2017-07-17-lev
```


Installation
------------------------------------------------------------------------------
To install aeroscore you need to install:

GIT and curl
```bash
sudo apt-get install git curl
```

Node.js
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

Yarn
```bash
curl -o- -L https://yarnpkg.com/install.sh | bash
```

Logout (exit) and back in again

```bash
yarn global add ts-node typescript
```

aeroscore
```
git clone https://github.com/Turbo87/aeroscore.git
```

Change into aeroscore directory and install dependencies
```bash
cd aeroscore
yarn install
```

To check if you installation was successfull, run

```bash
ts-node examples/live-scoring.ts
```


License
------------------------------------------------------------------------------

aeroscore is licensed under the [MIT License](LICENSE).
