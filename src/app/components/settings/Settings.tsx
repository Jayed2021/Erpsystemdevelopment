import { useState } from 'react';
import { Settings as SettingsIcon, Users, ShoppingCart, UserCheck, Store } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { UserManagement } from './UserManagement';
import { WooCommerceSettings } from './WooCommerceSettings';
import { CSAssignment } from './CSAssignment';
import { StoreProfile } from './StoreProfile';

export function Settings() {
  const [activeTab, setActiveTab] = useState('store');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="w-8 h-8 text-gray-700" />
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Store className="w-4 h-4" />
            Store Profile
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="cs_assignment" className="flex items-center gap-2">
            <UserCheck className="w-4 h-4" />
            CS Assignment
          </TabsTrigger>
          <TabsTrigger value="woocommerce" className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            WooCommerce Integration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="store" className="mt-6">
          <StoreProfile />
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <UserManagement />
        </TabsContent>

        <TabsContent value="cs_assignment" className="mt-6">
          <CSAssignment />
        </TabsContent>

        <TabsContent value="woocommerce" className="mt-6">
          <WooCommerceSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}