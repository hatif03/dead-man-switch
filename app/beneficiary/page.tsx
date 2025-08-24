"use client";
import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Footer from "@/components/Footer";

interface ReleasedVault {
  id: string;
  creator: string;
  beneficiary: string;
  releasedAt: number;
  decryptedData: string;
  status: 'pending' | 'available' | 'claimed';
}

const BeneficiaryPage = () => {
  const { isConnected, address } = useAccount();
  const [vaults, setVaults] = useState<ReleasedVault[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVault, setSelectedVault] = useState<ReleasedVault | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    if (isConnected && address) {
      // Simulate loading vaults where this address is the beneficiary
      const mockVaults: ReleasedVault[] = [
        {
          id: "0x1234...5678",
          creator: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
          beneficiary: address,
          releasedAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
          decryptedData: "This is a sample will document that has been released to the beneficiary. It contains important information about inheritance and asset distribution.",
          status: 'available'
        },
        {
          id: "0x8765...4321",
          creator: "0x8ba1f109551bD432803012645Hac136c772c3e90",
          beneficiary: address,
          releasedAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
          decryptedData: "Private keys and access credentials for various digital assets and accounts.",
          status: 'claimed'
        }
      ];
      setVaults(mockVaults);
    }
  }, [isConnected, address]);

  const handleClaimVault = async (vaultId: string) => {
    setIsLoading(true);
    try {
      // Simulate claiming process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setVaults(prev => prev.map(vault => 
        vault.id === vaultId 
          ? { ...vault, status: 'claimed' as const }
          : vault
      ));
      
      // Find the claimed vault to show its data
      const claimedVault = vaults.find(v => v.id === vaultId);
      if (claimedVault) {
        setSelectedVault(claimedVault);
      }
    } catch (error) {
      console.error("Error claiming vault:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'available': return 'text-green-600 bg-green-100';
      case 'claimed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending Release';
      case 'available': return 'Available to Claim';
      case 'claimed': return 'Already Claimed';
      default: return 'Unknown';
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Connect Your Wallet</h1>
          <p className="text-gray-600 mb-8">Please connect your wallet to access vaults released to you</p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">DeadManSwitch</span>
            </div>
            <ConnectButton />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Beneficiary Portal</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access vaults that have been released to you. These contain important documents and information 
            from vault creators who are no longer able to maintain their heartbeats.
          </p>
        </div>

        {vaults.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Vaults Available</h3>
            <p className="text-gray-600">
              You don't have any vaults released to you yet. Vaults will appear here once they are 
              automatically released due to missed heartbeats.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {vaults.map((vault) => (
              <div key={vault.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Vault {vault.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vault.status)}`}>
                        {getStatusText(vault.status)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Creator</p>
                        <p className="font-mono text-sm text-gray-900">{vault.creator}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Released At</p>
                        <p className="text-gray-900">{formatDate(vault.releasedAt)}</p>
                      </div>
                    </div>

                    {vault.status === 'claimed' && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-500 mb-2">Decrypted Content:</p>
                        <p className="text-gray-900 font-mono text-sm">{vault.decryptedData}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    {vault.status === 'available' && (
                      <button
                        onClick={() => handleClaimVault(vault.id)}
                        disabled={isLoading}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        {isLoading ? "Claiming..." : "Claim Vault"}
                      </button>
                    )}
                    
                    {vault.status === 'claimed' && (
                      <button
                        onClick={() => setSelectedVault(vault)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        View Content
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Information Section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-semibold text-blue-900 text-lg mb-2">About the Release Process</h4>
              <div className="text-blue-800 space-y-2">
                <p>
                  Vaults are automatically released when the creator fails to send periodic "heartbeat" transactions 
                  within the specified time interval. This typically indicates that the creator is no longer able to 
                  maintain the vault due to death, incapacitation, or other circumstances.
                </p>
                <p>
                  Once a vault is released, you as the designated beneficiary can claim it to access the encrypted 
                  content. The decryption process happens automatically through the blockchain's blocklock protocol.
                </p>
                <p>
                  <strong>Important:</strong> The content you receive may contain sensitive legal documents, 
                  financial information, or access credentials. Please handle this information responsibly and 
                  consult with appropriate professionals if needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for viewing vault content */}
      {selectedVault && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Vault Content</h3>
                <button
                  onClick={() => setSelectedVault(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Vault ID</p>
                  <p className="font-mono text-sm text-gray-900">{selectedVault.id}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Creator</p>
                  <p className="font-mono text-sm text-gray-900">{selectedVault.creator}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Released At</p>
                  <p className="text-gray-900">{formatDate(selectedVault.releasedAt)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Decrypted Content</p>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedVault.decryptedData}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedVault(null)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default BeneficiaryPage;
