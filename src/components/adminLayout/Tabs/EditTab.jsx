import Button from "@/components/ui/Button";
import React, { useState } from "react";

const user = {
  username: "johndoe",
  email: "john@example.com",
  access: "standard",
  note: "VIP client",
  firstName: "John",
  lastName: "Doe",
  phone: "+1 555 123 4567",
  role: "User",
  status: "active",
  twoFactor: true,
};

const EditTab = () => {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: "",
    access: user.access || "standard",
    note: user.note || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phone: user.phone || "",
    role: user.role || "User",
    status: user.status || "active",
    twoFactor: user.twoFactor || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated user:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full border rounded shadow-sm focus:ring-primary focus:border-primary"
            type="text"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full border rounded shadow-sm focus:ring-primary focus:border-primary"
            type="text"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full border rounded shadow-sm focus:ring-primary focus:border-primary"
            type="text"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border rounded shadow-sm focus:ring-primary focus:border-primary"
            type="email"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full border rounded shadow-sm focus:ring-primary focus:border-primary"
            type="text"
          />
        </div>

        {/* Password Reset */}
        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full border rounded shadow-sm focus:ring-primary focus:border-primary"
            type="password"
            placeholder="Leave blank to keep current"
          />
        </div>

        {/* Access Level */}
        <div>
          <label className="block text-sm font-medium">Access Level</label>
          <select
            name="access"
            value={formData.access}
            onChange={handleChange}
            className="mt-1 block w-full border rounded shadow-sm focus:ring-primary focus:border-primary"
          >
            <option value="standard">Standard</option>
            <option value="restricted">Restricted</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full border rounded shadow-sm focus:ring-primary focus:border-primary"
          >
            <option value="User">User</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Account Status */}
        <div>
          <label className="block text-sm font-medium">Account Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border rounded shadow-sm focus:ring-primary focus:border-primary"
          >
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Two-Factor Auth */}
        <div className="flex items-center space-x-3 mt-6">
          <input
            id="twoFactor"
            name="twoFactor"
            type="checkbox"
            checked={formData.twoFactor}
            onChange={handleChange}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="twoFactor" className="text-sm font-medium">
            Enable Two-Factor Authentication
          </label>
        </div>
      </div>

      {/* User Note */}
      <div>
        <label className="block text-sm font-medium">User Note</label>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          className="mt-1 block w-full border rounded shadow-sm focus:ring-primary focus:border-primary"
          rows="4"
        />
      </div>

      <Button
        type="submit"
        className="flex justify-center items-center mx-auto"
      >
        Save Changes
      </Button>
    </form>
  );
};

export default EditTab;
