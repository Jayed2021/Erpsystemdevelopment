import { useState } from 'react';
import { Save, Eye, EyeOff, CheckCircle2, XCircle, RefreshCw, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';

// ─── Types ───────────────────────────────────────────────────────────────────

interface WooCommerceConfig {
  storeUrl: string;
  consumerKey: string;
  consumerSecret: string;
  isConnected: boolean;
  lastSync?: string;
  syncStatus?: 'success' | 'failed';
}

// ─── Component ───────────────────────────────────────────────────────────────

export function WooCommerceSettings() {
  const [config, setConfig] = useState<WooCommerceConfig>({
    storeUrl: 'https://example.com',
    consumerKey: 'ck_xxxxxxxxxxxxxxxxxxxxx',
    consumerSecret: 'cs_xxxxxxxxxxxxxxxxxxxxx',
    isConnected: true,
    lastSync: '2026-03-05 10:30:00',
    syncStatus: 'success',
  });

  const [showConsumerKey, setShowConsumerKey] = useState(false);
  const [showConsumerSecret, setShowConsumerSecret] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleTestConnection = async () => {
    setIsTesting(true);
    
    // Simulate API test
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setConfig({
      ...config,
      isConnected: true,
      syncStatus: 'success',
    });
    
    setIsTesting(false);
    toast.success('Connection test successful!');
  };

  const handleSave = async () => {
    if (!config.storeUrl || !config.consumerKey || !config.consumerSecret) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSaving(true);
    
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSaving(false);
    toast.success('WooCommerce settings saved successfully');
  };

  const handleSync = async () => {
    toast.info('Starting order synchronization...');
    
    // Simulate sync
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setConfig({
      ...config,
      lastSync: new Date().toISOString().replace('T', ' ').substring(0, 19),
      syncStatus: 'success',
    });
    
    toast.success('Orders synchronized successfully');
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>WooCommerce Integration</CardTitle>
              <CardDescription className="mt-1">
                Connect your WooCommerce store to sync orders automatically
              </CardDescription>
            </div>
            <Badge
              className={
                config.isConnected && config.syncStatus === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }
            >
              {config.isConnected && config.syncStatus === 'success' ? (
                <>
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Connected
                </>
              ) : (
                <>
                  <XCircle className="w-3 h-3 mr-1" />
                  Disconnected
                </>
              )}
            </Badge>
          </div>
        </CardHeader>
        {config.lastSync && (
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">Last Synchronization</p>
                <p className="text-xs text-gray-500 mt-1">{config.lastSync}</p>
              </div>
              <Button onClick={handleSync} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Now
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* API Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>
            Enter your WooCommerce REST API credentials. You can generate these from your WordPress admin panel.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Store URL */}
          <div className="space-y-2">
            <Label htmlFor="storeUrl">Store URL *</Label>
            <div className="flex gap-2">
              <Input
                id="storeUrl"
                type="url"
                value={config.storeUrl}
                onChange={(e) => setConfig({ ...config, storeUrl: e.target.value })}
                placeholder="https://your-store.com"
                className="flex-1"
              />
              <Button variant="outline" size="icon" asChild>
                <a href={config.storeUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Your WooCommerce store's base URL (e.g., https://example.com)
            </p>
          </div>

          {/* Consumer Key */}
          <div className="space-y-2">
            <Label htmlFor="consumerKey">Consumer Key *</Label>
            <div className="flex gap-2">
              <Input
                id="consumerKey"
                type={showConsumerKey ? 'text' : 'password'}
                value={config.consumerKey}
                onChange={(e) => setConfig({ ...config, consumerKey: e.target.value })}
                placeholder="ck_xxxxxxxxxxxxxxxxxxxxx"
                className="flex-1 font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowConsumerKey(!showConsumerKey)}
              >
                {showConsumerKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              The consumer key from WooCommerce &gt; Settings &gt; Advanced &gt; REST API
            </p>
          </div>

          {/* Consumer Secret */}
          <div className="space-y-2">
            <Label htmlFor="consumerSecret">Consumer Secret *</Label>
            <div className="flex gap-2">
              <Input
                id="consumerSecret"
                type={showConsumerSecret ? 'text' : 'password'}
                value={config.consumerSecret}
                onChange={(e) => setConfig({ ...config, consumerSecret: e.target.value })}
                placeholder="cs_xxxxxxxxxxxxxxxxxxxxx"
                className="flex-1 font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowConsumerSecret(!showConsumerSecret)}
              >
                {showConsumerSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              The consumer secret from WooCommerce &gt; Settings &gt; Advanced &gt; REST API
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleTestConnection} variant="outline" disabled={isTesting}>
              {isTesting ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                'Test Connection'
              )}
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Generate API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
            <li>
              Log in to your WordPress admin dashboard
            </li>
            <li>
              Navigate to <strong>WooCommerce → Settings → Advanced → REST API</strong>
            </li>
            <li>
              Click <strong>"Add key"</strong>
            </li>
            <li>
              Enter a description (e.g., "ERP Integration")
            </li>
            <li>
              Select <strong>User</strong> with administrator privileges
            </li>
            <li>
              Set <strong>Permissions</strong> to <strong>"Read/Write"</strong>
            </li>
            <li>
              Click <strong>"Generate API key"</strong>
            </li>
            <li>
              Copy the <strong>Consumer key</strong> and <strong>Consumer secret</strong> and paste them above
            </li>
          </ol>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Store these credentials securely. The Consumer Secret will only be shown once and cannot be retrieved later.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Sync Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Synchronization Settings</CardTitle>
          <CardDescription>
            Configure how orders are synchronized from WooCommerce
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Automatic Sync</p>
              <p className="text-sm text-gray-500 mt-1">
                Automatically sync new orders every 15 minutes
              </p>
            </div>
            <Badge className="bg-green-100 text-green-700">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Enabled
            </Badge>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Order Status Updates</p>
              <p className="text-sm text-gray-500 mt-1">
                Push order status updates back to WooCommerce
              </p>
            </div>
            <Badge className="bg-green-100 text-green-700">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Enabled
            </Badge>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Customer Data Sync</p>
              <p className="text-sm text-gray-500 mt-1">
                Sync customer information and prescription data
              </p>
            </div>
            <Badge className="bg-green-100 text-green-700">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Enabled
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
