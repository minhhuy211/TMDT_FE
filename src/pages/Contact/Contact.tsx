"use client"

import { FaFacebook } from "react-icons/fa" // Keep FaFacebook for Facebook
import { MessageCircle } from "lucide-react" // Import MessageCircle from lucide-react for Zalo

export const Contact = () => {
  // Define the phone number and Facebook URL here for easy modification
  const phoneNumber = "0987654321" // Your actual phone number (without +84 or spaces for Zalo link)
  const displayPhoneNumber = "+84 987 654 321" // How you want it displayed
  const facebookUrl = "https://www.facebook.com/tan.dat.175789" // Your actual Facebook page URL

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg text-center">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Liên Hệ Với Chúng Tôi</h2>
            <p className="text-base text-gray-600 mt-2">Bạn có thể liên hệ với chúng tôi qua các kênh sau:</p>
          </div>

          {/* Thông tin liên hệ */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <FaFacebook className="text-gray-700 w-6 h-6" />
              <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-blue-600 hover:underline font-medium"
              >
                Facebook của chúng tôi
              </a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <MessageCircle className="text-gray-700 w-6 h-6" /> {/* Using MessageCircle for Zalo */}
              <a
                  href={`https://zalo.me/${phoneNumber}`} // Zalo link using the phone number
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-gray-800 hover:underline font-medium"
              >
                Zalo: {displayPhoneNumber}
              </a>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-8">Chúng tôi luôn sẵn lòng hỗ trợ bạn!</p>
        </div>
      </div>
  )
}
