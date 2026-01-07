import { useState } from "react"
import {
  User,
  Bell,
  Lock,
  Moon,
  LogOut,
  ChevronRight,
  Camera
} from "lucide-react"

const UserProfile = () => {
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white font-[satoshi] pb-20">

      {/* Header */}
      <div className="p-5">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Manage your account & preferences
        </p>
      </div>

      {/* Profile Card */}
      <div className="mx-4 mb-6 p-4 rounded-2xl bg-zinc-900 flex items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-zinc-700 flex items-center justify-center text-xl font-semibold">
            U
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center">
            <Camera size={14} />
          </div>
        </div>

        <div className="flex-1">
          <h2 className="font-medium">Utkarsh</h2>
          <p className="text-sm text-zinc-400">utkarsh@email.com</p>
        </div>

        <ChevronRight className="text-zinc-500" />
      </div>

      {/* ACCOUNT SECTION */}
      <div className="mx-4 mb-6">
        <h3 className="mb-2 text-sm text-zinc-400 px-2">Account</h3>

        <div className="rounded-2xl bg-zinc-900 divide-y divide-zinc-800">
          <div className="flex items-center gap-3 p-4 active:bg-zinc-800 transition">
            <User size={18} className="text-zinc-400" />
            <span className="flex-1">Edit Profile</span>
            <ChevronRight size={18} className="text-zinc-600" />
          </div>

          <div className="flex items-center gap-3 p-4 active:bg-zinc-800 transition">
            <Lock size={18} className="text-zinc-400" />
            <span className="flex-1">Change Password</span>
            <ChevronRight size={18} className="text-zinc-600" />
          </div>
        </div>
      </div>

      {/* PREFERENCES SECTION */}
      <div className="mx-4 mb-6">
        <h3 className="mb-2 text-sm text-zinc-400 px-2">Preferences</h3>

        <div className="rounded-2xl bg-zinc-900 divide-y divide-zinc-800">

          {/* Notifications Toggle */}
          <div
            onClick={() => setNotifications(!notifications)}
            className="flex items-center gap-3 p-4 cursor-pointer active:bg-zinc-800 transition"
          >
            <div className="relative text-zinc-400">
              <Bell size={18} />
              {notifications && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_crimson]" />
              )}
            </div>

            <span className="flex-1">Notifications</span>

            <div
              className={`w-11 h-6 rounded-full p-1 transition ${
                notifications ? "bg-green-500" : "bg-zinc-700"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition transform ${
                  notifications ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-3 p-4 cursor-pointer active:bg-zinc-800 transition"
          >
            <Moon size={18} className="text-zinc-400" />
            <span className="flex-1">Dark Mode</span>

            <div
              className={`w-11 h-6 rounded-full p-1 transition ${
                darkMode ? "bg-green-500" : "bg-zinc-700"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition transform ${
                  darkMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </div>

        </div>
      </div>

      {/* LOGOUT */}
      <div className="mx-4">
        <div className="rounded-2xl bg-zinc-900">
          <button className="w-full flex items-center gap-3 p-4 text-red-400 active:bg-zinc-800 transition">
            <LogOut size={18} />
            <span className="flex-1 text-left">Logout</span>
          </button>
        </div>
      </div>

    </div>
  )
}

export default UserProfile
