"use client";
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-between pb-10 md:pb-20">
        <div className="flex justify-between items-center pt-20 md:pt-32 container mx-auto px-4 md:px-16 ">
          <Link href="/">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900">DeadManSwitch</span>
            </div>
          </Link>
          <ConnectButton />
        </div>
        <div className="container mx-auto px-4 md:px-16">
          <div className="pt-10 md:pt-20">
            {/* Main Content */}
            <div className="space-y-6 md:space-y-8 mb-10 md:mb-16">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 max-w-5xl leading-tight">
                Trustless Digital{" "}
                <span className="text-red-600">Dead Man's Switch</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
                Secure, automated inheritance and corporate succession planning using blockchain technology. 
                Your sensitive documents are automatically released only when you're no longer able to maintain them.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/vault" className="inline-block">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                    Create Your Vault
                  </button>
                </Link>
                <Link href="/beneficiary" className="inline-block">
                  <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-300 transition-colors duration-200 shadow-lg hover:shadow-xl">
                    Access as Beneficiary
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 md:px-16">
          <div className="grid md:grid-cols-3 gap-8 pt-16">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">End-to-End Encryption</h3>
              <p className="text-gray-600">Your sensitive data is encrypted locally and never exposed to anyone, including us.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Automated Release</h3>
              <p className="text-gray-600">Documents are automatically released when you fail to send periodic heartbeats.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Trustless & Decentralized</h3>
              <p className="text-gray-600">No trusted third parties. The blockchain guarantees execution of your instructions.</p>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="container mx-auto px-4 md:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-200 pt-8 md:pt-12 gap-4 md:gap-0">
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-semibold">
                Access Your Digital Legacy Vault
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 w-full md:w-auto">
              <Link href="/vault" className="w-full md:w-[200px]">
                <div className="w-full md:w-[200px] py-3 text-gray-900 border border-gray-200 hover:border-gray-400 transition-colors text-center font-semibold rounded-lg">
                  Manage Vault
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
                href="#"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Documentation
              </a>
              <a
                href="#"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                GitHub
              </a>
              <a
                href="#"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Support
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
  );
}
