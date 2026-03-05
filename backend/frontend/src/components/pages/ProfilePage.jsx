import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { addNotification } from '../store/uiStore';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    role: user?.role || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    dispatch(addNotification({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your profile has been updated successfully.',
    }));
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      company: user?.company || '',
      role: user?.role || '',
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-w-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-w-text mb-2">No User Data</h2>
          <p className="text-w-text-dim">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-w-bg">
      <div className="px-6 py-6 max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-w-text">Profile Settings</h1>
            <p className="text-xs text-w-text-dim mt-0.5">
              Manage your account information and preferences
            </p>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {user.avatar}
              </div>
              <h3 className="text-lg font-bold text-w-text mb-1">{user.name}</h3>
              <p className="text-sm text-w-text-dim mb-3">{user.email}</p>
              <div className="flex justify-center gap-2 mb-4">
                <Badge variant="primary">{user.role}</Badge>
                <Badge variant="success">{user.plan} Plan</Badge>
              </div>
              <div className="text-xs text-w-text-dim">
                <p>Member since {user.joinedAt}</p>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-4 mt-4">
              <h4 className="text-sm font-semibold text-w-text mb-3">Account Stats</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-w-text-dim">Leads Generated</span>
                  <span className="font-semibold text-w-text">2,420</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-w-text-dim">Campaigns Created</span>
                  <span className="font-semibold text-w-text">6</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-w-text-dim">Messages Sent</span>
                  <span className="font-semibold text-w-text">142,800</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-w-text-dim">Conversion Rate</span>
                  <span className="font-semibold text-w-accent2">4.8%</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-w-text mb-4">
                Personal Information
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-w-text mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-w-text mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-w-text mb-2">
                      Company
                    </label>
                    <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-w-text mb-2">
                      Role
                    </label>
                    <Input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <Button type="submit">
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </Card>

            {/* Security Settings */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg font-semibold text-w-text mb-4">
                Security Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-w-border">
                  <div>
                    <h4 className="text-sm font-medium text-w-text">Password</h4>
                    <p className="text-xs text-w-text-dim">Last updated 30 days ago</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-w-border">
                  <div>
                    <h4 className="text-sm font-medium text-w-text">Two-Factor Authentication</h4>
                    <p className="text-xs text-w-text-dim">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable 2FA
                  </Button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-sm font-medium text-w-text">API Keys</h4>
                    <p className="text-xs text-w-text-dim">Manage your API access keys</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage Keys
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}