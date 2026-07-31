import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[800px]">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[var(--black-900)]">Settings</h1>
          <p className="text-[14px] text-[var(--black-400)] mt-1">Manage your business profile and preferences.</p>
        </div>
        <button className="btn btn-primary">
          <Save size={16} /> Save changes
        </button>
      </div>

      <div className="card flex flex-col gap-6">
        <h2 className="text-[18px] font-bold border-b border-[var(--black-50)] pb-4">Business Details</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="label">Legal Business Name</label>
            <input type="text" className="input" defaultValue="Espanafonica Ltd." />
          </div>
          
          <div>
            <label className="label">Registration Number (RC)</label>
            <input type="text" className="input" defaultValue="RC-1029384" />
          </div>
          
          <div>
            <label className="label">Tax Identification Number (TIN)</label>
            <input type="text" className="input" defaultValue="20039485-0001" />
          </div>

          <div className="sm:col-span-2">
            <label className="label">Business Address</label>
            <textarea className="textarea min-h-[80px]" defaultValue="Calle de Alcalá, 15&#10;28014 Madrid&#10;Spain"></textarea>
          </div>
        </div>

        <h2 className="text-[18px] font-bold border-b border-[var(--black-50)] pb-4 mt-4">Financial Preferences</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="label">Base Currency</label>
            <select className="select">
              <option value="EUR">Euro (€)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="GBP">British Pound (£)</option>
            </select>
          </div>
          
          <div>
            <label className="label">Financial Year End</label>
            <select className="select">
              <option value="12-31">December 31</option>
              <option value="03-31">March 31</option>
              <option value="06-30">June 30</option>
              <option value="09-30">September 30</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
