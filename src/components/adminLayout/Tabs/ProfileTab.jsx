import React from "react";

const user = {
  username: "johndoe",
  email: "john@example.com",
  createdAt: "2023-01-15",
  ip: "192.168.1.10",
  lastLogin: "2025-05-20 14:30",
  status: "VIP",
  note: "VIP client with high order volume.\nPrefers email communication.",
};

const ProfileTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">
            Username
          </label>
          <div className="mt-1 p-2 border rounded">
            {user.username}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">
            Email
          </label>
          <div className="mt-1 p-2 border rounded">{user.email}</div>
        </div>
        <div>
          <label className="block text-sm font-medium">
            Created Date
          </label>
          <div className="mt-1 p-2 border rounded">
            {user.createdAt}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">
            Last Login
          </label>
          <div className="mt-1 p-2 border rounded">
            {user.lastLogin}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">
            IP Address
          </label>
          <div className="mt-1 p-2 border rounded">{user.ip}</div>
        </div>
        <div>
          <label className="block text-sm font-medium">
            Status
          </label>
          <div className="mt-1 p-2 border rounded">{user.status}</div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">
          User Note
        </label>
        <div className="mt-1 p-2 border rounded whitespace-pre-wrap">
          {user.note}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
