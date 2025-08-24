"use client";
import React from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import Header from "./header";
import Wallet from "../wallet";

import { useExplorer } from "@/hooks/useExplorer";
import { useEncrypt } from "@/hooks/useEncrypt";

const BlockLockPage = () => {
  const { isConnected } = useAccount();

  const {
    handleEncrypt: encryptMutation,
    setActiveTab,
    setUserMessage,
    setBlocksAhead,
    activeTab,
    userMessage,
    blocksAhead,
    estimatedDecryptionTime,
  } = useEncrypt();

  const {
    mutateAsync: handleEncrypt,
    isPending: isEncrypting,
    isError: isEncryptError,
    error: encryptError,
  } = encryptMutation;

  const {
    data: requests,
    isLoading: isLoadingRequests,
    refetch,
  } = useExplorer(setActiveTab);

  return isConnected ? (
    <div className="bg-white-pattern">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-20 font-sans min-h-screen">
        {/* Tabs - Stack on mobile, side by side on desktop */}
        <div className="flex flex-col sm:flex-row justify-end mb-6 gap-2 sm:gap-0">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <button
              className={`w-full sm:w-[200px] py-3 font-funnel-sans text-gray-900 border border-gray-200 hover:border-gray-400 transition-colors text-center ${
                activeTab === "text" ? "border-gray-400 bg-white" : ""
              }`}
              onClick={() => setActiveTab("text")}
            >
              Encrypt
            </button>
            <button
              className={`w-full sm:w-[200px] py-3 font-funnel-sans text-gray-900 border border-gray-200 hover:border-gray-400 transition-colors text-center ${
                activeTab === "decrypt" ? "border-gray-400 bg-white" : ""
              }`}
              onClick={() => refetch()}
            >
              Explorer
            </button>
          </div>
        </div>
        {activeTab === "text" ? (
          <div className="bg-white border border-gray-200 p-4 sm:p-8 h-[550px]">
            {/* Text Areas Section - Stack on mobile, side by side on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-4 sm:mb-8">
              <div>
                <h2 className="text-xl text-gray-700 mb-4 font-funnel-display">
                  Plaintext
                </h2>
                <textarea
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  className="font-funnel-display w-full h-[200px]  text-gray-700 p-4 border border-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your text here..."
                />
              </div>
              <div className="hidden sm:block">
                <div className="w-full h-[280px] flex items-center justify-center">
                  <img
                    src="/assets/images/blocklock.gif"
                    alt="Encryption animation"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Blocks Ahead Section and Encrypt Button - Stack on mobile, side by side on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 p-4">
              <div>
                <h2 className="text-xl text-gray-700 mb-4 font-funnel-display">
                  Decryption Time
                </h2>
                <p className="text-lg text-gray-700 mb-4 font-funnel-display">
                  Blocks Ahead
                </p>
                <div className="relative">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    placeholder="Enter number of blocks ahead"
                    value={blocksAhead}
                    onChange={(e) => setBlocksAhead(e.target.value)}
                    className="font-funnel-display w-full px-4 py-2 border border-gray-300 text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {estimatedDecryptionTime && (
                    <p className="text-sm text-gray-500 mt-2 font-funnel-display">
                      Estimated decryption: {estimatedDecryptionTime}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-end font-funnel-display mb-4">
                <button
                  onClick={() => handleEncrypt({ userMessage, blocksAhead })}
                  disabled={!userMessage || !blocksAhead || isEncrypting}
                  className={`font-funnel-display w-full h-11 text-gray-900 border border-gray-200 hover:border-gray-400 transition-colors text-center ${
                    !userMessage || !blocksAhead
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isEncrypting
                    ? "Encrypting..."
                    : isEncryptError
                    ? "Error Try Again"
                    : "Encrypt"}
                </button>
              </div>
            </div>
            {isEncryptError && (
              <div className="text-red-500 font-funnel-display max-w-5xl overflow-auto py-5">
                <div>{encryptError.message}</div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 p-4 sm:p-8 max-h-[900px] flex flex-col overflow-y-auto">
            {/* Explorer Section */}
            <div className="flex justify-between">
              <h2 className="text-xl text-gray-800 mb-6 font-funnel-display">
                Message Explorer
              </h2>
              <button onClick={() => refetch()}>
                <Image
                  className={`${
                    isLoadingRequests ? "animate-spin" : ""
                  } cursor-pointer mb-6`}
                  src="/assets/images/refresh.svg"
                  width={15}
                  height={15}
                  alt="Randamu Logo"
                />
              </button>
            </div>

            {requests && requests.length > 0 ? (
              <div className="overflow-y-auto flex-1 ">
                <div className="grid gap-6">
                  {requests.map((message) => (
                    <div
                      key={message.id}
                      className="border border-gray-200 shadow-sm p-6 bg-gray-50"
                    >
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-sm font-funnel-display">
                            Request ID
                          </span>
                          <span className="text-gray-900 font-medium font-funnel-display">
                            {message.id}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-sm font-funnel-display">
                            Encryption Block Number
                          </span>
                          <span className="text-gray-900 font-medium font-funnel-display">
                            {message.encryptedAt}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-sm font-funnel-display">
                            Decryption Block Number
                          </span>
                          <span className="text-gray-900 font-medium font-funnel-display">
                            {message.decryptedAt}
                          </span>
                        </div>
                      </div>
                      {message.message != "" && (
                        <>
                          <div className="mt-2">
                            <span className="text-gray-500 text-sm font-funnel-display">
                              Decrypted Message
                            </span>
                            <div className="border border-gray-200 p-3 mt-1 bg-white overflow-x-auto">
                              <code className="text-sm text-gray-800 font-funnel-display">
                                {message.message}
                              </code>
                            </div>
                          </div>
                        </>
                      )}{" "}
                      {message.requestedBy != "" && (
                        <>
                          <div className="mt-2">
                            <span className="text-gray-500 text-sm font-funnel-display">
                              Requested By
                            </span>
                            <div className="border border-gray-200 p-3 mt-1 bg-white overflow-x-auto">
                              <code className="text-sm text-gray-800 font-funnel-display">
                                {message.requestedBy}
                              </code>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 font-funnel-display">
                  No encrypted messages found. Create one in the Encrypt tab.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
            <div className="text-center md:text-left">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <span className="text-xl font-bold">DeadManSwitch</span>
              </div>
              <p className="text-gray-400 mb-2">Secure Digital Inheritance</p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://github.com/hatif03/dead-man-switch/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Documentation
              </a>
              <a
                href="https://github.com/hatif03/dead-man-switch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                GitHub
              </a>
              <a
                href="https://x.com/hatif_15"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Twitter
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              Built with ❤️ for secure digital legacy planning
            </p>
          </div>
        </div>
      </footer>
    </div>
  ) : (
    <Wallet />
  );
};

export default BlockLockPage;
