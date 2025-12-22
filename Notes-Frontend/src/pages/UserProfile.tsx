import React from "react"
import {
  ChevronRight,
  Settings,
  ShieldCheck,
  ChartPie,
  User,
} from "lucide-react"
import { Link } from "react-router-dom"

const UserProfile = () => {
  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white font-[satoshi] px-4 pb-28">

      {/* Header */}
      <div className="pt-6 pb-4">
        <h1 className="text-xl font-semibold">Profile</h1>
      </div>

      {/* User Row */}
      <div className="flex items-center gap-4 py-4">
        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
          <User size={20} className="text-zinc-300" />
        </div>

        <div className="flex-1">
          <p className="font-medium">Utkarsh Barnwal</p>
          <p className="text-xs text-zinc-400">
            utkarsh@email.com
          </p>
        </div>

        <ChevronRight size={18} className="text-zinc-500" />
      </div>

      <div className="h-px bg-zinc-800 my-4" />

      {/* Stats (minimal, not cards) */}
      <div className="flex justify-between text-center mb-6">
        <ProfileStat value="128" label="Expenses" />
        <ProfileStat value="4" label="Months" />
      </div>

      {/* Section: Preferences */}
      <Section title="Preferences">
        <Row icon={<ChartPie />} label="Insights" />
        <Link to="/settings"><Row icon={<Settings />} label="Settings" /></Link>
      </Section>

      {/* Section: Security */}
      <Section title="Security">
        <Row icon={<ShieldCheck />} label="Privacy & Security" />
      </Section>

      {/* Logout */}
      <button
        className="
          w-full mt-8 py-3 rounded-xl
          text-sm font-medium
          text-red-400
          bg-zinc-900 border border-zinc-800
          active:scale-95 transition
        "
      >
        Log out
      </button>
    </div>
  )
}

/* ---------------- Small Components ---------------- */

const ProfileStat = ({
  value,
  label,
}: {
  value: string
  label: string
}) => (
  <div>
    <p className="text-lg font-semibold">{value}</p>
    <p className="text-[0.65rem] uppercase tracking-wide text-zinc-400">
      {label}
    </p>
  </div>
)

const Section = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div className="mb-6">
    <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
      {title}
    </p>
    <div className="flex flex-col gap-1">{children}</div>
  </div>
)

const Row = ({
  icon,
  label,
}: {
  icon: React.ReactNode
  label: string
}) => (
  <button
    className="
      w-full flex items-center justify-between
      px-3 py-3 rounded-xl
      hover:bg-zinc-900
      active:bg-zinc-900
      transition
    "
  >
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 flex items-center justify-center text-zinc-400">
        {icon}
      </div>
      <span className="text-sm">{label}</span>
    </div>
    <ChevronRight size={16} className="text-zinc-600" />
  </button>
)

export default UserProfile
