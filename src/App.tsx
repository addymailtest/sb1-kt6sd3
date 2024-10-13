import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import queryClient from './utils/queryClient'
import Header from './components/Header'
import Footer from './components/Footer'
import BottomMenu from './components/BottomMenu'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CryptoDetails from './pages/CryptoDetails'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 mb-16 md:mb-0">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/crypto/:id" element={<CryptoDetails />} />
              </Routes>
            </main>
            <BottomMenu />
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App