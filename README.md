# Digital Dead Man's Switch 🔐

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.0-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.0.0-blue.svg)](https://reactjs.org/)

A trustless, decentralized application for secure inheritance and corporate succession planning using blockchain technology and the blocklock protocol.

## 📖 Overview

The Digital Dead Man's Switch solves a fundamental problem in legacy planning: the secure, automated transfer of critical documents and information upon a person's death or incapacitation, without relying on trusted third parties.

This application provides a secure way to:
- Store sensitive information (wills, private keys, access credentials) with time-locked encryption
- Automatically release information when periodic "heartbeats" stop
- Ensure beneficiaries can access critical data when needed
- Maintain complete privacy and security through blockchain technology

## 🚀 How It Works

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

## ✨ Key Features

- **🔒 End-to-End Encryption**: Data is encrypted locally and never visible to anyone else
- **🤖 Automated Release**: No human intervention required - the blockchain guarantees execution
- **🌐 Trustless Operation**: No trusted third parties or centralized services
- **⏰ Flexible Heartbeat Intervals**: Choose from 3, 6, or 12-month check-in periods
- **🛡️ 50-Year Fail-Safe**: Ultimate protection with a very long-term backup release mechanism
- **👥 Beneficiary Portal**: Dedicated interface for recipients to access released information
- **📱 Responsive Design**: Mobile-first approach with modern UI/UX
- **🔗 Multi-Chain Support**: Works across multiple blockchain networks

## 💼 Use Cases

- **🏠 Personal Inheritance**: Wills, private keys, access credentials for family members
- **🏢 Corporate Succession**: Business continuity plans, access codes, operational procedures
- **💰 Digital Asset Transfer**: Cryptocurrency private keys, NFT access, account credentials
- **⚖️ Legal Document Storage**: Contracts, agreements, and other sensitive legal materials
- **🚨 Emergency Access**: Critical information that needs to be available in emergency situations
- **🔐 Password Management**: Secure storage of important account credentials
- **📋 Business Continuity**: Operational procedures and access codes

## 🏗️ Technical Architecture

### Frontend
- **Framework**: Next.js 15 with React 18
- **Styling**: Tailwind CSS for modern, responsive design
- **Wallet Integration**: RainbowKit for Web3 wallet connectivity
- **State Management**: React Query for efficient data fetching
- **Blockchain Integration**: Ethers.js for blockchain interaction

### Blockchain Integration
- **Protocol**: Uses the blocklock protocol for time-locked encryption
- **Networks**: Supports multiple networks (Filecoin, Arbitrum, Optimism, Base)
- **Smart Contracts**: Integration for vault management and automation
- **Key Delivery**: Automated key delivery through blockchain consensus

### Security Features
- **Local Encryption**: Data encrypted locally before any transmission
- **Blockchain Security**: Access control and release mechanisms on-chain
- **Cryptographic Guarantees**: Data integrity and timing guarantees
- **No Central Storage**: No centralized storage of sensitive information
- **Private Key Security**: User maintains complete control of their keys

## 📁 Project Structure

```
dead-man-switch/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage with features and navigation
│   ├── vault/             # Vault management interface
│   │   └── page.tsx       # Create and manage vaults
│   ├── beneficiary/       # Beneficiary portal
│   │   └── page.tsx       # Access released vaults
│   ├── blocklock/         # Original blocklock implementation
│   │   └── page.tsx       # Basic encryption/decryption
│   ├── layout.tsx         # Root layout component
│   └── providers.tsx      # React Query and wallet providers
├── components/            # Reusable UI components
│   ├── Footer.tsx         # Footer component (legacy)
│   ├── header.tsx         # Header components
│   └── walletConnect.tsx  # Wallet connection utilities
├── hooks/                 # Custom React hooks
│   ├── useVault.ts        # Vault management logic
│   ├── useEncrypt.ts      # Encryption functionality
│   ├── useEthers.ts       # Ethers.js integration
│   ├── useExplorer.ts     # Message exploration
│   └── useNetworkConfig.ts # Network configurations
├── lib/                   # Utilities and configurations
│   └── contract.ts        # Smart contract ABIs and addresses
├── public/                # Static assets
│   └── assets/           # Images, logos, and other assets
└── package.json           # Project dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 22.0.0 or higher
- **Web3 Wallet**: MetaMask, Rainbow, or other compatible wallet
- **Blockchain Access**: Connection to supported networks
- **Git**: For cloning the repository

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/hatif03/dead-man-switch.git
cd dead-man-switch
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm run dev
```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

### Usage Guide

1. **Connect Your Wallet**: Use the Connect Wallet button to link your Web3 wallet
2. **Create a Vault**: Navigate to the Vault page and create your first digital legacy vault
3. **Set Parameters**: Choose your beneficiary, heartbeat interval, and encrypt your data
4. **Send Heartbeats**: Periodically send heartbeat transactions to keep your vault locked
5. **Beneficiary Access**: Your designated beneficiary can access the information once released

## 🌐 Supported Networks

| Network | Chain ID | Block Time | Status |
|---------|----------|------------|---------|
| **Filecoin Mainnet** | 314 | 30s | ✅ Supported |
| **Filecoin Calibration** | 314159 | 30s | ✅ Supported |
| **Arbitrum Sepolia** | 421614 | 1s | ✅ Supported |
| **Optimism Sepolia** | 11155420 | 2s | ✅ Supported |
| **Base Sepolia** | 84532 | 1s | ✅ Supported |

## 🔒 Security Considerations

### Best Practices
- **Private Key Management**: Never share your private keys or seed phrases
- **Network Security**: Ensure you're connected to the correct blockchain network
- **Beneficiary Verification**: Double-check beneficiary wallet addresses before creating vaults
- **Regular Heartbeats**: Set reminders for your heartbeat schedule to avoid premature release
- **Backup Plans**: Consider multiple beneficiaries or backup mechanisms for critical information

### Security Features
- **Local Encryption**: All data is encrypted in your browser before transmission
- **Blockchain Verification**: Smart contracts ensure proper execution
- **No Data Storage**: Sensitive information is never stored on our servers
- **Access Control**: Only designated beneficiaries can access released information

## 🛠️ Development

### Tech Stack
- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Ethers.js, blocklock-js
- **Wallet**: RainbowKit, Wagmi
- **State Management**: React Query
- **Build Tool**: Turbopack (development)

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Responsive design principles

## 🤝 Contributing

We welcome contributions to improve the Digital Dead Man's Switch! Please feel free to:

- 🐛 Report bugs and issues
- 💡 Suggest new features and improvements
- 🔧 Submit pull requests with enhancements
- 📚 Help improve documentation
- 🧪 Test the application and provide feedback

### Contribution Guidelines
1. Fork the repository
2. Create a descriptive branch name
3. Make focused, atomic commits
4. Test your changes thoroughly
5. Update documentation as needed
6. Submit a clear pull request description

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This software is provided "as is" without warranty of any kind. Users are responsible for:

- Properly managing their private keys and wallet security
- Understanding the implications of automated information release
- Complying with applicable laws and regulations
- Seeking professional legal and financial advice when appropriate

The Digital Dead Man's Switch is a tool for secure information transfer but does not constitute legal, financial, or professional advice.

## 🆘 Support

For support, questions, or to report issues:

- 📖 **Documentation**: [GitHub README](https://github.com/hatif03/dead-man-switch/blob/main/README.md)
- 🐛 **Issues**: [GitHub Issues](https://github.com/hatif03/dead-man-switch/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/hatif03/dead-man-switch/discussions)
- 🐦 **Twitter**: [@hatif_15](https://x.com/hatif_15)

## 🙏 Acknowledgments

- Built with the [blocklock protocol](https://github.com/randa-mu/blocklock) for secure time-locked encryption
- Powered by [Next.js](https://nextjs.org/) and [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Web3 integration with [RainbowKit](https://rainbowkit.com/) and [Wagmi](https://wagmi.sh/)

---

**Built with ❤️ for secure digital legacy planning**

*This project aims to provide a secure, trustless solution for digital inheritance and succession planning, ensuring that your important information is protected and accessible when needed.*
