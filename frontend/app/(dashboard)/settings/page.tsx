'use client';

import { useState } from 'react';
import { Settings, Key, CreditCard, Bell, Shield, Plus, Trash2, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'profile', label: 'Profile', icon: Settings },
  { id: 'api-keys', label: 'API Keys', icon: Key },
  { id: 'subscription', label: 'Subscription', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

const apiProviders = [
  { id: 'openai', name: 'OpenAI', connected: true, models: ['GPT-4o', 'GPT-4o-mini'] },
  { id: 'anthropic', name: 'Anthropic', connected: true, models: ['Claude 3.5 Sonnet'] },
  { id: 'fish-audio', name: 'Fish Audio', connected: false, models: ['S2-Pro'] },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('api-keys');

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-ink">Settings</h1>
        <p className="font-body text-copper-600 mt-1">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tab navigation */}
        <div className="lg:w-56 flex lg:flex-col gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2.5 px-4 py-2.5 rounded-lg font-ui text-sm font-medium transition-all whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-amber-100 text-amber-700'
                  : 'text-copper-500 hover:text-ink hover:bg-surface-secondary'
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'api-keys' && (
            <div className="space-y-6">
              <div className="card-vintage">
                <div className="p-5 border-b border-cream/50">
                  <h3 className="font-ui font-semibold text-ink">API Providers</h3>
                  <p className="text-sm font-body text-copper-500 mt-1">
                    Connect your own API keys for LLM providers
                  </p>
                </div>
                <div className="divide-y divide-cream/50">
                  {apiProviders.map((provider) => (
                    <div key={provider.id} className="p-5 flex items-center gap-4">
                      <div className={cn(
                        'h-10 w-10 rounded-lg flex items-center justify-center',
                        provider.connected ? 'bg-green-100' : 'bg-surface-secondary'
                      )}>
                        <Key className={cn('h-5 w-5', provider.connected ? 'text-green-600' : 'text-copper-400')} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-ui font-medium text-ink">{provider.name}</p>
                          {provider.connected && (
                            <Badge variant="success" className="text-[10px]">
                              <Check className="h-3 w-3 mr-0.5" />
                              Connected
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs font-ui text-copper-400 mt-0.5">
                          Models: {provider.models.join(', ')}
                        </p>
                      </div>
                      <Button variant={provider.connected ? 'secondary' : 'vintage'} size="sm">
                        {provider.connected ? 'Manage' : 'Add Key'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-vintage p-5">
                <h3 className="font-ui font-semibold text-ink mb-4">Add Custom Provider</h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-ui text-copper-500 mb-1 block">Provider Name</label>
                    <Input placeholder="e.g., OpenAI" />
                  </div>
                  <div>
                    <label className="text-xs font-ui text-copper-500 mb-1 block">API Key</label>
                    <Input type="password" placeholder="sk-..." />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-xs font-ui text-copper-500 mb-1 block">Base URL (optional)</label>
                  <Input placeholder="https://api.openai.com/v1" />
                </div>
                <Button className="btn-vintage">
                  <Plus className="h-4 w-4" />
                  Add Provider
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="card-vintage p-6">
              <h3 className="font-ui font-semibold text-ink mb-6">Profile Settings</h3>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-ui text-copper-500 mb-1 block">Display Name</label>
                    <Input placeholder="Your name" defaultValue="John Doe" />
                  </div>
                  <div>
                    <label className="text-xs font-ui text-copper-500 mb-1 block">Email</label>
                    <Input placeholder="your@email.com" defaultValue="john@example.com" disabled />
                  </div>
                </div>
                <Button className="btn-vintage">Save Changes</Button>
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="space-y-4">
              {[
                { name: 'Free', price: '$0', features: ['3 audiobooks/month', 'Basic voices', '720p video'], current: true },
                { name: 'Pro', price: '$19/mo', features: ['Unlimited audiobooks', 'Voice cloning', '1080p video', 'Priority processing'], current: false },
                { name: 'Studio', price: '$49/mo', features: ['Everything in Pro', '4K video', 'Custom branding', 'API access'], current: false },
              ].map((plan) => (
                <div key={plan.name} className={cn('card-vintage p-6', plan.current && 'border-amber-400 shadow-glow-amber')}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-display text-xl font-semibold text-ink">{plan.name}</h4>
                      <p className="font-mono text-2xl font-bold text-amber-600">{plan.price}</p>
                    </div>
                    {plan.current ? (
                      <Badge variant="success">Current Plan</Badge>
                    ) : (
                      <Button className="btn-vintage">Upgrade</Button>
                    )}
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm font-ui text-copper-600">
                        <Check className="h-4 w-4 text-amber-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card-vintage p-6">
              <h3 className="font-ui font-semibold text-ink mb-6">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'Audiobook generation complete', description: 'Get notified when your audiobook is ready', enabled: true },
                  { label: 'Video rendering complete', description: 'Get notified when your video is ready', enabled: true },
                  { label: 'Weekly usage summary', description: 'Receive a weekly email with your usage stats', enabled: false },
                  { label: 'Product updates', description: 'New features and improvements', enabled: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 rounded-lg border border-cream">
                    <div>
                      <p className="font-ui font-medium text-ink">{item.label}</p>
                      <p className="text-sm font-body text-copper-500">{item.description}</p>
                    </div>
                    <button
                      className={cn(
                        'h-6 w-11 rounded-full transition-colors relative',
                        item.enabled ? 'bg-amber-500' : 'bg-copper-200'
                      )}
                    >
                      <div
                        className={cn(
                          'h-5 w-5 bg-white rounded-full shadow-sm absolute top-0.5 transition-transform',
                          item.enabled ? 'translate-x-5.5 left-0.5' : 'left-0.5'
                        )}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
