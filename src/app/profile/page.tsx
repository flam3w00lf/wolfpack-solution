"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import {
  Shield,
  Swords,
  Flame,
  Star,
  LogOut,
  Settings,
  User,
} from "lucide-react";

const rpgStats = [
  { label: "Build Streak", value: "—", icon: Flame, color: "text-orange-400" },
  { label: "Pack Rank", value: "Pup", icon: Shield, color: "text-blue-400" },
  {
    label: "Quests Completed",
    value: "0",
    icon: Swords,
    color: "text-green-400",
  },
  { label: "XP", value: "0", icon: Star, color: "text-yellow-400" },
];

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-wolf-orange border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  const avatarUrl = user.user_metadata?.avatar_url;
  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.user_name ||
    user.email?.split("@")[0] ||
    "Wolf";

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Profile header */}
      <div className="rounded-xl border border-wolf-border bg-wolf-card p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="h-20 w-20 rounded-full border-2 border-wolf-orange"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-wolf-orange bg-wolf-orange/10">
              <User size={32} className="text-wolf-orange" />
            </div>
          )}
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-white">{displayName}</h1>
            <p className="text-zinc-400">{user.email}</p>
            <p className="mt-1 text-xs text-zinc-600">
              Joined{" "}
              {new Date(user.created_at).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* RPG Stats */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
          <Swords size={20} className="text-wolf-orange" />
          Wolf Stats
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {rpgStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-wolf-border bg-wolf-card p-5 text-center"
            >
              <stat.icon size={24} className={`mx-auto mb-2 ${stat.color}`} />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-xs text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-zinc-600">
          Stats coming soon with The Forge — start quests to earn XP and rank
          up.
        </p>
      </div>

      {/* Settings */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
          <Settings size={20} className="text-wolf-orange" />
          Account Settings
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-wolf-border bg-wolf-card p-5">
            <div>
              <p className="text-sm font-medium text-white">Email</p>
              <p className="text-sm text-zinc-400">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-wolf-border bg-wolf-card p-5">
            <div>
              <p className="text-sm font-medium text-white">Auth Provider</p>
              <p className="text-sm text-zinc-400">
                {user.app_metadata?.provider || "email"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sign out */}
      <div className="mt-8">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-400 transition-all hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </div>
  );
}
