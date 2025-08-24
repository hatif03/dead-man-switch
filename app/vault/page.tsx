"use client";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useVault } from "@/hooks/useVault";
import Footer from "@/components/Footer";

const VaultPage = () => {
  const { isConnected } = useAccount();
  const {
    vaults,
    isLoading,
    error,
    createVault,
    sendHeartbeat,
    updateVaultData,
    formatTimeRemaining,
    getStatusColor,
    clearError
  } = useVault();
  
  const [activeTab, setActiveTab] = useState("create");
  
  // Create vault form state
  const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
  const [secretMessage, setSecretMessage] = useState("");
  const [heartbeatInterval, setHeartbeatInterval] = useState("6"); // months
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateVault = async () => {
    if (!beneficiaryAddress || !secretMessage || !heartbeatInterval) {
      return;
    }

    setIsCreating(true);
    try {
      await createVault({
        beneficiaryAddress,
        secretMessage,
        heartbeatInterval
      });
      
      setActiveTab("manage");
      
      // Clear form
      setBeneficiaryAddress("");
      setSecretMessage("");
      setHeartbeatInterval("6");

    } catch (error) {
      console.error("Error creating vault:", error);
      // Error is already handled by the hook
    } finally {
      setIsCreating(false);
    }
  };

  const handleSendHeartbeat = async (vaultId: string) => {
    try {
      await sendHeartbeat(vaultId);
    } catch (error) {
      console.error("Error sending heartbeat:", error);
    }
  };

  const handleUpdateVaultData = async (vaultId: string, newData: string) => {
    try {
      await updateVaultData(vaultId, newData);
    } catch (error) {
      console.error("Error updating vault data:", error);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Connect Your Wallet</h1>
          <p className="text-gray-600 mb-8">Please connect your wallet to access your Digital Legacy Vault</p>
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
        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-red-800 font-medium">{error}</span>
              </div>
              <button
                onClick={clearError}
                className="text-red-600 hover:text-red-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-center mb-8 gap-2">
          <button
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "create" 
                ? "bg-red-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
            onClick={() => setActiveTab("create")}
          >
            Create New Vault
          </button>
          <button
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "manage" 
                ? "bg-red-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
            onClick={() => setActiveTab("manage")}
          >
            Manage Vaults ({vaults.length})
          </button>
        </div>

        {activeTab === "create" ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Create Your Digital Legacy Vault
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Beneficiary Address
                </label>
                <input
                  type="text"
                  value={beneficiaryAddress}
                  onChange={(e) => setBeneficiaryAddress(e.target.value)}
                  placeholder="0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  The wallet address that will receive your encrypted data when conditions are met
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Secret Message
                </label>
                <textarea
                  value={secretMessage}
                  onChange={(e) => setSecretMessage(e.target.value)}
                  placeholder="Enter your will, private keys, access credentials, or any sensitive information you want to pass on..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                />
                <p className="text-sm text-gray-500 mt-1">
                  This data is encrypted locally and never visible to anyone else
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Heartbeat Interval
                </label>
                <select
                  value={heartbeatInterval}
                  onChange={(e) => setHeartbeatInterval(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="3">Every 3 months</option>
                  <option value="6">Every 6 months</option>
                  <option value="12">Every 12 months</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  You must send a "heartbeat" transaction within this period to delay the release
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-blue-900">How It Works</h4>
                    <ul className="text-sm text-blue-800 mt-2 space-y-1">
                      <li>• Your data is encrypted and stored securely on the blockchain</li>
                      <li>• You must send periodic "heartbeat" transactions to keep it locked</li>
                      <li>• If you stop sending heartbeats, the data is automatically released to your beneficiary</li>
                      <li>• The system includes a 50-year fail-safe as ultimate protection</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCreateVault}
                disabled={!beneficiaryAddress || !secretMessage || isCreating}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
                  !beneficiaryAddress || !secretMessage || isCreating
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {isCreating ? "Creating Vault..." : "Create Vault"}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {vaults.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Vaults Created Yet</h3>
                <p className="text-gray-600 mb-6">Create your first digital legacy vault to get started</p>
                <button
                  onClick={() => setActiveTab("create")}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Create Your First Vault
                </button>
              </div>
            ) : (
              vaults.map((vault) => (
                <div key={vault.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Vault {vault.id}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vault.status)}`}>
                          {vault.status === 'overdue' ? 'Overdue' : vault.status === 'active' ? 'Active' : 'Released'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Beneficiary</p>
                          <p className="font-mono text-sm text-gray-900">{vault.beneficiary}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Heartbeat Interval</p>
                          <p className="text-gray-900">{vault.heartbeatInterval} months</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Next Heartbeat Due</p>
                          <p className="text-gray-900">{formatTimeRemaining(vault.nextHeartbeat)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleSendHeartbeat(vault.id)}
                        disabled={isLoading || vault.status !== 'active'}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          vault.status !== 'active'
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                      >
                        {isLoading ? "Sending..." : "Send Heartbeat"}
                      </button>
                      
                      <button 
                        onClick={() => {
                          const newData = prompt("Enter new encrypted data:");
                          if (newData) {
                            handleUpdateVaultData(vault.id, newData);
                          }
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        Update Data
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default VaultPage;
