import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useEthersProvider, useEthersSigner } from "./useEthers";
import { useNetworkConfig } from "./useNetworkConfig";
import { ethers } from "ethers";
import { Blocklock } from "blocklock-js";

export interface Vault {
  id: string;
  beneficiary: string;
  heartbeatInterval: number;
  lastHeartbeat: number;
  nextHeartbeat: number;
  status: 'active' | 'overdue' | 'released';
  createdAt: number;
  encryptedData?: string;
}

export interface CreateVaultParams {
  beneficiaryAddress: string;
  secretMessage: string;
  heartbeatInterval: string;
}

export const useVault = () => {
  const { isConnected, address, chainId } = useAccount();
  const signer = useEthersSigner();
  const provider = useEthersProvider();
  const { secondsPerBlock } = useNetworkConfig();
  
  const [vaults, setVaults] = useState<Vault[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load vaults for the connected user
  useEffect(() => {
    if (isConnected && address) {
      loadUserVaults();
    }
  }, [isConnected, address]);

  const loadUserVaults = async () => {
    if (!address) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // For now, we'll use mock data
      // In a real implementation, this would query the smart contract
      const mockVaults: Vault[] = [
        {
          id: "0x1234...5678",
          beneficiary: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
          heartbeatInterval: 6,
          lastHeartbeat: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
          nextHeartbeat: Date.now() + 150 * 24 * 60 * 60 * 1000, // 150 days from now
          status: 'active',
          createdAt: Date.now() - 90 * 24 * 60 * 60 * 1000
        }
      ];
      
      setVaults(mockVaults);
    } catch (err) {
      setError("Failed to load vaults");
      console.error("Error loading vaults:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const createVault = async (params: CreateVaultParams): Promise<Vault | null> => {
    if (!signer || !provider || !chainId || !address) {
      throw new Error("Please connect your wallet");
    }

    const { beneficiaryAddress, secretMessage, heartbeatInterval } = params;

    try {
      // Validate beneficiary address
      if (!ethers.isAddress(beneficiaryAddress)) {
        throw new Error("Invalid beneficiary address");
      }

      // Calculate heartbeat interval in blocks
      const intervalMonths = parseInt(heartbeatInterval);
      const blocksPerMonth = (30 * 24 * 60 * 60) / (secondsPerBlock || 12); // Approximate
      const heartbeatIntervalBlocks = Math.floor(intervalMonths * blocksPerMonth);

      // Calculate target block (fail-safe date - 50 years)
      const currentBlock = await provider.getBlockNumber();
      const failSafeBlocks = currentBlock + (50 * 365 * 24 * 60 * 60) / (secondsPerBlock || 12);

      // Encrypt the message using blocklock
      const blocklockjs = Blocklock.createFromChainId(signer, chainId);
      const msgBytes = ethers.AbiCoder.defaultAbiCoder().encode(
        ["string"],
        [secretMessage]
      );
      const encodedMessage = ethers.getBytes(msgBytes);
      const cipherMessage = blocklockjs.encrypt(encodedMessage, BigInt(failSafeBlocks));

      // For now, we'll simulate the vault creation
      // In a real implementation, this would call the smart contract
      const newVault: Vault = {
        id: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 8)}`,
        beneficiary: beneficiaryAddress,
        heartbeatInterval: intervalMonths,
        lastHeartbeat: Date.now(),
        nextHeartbeat: Date.now() + (intervalMonths * 30 * 24 * 60 * 60 * 1000),
        status: 'active',
        createdAt: Date.now(),
        encryptedData: secretMessage // In real implementation, this would be the encrypted data
      };

      setVaults(prev => [newVault, ...prev]);
      return newVault;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create vault";
      setError(errorMessage);
      throw err;
    }
  };

  const sendHeartbeat = async (vaultId: string): Promise<boolean> => {
    if (!address) {
      throw new Error("Please connect your wallet");
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate sending heartbeat
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setVaults(prev => prev.map(vault => 
        vault.id === vaultId 
          ? { 
              ...vault, 
              lastHeartbeat: Date.now(), 
              nextHeartbeat: Date.now() + (vault.heartbeatInterval * 30 * 24 * 60 * 60 * 1000) 
            }
          : vault
      ));
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to send heartbeat";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateVaultData = async (vaultId: string, newData: string): Promise<boolean> => {
    if (!address) {
      throw new Error("Please connect your wallet");
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate updating vault data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setVaults(prev => prev.map(vault => 
        vault.id === vaultId 
          ? { 
              ...vault, 
              encryptedData: newData,
              lastHeartbeat: Date.now(),
              nextHeartbeat: Date.now() + (vault.heartbeatInterval * 30 * 24 * 60 * 60 * 1000)
            }
          : vault
      ));
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update vault data";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getVaultById = (vaultId: string): Vault | undefined => {
    return vaults.find(vault => vault.id === vaultId);
  };

  const getVaultsByStatus = (status: Vault['status']): Vault[] => {
    return vaults.filter(vault => vault.status === status);
  };

  const getOverdueVaults = (): Vault[] => {
    const now = Date.now();
    return vaults.filter(vault => 
      vault.status === 'active' && vault.nextHeartbeat <= now
    );
  };

  const formatTimeRemaining = (timestamp: number): string => {
    const now = Date.now();
    const diff = timestamp - now;
    
    if (diff <= 0) return "Overdue";
    
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const getStatusColor = (status: Vault['status']): string => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'released': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return {
    vaults,
    isLoading,
    error,
    createVault,
    sendHeartbeat,
    updateVaultData,
    getVaultById,
    getVaultsByStatus,
    getOverdueVaults,
    formatTimeRemaining,
    getStatusColor,
    loadUserVaults,
    clearError: () => setError(null)
  };
};
