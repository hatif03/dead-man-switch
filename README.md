# Digital Dead Man's Switch

A trustless, decentralized application for secure inheritance and corporate succession planning using blockchain technology and the blocklock protocol.

## Overview

The Digital Dead Man's Switch solves a fundamental problem in legacy planning: the secure, automated transfer of critical documents and information upon a person's death or incapacitation, without relying on trusted third parties.

## How It Works

### 1. Vault Creation
- Users create encrypted vaults containing sensitive information (wills, private keys, access credentials)
- Data is encrypted locally using blocklock-js and never exposed to anyone
- Users designate a beneficiary wallet address to receive the information
- Set a heartbeat interval (3, 6, or 12 months) for periodic check-ins

### 2. Heartbeat Mechanism
- Users must send periodic "heartbeat" transactions to keep their vaults locked
- Each heartbeat extends the release date by the specified interval
- If heartbeats stop, the system automatically begins the release process

### 3. Automated Release
- When the target block is reached, the blocklock protocol automatically delivers decryption keys
- Beneficiaries can claim and decrypt the stored information
- The entire process is trustless and guaranteed by blockchain consensus

## Key Features

- **End-to-End Encryption**: Data is encrypted locally and never visible to anyone else
- **Automated Release**: No human intervention required - the blockchain guarantees execution
- **Trustless Operation**: No trusted third parties or centralized services
- **Flexible Heartbeat Intervals**: Choose from 3, 6, or 12-month check-in periods
- **50-Year Fail-Safe**: Ultimate protection with a very long-term backup release mechanism
- **Beneficiary Portal**: Dedicated interface for recipients to access released information

## Use Cases

- **Personal Inheritance**: Wills, private keys, access credentials for family members
- **Corporate Succession**: Business continuity plans, access codes, operational procedures
- **Digital Asset Transfer**: Cryptocurrency private keys, NFT access, account credentials
- **Legal Document Storage**: Contracts, agreements, and other sensitive legal materials
- **Emergency Access**: Critical information that needs to be available in emergency situations

## Technical Architecture

### Frontend
- Built with Next.js 15 and React 18
- Tailwind CSS for modern, responsive design
- RainbowKit for wallet connectivity
- Ethers.js for blockchain interaction

### Blockchain Integration
- Uses the blocklock protocol for time-locked encryption
- Supports multiple networks (Filecoin, Arbitrum, Optimism, Base)
- Smart contract integration for vault management
- Automated key delivery through blockchain consensus

### Security Features
- Local encryption before any data leaves the user's browser
- Blockchain-based access control and release mechanisms
- Cryptographic guarantees for data integrity and timing
- No centralized storage of sensitive information

## Getting Started

### Prerequisites
- Node.js 22.0.0 or higher
- A Web3 wallet (MetaMask, Rainbow, etc.)
- Access to supported blockchain networks

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/dead-man-switch.git
cd dead-man-switch
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Usage

1. **Connect Your Wallet**: Use the Connect Wallet button to link your Web3 wallet
2. **Create a Vault**: Navigate to the Vault page and create your first digital legacy vault
3. **Set Parameters**: Choose your beneficiary, heartbeat interval, and encrypt your data
4. **Send Heartbeats**: Periodically send heartbeat transactions to keep your vault locked
5. **Beneficiary Access**: Your designated beneficiary can access the information once released

## Supported Networks

- **Filecoin Mainnet** (Chain ID: 314)
- **Filecoin Calibration** (Chain ID: 314159)
- **Arbitrum Sepolia** (Chain ID: 421614)
- **Optimism Sepolia** (Chain ID: 11155420)
- **Base Sepolia** (Chain ID: 84532)

## Security Considerations

- **Private Key Management**: Never share your private keys or seed phrases
- **Network Security**: Ensure you're connected to the correct blockchain network
- **Beneficiary Verification**: Double-check beneficiary wallet addresses before creating vaults
- **Regular Heartbeats**: Set reminders for your heartbeat schedule to avoid premature release
- **Backup Plans**: Consider multiple beneficiaries or backup mechanisms for critical information

## Contributing

We welcome contributions to improve the Digital Dead Man's Switch! Please feel free to:

- Report bugs and issues
- Suggest new features and improvements
- Submit pull requests with enhancements
- Help improve documentation

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This software is provided "as is" without warranty of any kind. Users are responsible for:

- Properly managing their private keys and wallet security
- Understanding the implications of automated information release
- Complying with applicable laws and regulations
- Seeking professional legal and financial advice when appropriate

The Digital Dead Man's Switch is a tool for secure information transfer but does not constitute legal, financial, or professional advice.

## Support

For support, questions, or to report issues:

- Create an issue on GitHub
- Check the documentation for common questions
- Join our community discussions

---

Built with ❤️ for secure digital legacy planning
