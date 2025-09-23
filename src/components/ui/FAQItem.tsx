'use client'

import React, { useState } from 'react'

interface FAQItemProps {
  question: string
  answer: string
}

export const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`backdrop-blur-sm border border-[#E6F2FF] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg ${isOpen ? 'bg-[#FFFFFF]' : 'bg-[#FAFAFA]/80'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-6 text-left cursor-pointer flex items-center justify-between hover:bg-[#E6F2FF]/30 transition-colors duration-300"
      >
        <h3 className="text-lg font-semibold text-gray-900 pr-4">
          {question}
        </h3>
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#2EBEFA] to-[#0057B8] flex items-center justify-center transition-transform duration-300">
          <svg
            className={`w-4 h-4 text-white ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 pt-0">
          <div className="w-full h-px bg-gradient-to-r from-[#E6F2FF] via-[#2EBEFA]/20 to-[#E6F2FF] mb-4"></div>
          <p className="text-gray-600 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}