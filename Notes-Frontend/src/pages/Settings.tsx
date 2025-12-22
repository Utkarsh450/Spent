import React from "react"
import {
  ChevronRight,
  User,
  Mail,
  Lock,
  Bell,
  Wallet,
  Moon,
  Trash2,
} from "lucide-react"

const Settings = () => {
  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white font-[satoshi] px-4 pb-28">

      {/* Header */}
      <div className="pt-6 pb-4">
        <h1 className="text-xl font-semibold">Settings</h1>
      </div>

      {/* Account */}
      <Section title="Account">
        <Row icon={<User size={18} />} label="Edit Profile" />
        <Row icon={<Mail size={18} />} label="Email Address" value="utkarsh@email.com" />
        <Row icon={<Lock size={18} />} label="Change Password" />
      </Section>

      {/* Preferences */}
      <Section title="Preferences">
        <Row icon={<Wallet size={18} />} label="Currency" value="INR (₹)" />
        <Row icon={<Moon size={18} />} label="App Theme" value="Dark" />
        <Row icon={<Bell size={18} />} label="Notifications" />
      </Section>

      {/* Alerts */}
      <Section title="Alerts">
        <ToggleRow label="Expense Alerts" />
        <ToggleRow label="Budget Warnings" />
      </Section>

      {/* Danger Zone */}
      <Section title="Danger Zone">
        <button
          className="
            w-full flex items-center gap-3
            px-3 py-3 rounded-xl
            text-red-400
            hover:bg-zinc-900 transition
          "
        >
          <Trash2 size={18} />
          <span className="text-sm">Clear all data</span>
        </button>
      </Section>
    </div>
  )
}

/* ---------------- Components ---------------- */

const Section = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div className="mb-8">
    <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
      {title}
    </p>
    <div className="flex flex-col gap-1">{children}</div>
  </div>
)

const Row = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value?: string
}) => (
  <button
    className="
      w-full flex items-center justify-between
      px-3 py-3 rounded-xl
      hover:bg-zinc-900 transition
    "
  >
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 flex items-center justify-center text-zinc-400">
        {icon}
      </div>
      <span className="text-sm">{label}</span>
    </div>

    <div className="flex items-center gap-2">
      {value && (
        <span className="text-xs text-zinc-400">
          {value}
        </span>
      )}
      <ChevronRight size={16} className="text-zinc-600" />
    </div>
  </button>
)

const ToggleRow = ({ label }: { label: string }) => (
  <div
    className="
      w-full flex items-center justify-between
      px-3 py-3 rounded-xl
    "
  >
    <span className="text-sm">{label}</span>

    {/* Fake toggle (UI only) */}
    <div className="w-10 h-6 rounded-full bg-zinc-800 relative">
      <div className="w-5 h-5 rounded-full bg-zinc-400 absolute top-0.5 left-0.5" />
    </div>
  </div>
)

export default Settings
